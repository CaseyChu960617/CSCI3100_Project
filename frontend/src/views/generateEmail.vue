<template>
  <v-container>
    <v-row justify="center">
      <v-col cols="6">
        <v-card class="my-4" elevation="16">
          <div class="pa-5">
            <v-card-title> Email Activation </v-card-title>
            <v-card-text class="pa-5">
              <div>Dear {{ currentUser.username }},</div>
              <br />
              <div>
                If you cannot receive the activation email, please click to
                generate the email again.
              </div>

              <v-row justify="center">
                <v-spacer />
                <v-col col="3">
                  <v-btn
                    rounded
                    block
                    @click="generateEmail"
                    class="my-4 black--text"
                    color="#99CFEA"
                    max-width="50px"
                    >Generate Email</v-btn
                  >
                </v-col>
                <v-spacer /> </v-row
            ></v-card-text>
          </div>
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

  methods: {
    //function to generate email  when clicked
    generateEmail() {
      DataService.get(
        "auth/generateEmail",
        this.currentUser.user_id
      ).then(() => {});
    },
  },
};
</script>
