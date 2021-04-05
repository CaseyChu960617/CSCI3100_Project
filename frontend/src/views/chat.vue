<template>
  <v-container fluid class="pa-0">
    <v-card
      style="max-width:1200px; height:500px;overflow-y: scroll; width: 100%; padding: 12px;"
      class="scroll-bar blue-grey lighten-5 ml-auto mr-auto"
      elevation="16"
      v-bind:style="messages.length == 0 ? 'display:flex' : ''"
      ><!--max-width:400px;-->

      <v-container
        v-if="messages.length == 0"
        align="center"
        justify="center"
        style=" align-self: center;
    text-align: center"
        ;
      >
        展開激情對話
      </v-container>

      <v-row justify="space-around d-flex flex-column">
        <v-card v-for="message in messages" :key="message.time" flat>
          <v-list-item
            :key="message.time"
            v-if="!message.sender.localeCompare(currentUser.username)"
            class="blue-grey lighten-5 "
          >
            <v-list-item-avatar class="align-self-start mr-2">
              <v-avatar size="40">
                <v-img src="https://via.placeholder.com/50"></v-img>
              </v-avatar>
            </v-list-item-avatar>
            <v-list-item-content class="received-message">
              <v-card color="#99CFEA" class="flex-none">
                <v-card-text class="white--text pa-2 d-flex flex-column">
                  <span class="text-caption"
                    >{{ message.sender }} {{ currentUser.username }}</span
                  >
                  <span class="align-self-start text-subtitle-1">{{
                    message.message
                  }}</span>
                  <span class="text-caption font-italic align-self-end">{{
                    message.time
                  }}</span>
                </v-card-text>
              </v-card>
            </v-list-item-content>
          </v-list-item>
          <v-list-item v-else :key="message.time">
            <v-list-item-content class="sent-message justify-end">
              <v-card color="primary" class="flex-none">
                <v-card-text class="white--text pa-2 d-flex flex-column">
                  <span class="text-subtitle-1 chat-message">{{
                    message.message
                  }}</span>
                  <span class="text-caption font-italic align-self-start">{{
                    message.time
                  }}</span>
                </v-card-text>
              </v-card>
            </v-list-item-content>
            <v-list-item-avatar class="align-self-start ml-2">
              <v-img src="https://via.placeholder.com/50"></v-img>
            </v-list-item-avatar>
          </v-list-item>
        </v-card>
      </v-row>
    </v-card>
    <!--<ul class="list-group list-group-flush ">-->
    <!--<small class="text-white">{{ currentUser.username }} is typing</small>
        <li
          class="list-group-item"
          v-for="(message, index) in messages"
          v-bind:key="index"
        >
          <span>
            {{ message.user }}
            <small>:{{ message.message }}</small>
          </span>
        </li>
        </ul>-->
    <!--  <v-virtual-scroll :items="messages" height="300" item-height="64">
        <template v-slot:default="{ item }">
          <v-list-item :key="item">
            <v-list-item-action>
              <v-btn fab small depressed color="primary"> </v-btn>
            </v-list-item-action>

            <v-list-item-content>
              <v-list-item-title>
                {{ item.message }}
              </v-list-item-title>
            </v-list-item-content>

            <v-list-item-action>
              <v-icon small>
                {{ item.user }}
              </v-icon>
            </v-list-item-action>
          </v-list-item>

          <v-divider></v-divider>
        </template>
      </v-virtual-scroll>-->

    <v-card
      style="max-width:1200px; width: 100%; padding: 12px;margin-right: auto;margin-left: auto; "
      class="scroll-bar blue-grey lighten-5 nl-auto mr-auto"
      elevation="16"
    >
      <form @submit.prevent="send">
        <div>
          <v-row>
            <v-col>
              <v-text-field
                type="text"
                class="form control mx-2"
                v-model="newMessage"
                label="展開激情對話"
              ></v-text-field>
            </v-col>
            <v-btn
              class=" mr-4"
              elevation="2"
              color="primary"
              v-on:click="send"
              justify="center"
              align="center"
              style="text-align:center;display:inline;    align-self: center;
"
              >Send</v-btn
            >
          </v-row>
        </div>
      </form>
    </v-card>
  </v-container>
</template>

<script>
import io from "socket.io-client";
//import DataService from "../services/DataService";

export default {
  computed: {
    currentUser() {
      return this.$store.state.auth.user;
    },
  },

  data() {
    return {
      oppID: this.$route.params.oppId,
      newMessage: null,
      messages: [],
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

  methods: {
    send() {
      console.log(this.socket);
      if (this.newMessage != null) {
        this.socket.emit("send", {
          sender: this.currentUser.username,
          message: this.newMessage,
          time: new Date(),
        });
      }
    },
  },
  mounted() {
    console.log("oppID is in chat.vue ", this.oppId);
    this.socket.emit("joinRoom", {
      id: this.socket.id,
    });

    this.socket.on("clientGetId", (data) => {
      console.log("Created " + data.socketID + " Room");
    });

    this.socket.on("updateMessage", (data) => {
      //pushed to daatbsae

      this.messages = [...this.messages, data];
      console.log(this.messages);
      this.newMessage = null;
    });
  },
  updated() {
    //scroll to bottom after the chat is sent or updated
    const scrollbar = document.querySelector(".scroll-bar");
    scrollbar.scrollTo(0, scrollbar.scrollHeight);
  },
};
</script>
