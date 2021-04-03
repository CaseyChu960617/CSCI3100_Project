<template>
  <div class="container mt-4">
    <h3>Profile</h3>
    <p>ID: {{ this.user._id }}</p>
    <p>Username: {{ this.user.username }}</p>
    <p>First Name: {{ this.user.firstname }}</p>
    <p>Last Name: {{ this.user.firstname }}</p>
    <p>Email: {{ this.user.email }}</p>
    <p>Gender:</p>
  </div>
</template>

<script>
import DataService from "../services/DataService";
//import authHeader from "../services/auth-header.js";
export default {
  props: ["_id"],
  data() {
    return { user: null };
  },
  created() {
    this.fetchProfile();
  },

  methods: {
    fetchProfile() {
      console.log(this.$route.params.uid);
      //this.uid = this.$route.params.uid;

      DataService.get("user/getProfile", this.$route.params.uid).then(
        (response) => {
          console.log(response.data[0]);
          this.user = response.data[0];
        }
      );
    },
  },
};
</script>
