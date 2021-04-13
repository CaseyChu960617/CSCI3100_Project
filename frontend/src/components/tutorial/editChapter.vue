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
        :error-messages="errors.content"
        :config="editorConfig"
      ></ckeditor> </v-container></v-container
></template>

<script>
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
import CKEditor from "@ckeditor/ckeditor5-vue2";
//import SimpleUploadAdapter from "@ckeditor/ckeditor5-upload/src/adapters/simpleuploadadapter";
import DataService from "../../services/DataService";
import UploadAdapter from "../../UploadAdapter";

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
      editorConfig: {
        toolbar: [
          "heading",
          "|",
          "bold",
          "italic",
          "link",
          "bulletedList",
          "numberedList",
          "|",
          "insertTable",
          "|",
          "imageUpload",
          "mediaEmbed",
          "|",
          "undo",
          "redo",
        ],
        table: {
          toolbar: ["tableColumn", "tableRow", "mergeTableCells"],
        },
        extraPlugins: [this.uploader],
      },
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

  uploader(editor) {
    editor.plugins.get("FileRepository").createUploadAdapter = (loader) => {
      return new UploadAdapter(loader);
    };
  },
};
</script>
