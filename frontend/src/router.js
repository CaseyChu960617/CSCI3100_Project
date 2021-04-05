import Vue from "vue";
import Router from "vue-router";
import home from "./views/home.vue";
import tutorial from "./views/tutorial.vue";
import discussion from "./views/discussion.vue";
import profile from "./views/profile.vue";

import chat from "./views/chat.vue";
import activateAccount from "./views/activateAccount.vue";
import userProfile from "./views/userProfile.vue";
import editProfile from "./views/editProfile.vue";

Vue.use(Router);

export const router = new Router({
  mode: "history",
  routes: [
    {
      path: "/home",
      component: home,
    },
    {
      path: "/tutorial",
      component: tutorial,
    },
    {
      path: "/discussion",
      component: discussion,
    },
    {
      path: "/profile",
      component: profile,
    },

    {
      path: "/chat:uid",
      component: chat,
    },
    {
      path: "/activateAccount/:uid",
      component: activateAccount,
    },
    {
      path: "*",
      redirect: "/home",
    },

    {
      name: "userProfile",
      path: "/userProfile/:uid",
      component: userProfile,
    },

    {
      path: "/editProfile",
      component: editProfile,
    },
  ],
});
