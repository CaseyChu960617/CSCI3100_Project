<template>
  <v-container fluid class="pa-0">
    <v-row no-gutters>
      <v-col mt="5" md="3" class="hidden-sm-and-down my-5 px-5">
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

<script>
import DataService from "../services/DataService";
import chat from "../components/chat/chat.vue";
import io from "socket.io-client";
//import authHeader from "../services/auth-header.js";

export default {
  components: { chat },
  //props: ["chatId"],
  data() {
    return {
      chats: [],
      loading: true,
      chatId: null,
      oppId: null,
      oppUsername: null,
      //oppID: this.$route.params.oppId,
      // newMessage: null,
      // messages: [],
      //make connection to socket io
      socket: io("http://localhost:9000", {
        transports: ["websocket", "polling", "flashsocket"],
        withCredentials: true,
        extraHeaders: {
          "my-custom-header": "abcd",
        },
      }),
    };
  },

  created() {
    this.fetchChatList();
    if (this.$route.params.chatId !== undefined) {
      this.chatId = this.$route.params.chatId;
      this.oppUsername = this.$route.params.oppUsername;
    }
  },

  computed: {
    currentUser() {
      return this.$store.state.auth.user;
    },
    items() {
      return Array.from({ length: 20 }, (k, v) => v + 1);
    },
  },

  watch: {
    chatId() {
      console.log("Updated chatId: " + this.chatId);
      this.selectChat(this.chatId);
    },
  },

  methods: {
    fetchChatList() {
      this.loading = true;
      DataService.get("chat/getAllChats", this.currentUser.user_id)
        .then((response) => {
          const rawData = response.data;

          rawData.forEach((element) => {
            if (element.userA._id == this.$store.state.auth.user.user_id) {
              this.chats.push({ user: element.userB, _id: element._id });
            } else {
              this.chats.push({ user: element.userA, _id: element._id });
            }
          });
          this.loading = false;
        })
        .catch((err) => {
          console.log(err);
          if (err.response.status == 401 || err.response.status == 403) {
            alert("Please Login again");
            this.$router.push("/home");
          } else {
            alert(err.response.data.message);
          }
        });
    },

    selectChat(id) {
      let oldChatId = this.chatId;
      this.chatId = id;

      this.chats.forEach((element) => {
        if (element._id == this.chatId) {
          this.oppId = element.user._id;
          this.oppUsername = element.user.username;
        }
      });
      this.socket.emit("joinRoom", {
        chatId: this.chatId,
        oldChatId: oldChatId,
        sender: this.currentUser.username,
      });
    },
  },
};
</script>
