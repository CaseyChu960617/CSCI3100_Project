<template>
  <v-card elevation="8" class="ma-4" id="view-chapter-card">
    <v-card-title>{{ this.chapter.title }}</v-card-title>
    <v-divider class="mx-4"></v-divider>
    <v-card-text
      class="chapter-content pa-5"
      v-html="chapter.content"
    ></v-card-text>
  </v-card>
</template>
<style>
#view-chapter-card {
  flex-basis: 0;
}
.chapter-content {
  overflow-y: scroll;
  height: 78vh;
  /*min-height: 65vh;
  max-height: 500px;*/
}

img {
  max-width: 600px;
}

.iframely-responsive {
  top: 0;
  left: 0;
  max-width: 622.2px;
  max-height: 350px;
  position: relative;
  padding-bottom: 56.25%;
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
import dotenv from "dotenv";
dotenv.config();
import DataService from "../../services/DataService";
export default {
  props: ["chapterId"],

  data() {
    return {
      chapter: null,
    };
  },
  created() {
    console.log("in editChapter, ", this.chapterId);
    this.fetchOneChapter();
  },
  methods: {
    fetchOneChapter() {
      DataService.get("tutorial/getOneChapter", this.chapterId).then(
        (response) => {
          this.chapter = response.data;
        }
      );
    },
    enableVideo() {
      document.querySelectorAll("oembed[url]").forEach((element) => {
        window.iframely.load(element, element.attributes.url.value);
      });
    },
  },
  watch: {
    chapterId() {
      this.fetchOneChapter();
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
