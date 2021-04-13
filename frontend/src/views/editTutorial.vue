<template>
  <v-container fluid class="pa-0">
    <v-toolbar
      :scroll-off-screen="true"
      :scroll-target="'#scrolling-techniques'"
      style="background:#eee;"
    >
      <v-layout>
        <v-title>
          <a class="navbar-item">
            Your are editing {{ this.tutorial.title }}
          </a>
        </v-title>
      </v-layout>
    </v-toolbar>
    <div>
      <v-row class="ml-2 mt-2">
        <v-col mt="5" md="3" class="hidden-sm-and-down mt-5">
          <div class="pa-5" @click="changeEdit(tutorial._id, 1)">
            Edit tutorial information
          </div>
          <v-divider />
          <v-virtual-scroll
            v-if="chapters.length != 0"
            bench="25"
            min-height="74vh"
            max-height="74vh"
            item-height="70"
            :items="tutorial.chapters"
          >
            <template v-slot:default="{ item }">
              <v-list-item @click="changeEdit(item._id, 0)">
                <v-list-item-content>
                  <v-list-item-title class="text-wrap">
                    <strong>{{ item.title }}</strong>
                    <v-btn
                      id="main-btn"
                      slot="activator"
                      v-model="fab"
                      color="#99CFEA"
                      dark
                      fab
                      @click.stop="dialog = true"
                      class="delete-btn"
                    >
                      <v-icon color="black" @click="deleteChapter(item._id)"
                        >mdi-delete</v-icon
                      >
                    </v-btn>
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
          <editMetadata v-if="editMetadata" />
          <editChapter :chapterId="selectedId" v-else :ref="'' + selectedId" />
        </v-col>
      </v-row>
    </div>
  </v-container>
</template>

<style>
.delete-btn {
  position: absolute !important;
  height: 36px !important;
  width: 36px !important;
  right: 12px;
  bottom: 6px;
}
</style>

<script>
//import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
//import CKEditor from "@ckeditor/ckeditor5-vue2";
import DataService from "../services/DataService";
//import editChapter from "../components/tutorial/editChapter.vue";
import editChapter from "../components/tutorial/editChapter.vue";
import editMetadata from "../components/tutorial/editMetadata.vue";
export default {
  components: {
    editChapter,
    editMetadata,
  },
  data() {
    return {
      tutorial: null, //the whole returned object from tutorial
      chapters: [],
      //editor: ClassicEditor,
      editorData: "fuck",
      selectedId: null,
      editMetadata: 1,
      currentId: null,
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
        const rawData = response.data;

        this.tutorial = rawData;
        this.chapters = rawData.chapters;
        console.log("Chapter is ", this.tutorial);
      });
    },

    fetchChapter() {},

    createChapter() {
      const data = {
        tutorial_id: this.tutorial._id,
        title: "",
        content: "",
      };
      //console.log(data);
      DataService.post("tutorial/createChapter", data).then((response) => {
        //console.log("respone is ", response.data);
        console.log("this.tutorial._id :", response.data);
        DataService.get("tutorial/getOneTutorial", this.tutorial._id).then(
          (response) => {
            console.log("this.tutorial._id :", this.tutorial._id);
            console.log("return :", response.data);
            this.tutorial = response.data;
            this.chapters = this.tutorial.chapters;
          }
        );
      });
    },

    deleteChapter(chapter_id) {
      console.log("delete", chapter_id);
      DataService.deleteChapter(this.tutorial._id, chapter_id).then(
        (response) => {
          console.log(response);
        }
      );

      this.chapters.forEach((element, index, object) => {
        if (chapter_id === element._id) object.splice(index, 1);
        console.log(chapter_id);
      });
    },

    changeEdit(id, editMetadata) {
      if (editMetadata) {
        this.editMetadata = 1;
        console.log(this.editMetadata);
      } else {
        this.editMetadata = 0;
      }
      this.selectedId = id;
      console.log("this.editMetadata ", this.editMetadata);
      console.log("this.selectedId ", this.selectedId);

      //  if (this.currentId === null) {
      //    this.currentId = this.selectedId;
      //  } else {
      //    if (this.currentId !== this.selectedId)
      //      alert(this.currentId + " will be saved first");
      //  }

      //alert(this.selectedId)
      // console.log(this.$refs[''+this.selectedId])
    },
  },
  updated() {
    // if (this.currentId != null) {
    //   alert(this.selectedId + " will be loaded");
    //   console.log(this.$refs[this.currentId]);
    //   console.log(this.$refs[this.selectedId]);
    //   alert(this.currentId);
    //   console.log(this.$refs[this.currentId].editorData);
    //   alert(this.currentId);
    //   alert(this.selectedId);
    //   this.currentId = this.selectedId;
  },
};
</script>
