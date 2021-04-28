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
          <div class="pa-5 edit-tutorial" @click="changeEdit(tutorial._id, 1)">
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

          <v-container v-else class="text-wrap">
            <strong> No Chapters</strong>
          </v-container>

          <v-btn
            id="main-btn"
            slot="activator"
            v-model="fab"
            color="#99CFEA"
            dark
            fab
            @click="createChapter"
            class="edit-add-chatper"
          >
            <v-icon color="black">mdi-plus</v-icon>
          </v-btn>
        </v-col>
        <v-col>
          <editMetadata v-if="editMetadata" :ref="'' + selectedId" />
          <editChapter
            :tutorial_id="tutorial._id"
            @fetchTutorial="fetchTutorial"
            :chapterId="selectedId"
            v-else
            :ref="'' + selectedId"
          />
        </v-col>
      </v-row>
    </div>
    <!--<autosave
      :dialog.sync="dialog"
      @show="show"
      @autosave="autosave"
      :currentId="currentId"
    />-->
  </v-container>
</template>

<style>
.edit-tutorial {
  cursor: pointer;
}
.delete-btn {
  position: absolute !important;
  height: 36px !important;
  width: 36px !important;
  right: 12px;
  bottom: 6px;
}
.edit-add-chatper {
  margin-bottom: 20px;
}
</style>

<script>
import DataService from "../services/DataService"; //handling HTTP request (GET,POST,PUT,DELETE,...)
import editChapter from "../components/tutorial/editChapter.vue"; //using editChpater component as child component
import editMetadata from "../components/tutorial/editMetadata.vue"; //using editMetadata component as child component

export default {
  components: {
    editChapter, //delcare editChapter component
    editMetadata, //declare editMetadata component
  },

  data() {
    return {
      tutorial: null, //the whole returned object from tutorial
      chapters: [], //local chpaters array to store all chapter objects
      selectedId: null, //the id of selected chapter or tutorials
      editMetadata: 1, //set default view to be editing metadata when enter the page
      currentId: null, //the id of current editing chapter or tutorials
    };
  },

  computed: {
    currentUser() {
      //store the current user
      return this.$store.state.auth.user;
    },
  },

  created() {
    //fetch tutorial when enter thae apge
    this.fetchTutorial();
  },

  methods: {
    //function to fetch tutorial from database
    fetchTutorial() {
      DataService.get(
        "tutorial/getOneTutorial",
        this.$route.params.tutorialId
      ).then((response) => {
        const rawData = response.data;
        this.tutorial = rawData;
        this.chapters = rawData.chapters;
        //store the response data into local variable of vue
      });
    },

    //function to create chapter
    createChapter() {
      const chapterNum = this.chapters.length + 1;
      const data = {
        tutorial_id: this.tutorial._id,
        title: "Chapter " + chapterNum.toString(),
        content: "",
      };
      //post request to create new chapter
      DataService.post("tutorial/createChapter", data)
        .then(() => {
          DataService.get("tutorial/getOneTutorial", this.tutorial._id).then(
            (response) => {
              this.tutorial = response.data;
              this.chapters = this.tutorial.chapters;
            }
          );
        })
        .catch((err) => {
          // Prompt error and alert messages
          if (err.response.status == 401 || err.response.status == 403) {
            alert("Please Login again");
            this.$store.dispatch("auth/signout");
            this.$router.push("/home").catch(() => {});
          } else if (err.response.status == 400) {
            alert(err.response.data.message);
          }
        });
    },

    //function to delete chapter
    deleteChapter(chapter_id) {
      //delete request to delete chapter
      DataService.deleteChapter(this.tutorial._id, chapter_id)
        .then(() => {})
        .catch((err) => {
          // Prompt error and alert messages
          if (err.response.status == 401 || err.response.status == 403) {
            alert("Please Login again");
            this.$store.dispatch("auth/signout");
            this.$router.push("/home").catch(() => {});
          } else if (err.response.status == 400) {
            alert(err.response.data.message);
          }
        });

      //delte the corresponding eleemnt in chapters array in frontend so to immediately update without refreshing
      this.chapters.forEach((element, index, object) => {
        //splice the array
        if (chapter_id === element._id) object.splice(index, 1);
      });

      //if there is no chapter, user will only view the metatdata of the tutorial
      if (this.chapters.length == 0) {
        this.editMetadata = 1;
      }
    },

    //triggered when editor change the current editing tutorial or chapters
    changeEdit(id, editMetadata) {
      this.selectedId = id;
      //call savewhen cahnge function to save the current editing tutorial/chapter
      this.saveWhenChange(this.editMetadata, this.currentId, this.selectedId);
      this.currentId = this.selectedId; //need to be emitted
      if (editMetadata) {
        //indicating editing metadata
        this.editMetadata = 1;
      } else {
        //indicating not editing metadata, but tutorial
        this.editMetadata = 0;
      }
    },

    saveWhenChange(editMetadata, currentId, selectedId) {
      //check if currently tutorial/chapter is being editing and change from editing chapter/tutorial to ANOTHER chapter or from to metadata chapter
      if (currentId !== selectedId && currentId !== null) {
        //if not editing Metadata, save tutorial
        if (editMetadata === 0) {
          //alert to user to save tutorial
          alert("Current change of tutorial data will be saved.");
        } else {
          //alert to user to save chapter
          alert("Current change of chapter will be saved.");
        }
        //call the save function in child component of either editmetadata or editchapter component
        this.$refs[currentId].save();
      }
    },
  },
};
</script>
