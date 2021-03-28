<template>
  <v-container fluid class="pa-0">
    <div>
      <p>Username: {{ currentUser.username }}</p>
      <ul class="list-group list-group-flush ">
        <small class="text-white">{{ currentUser.username }} is typing</small>
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
      </ul>
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
        });
      }
    },

    receive() {
      this.socket.on("receive", (data) => {
        console.log(data.message);
      });
    },
  },
  mounted() {
    this.socket.on("recieve", (data) => {
      this.messages = [...this.messages, data];
      console.log(this.messages);
      this.newMessage = null;
    });
  },
};
</script>
