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
  </div>
</template>

<script>
import DataService from "../services/DataService";
//import authHeader from "../services/auth-header.js";
export default {
  data() {
    return { user: null };
  },
  computed: {
    currentUser() {
      return this.$store.state.auth.user;
    },
  },
  created() {
    this.fetchProfile();
  },

  methods: {
    fetchProfile() {
      console.log(this.$route.params.uid);
      //this.uid = this.$route.params.uid;

      DataService.get("user/getProfile", this.$route.params.uid).then(
        (response) => {
          console.log(response.data[0]);
          this.user = response.data[0];
        }
      );
    },
    startChat(id) {
      console.log("oppId is ", id);
      var chat_id = "";
      DataService.post("chat/getOneChat", {
        uid_1: this.currentUser.uid,
        uid_2: id,
      }).then((response) => {
        chat_id = response.data._id;
        console.log("ChatId:" + chat_id);
        this.$router.push({
          name: "chat",
          params: { chatId: chat_id },
        });
      });
    },
  },
};
</script>
