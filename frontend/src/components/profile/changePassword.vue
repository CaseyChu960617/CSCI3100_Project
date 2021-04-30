<template>
  <v-col cols="12" sm="8" md="6">
    <v-card elevation="16" outlined>
      <v-card-title
        class="pt-7 pl-5 forgot-pw pr-2"
        style="font-size:2.215rem;    font-family: 'Roboto', sans-serif !important;font-weight: 400;
    line-height: 2.5rem;"
      >
        <v-icon class="pr-3" color="black" size="40">mdi-account-key</v-icon
        >Change Password</v-card-title
      >
      <v-container>
        <v-row
          ><v-col>
            <v-form v-model="isValid">
              <v-container>
                <v-text-field
                  v-model="password.oldPassword"
                  label="Current Password"
                  clearable
                  :append-icon="show1 ? 'mdi-eye' : 'mdi-eye-off'"
                  :type="show1 ? 'text' : 'password'"
                  @click:append="show1 = !show1"
                  :rules="[rules.required]"
                ></v-text-field>
                <v-text-field
                  v-model="password.newPassword"
                  label="New Password"
                  clearable
                  :append-icon="show2 ? 'mdi-eye' : 'mdi-eye-off'"
                  :type="show2 ? 'text' : 'password'"
                  @click:append="show2 = !show2"
                  :rules="[rules.required]"
                ></v-text-field>
                <v-text-field
                  v-model="repeatPassword"
                  label="Re-enter New Password"
                  clearable
                  :append-icon="show3 ? 'mdi-eye' : 'mdi-eye-off'"
                  :type="show3 ? 'text' : 'password'"
                  @click:append="show3 = !show3"
                  :rules="[rules.required, rules.repeat]"
                ></v-text-field>
                <v-row class="mt-1">
                  <v-btn text @click="back()">Edit Profile</v-btn>
                  <v-spacer />
                  <v-btn
                    rounded
                    color="#99CFEA"
                    class="black--text"
                    :disabled="!isValid"
                    @click="changePassword()"
                    >Save</v-btn
                  ></v-row
                ></v-container
              >
            </v-form></v-col
          ></v-row
        >
      </v-container>
    </v-card>
  </v-col>
</template>
<style>
@media screen and (max-width: 405px) {
  .forgot-pw {
    font-size: 24px !important;
  }
}
</style>
<script>
import DataService from "../../services/DataService";
import authHeader from "../../services/auth-header";

export default {
  data() {
    return {
      password: {
        user_id: this.$store.state.auth.user.user_id,
        oldPassword: "",
        newPassword: "",
      },
      repeatPassword: "",
      show1: false,
      show2: false,
      show3: false,
      isValid: false,
      rules: {
        required: (value) => !!value || "Required",
        repeat: (value) =>
          value == this.password.newPassword || "Password does not match",
      },
    };
  },
  methods: {
    back() {
      // Return to editProfile
      this.$emit("switchform");
    },

    changePassword() {
      // Do a put request to change password with the inputs.
      DataService.changePassword(this.password, { headers: authHeader() })
        .then(() => {
          // If no error, prompt with a message.
          alert("Password has been reset successfully.");
          this.$emit("switchform");
        })
        .catch((err) => {
          // Prompt error and alert messages.
          if (err.response.status == 401 || err.response.status == 403) {
            alert("Please Login again");
            // Sign out the user automatically.
            this.$store.dispatch("auth/signout");
            this.$router.push("/home").catch(() => {});
          } else if (err.response.status == 400) {
            alert(err.response.data.message);
          }
        });
    },
  },
};
</script>
