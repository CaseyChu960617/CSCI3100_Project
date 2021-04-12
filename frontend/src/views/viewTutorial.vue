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
            {{ this.tutorial.subject }}
          </div>
          <div class="navbar-item">
            <strong> {{ this.tutorial.title }} </strong>
          </div>
        </v-toolbar-title>
      </v-layout>
    </v-toolbar>
    <v-row>
      <v-col md="3">
        <v-card elevation="8" class="ma-4">
          <v-virtual-scroll
            v-if="chapters.length != 0"
            bench="25"
            min-height="74vh"
            max-height="74vh"
            item-height="70"
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
        <v-card elevation="8" class="ma-4" height="74vh">
          {{ this.content }}
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>
<script>
import DataService from "../services/DataService";
import subjectsList from "../assets/subjects.json";

export default {
  components: {},
  data() {
    return {
      subjects: subjectsList,
      tutorial: null, //the whole returned object from tutorial
      chapters: [],
      content: null,
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
        this.tutorial.subject = this.subjects[this.tutorial.subject - 1][
          "text"
        ];
        console.log(this.tutorial);
        console.log(this.chapters);
      });
    },

    selectChapter(chapter_id) {
      //this.content =
      console.log(chapter_id);
      this.fetchOneChapter(chapter_id);
    },

    fetchOneChapter(chapter_id) {
      DataService.get("tutorial/getOneChapter", chapter_id).then((response) => {
        this.content = response.data.content;
      });
    },
  },
};
</script>
