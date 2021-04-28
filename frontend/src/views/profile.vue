<template>
  <v-container>
    <v-row justify="center">
      <EditProfile
        v-if="canEdit"
        @refreshProfile="fetchUser"
        :profile="profile"
        :loading="loading"
      />
      <ViewProfile v-else :profile="profile" :loading="loading" />
    </v-row>
  </v-container>
</template>

<script>
import DataService from "../services/DataService"; //handling HTTP request (GET,POST,PUT,DELETE,...)
import EditProfile from "../components/profile/editProfile.vue"; //using a child component to render edit profile
import ViewProfile from "../components/profile/viewProfile.vue"; //using a child component to render viewproffile

export default {
  components: {
    EditProfile, //decalre editprofile component
    ViewProfile, //declare viewprofile component
  },
  data() {
    return {
      edit: true,
      canEdit: false, //boolean to decide whether profile can be edit or not
      profile: {},
      loading: false,
    };
  },
  watch: {
    //watch the change of user_id
    "$route.params.user_id"() {
      this.fetchUser();
    },
  },
  created() {
    //fetch user data when enter the page
    this.fetchUser();
  },
  methods: {
    //function to fetch the user data from database
    fetchUser() {
      this.loading = true;

      DataService.getProfile(this.$route.params.user_id)
        .then((response) => {
          //get the response data from db
          this.profile = response.data;
          //check if the id we fetch make with the current login user id,
          //then we allow them to edit the profile
          this.profile._id == this.$store.state.auth.user.user_id
            ? (this.canEdit = true)
            : (this.canEdit = false);
          this.loading = false;
        })
        .catch((err) => {
          this.loading = false;
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
