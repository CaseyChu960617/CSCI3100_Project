<template>
  <v-container fluid class="pa-0">
    <div>
      <p>Username: {{ currentUser.username }}</p>

      <v-container
        style="max-width:1200px; height:500px;overflow-y: scroll;"
        class="scroll-bar"
        ><!--max-width:400px;-->

        <v-row justify="space-around d-flex flex-column">
          <v-card v-for="message in messages" :key="message.time" flat>
            <v-list-item
              :key="message.time"
              v-if="message.from != 'You'"
              class=""
            >
              <v-list-item-avatar class="align-self-start mr-2">
                <v-avatar size="40">
                  <v-img src="https://via.placeholder.com/50"></v-img>
                </v-avatar>
              </v-list-item-avatar>
              <v-list-item-content class="received-message">
                <v-card color="success" class="flex-none">
                  <v-card-text class="white--text pa-2 d-flex flex-column">
                    <span class="text-caption">{{ message.user }} </span>
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
      </v-container>
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

      <div>
        <form @submit.prevent="send">
          <div>
            <input
              type="text"
              class="form control"
              v-model="newMessage"
              placeholder="Enter message here"
            />
          </div>
        </form>
      </div>

      <button v-on:click="send">Send</button>
    </div>
    <div></div>
  </v-container>
</template>

<script>
import io from "socket.io-client";

export default {
  computed: {
    currentUser() {
      return this.$store.state.auth.user;
    },
  },

  data() {
    return {
      newMessage: null,
      messages: [],
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
          user: this.currentUser.username,
          message: this.newMessage,
          time: new Date(),
        });
      }
    },
  },
  mounted() {
    this.socket.on("recieve", (data) => {
      this.messages = [...this.messages, data];
      console.log(this.messages);
      this.newMessage = null;
    });
  },
  updated() {
    const scrollbar = document.querySelector(".scroll-bar");
    scrollbar.scrollTo(0, scrollbar.scrollHeight);
  },
};
</script>
