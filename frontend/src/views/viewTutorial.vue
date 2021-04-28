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
          <div id="subject-fullname">
            {{ this.subjects[this.tutorial.subject - 1]["text"] }}
          </div>
          <div class="navbar-item">
            <strong> {{ this.tutorial.title }} </strong>
          </div>
        </v-toolbar-title>

        <v-toolbar-title class="author pa-4">
          <router-link
            :to="{ name: 'profile', params: { user_id: this.author._id } }"
          >
            <v-avatar
              class="avatar mr-2"
              v-if="this.author.profileImage"
              style="cursor: pointer"
            >
              <v-img :src="this.author.profileImage" height="100%" />
            </v-avatar>
            <v-avatar
              class="avatar mr-2"
              v-else
              color="grey"
              size="45"
              style="cursor: pointer"
            >
              <span class="white--text headline">
                {{ this.author.username[0] }}</span
              >
            </v-avatar>
            <span id="author-name">
              Author:
              {{ this.author.username }}</span
            >
          </router-link>
        </v-toolbar-title>
      </v-layout>
    </v-toolbar>
    <v-row>
      <v-col lg="3" md="12" sm="12">
        <div class="show-chapters ma-4" elevation="8" min-height="65vh">
          <v-card-title> Chapters </v-card-title>
          <v-virtual-scroll
            v-if="chapters.length != 0"
            bench="25"
            min-height="74vh"
            max-height="74vh"
            item-height="80px"
            :items="this.tutorial.chapters"
            id="view-tutorial-scroll"
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
      <v-col lg="9" md="12" sm="12">
        <v-card v-if="viewTutorial" elevation="8" class="ma-4 view-tut-card">
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
                width="600px"
                v-if="tutorial.thumbnail"
                :src="tutorial.thumbnail"
              ></v-img>
              <v-img
                width="600px"
                v-else
                src="../assets/Homepage/1.jpg"
              ></v-img>
            </div>

            <v-card-title>
              Description
            </v-card-title>
            <v-divider class="mx-4"></v-divider>
            <v-card-text class="des tut-des">
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
.iframely-embed {
  height: 360px;
}
.author {
  position: absolute;
  right: 16px;
  bottom: 12px;
  border: solid 0.5px 0.5px 0.5px 0.5px;
  border-radius: 10px;
}
.avatar {
  font-family: "Roboto", sans-serif;
}
.v-virtual-scroll::-webkit-scrollbar {
  display: none !important;
}

.author:hover {
  background: #dedbdb;
}
.author > a {
  color: black !important;
  text-decoration: none !important;
}
@media (max-width: 970px) {
  #author-name {
    display: none;
  }
  #subject-fullname {
    display: none;
  }
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
@media (max-width: 1263px) {
  #view-tutorial-scroll {
    min-height: 20vh !important;
    height: 15vh;
  }
}
#view-tutorial-scroll > div {
  height: 250px !important;
}
.view-tut-card {
  overflow-y: scroll;
}
.view-tut-card::-webkit-scrollbar {
  display: none !important;
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
import DataService from "../services/DataService"; //handling HTTP request (GET,POST,PUT,DELETE,...)
import subjectsList from "../assets/subjects.json"; //import a json object from a json file stored CUHK subject list
import viewChapter from "../components/tutorial/viewChapter"; //using a child component to view chapter on the same page

export default {
  components: { viewChapter }, //declare viewchapter component
  data() {
    return {
      author: null,
      subjects: subjectsList, //subjectList from subjects.json
      tutorial: null, //the whole returned object from tutorial
      chapters: [],
      selectedId: null,
      noThumbnail: true,
      viewTutorial: 1,
    };
  },

  computed: {
    currentUser() {
      //store the current user data
      return this.$store.state.auth.user;
    },
  },

  created() {
    //fetch the tutorial when enter this page
    this.fetchTutorial();
  },
  methods: {
    //fetch the tutorial
    fetchTutorial() {
      //get request
      DataService.get(
        "tutorial/getOneTutorial",
        this.$route.params.tutorial_id
      ).then((response) => {
        //get the tutorial content
        this.tutorial = response.data;
        this.chapters = response.data.chapters;
        if (this.tutorial == "") this.noThumbnail = true;
        this.author = this.tutorial.author;
      });
    },

    //function that change indicator variables for conditional rendering
    selectChapter(chapter_id, viewTutorial) {
      if (viewTutorial === 0) {
        //user is switching view from tutorial metaData to chapter
        this.viewTutorial = 0;
        //set the selected chapter id for condional rendering
        this.selectedId = chapter_id;
      } else {
        //user is switching view from to chapter tutorial metaData
        this.viewTutorial = 1;
      }
    },

    //fetching one chapter from the database
    fetchOneChapter(chapter_id) {
      DataService.get("tutorial/getOneChapter", chapter_id).then((response) => {
        //get the chapter content
        this.content = response.data.content;
      });
    },

    //fetching all chapter from the database
    fetchAllChapter(chapter_id) {
      DataService.get("tutorial/getOneChapter", chapter_id).then((response) => {
        //get the chapter content
        this.content = response.data.content;
      });
    },
  },
};
</script>
