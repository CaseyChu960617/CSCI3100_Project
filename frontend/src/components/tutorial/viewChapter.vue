<template>
  <v-card v-else elevation="8" class="ma-4" height="65vh"> </v-card>
</template>
<script>
export default {
  props: ["chapterId"],
  components: {
    // Use the <ckeditor> component in this view.
    // ckeditor: CKEditor.component,
    //editchapter,
  },

  data() {
    return {
      chapter: null,
    };
  },
  created() {
    console.log("in editChapter, ", this.chapterId);
    this.fetchOneChapter();
    //ClassicEditor.create(document.querySelector("#editor"), {
    //  plugins: [], // <--- MODIFIED
    //  toolbar: ["bold", "italic"], // <--- MODIFIED
    //
    //
    //})
    //  .then((editor) => {
    //    console.log("Editor was initialized", editor);
    //  })
    //  .catch((error) => {
    //    console.error(error.stack);
    //  });
  },
  methods: {
    fetchOneChapter() {
      //console.log(this.$route.params.tutorialId);
      // console.log(this.chapterId);
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
      //alert(this.editor);
      //console.log(this.editor);
    },

    save() {
      const data = {
        chapter_id: this.chapterId,
        title: this.chapter.title,
        content: this.chapter.content,
      };

      DataService.put("tutorial/editChapter", data).then((response) => {
        console.log(response);
        DataService.get("tutorial/getOneChapter", this.chapterId).then(
          (response) => {
            this.chapter = response.data;
            alert("Edit chapter successfully.");
            this.$emit("fetchTutorial");
          }
        );
      });
    },
  },
  watch: {
    chapterId() {
      this.fetchOneChapter();
    },
    //"chapter.content"() {
    //  console.log("change");
    //  document.querySelectorAll("oembed[url]").forEach((element) => {
    //    console.log("element ", element);
    //    alert(this.editor);
    //    window.iframely.load(element, element.attributes.url.value);
    //  });
    //},
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

  //uploader(editor) {
  //  this.editor.plugins.get("FileRepository").createUploadAdapter = (
  //    loader
  //  ) => {
  //    return new UploadAdapter(loader);
  //  };
  //},
};
</script>
