<template>
  <v-container fluid class="pa-0">
    <v-toolbar
      :scroll-off-screen="true"
      :scroll-target="'#scrolling-techniques'"
      style="background:#eee;"
    >
      <v-layout>
        <v-toolbar-title>
          <a class="navbar-item">
            Your are editing {{ this.tutorial.title }}
          </a>
        </v-toolbar-title>
      </v-layout>
    </v-toolbar>
    <div>
      <v-row class="ml-2 mt-2">
        <v-col mt="5" md="3" class="hidden-sm-and-down mt-5">
          <div class="pa-5">Edit tutorial information</div>
          <v-divider />
          <v-virtual-scroll
            v-if="chapters.length != 0"
            bench="25"
            min-height="74vh"
            max-height="74vh"
            item-height="70"
            :items="chapters"
          >
            <template v-slot:default="{ item }">
              <v-list-item @click="selectChat(item._id)">
                <v-list-item-content>
                  <v-list-item-title class="text-wrap">
                    <strong>{{ item.user.username }}</strong>
                  </v-list-item-title>
                </v-list-item-content>
              </v-list-item>

              <v-divider />
            </template>
          </v-virtual-scroll>
          <v-card v-else> no tutorial fuck you</v-card>
          <v-btn
            id="main-btn"
            slot="activator"
            v-model="fab"
            color="#99CFEA"
            dark
            fab
            @click="createChapter"
          >
            <v-icon color="black">mdi-plus</v-icon>
          </v-btn>
        </v-col>
        <v-col>
          <editChapter />
        </v-col>
      </v-row>
    </div>
  </v-container>
</template>

<style></style>

<script>
//import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
//import CKEditor from "@ckeditor/ckeditor5-vue2";
import DataService from "../services/DataService";
//import editChapter from "../components/tutorial/editChapter.vue";
import editChapter from "../components/tutorial/editChapter.vue";
export default {
  components: {
    editChapter,
  },
  data() {
    return {
      tutorial: null, //the whole returned object from tutorial
      chapters: [],
      //editor: ClassicEditor,
      editorData: "fuck",
    };
  },

  computed: {
    currentUser() {
      return this.$store.state.auth.user;
    },
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
        console.log("fuck");
        //console.log(response.data);
        const rawData = response.data;
        //this.title = rawData.title;
        this.tutorial = rawData;
        console.log("Chapter is ", this.chapters);
      });
    },

    fetchChapter() {},

    createChapter() {
      const data = {
        tutorial_id: this.tutorial._id,
        title: "321",
        content: "123",
      };
      //console.log(data);
      DataService.post("tutorial/createChapter", data).then((response) => {
        console.log(response.data);
        //console.log(this.chapter);
      });
    },
  },
};
</script>
