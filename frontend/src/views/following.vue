<template>
  <v-container>
    <v-row>
      <div>{{ this.following }}</div>
      <v-col
        cols="12"
        sm="6"
        md="4"
        v-for="user in following"
        :key="user"
        class="following-card"
      >
        <v-card
          elevation="8"
          class="card__face card__face--front"
          :ref="'front-' + user._id"
        >
          <router-link :to="{ name: 'profile', params: { user_id: user._id } }">
            <v-avatar
              class="avatar mr-2"
              v-if="user.profileImage"
              style="cursor: pointer"
            >
              <v-img :src="user.profileImage" height="100%" />
            </v-avatar>
            <v-avatar
              class="avatar mr-2"
              v-else
              color="grey"
              size="45"
              style="cursor: pointer"
            >
              <span class="white--text headline"> {{ user.username[0] }}</span>
            </v-avatar>
            <span id="author-name">
              Author:
              {{ user.username }}</span
            >
          </router-link>
          <v-card-title>{{ user.username }}</v-card-title>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>
<style></style>
<script>
import DataService from "../services/DataService"; //handling HTTP request (GET,POST,PUT,DELETE,...)

export default {
  components: {},
  data() {
    return {
      following: [],
      selectID: null,
    };
  },

  computed: {
    currentUser() {
      //store the login user
      return this.$store.state.auth.user;
    },
  },

  created() {
    this.fetchFollowing();
  },

  methods: {
    //function to fetch following users
    fetchFollowing() {
      //get request
      DataService.get("user/getFollower", this.currentUser.user_id).then(
        (response) => {
          let rawData = response.data;

          this.following = rawData;
          console.log(this.following);
        }
      );
    },

    //redirect to mytutorial
    goToUser() {
      this.$router.push({
        name: "myTutorial",
      });
    },
  },
};
</script>
