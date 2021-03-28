import Vue from "vue";
import Router from "vue-router";
import home from "./views/home.vue";
import tutorial from "./views/tutorial.vue";
import discussion from "./views/discussion.vue";
import profile from "./views/profile.vue";
import activateAccount from "./views/ActivateAccount";

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
      path: "*",
      redirect: "/home"
    },
    {
      path: "/activateAccount/:uid",
      component: activateAccount,
    },
  ],
});