<template>
  <v-col cols="12" sm="12" md="10">
    <v-card elevation="16" outlined>
      <v-card-title class="display-1 pa-10">
        <v-icon class="pr-3" color="black" size="40">mdi-account-cog</v-icon
        >Profile</v-card-title
      >
      <v-container>
        <v-row
          ><v-col cols="12" sm="12" md="4" align-self="center"
            ><v-row justify="center">
              <div v-if="loading">
                <v-progress-circular
                  indeterminate
                  color="primary"
                ></v-progress-circular>
              </div>
              <div v-else>
                <v-avatar v-if="profile.profileImage" size="200">
                  <v-img :src="profile.profileImage" height="100%" />
                </v-avatar>
                <v-avatar v-else color="grey" size="200">
                  <span class="white--text headline"> {{ firstChar }}</span>
                </v-avatar>
              </div></v-row
            ></v-col
          ><v-col cols="12" sm="12" md="8">
            <v-container>
              <!-- <v-text-field
                readonly
                v-model="profile.email"
                label="Email"
              ></v-text-field> -->
              <v-text-field
                :loading="loading"
                readonly
                v-model="profile.username"
                label="Username"
                type="text"
              ></v-text-field>
              <v-row>
                <v-col cols="6">
                  <v-text-field
                    :loading="loading"
                    readonly
                    v-model="profile.firstname"
                    label="First Name"
                    type="text"
                  ></v-text-field>
                </v-col>
                <v-col cols="6">
                  <v-text-field
                    :loading="loading"
                    readonly
                    v-model="profile.lastname"
                    label="Last Name"
                    type="text"
                  ></v-text-field> </v-col
              ></v-row>
              <v-text-field
                :loading="loading"
                readonly
                v-model="gender"
                label="Gender"
                type="text"
              ></v-text-field>
              <v-row class="my-1">
                <v-btn text @click="startChat">Chat</v-btn><v-spacer />
                <!-- <v-btn text @click="follow">Threads</v-btn><v-spacer /> -->
                <v-btn text @click="viewUserTutorials">Tutorials</v-btn
                ><v-spacer />
                <v-btn text v-if="followed" @click="unfollow">Unfollow</v-btn>
                <v-btn text v-else @click="follow">Follow</v-btn></v-row
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

export default {
  props: ["profile", "loading"],
  data() {
    return {
      genderlist: ["Male", "Female", "Prefer not to disclose"],
    };
  },
  computed: {
    gender() {
      return this.genderlist[this.profile.gender - 1];
    },
    firstChar() {
      // Make the first character of username to be capital.
      var str = this.profile.username + "";
      return str.substring(0, 1);
    },
    currentUser() {
      return this.$store.state.auth.user;
    },
    followed() {
      // Return a following list from local storage.
      return this.currentUser.following.includes(this.profile._id);
    },
  },
  methods: {
    startChat() {

      // Do a get request to fetch one chat history.
      DataService.getOneChat({
        user_id_1: this.currentUser.user_id,
        user_id_2: this.profile._id,
      }).then((response) => {
        // Redirect to chat component
        this.$router
          .push({
            name: "chat",
            params: { chatId: response.data._id },
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
      });
    },

    follow() {
      const data = {
        my_user_id: this.currentUser.user_id,
        follow_id: this.profile._id,
      };

      // Do a put request to follow certain user.
      DataService.follow(data)
        .then((response) => {
          // Update the following list locally
          var user = JSON.parse(localStorage.getItem("user"));
          user.following = Object.values(response.data);
          localStorage.setItem("user", JSON.stringify(user));
          this.$store.dispatch("auth/follow", this.profile._id);
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

    unfollow() {
      const data = {
        my_user_id: this.currentUser.user_id,
        follow_id: this.profile._id,
      };

      // Do a put request to unfollow certain user.
      DataService.unfollow(data)
        .then((response) => {
          // Update the following list locally
          var user = JSON.parse(localStorage.getItem("user"));
          user.following = Object.values(response.data);
          localStorage.setItem("user", JSON.stringify(user));
          this.$store.dispatch("auth/unfollow", this.profile._id);
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

    viewUserTutorials() {
      // Redirect to the userTutorial component
      this.$router.push({
        name: "userTutorial",
        params: {
          user_id: this.profile._id,
        },
      });
    },
  },
};
</script>
