<template>
  <v-container>
    <v-row justify="center">
      <EditProfile
        v-if="canEdit"
        @refresh="refresh()"
        :profile="profile"
        :loading="loading"
      />
      <ViewProfile v-else :profile="profile" />
    </v-row>
  </v-container>
</template>

<script>
import DataService from "../services/DataService";
import EditProfile from "../components/profile/editProfile.vue";
import ViewProfile from "../components/profile/viewProfile.vue";

export default {
  components: {
    EditProfile,
    ViewProfile,
  },
  data() {
    return {
      edit: true,
      canEdit: false,
      profile: {},
    };
  },
  watch: {
    "$route.params.user_id"() {
      this.fetchUser();
    },
  },
  created() {
    this.fetchUser();
  },
  methods: {
    fetchUser() {
      this.loading = true;
      DataService.getProfile(this.$route.params.user_id)
        .then((response) => {
          this.profile = response.data;
          this.profile._id == this.$store.state.auth.user.user_id
            ? (this.canEdit = true)
            : (this.canEdit = false);
          this.loading = false;
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
    refresh() {
      this.fetchUser();
    },
  },
};
</script>
