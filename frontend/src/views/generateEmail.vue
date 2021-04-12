<template>
  <v-container>
    <v-row justify="center">
      <v-col cols="6">
        <v-card elevation="16" height="50vh">
          <v-card-title> Activate your account </v-card-title>
          <v-btn> Generate Email </v-btn>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
//import DataService from "../services/DataService";
//import authHeader from "../services/auth-header.js";

export default {
  data() {
    return {};
  },

  computed: {
    currentUser() {
      return this.$store.state.auth.user;
    },
  },

  methods: {},
};
</script>
