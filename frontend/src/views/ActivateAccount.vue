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
import DataService from "../services/DataService";
import authHeader from "../services/auth-header.js";

export default {
  data() {
    return {
      message: "abc",
    };
  },
  created() {
    this.activateAccount();
  },

  methods: {
    activateAccount() {
      DataService.get("auth/activateAccount", this.$route.params.user_id, {
        headers: authHeader(),
      }).then(() => {
        this.$router.push("/profile");
      });
    },
  },
};
</script>
