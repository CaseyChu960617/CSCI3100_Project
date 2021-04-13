<template>
  <v-container
    ><v-container>
      Preview:
      <v-card class="pa-5" v-html="editorData"> {{ this.content }}</v-card>
    </v-container>
    <v-container>
      <ckeditor
        :editor="editor"
        v-model="editorData"
      ></ckeditor> </v-container></v-container
></template>

<script>
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
import CKEditor from "@ckeditor/ckeditor5-vue2";
import DataService from "../../services/DataService";

export default {
  props: ["chapterId"],
  components: {
    // Use the <ckeditor> component in this view.
    ckeditor: CKEditor.component,
    //editchapter,
  },
  data() {
    return {
      title: null,
      chapter: [],
      editor: ClassicEditor,
      editorData: "fuck",
      content: null,
    };
  },
  created() {
    //console.log(this.$route.params.tutorialId);
    console.log("in editChapter, ", this.chapterId);
    this.fetchOneChapter();
  },
  methods: {
    fetchOneChapter() {
      //console.log(this.$route.params.tutorialId);
      console.log(this.chapterId);
      DataService.get("tutorial/getOneChapter", this.chapterId).then(
        (response) => {
          //console.log(response.data);
          const rawData = response.data;
          console.log("Data is ", rawData.content);
          this.content = rawData.content;
        }
      );
    },
  },
  watch: {
    chapterId() {
      this.fetchOneChapter();
    },
  },
  destroyed() {
    //alert("fuck");
  },
};
</script>
