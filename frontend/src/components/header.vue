<template>
  <div>
    <v-app-bar color="#1F5A98" class="white--text">
      <v-app-bar-nav-icon @click="drawer = true"></v-app-bar-nav-icon>
      <v-toolbar-title style="cursor: pointer" @click="$router.push('/home')"
        >Urge</v-toolbar-title
      >
      <!-- <v-spacer></v-spacer>
      <div v-if="currentUser">
        <v-btn to="/profile" class="grey darken-3 mr-2 text-capitalize">{{ currentUser.username }}</v-btn>
        <v-btn @click="signout" class="grey darken-2">Sign out</v-btn>
      </div>
      <div v-else>
        <v-btn to="/sign">Sign up / Sign in</v-btn>
      </div> -->
    </v-app-bar>

    <v-navigation-drawer v-if="currentUser" v-model="drawer" absolute temporary>
      <v-list nav dense>
        <v-list-item-group v-model="group">
          <v-list-item to="/home">
            <v-list-item-icon>
              <v-icon>mdi-home</v-icon>
            </v-list-item-icon>
            <v-list-item-title>Home</v-list-item-title>
          </v-list-item>

          <v-list-item to="/item">
            <v-list-item-icon>
              <v-icon>mdi-package</v-icon>
            </v-list-item-icon>
            <v-list-item-title>Item</v-list-item-title>
          </v-list-item>

          <v-list-item to="/profile">
            <v-list-item-icon>
              <v-icon>mdi-account</v-icon>
            </v-list-item-icon>
            <v-list-item-title>Account</v-list-item-title>
          </v-list-item>
        </v-list-item-group>
      </v-list>
    </v-navigation-drawer>
  </div>
</template>

<script>
export default {
  data: () => ({
    drawer: false,
    group: null,
  }),
  computed: {
    currentUser() {
      return this.$store.state.auth.user;
    },
  },
  methods: {
    signout() {
      this.$store.dispatch("auth/signout");
      this.$router.push("/home");
    },
  },
};
</script>
