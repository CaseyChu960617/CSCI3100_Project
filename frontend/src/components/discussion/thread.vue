<template>
  <v-container v-if="thread" fluid class="pa-0">
    <v-app-bar>
      <v-app-bar-title>
        {{ thread.title }}
      </v-app-bar-title>
    </v-app-bar>

    <v-virtual-scroll
      bench="100"
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
          ><v-divider class="mt-2" />
          <v-card-text v-html="item.content"></v-card-text>
        </v-card>
      </template>
    </v-virtual-scroll>
  </v-container>
  <v-container v-else fluid class="pa-0">
    <v-card-text class="title text-center"
      >Have not selected any thread</v-card-text
    >
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
import dotenv from "dotenv";
dotenv.config();
export default {
  props: ["thread", "loading"],
  data() {
    return { tmpThread: { commnets: [] } };
  },
  created() {
    if (this.thread) {
      this.appendThread();
    }
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

    enableVideo() {
      document.querySelectorAll("oembed[url]").forEach((element) => {
        window.iframely.load(element, element.attributes.url.value);
      });
    },

    updated() {
      this.enableVideo();
    },
  },

  mounted() {
    const plugin = document.createElement("script");
    plugin.setAttribute(
      "src",
      `//cdn.iframe.ly/embed.js?api_key=${process.env.VUE_APP_IFRAMELY_API_KEY}`
    );
    plugin.async = true;
    document.head.appendChild(plugin);
    console.log("plugin is ", plugin);
  },
  updated() {
    this.enableVideo();
  },
};
</script>
