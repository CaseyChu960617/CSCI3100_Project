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
import Sign from "../components/auth/sign.vue"; //using a child component to render sign component
import News from "./news.vue"; //using a child component to render latest tutorials
import GenerateEmail from "./generateEmail.vue"; //using a child component to render generate email component
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
      //store current users
      return this.$store.state.auth.user;
    },
  },
};
</script>
