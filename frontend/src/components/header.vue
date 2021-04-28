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

      <v-spacer></v-spacer>
      <div v-if="currentUser" id="original-navbar">
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
      <v-app-bar-text v-else class="sign-header-text"
        >Urge to learn, Path to wisdom</v-app-bar-text
      >
      <v-app-bar-nav-icon
        id="toggle-icon"
        v-if="currentUser"
        @click.stop="drawer = !drawer"
      ></v-app-bar-nav-icon>
    </v-app-bar>

    <v-navigation-drawer
      v-if="currentUser"
      v-model="drawer"
      absolute
      bottom
      temporary
      id="drawer"
    >
      <v-list nav dense>
        <v-list-item-group
          v-model="group"
          active-class="deep-purple--text text--accent-4"
        >
          <v-list-item to="/chat">
            <v-btn
              v-if="currentUser.activation"
              class="text-capitalize headline black--text"
              plain
              ><v-icon class="pr-3">mdi-chat</v-icon>Chat
            </v-btn></v-list-item
          >
          <v-list-item to="/tutorial">
            <v-btn
              v-if="currentUser.activation"
              class="text-capitalize headline black--text"
              plain
              ><v-icon class="pr-3">mdi-book-account</v-icon>Tutorial
            </v-btn>
          </v-list-item>
          <v-list-item to="/discussion/0">
            <v-btn
              v-if="currentUser.activation"
              to="/discussion/0"
              class="text-capitalize headline black--text"
              plain
              ><v-icon class="pr-3">mdi-chat-question</v-icon>Discussion
            </v-btn>
          </v-list-item>

          <v-list-item :to="`/profile/` + currentUser.user_id">
            <v-btn
              style="font-size: inheirt; box-shadow: none; background-color: none;"
              v-if="currentUser.activation"
              class="mr-4 text-capitalize"
              ><v-icon class="pr-3">mdi-account-cog</v-icon>My Profile
            </v-btn>
          </v-list-item>
        </v-list-item-group>
      </v-list>
    </v-navigation-drawer>
  </div>
</template>
<style>
.sign-header-text {
  font-family: "Segoe Script";
  font-size: 20px;
  right: 30px;
  position: absolute;
}
.v-navigation-drawer--bottom.v-navigation-drawer--is-mobile {
  max-height: calc(70% + 10vh) !important;
  top: auto;
  bottom: 0;
  position: sticky;
  height: inherit !important;
}
@media screen and (max-width: 970px) {
  #original-navbar {
    display: none;
  }
  #toggle-icon {
    display: block !important;
  }
}
@media screen and (max-width: 600px) {
  .sign-header-text {
    display: none;
  }
}
#toggle-icon {
  display: none;
}
#drawer {
  display: none;
}
.v-navigation-drawer--is-mobile:not(.v-navigation-drawer--close),
.v-navigation-drawer--temporary:not(.v-navigation-drawer--close) {
  box-shadow: 0px 8px 10px -5px rgb(0 0 0 / 20%),
    0px 16px 24px 2px rgb(0 0 0 / 14%), 0px 6px 30px 5px rgb(0 0 0 / 12%);
  display: block !important;
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
