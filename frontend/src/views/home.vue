<template>
  <div>
    <v-container v-if="currentUser">Home {{ message }}</v-container>
    <Sign v-else />
  </div>
</template>

<script>
import Sign from "../components/auth/sign.vue";

export default {
  components: {
    Sign,
  },
  data() {
    return {
      message: "abc",
    };
  },
  computed: {
    currentUser() {
      return this.$store.state.auth.user;
    },
  },
};
</script>
