import Vue from "vue";
import Router from "vue-router";
import home from "./views/home.vue";
import tutorial from "./views/tutorial.vue";
import discussion from "./views/discussion.vue";
import profile from "./views/profile.vue";

//import chat from "./components/chat/chat.vue";

import activateAccount from "./views/activateAccount.vue";
import userProfile from "./views/userProfile.vue";
import editProfile from "./views/editProfile.vue";
import chatList from "./views/chatList.vue";
import editTutorial from "./views/editTutorial.vue";
import myTutorial from "./views/myTutorial.vue";
//import { component } from "vue/types/umd";

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
      name: "chat",
      path: "/chat/:chatId",
      component: chatList,
    },
    {
      name: "chat",
      path: "/chat",
      component: chatList,
    },
    {
      path: "/activateAccount/:user_id",
      component: activateAccount,
    },
    {
      path: "*",
      redirect: "/home",
    },
    {
      name: "userProfile",
      path: "/userProfile/:user_id",
      component: userProfile,
    },
    {
      path: "/editProfile",
      component: editProfile,
    },
    {
      name: "editTutorial",
      path: "/editTutorial/:tutorialId",
      component: editTutorial,
    },
    {
      name: "myTutorial",
      path: "/myTutorial",
      component: myTutorial,
    },
  ],
});
