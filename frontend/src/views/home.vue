<template>
  <div>
    <News v-if="currentUser" />
    <Sign v-else />
  </div>
</template>

<script>
import Sign from "../components/auth/sign.vue";
import News from "./news.vue";

export default {
  components: {
    Sign,
    News,
  },
  data() {
    return {};
  },
  computed: {
    currentUser() {
      return this.$store.state.auth.user;
    },
  },
};
</script>
