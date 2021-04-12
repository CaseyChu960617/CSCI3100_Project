<template>
  <v-app>
    <Header />
    <v-main>
      <router-view />
    </v-main>
    <Footer />
  </v-app>
</template>

<script>
import Header from "./components/header.vue";
import Footer from "./components/footer.vue";

export default {
  name: "App",
  components: {
    Header,
    Footer,
  },
};
</script>
