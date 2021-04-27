<template>
  <v-container>
    <v-row justify="center">
      <v-col cols="6">
        <v-card elevation="16" height="50vh">
          <v-card-title> Activate your account </v-card-title>
          <v-card-text> Your account is activated successfully. </v-card-text>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import DataService from "../services/DataService"; //handling HTTP request (GET,POST,PUT,DELETE,...)

export default {
  data() {
    return {};
  },
  computed: {
    currentUser() {
      //store current user
      return this.$store.state.auth.user;
    },
  },
  created() {
    //trigger the actiavteaccount function when enter the page
    this.activateAccount();
  },

  methods: {
    //function to activate the account
    activateAccount() {
      //get request sent to backend to actiavte the account
      DataService.get("auth/activateAccount", this.$route.params.user_id).then(
        () => {
          //currents user is now activated and will be redirect the homepage
          this.currentUser.activation = true;
          this.$router.push("/home");
        }
      );
    },
  },
};
</script>
