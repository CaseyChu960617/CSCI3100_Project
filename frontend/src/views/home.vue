<template>
  <div>
    <v-container v-if="currentUser">
      <News v-if="currentUser.activation" />
      <v-card-title v-else> Please activate you account </v-card-title>
    </v-container>
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
