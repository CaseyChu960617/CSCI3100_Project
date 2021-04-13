<template>
  <v-container fluid class="pa-0">
    <v-toolbar
      :scroll-off-screen="true"
      :scroll-target="'#scrolling-techniques'"
      style="background:#eee;"
      height="100px"
      class="meta"
      @click="selectChapter('null', 1)"
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
        <v-toolbar-title class="author">
          <v-btn
            v-if="currentUser.activation"
            :to="`/profile/` + currentUser.user_id"
            class="mr-4 ml-2 text-capitalize black--text"
            color="#757575"
            text
          >
            Author: {{ this.author.username
            }}<v-icon class="pl-3">mdi-account-cog</v-icon>
          </v-btn>
        </v-toolbar-title>
      </v-layout>
    </v-toolbar>
    <v-row>
      <v-col md="3">
        <div class="show-chapters ma-4" elevation="8" min-height="65vh">
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
              <v-list-item @click="selectChapter(item._id, 0)">
                <v-list-item-content>
                  <v-list-item-title class="text-wrap">
                    <strong>{{ item.title }}</strong>
                  </v-list-item-title>
                </v-list-item-content>
              </v-list-item>
            </template>
          </v-virtual-scroll>
        </div>
      </v-col>
      <v-col md="9">
        <v-card v-if="viewTutorial" elevation="8" class="ma-4">
          <div class="tutorial-header">
            {{ this.tutorial.title }}
            <span class="course-code">
              {{ this.subjects[this.tutorial.subject - 1]["code"] }}
            </span>
          </div>
          <v-divider class="mx-4"></v-divider>
          <v-card-text class="tutorial-content">
            <div class="d-flex flex-column justify-space-between align-center">
              <v-img
                max-height="300px"
                v-if="tutorial.thumbnail"
                :src="tutorial.thumbnail"
              ></v-img>
              <v-img
                max-height="300px"
                v-else
                src="../assets/Homepage/1.jpg"
              ></v-img>
            </div>

            <v-card-title>
              Description
            </v-card-title>
            <v-divider class="mx-4"></v-divider>
            <v-card-text class="des">
              {{ this.tutorial.description }}
            </v-card-text>
          </v-card-text>
        </v-card>
        <viewChapter v-else :chapterId="selectedId" />
      </v-col>
    </v-row>
  </v-container>
</template>
<style>
.author {
  position: absolute;
  right: 16px;
  bottom: 36px;
}
.meta {
  cursor: pointer;
}
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
.tutorial-content {
  height: 78vh;
}
.v-virtual-scroll__item {
  position: inherit !important;
}
.des {
  overflow-y: hidden;
}
</style>
<script>
import DataService from "../services/DataService";
import subjectsList from "../assets/subjects.json";
import viewChapter from "../components/tutorial/viewChapter";

export default {
  components: { viewChapter },
  data() {
    return {
      author: null,
      subjects: subjectsList,
      tutorial: null, //the whole returned object from tutorial
      chapters: [],
      selectedId: null,
      noThumbnail: true,
      viewTutorial: 1,
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
        //console.log(this.tutorial);
        if (this.tutorial == "") this.noThumbnail = true;
        //console.log(this.chapters);
        this.author = this.tutorial.author;
      });
    },

    selectChapter(chapter_id, viewTutorial) {
      if (viewTutorial === 0) {
        this.viewTutorial = 0;
        this.selectedId = chapter_id;
      } else {
        this.viewTutorial = 1;
      }
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
