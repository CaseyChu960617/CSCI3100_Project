<template>
  <v-container fluid class="pa-0">
    <v-toolbar
      :scroll-off-screen="true"
      :scroll-target="'#scrolling-techniques'"
      style="background:#eee;"
    >
      <v-layout>
        <v-toolbar-title>
          <a class="navbar-item"> Your are editing {{ this.title }} </a>
        </v-toolbar-title>
      </v-layout>
    </v-toolbar>
    <editChapter />
  </v-container>
</template>

<script>
//import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
//import CKEditor from "@ckeditor/ckeditor5-vue2";
import DataService from "../services/DataService";
//import editChapter from "../components/tutorial/editChapter.vue";
import editChapter from "../components/tutorial/editChapter.vue";
export default {
  components: {
    // Use the <ckeditor> component in this view.
    //ckeditor: CKEditor.component,
    editChapter,
  },
  data() {
    return {
      title: null,
      chapter: [],
      //editor: ClassicEditor,
      editorData: "fuck",
    };
  },
  created() {
    console.log(this.$route.params.tutorialId);
    this.fetchTutorial();
  },
  methods: {
    fetchTutorial() {
      console.log(this.$route.params.tutorialId);
      DataService.get(
        "tutorial/getOneTutorial",
        this.$route.params.tutorialId
      ).then((response) => {
        console.log(response.data);
        const rawData = response.data;

        this.title = rawData.title;
      });
    },
  },
};
</script>
