<template>
  <div>
    <v-container v-if="currentUser">
      <News v-if="currentUser.activation" />
      <GenerateEmail v-else />
    </v-container>
    <Sign v-else />
  </div>
</template>

<script>
import Sign from "../components/auth/sign.vue";
import News from "./news.vue";
import GenerateEmail from "./generateEmail.vue";
export default {
  components: {
    Sign,
    News,
    GenerateEmail,
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
