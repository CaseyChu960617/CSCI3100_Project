<template>
  <div class="container mt-4">
    <h3>Profile</h3>
    <p>ID: {{ currentUser.id }}</p>
    <p>Name: {{ currentUser.username }}</p>
    <p>Email: {{ currentUser.email }}</p>
    <p>Role: {{ role }}</p>
  </div>
</template>

<script>
export default {
  computed: {
    currentUser() {
      return this.$store.state.auth.user;
    },
    role() {
      if (this.currentUser.role == 0) {
        return "Admin";
      }
      return "Standard User";
    },
  },
  mounted() {
    if (!this.currentUser) {
      this.$router.push("/login");
    }
  },
};
</script>
