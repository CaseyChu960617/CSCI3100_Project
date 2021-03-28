<template>
  <v-container fluid class="pa-0">
    <div>
      <button v-on:click="send">Send</button>
    </div>
    <div>
      <button v-on:click="receive">receive</button>
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
      alert("fuck");
      this.socket.emit("send", {
        user: "Kenny",
        message: "Hi",
      });
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
    });
  },
};
</script>
