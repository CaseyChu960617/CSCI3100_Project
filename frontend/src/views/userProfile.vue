<template>
  <div class="container mt-4">
    <h3>Profile</h3>
    <p>ID: {{ this.user._id }}</p>
    <p>Username: {{ this.user.username }}</p>
    <p>First Name: {{ this.user.firstname }}</p>
    <p>Last Name: {{ this.user.firstname }}</p>
    <p>Email: {{ this.user.email }}</p>
    <p>Gender:</p>
    <v-btn elevation="2" @click="startChat(user._id)">Start chat</v-btn>
    <v-btn v-if="followed" elevation="2" @click="unfollow(user._id)"
      >Unfollow</v-btn
    >
    <v-btn v-else elevation="2" @click="follow(user._id)">Follow</v-btn>
  </div>
</template>

<script>
import DataService from "../services/DataService";
//import authHeader from "../services/auth-header.js";
export default {
  data() {
    return { user: null, followed: null };
  },
  computed: {
    currentUser() {
      return this.$store.state.auth.user;
    },
  },
  created() {
    if (this.$route.params.uid === undefined)
      alert("User profile does not exist.");
    else this.fetchProfile();
  },

  methods: {
    fetchProfile() {
      console.log(this.$route.params.uid);
      //this.uid = this.$route.params.uid;

      DataService.get("user/getProfile", this.$route.params.uid)
        .then((response) => {
          console.log(response.data[0]);
          this.user = response.data[0];
        })
        .then(() => {
          console.log("This user following");
          console.log(this.currentUser.following);
          this.checkFollowed();
        });
    },

    startChat(id) {
      console.log("oppId is ", id);
      var chatId = "";
      DataService.post("chat/getOneChat", {
        uid_1: this.currentUser.uid,
        uid_2: id,
      }).then((response) => {
        chatId = response.data._id;
        console.log("ChatId:" + chatId);
        /*this.$router.push({
          name: "chat",
          params: { chatId: chat_id },
        });*/
        this.$router.push({
          name: "chat",
          params: { chatId: chatId },
        });
      });
    },

    checkFollowed() {
      this.followed = false;
      this.currentUser.following.forEach((element) => {
        console.log("HI");
        console.log(element);
        if (element._id === this.user._id) {
          this.followed = true;
          console.log("followed");
        }
      });
      console.log(this.followed);
    },

    follow() {
      const data = { my_id: this.currentUser.uid, follow_id: this.user._id };
      DataService.put("user/follow", data).then((response) => {

        const following = [];
        response.data.forEach((element) => {
          following.push({ _id: element });
        });
        this.currentUser.following = following;
        this.checkFollowed();
      });
    },

    unfollow() {
      const data = { my_id: this.currentUser.uid, follow_id: this.user._id };

      DataService.put("user/unfollow", data).then((response) => {
        const following = [];
        response.data.forEach((element) => {
          following.push({ _id: element });
        });
        this.currentUser.following = following;
        this.checkFollowed();
      });
    },
  },
};
</script>
