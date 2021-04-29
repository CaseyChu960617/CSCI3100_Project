<template>
  <v-container>
    <v-card-title> You are following: </v-card-title>
    <v-row v-if="following">
      <v-col
        cols="12"
        sm="6"
        md="4"
        v-for="user in following.following"
        :key="user._id"
        class="following-card"
      >
        <v-card elevation="8" :ref="'front-' + user._id" class="pa-3">
          <router-link
            :to="{ name: 'profile', params: { user_id: user._id } }"
            style="text-decoration: none"
          >
            <v-avatar
              class="avatar mr-2"
              v-if="user.profileImage"
              style="
                cursor: pointer;
                min-width: 45px;
                min-height: 45px;
                width: 45px;
                height: 45px;
              "
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
            <span id="following-username">{{ user.username }}</span>
          </router-link>
        </v-card>
      </v-col>
    </v-row>
    <v-row v-else>
      <v-col cols="12">
        <v-card>
          <v-card-title
            >No following user. Go tutorial and discussion to start connection
            with others</v-card-title
          >
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>
<style>
#following-username {
  text-decoration: none;
  color: black;
}
</style>
<script>
import DataService from "../services/DataService"; //handling HTTP request (GET,POST,PUT,DELETE,...)

export default {
  components: {},
  data() {
    return {
      following: {},
      loading: false,
    };
  },

  computed: {
    currentUser() {
      //store the login user
      return this.$store.state.auth.user;
    },
  },

  created() {
    //fetch following users when enter the page
    this.fetchFollowing();
  },

  methods: {
    //function to fetch following users
    fetchFollowing() {
      this.loading = true;
      //get request
      DataService.get("user/getFollower", this.currentUser.user_id).then(
        (response) => {
          //stored in following array
          this.following = response.data;
          this.loading = false;
        }
      );
    },
  },
};
</script>
