<template>
  <v-container v-if="thread" fluid class="pa-0">
    <v-app-bar>
      <v-app-bar-title>
        {{ thread.title }}
      </v-app-bar-title>
    </v-app-bar>

    <v-virtual-scroll
      v-if="thread"
      :bench="tmpThread.comments.length"
      :height="height"
      item-height="65"
      :items="tmpThread.comments"
    >
      <template v-slot:default="{ item }">
        <v-card outlined elevation="8" height="100%" class="ma-2 pt-4">
          <router-link
            class="pl-4"
            :to="{ name: 'profile', params: { user_id: item._id } }"
            >{{ item.author.username }}</router-link
          >
          <v-card-text v-html="item.content"></v-card-text>
        </v-card>
      </template>
    </v-virtual-scroll>
  </v-container>
  <v-container v-else fluid class="pa-0">
    <v-card tile elevation="16" outlined :height="height">
      <v-card-text>have not selected any thread</v-card-text>
    </v-card>
  </v-container>
</template>
<style>
/* .thread-content { */
/* overflow-y: scroll;
  height: 78vh; */
/* min-height: 65vh; */
/* max-height: 500px; */
/* } */

img {
  max-width: 600px;
}

.iframely-responsive > * {
  top: 0;
  left: 0;
  max-width: 622.2px;
  max-height: 350px;
  position: absolute;
  border: 0;
}
</style>

<script>
//import DataService from "../../services/DataService";

export default {
  props: ["thread", "loading"],
  data() {
    return { tmpThread: null };
  },
  created() {
    this.appendThread();
  },
  watch: {
    thread() {
      this.appendThread();
    },
  },
  computed: {
    height() {
      return window.innerHeight - 200 - 65;
    },
    threadLength() {
      return this.tmpThread.comments.length;
    },
  },
  methods: {
    appendThread() {
      this.tmpThread = JSON.parse(JSON.stringify(this.thread));
      this.tmpThread.comments.unshift({
        _id: this.thread._id,
        author: this.thread.author,
        content: this.thread.content,
        createdAt: this.thread.createdAt,
      });
    },
  },
};
</script>
