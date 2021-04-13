<template>
  <v-container>
    <v-container>
      <v-title>
        <v-text-field label="Title" v-model="chapter.title"></v-text-field>
      </v-title>
      Edit below:
      <!-- <v-card class="pa-5" v-html="chapter.content"> </v-card>-->
    </v-container>
    <v-container>
      <template
        ><ckeditor
          :editor="editor"
          v-model="chapter.content"
          :config="editorConfig"
        ></ckeditor
      ></template> </v-container></v-container
></template>

<script>
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
import CKEditor from "@ckeditor/ckeditor5-vue2";
import DataService from "../../services/DataService";
import MathType from "@wiris/mathtype-ckeditor5";
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
      editorConfig: {},
    };
  },

  created() {
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
          console.log("Data is ", rawData);
          this.chapter = rawData;
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
