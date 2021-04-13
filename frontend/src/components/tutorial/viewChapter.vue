<template>
  <v-card elevation="8" class="ma-4" height="65vh">
    <v-card-title>{{ this.chapter.title }}</v-card-title>
    <v-card-text> {{ this.chapter.content }}</v-card-text>
  </v-card>
</template>
<script>
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
    EnableVideo() {
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
      "//cdn.iframe.ly/embed.js?api_key=48f28ce86bc9c78e94f884"
    );
    plugin.async = true;
    document.head.appendChild(plugin);
    console.log("plugin is ", plugin);
  },
};
</script>
