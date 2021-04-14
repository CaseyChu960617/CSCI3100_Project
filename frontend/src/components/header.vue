<template>
  <div>
    <v-app-bar color="#1F5A98" class="white--text" flat height="100">
      <!-- <v-app-bar-nav-icon @click="drawer = true"></v-app-bar-nav-icon> -->
      <v-img
        src="../assets/Logo/urge.gif"
        max-width="175"
        contain
        position="left"
        style="cursor: pointer"
        @click="$router.push('/home').catch(() => {})"
      ></v-img>
      <v-app-bar-text v-if="!currentUser.activation" class="sign-header-text"
        >Urge to learn, Path to wisdom</v-app-bar-text
      >
      <v-spacer></v-spacer>
      <div v-if="currentUser">
        <v-btn
          v-if="currentUser.activation"
          to="/chat"
          class="text-capitalize headline white--text"
          plain
          >Chat <v-icon class="pl-3">mdi-chat</v-icon></v-btn
        >
        <v-btn
          v-if="currentUser.activation"
          to="/tutorial"
          class="text-capitalize headline white--text"
          plain
          >Tutorial <v-icon class="pl-3">mdi-book-account</v-icon></v-btn
        >
        <v-btn
          v-if="currentUser.activation"
          to="/discussion/0"
          class="text-capitalize headline white--text"
          plain
          >Discussion <v-icon class="pl-3">mdi-chat-question</v-icon></v-btn
        >
        <v-btn
          v-if="currentUser.activation"
          :to="`/profile/` + currentUser.user_id"
          class="mr-4 ml-2 text-capitalize white--text"
          color="#757575"
          text
          >{{ currentUser.username
          }}<v-icon class="pl-3">mdi-account-cog</v-icon>
        </v-btn>

        <v-btn @click="signout" rounded
          ><v-icon>mdi-logout</v-icon>Sign out</v-btn
        >
      </div>
    </v-app-bar>

    <!-- <v-navigation-drawer v-if="currentUser" v-model="drawer" absolute temporary>
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
    </v-navigation-drawer> -->
  </div>
</template>
<style>
.sign-header-text {
  font-family: "Segoe Script";
  font-size: 20px;
  right: 30px;
  position: absolute;
}
</style>
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
      this.$router.push("/home").catch(() => {});
    },
  },
};
</script>
