<template>
  <v-col v-if="edit" cols="12" sm="12" md="10">
    <v-card elevation="16" outlined>
      <v-card-title class="display-1 pa-10">
        <v-icon class="pr-3" color="black" size="40">mdi-account-cog</v-icon
        >Profile
        <v-tooltip bottom>
          <template v-slot:activator="{ on, attrs }">
            <v-btn
              to="/following"
              id="go-following"
              class="mx-2"
              fab
              dark
              small
              color="primary"
              v-bind="attrs"
              v-on="on"
            >
              <v-icon dark>mdi-account-arrow-right </v-icon>
            </v-btn>
          </template>
          <span>See who you are following</span>
        </v-tooltip>
      </v-card-title>

      <v-container>
        <v-row
          ><v-col cols="12" sm="12" md="4" align-self="center"
            ><v-row justify="center"
              ><div v-if="loading">
                <v-progress-circular
                  indeterminate
                  color="primary"
                ></v-progress-circular>
              </div>
              <div v-else>
                <v-avatar
                  v-if="account.profileImage"
                  size="200"
                  style="cursor: pointer"
                  @click.stop="dialog = true"
                >
                  <v-img :src="account.profileImage" height="100%" />
                </v-avatar>
                <v-avatar
                  v-else
                  color="grey"
                  size="200"
                  style="cursor: pointer"
                  @click.stop="dialog = true"
                >
                  <span class="white--text headline">
                    {{ account.username[0] }}</span
                  >
                </v-avatar>
              </div></v-row
            >
            <v-row justify="center"
              ><v-btn
                class="mt-4"
                text
                color="primary"
                @click.stop="dialog = true"
                >Change Profile Photo</v-btn
              >
              <modal
                :dialog.sync="dialog"
                :src="account.profileImage"
                @show="show"
                @refreshProfile="refreshProfile"
              ></modal></v-row></v-col
          ><v-col cols="12" sm="12" md="8">
            <v-container>
              <v-text-field
                :loading="loading"
                readonly
                v-model="account.email"
                label="Email"
              ></v-text-field>
              <v-text-field
                :loading="loading"
                v-model="account.username"
                label="Username"
                type="text"
                clearable
                :rules="[rules.required]"
              ></v-text-field>
              <v-row>
                <v-col cols="6">
                  <v-text-field
                    :loading="loading"
                    v-model="account.firstname"
                    label="First Name"
                    type="text"
                    clearable
                    :rules="[rules.required]"
                  ></v-text-field>
                </v-col>
                <v-col cols="6">
                  <v-text-field
                    :loading="loading"
                    v-model="account.lastname"
                    label="Last Name"
                    type="text"
                    clearable
                    :rules="[rules.required]"
                  ></v-text-field> </v-col
              ></v-row>
              <v-select
                :loading="loading"
                v-model="account.gender"
                :items="genderlist"
                item-text="text"
                item-value="value"
                label="Gender"
                :rules="[rules.required]"
              ></v-select>
              <v-row class="mt-1">
                <v-btn text @click="edit = false">Change Password</v-btn>
                <v-spacer />
                <v-btn
                  rounded
                  color="#99CFEA"
                  class="black--text"
                  @click="saveProfile()"
                  >Save</v-btn
                ></v-row
              ></v-container
            ></v-col
          ></v-row
        >
      </v-container>
    </v-card>
  </v-col>
  <ChangePassword v-else @switchform="switchform" />
</template>
<style>
#go-following {
  position: absolute;
  right: 16px;
}
</style>
<script>
import DataService from "../../services/DataService"; //handling HTTP request
import modal from "./uploadProPic.vue";
import ChangePassword from "../../components/profile/changePassword.vue";

export default {
  components: {
    modal, //use modal component
    ChangePassword, //use change password component
  },
  props: ["loading", "profile"],
  data() {
    return {
      dialog: false,
      edit: true,
      account: this.profile,
      genderlist: [
        { text: "Male", value: 1 },
        { text: "Female", value: 2 },
        { text: "Prefer not to disclose", value: 3 },
      ],
      rules: {
        required: (value) => !!value || "Required",
      },
    };
  },
  computed: {
    //store the data of current user
    currentUser() {
      return this.$store.state.auth.user;
    },
  },
  watch: {
    //store the profile data into account variable
    profile() {
      this.account = this.profile;
    },
  },
  methods: {
    //emit event to child component to swtich the form view for changing password
    changePassword() {
      this.$emit("switchform");
    },
    //function to save/update the edited profile
    saveProfile() {
      const data = {
        user_id: this.account._id,
        firstname: this.account.firstname,
        lastname: this.account.lastname,
        username: this.account.username,
        gender: this.account.gender,
      };
      //request to update profile in database
      DataService.updateProfile(data)
        .then((response) => {
          alert("Profile saved.");
          localStorage.setItem("user", JSON.stringify(response.data));
          this.$store.dispatch("auth/editProfile", response.data);
          //refresh the profile view after uupdating
          this.refreshProfile();
        })
        .catch((err) => {
          // Prompt error and alert messages
          if (err.response.status == 401 || err.response.status == 403) {
            alert("Please Login again");
            this.$store.dispatch("auth/signout");
            this.$router.push("/home").catch(() => {});
          } else if (err.response.status == 400) {
            alert(err.response.data.message);
          }
        });
    },
    //showing the modal
    show(bool) {
      this.dialog = bool;
    },
    //switchform then change editability of the original form
    switchform() {
      this.edit = !this.edit;
    },
    //emit event to child component to refresh profile
    refreshProfile() {
      this.$emit("refreshProfile");
    },
  },
};
</script>
