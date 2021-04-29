import Vue from "vue";
import Router from "vue-router";
import home from "./views/home.vue";
import tutorial from "./views/tutorial.vue";
import discussion from "./views/discussion.vue";
import profile from "./views/profile.vue";

//import chat from "./components/chat/chat.vue";

import activateAccount from "./views/activateAccount.vue";
import chatList from "./views/chatList.vue";
import editTutorial from "./views/editTutorial.vue";
import myTutorial from "./views/myTutorial.vue";
import viewTutorial from "./views/viewTutorial.vue";
import userTutorial from "./views/userTutorial.vue";
import following from "./views/following.vue";
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
      name: "discussion",
      path: "/discussion/:sub_id/:thread_id?",
      component: discussion,
    },
    {
      name: "profile",
      path: "/profile/:user_id",
      component: profile,
    },
    {
      name: "chat",
      path: "/chat/:chatId?",
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
      name: "editTutorial",
      path: "/editTutorial/:tutorialId",
      component: editTutorial,
    },
    {
      name: "myTutorial",
      path: "/myTutorial",
      component: myTutorial,
    },

    {
      name: "userTutorial",
      path: "/userTutorial/:user_id",
      component: userTutorial,
    },

    {
      name: "viewTutorial",
      path: "/tutorial/:tutorial_id",
      component: viewTutorial,
    },
    {
      name: "following",
      path: "/following",
      component: following,
    },
  ],
});
