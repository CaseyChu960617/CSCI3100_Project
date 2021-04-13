<template>
  <v-col v-if="edit" cols="12" sm="12" md="10">
    <v-card elevation="16" outlined>
      <v-card-title class="display-1 pa-10">
        <v-icon class="pr-3" color="black" size="40">mdi-account-cog</v-icon
        >Profile</v-card-title
      >
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

<script>
import DataService from "../../services/DataService";
import authHeader from "../../services/auth-header.js";
import modal from "./uploadProPic.vue";
import ChangePassword from "../../components/profile/changePassword.vue";

export default {
  components: {
    modal,
    ChangePassword,
  },
  props: ["loading"],
  data() {
    return {
      dialog: false,
      edit: true,
      account: this.$store.state.auth.user,
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
    currentUser() {
      return this.$store.state.auth.user;
    },
  },
  methods: {
    changePassword() {
      this.$emit("switchform");
    },
    saveProfile() {
      DataService.updateProfile(this.account, {
        headers: authHeader(),
      })
        .then((res) => {
          alert("Saved");
          localStorage.setItem("user", JSON.stringify(res.data));
          this.$store.dispatch("auth/editProfile", res.data);
        })
        .catch((err) => {
          console.log(err);
          if (err.response.status == 401 || err.response.status == 403) {
            alert("Please Login again");
            this.$router.push("/home");
          } else {
            console.log(err.response.data);
          }
        });
    },
    show(bool) {
      this.dialog = bool;
    },
    switchform() {
      this.edit = !this.edit;
    },
    refresh() {
      this.$emit("refresh");
    },
  },
};
</script>
