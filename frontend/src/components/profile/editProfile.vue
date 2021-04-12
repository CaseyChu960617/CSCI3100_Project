<template>
  <v-col cols="12" sm="12" md="10">
    <v-card elevation="16" outlined>
      <v-card-title class="display-1">Profile</v-card-title>
      <v-container>
        <v-row
          ><v-col cols="12" sm="12" md="4" align-self="center"
            ><v-row justify="center"
              ><v-avatar
                v-if="currentUser.profileImage"
                size="200"
                style="cursor: pointer"
                @click.stop="dialog = true"
              >
                <v-img :src="currentUser.profileImage" height="100%" />
              </v-avatar>
              <v-avatar
                v-else
                color="grey"
                size="200"
                @click.stop="dialog = true"
              >
                <span class="white--text headline">
                  {{ currentUser.username[0] }}</span
                >
              </v-avatar></v-row
            >
            <v-row justify="center"
              ><v-btn text color="primary" @click.stop="dialog = true"
                >Change Profile Photo</v-btn
              >
              <modal :dialog.sync="dialog" @show="show"></modal></v-row></v-col
          ><v-col cols="12" sm="12" md="8">
            <v-container>
              <v-text-field
                readonly
                v-model="account.email"
                label="Email"
              ></v-text-field>
              <v-text-field
                v-model="account.username"
                label="Username"
                type="text"
                clearable
                :rules="[rules.required]"
              ></v-text-field>
              <v-row>
                <v-col cols="6">
                  <v-text-field
                    v-model="account.firstname"
                    label="First Name"
                    type="text"
                    clearable
                    :rules="[rules.required]"
                  ></v-text-field>
                </v-col>
                <v-col cols="6">
                  <v-text-field
                    v-model="account.lastname"
                    label="Last Name"
                    type="text"
                    clearable
                    :rules="[rules.required]"
                  ></v-text-field> </v-col
              ></v-row>
              <v-select
                v-model="account.gender"
                :items="genderlist"
                item-text="text"
                item-value="value"
                label="Gender"
                :rules="[rules.required]"
              ></v-select>
              <v-row class="mt-1">
                <v-btn text @click="changePassword()">Change Password</v-btn>
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
</template>

<script>
import DataService from "../../services/DataService";
import authHeader from "../../services/auth-header.js";
import modal from "../../components/modal/uploadProPic.vue";

export default {
  data() {
    return {
      dialog: false,
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
  components: {
    modal,
  },
  computed: {
    currentUser() {
      return this.$store.state.auth.user;
    },
  },
  mounted() {
    if (!this.currentUser) {
      this.$router.push("/home");
    }
  },
  methods: {
    changePassword() {
      this.$emit("switchform");
    },
    saveProfile() {
      DataService.updateProfile(this.account, {
        headers: authHeader(),
      })
        .then((response) => {
          console.log(response.data);
        })
        .catch((err) => {
          console.log(err);
          if (err.response.status == 401 || err.response.status == 403) {
            alert("Please Login again");
            this.$router.push("/home");
          } else {
            alert(err.response.data.message);
          }
        });
    },
    show(bool) {
      this.dialog = bool;
    },
  },
};
</script>
