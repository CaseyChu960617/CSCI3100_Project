import Vue from "vue";
import Router from "vue-router";
import home from "./components/home.vue";
import login from "./components/login.vue";
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
      path: "/login",
      component: login,
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