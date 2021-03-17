import Vue from "vue";
import Router from "vue-router";
import home from "./views/home.vue";
import profile from "./components/profile.vue";

Vue.use(Router);

export const router = new Router({
  mode: "history",
  routes: [
    {
      path: "/home",
      component: home,
    },
    {
      path: "/profile",
      component: profile,
    },
    {
      path: "*",
      redirect: "/home"
    },
  ],
});