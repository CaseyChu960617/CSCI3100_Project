<template>
  <v-container fluid class="pa-0">
    <v-toolbar
      :scroll-off-screen="true"
      :scroll-target="'#scrolling-techniques'"
      style="background:#eee;"
      height="100px"
    >
      <v-layout>
        <v-toolbar-title>
          <div>
            {{ this.subjects[this.tutorial.subject - 1]["text"] }}
          </div>
          <div class="navbar-item">
            <strong> {{ this.tutorial.title }} </strong>
          </div>
        </v-toolbar-title>
      </v-layout>
    </v-toolbar>
    <v-row>
      <v-col md="3">
        <v-card elevation="8" class="ma-4" height="65vh">
          <v-card-title> Chapters </v-card-title>
          <v-virtual-scroll
            v-if="chapters.length != 0"
            bench="25"
            min-height="74vh"
            max-height="74vh"
            item-height="80px"
            :items="this.tutorial.chapters"
          >
            <template v-slot:default="{ item }">
              <v-list-item @click="selectChapter(item._id)">
                <v-list-item-content>
                  <v-list-item-title class="text-wrap">
                    <strong>{{ item.title }}</strong>
                  </v-list-item-title>
                </v-list-item-content>
              </v-list-item>
            </template>
          </v-virtual-scroll>
        </v-card>
      </v-col>
      <v-col md="9">
        <v-card v-if="viewtutorial" elevation="8" class="ma-4" height="65vh">
          <div class="tutorial-header">
            {{ this.tutorial.title }}
            <span class="course-code">
              {{ this.subjects[this.tutorial.subject - 1]["code"] }}
            </span>
          </div>
          <v-divider class="mx-4"></v-divider>
          <div class="d-flex flex-column justify-space-between align-center">
            <v-img
              v-if="!noThumbnail"
              :src="thumbnail"
              class="justify-center"
              max-height="300px"
            />
            <v-img
              v-else
              src="../assets/Homepage/1.jpg"
              class="justify-center"
              max-height="300px"
            />
          </div>
          <v-card-title>
            Description
          </v-card-title>
          <v-divider class="mx-4"></v-divider>
          <v-card-text class="des">
            {{ this.tutorial.description }}
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>
<style>
.tutorial-header {
  display: relative !important;
  align-items: center;
  flex-wrap: wrap;
  font-size: 1.25rem;
  font-weight: 500;
  letter-spacing: 0.0125em;
  line-height: 2rem;
  word-break: break-all;
  padding: 16px;
}
.course-code {
  float: right;
}
.des {
  overflow-y: hidden;
}
</style>
<script>
import DataService from "../services/DataService";
import subjectsList from "../assets/subjects.json";
import viewChapter from "..//viewChapter.vue";

export default {
  components: {},
  data() {
    return {
      subjects: subjectsList,
      tutorial: null, //the whole returned object from tutorial
      chapters: [],
      currentChapter: null,
      currentChapterId: null,
      noThumbnail: true,
      viewtutorial: 1,
    };
  },

  computed: {
    currentUser() {
      return this.$store.state.auth.user;
    },
  },

  created() {
    this.fetchTutorial();
  },
  methods: {
    fetchTutorial() {
      DataService.get(
        "tutorial/getOneTutorial",
        this.$route.params.tutorial_id
      ).then((response) => {
        this.tutorial = response.data;
        this.chapters = response.data.chapters;
        console.log(this.tutorial);
        if (this.tutorial == "") this.noThumbnail = true;
        console.log(this.chapters);
      });
    },

    selectChapter(chapter_id) {
      this.fetchOneChapter(chapter_id);
    },

    fetchOneChapter(chapter_id) {
      DataService.get("tutorial/getOneChapter", chapter_id).then((response) => {
        this.content = response.data.content;
      });
    },

    fetchAllChapter(chapter_id) {
      DataService.get("tutorial/getOneChapter", chapter_id).then((response) => {
        this.content = response.data.content;
      });
    },
  },
};
</script>
