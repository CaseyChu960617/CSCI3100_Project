<template>
  <div class="container mt-4">
    <h3>Profile</h3>
    <p>ID: {{ currentUser.uid }}</p>
    <p>Username: {{ currentUser.username }}</p>
    <p>First Name: {{ currentUser.firstname }}</p>
    <p>Last Name: {{ currentUser.lastname }}</p>
    <p>Email: {{ currentUser.email }}</p>
    <p>Gender: {{ currentUser.gender }}</p>
  </div>
</template>

<script>
export default {
  computed: {
    currentUser() {
      return this.$store.state.auth.user;
    },
  },
  mounted() {
    if (!this.currentUser) {
      this.$router.push("/login");
    }
  },
};
</script>
