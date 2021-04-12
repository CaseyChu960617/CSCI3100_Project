<template>
  <v-container
    ><v-container>
      Preview:
      <v-card class="pa-5" v-html="editorData"> {{ editorData }}</v-card>
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
    };
  },
  created() {
    //console.log(this.$route.params.tutorialId);
    this.fetchTutorial();
  },
  methods: {
    fetchTutorial() {
      //console.log(this.$route.params.tutorialId);
      DataService.get(
        "tutorial/getOneTutorial",
        this.$route.params.tutorialId
      ).then((response) => {
        //console.log(response.data);
        const rawData = response.data;

        this.title = rawData.title;
      });
    },
  },
};
</script>
