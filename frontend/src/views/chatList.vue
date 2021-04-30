<template>
  <v-container fluid class="pa-0">
    <v-row no-gutters>
      <v-col mt="5" md="3" class="my-5 px-5">
        <v-card elevation="16">
          <v-card-title>
            <v-icon class="pr-3" color="black" size="40">mdi-chat</v-icon> Chats
          </v-card-title>
          <v-divider />
          <v-virtual-scroll
            bench="25"
            min-height="74vh"
            max-height="74vh"
            item-height="70"
            :items="chats"
            id="chatlist-scroll"
          >
            <template v-slot:default="{ item }">
              <v-list-item @click="selectChat(item._id)">
                <v-list-item-content>
                  <v-list-item-title class="text-wrap">
                    <v-avatar size="50" v-if="item.user.profileImage">
                      <v-img :src="item.user.profileImage" height="100%" />
                    </v-avatar>
                    <v-avatar v-else color="grey" size="50">
                      <span class="white--text headline">
                        {{ item.user.username[0] }}</span
                      >
                    </v-avatar>
                    <strong class="pl-3">{{ item.user.username }}</strong>
                  </v-list-item-title>
                </v-list-item-content>
              </v-list-item>
              <v-divider />
            </template>
          </v-virtual-scroll>
        </v-card>
      </v-col>
      <v-col cols="12" md="9" sm="12"
        ><chat
          :chatId="chatId"
          :socket="socket"
          :oppUsername="oppUsername"
          v-if="chatId"
        />
        <v-card class="my-5 mx-5 pa-5" v-else>No chat selected</v-card></v-col
      >
    </v-row>
  </v-container>
</template>
<style>
@media (max-width: 959px) {
  #chatlist-scroll {
    min-height: 20vh !important;
    height: 15vh;
  }
}
</style>
<script>
import DataService from "../services/DataService"; //handling HTTP request (GET,POST,PUT,DELETE,...)
import chat from "../components/chat/chat.vue"; //using a child component chat to render the render interface
import io from "socket.io-client"; //import socketio for real-time chat
import dotenv from "dotenv";
import authHeader from "../services/auth-header";
dotenv.config();

export default {
  components: { chat }, //declare chat component
  data() {
    return {
      chats: [], //array for rendering chatlist
      chatId: null, //id for the chatroom
      oppId: null, //opponent id
      oppUsername: null, //oponent username
      //socket object
      socket: io(process.env.VUE_APP_DOMAIN_URL, {
        transports: ["websocket", "polling", "flashsocket"], //allows CORS
        withCredentials: true, //allows CORS
        extraHeaders: {
          "my-custom-header": "urge", //customize the header
        },
      }),
    };
  },

  created() {
    //fetching the chatlist
    this.fetchChatList();
    //We enter this page with params (clicking the user to start chat instead of clicking the chat function)
    if (this.$route.params.chatId !== undefined) {
      //get the chatId and the opponent username
      this.chatId = this.$route.params.chatId;
      this.oppUsername = this.$route.params.oppUsername;
    }
  },

  computed: {
    currentUser() {
      //store current user
      return this.$store.state.auth.user;
    },
  },

  watch: {
    //watch/monitor the change of the chatID and condiotnal render different chat on the right
    chatId() {
      this.selectChat(this.chatId);
    },
  },

  methods: {
    //fetch all chatlist to  be shown on the list on the left
    fetchChatList() {
      //get all chat of the current users in the database
      DataService.getAllChats(this.currentUser.user_id, {
        headers: authHeader(),
      })
        .then((response) => {
          const rawData = response.data;
          //put each chat info into chatlist array
          rawData.forEach((element) => {
            //there are userA and userB, either one will be the opponent user
            if (element.userA._id == this.currentUser.user_id) {
              this.chats.push({ user: element.userB, _id: element._id });
            } else {
              this.chats.push({ user: element.userA, _id: element._id });
            }
          });
        })
        .catch((err) => {
          // Prompt error and alert messages
          if (err.response.status == 401 || err.response.status == 403) {
            alert("Please Login again");
            this.$store.dispatch("auth/signout");
            this.$router.push("/home").catch(() => {});
          } else if (err.response.status == 400) {
            alert(err.response.data.message);
          }
        });
    },

    //triggered when user select another chat
    selectChat(id) {
      //old chatID become the current chatID
      let oldChatId = this.chatId;
      //current chatID become the newly select chatID
      this.chatId = id;

      this.chats.forEach((element) => {
        //match the corresponding chatID in the chatist for changing the chat view on the right
        if (element._id == this.chatId) {
          this.oppId = element.user._id;
          this.oppUsername = element.user.username;
        }
      });
      //emit an event to backend to join the room
      this.socket.emit("joinRoom", {
        chatId: this.chatId,
        oldChatId: oldChatId,
        sender: this.currentUser.username,
      });
    },
  },
};
</script>
