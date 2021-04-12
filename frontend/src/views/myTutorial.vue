<template>
  <v-container>
    <v-card> </v-card>
    <v-row justify="center">
      <v-col sm="11">
        <v-card-title
          >Tutorials<v-spacer /><!--<v-btn icon @click.stop="dialog = true"
            ><v-icon>mdi-plus</v-icon></v-btn
          >--></v-card-title
        >
        <modal
          :dialog.sync="dialog"
          :editedItem="editedItem"
          :title="`${title}`"
          @show="show"
          @submit="save()"
        ></modal>

        <!-- <v-divider />
          <v-virtual-scroll
            bench="25"
            min-height="83vh"
            max-height="83vh"
            item-height="75"
            :items="items"
          >
            <template v-slot:default="{ item }">
              <v-list-item :key="item">
                <v-list-item-content>
                  <v-list-item-title class="text-wrap">
                    <strong>ID {{ item }}</strong>
                  </v-list-item-title>
                </v-list-item-content>
              </v-list-item>
              <v-divider />
            </template>
          </v-virtual-scroll> -->

        <!-- <v-col md="6" sm="12"
        ><v-card tile elevation="16" outlined height="100%">
          <v-card-text>content</v-card-text>
        </v-card></v-col
      ><v-spacer />-->

        <v-row>
          <v-col
            cols="12"
            sm="6"
            md="4"
            v-for="tutorial in tutorials"
            :key="tutorial"
            class="tutorial-card"
            :ref="'' + tutorial._id"
            @mouseover="flip($event, tutorial._id)"
            @mouseleave="unflip($event, tutorial._id)"
          >
            <v-card
              elevation="8"
              class="card__face card__face--front"
              :ref="'front-' + tutorial._id"
            >
              <v-img src="../assets/Homepage/1.jpg"></v-img>
              <v-card-title>{{ tutorial.title }}</v-card-title>
              <v-card-text class="sub">{{ tutorial.subject }} </v-card-text>
              <!--  <v-card-text>
                Instructor {{ tutorial.author.username }}
              </v-card-text>-->
            </v-card>

            <v-card elevation="8" class="card__face card__face--back" ref="back"
              ><div>
                <v-card-title class="des-title">Description</v-card-title>
                <v-card-text class="des"
                  >{{ tutorial.description }}
                </v-card-text>
                <div class="btn-container">
                  <!-- <v-btn class="view-btn">View</v-btn>
                  <v-btn
                    class="edit-btn ml-3"
                    @click="editTutorial(tutorial._id)"
                    >Edit</v-btn
                  >
                  <v-btn class="delete-btn ml-3">Delete</v-btn>-->
                  <v-btn
                    class="mx-2"
                    fab
                    dark
                    small
                    color="primary"
                    @click="viewTutorial(tutorial._id)"
                  >
                    <v-icon dark> mdi-eye </v-icon>
                  </v-btn>
                  <v-btn
                    class="mx-2"
                    fab
                    dark
                    small
                    color="primary"
                    @click="editTutorial(tutorial._id)"
                  >
                    <v-icon dark>
                      mdi-pen
                    </v-icon>
                  </v-btn>
                  <v-btn
                    class="mx-2"
                    fab
                    dark
                    small
                    color="primary"
                    @click="deleteTutorial(tutorial._id)"
                  >
                    <v-icon dark>
                      mdi-delete
                    </v-icon>
                  </v-btn>
                </div>
              </div>
            </v-card>
          </v-col>
        </v-row>
      </v-col>
    </v-row>

    <v-speed-dial
      v-model="fab"
      :top="top"
      :bottom="bottom"
      :right="right"
      :left="left"
      :direction="direction"
      :open-on-hover="hover"
      :transition="transition"
    >
      <v-btn
        id="main-btn"
        slot="activator"
        v-model="fab"
        color="#99CFEA"
        dark
        fab
        @click.stop="dialog = true"
      >
        <v-icon color="black">mdi-plus</v-icon>
      </v-btn>
      <!--<v-btn
        class="extended mr-0"
        fab
        dark
        small
        color="#1F5A98"
        width="185px"
        @click.stop="dialog = true"
      >-->
      <!--<v-icon style="float:left">mdi-plus</v-icon>-->
      <!-- Create tutorial
      </v-btn>
        <v-btn
        class="extended mr-0"
        fab
        dark
        small
        color="#1F5A98"
        width="185px"
        @click="goToMyTutorial"
      >
       View
        my tutorials
      </v-btn>-->>
    </v-speed-dial>
  </v-container>
</template>
<style>
.v-speed-dial {
  position: sticky !important;
  right: 15vw;
  bottom: 10vh;
}
#create .v-btn--floating {
  position: relative;
}

#main-btn {
  position: relative;
  float: right;
}
.v-btn.extended {
  width: 150px;
  margin-right: 75px;
  border-radius: 25px;
  align-content: left;
}
.v-speed-dial__list {
  align-items: flex-end !important;
}

.tutorial-card {
  transition: transform 0.5s ease-in-out;
  transform-style: preserve-3d;
  position: relative;
}

.tutorial-card.is-flipped {
  transform: rotateY(180deg);
}

.card__face {
  color: white;
  font-weight: bold;
  font-size: 40px;
  -webkit-backface-visibility: hidden;
  backface-visibility: hidden;
}

.card__face--front {
  background: red;
  height: 100%;
}

.card__face--back {
  background: blue;
  transform: rotateY(180deg);
  position: absolute;
  padding: 12px;
  height: 500px;
  top: 12px;
  width: calc(100% - 24px);
  height: calc(100% - 24px);
}
.is-flipped > .card__face--front {
  transition: 0.25s;
  visibility: hidden;
}
.sub {
  height: 60px;
}
.des {
  overflow-y: scroll;
  /*height: 250px;*/
}
.btn-container {
  position: absolute;
  bottom: 10px;
}
.view-btn {
}
.edit-btn {
}
.delete-btn {
}
.des::-webkit-scrollbar {
  display: none;
}

/* Hide scrollbar for IE, Edge and Firefox */
.des {
  -ms-overflow-style: none; /* IE and Edge */
  scrollbar-width: none; /* Firefox */
}
</style>
<script>
import modal from "../components/modal/tutorForm.vue";
import DataService from "../services/DataService";
import subjectsList from "../assets/subjects.json";

export default {
  components: {
    modal,
  },
  data() {
    return {
      subjects: subjectsList,
      tutorials: [],
      title: "",
      dialog: false,
      load: true,
      deleteID: null,
    };
  },
  computed: {
    items() {
      return Array.from({ length: 20 }, (k, v) => v + 1);
    },

    currentUser() {
      return this.$store.state.auth.user;
    },
  },

  created() {
    this.fetchMyTutorial();
    this.fetchAllTutorials();
    window.addEventListener("resize", this.setHeight);
    this.setHeight();
  },
  destroyed() {
    window.removeEventListener("resize", this.setDesHeight);
  },

  methods: {
    fetchMyTutorial() {
      DataService.get("tutorial/userTutorials", this.currentUser.user_id).then(
        (response) => {
          console.log("Data is ", response.data);
          let rawData = response.data;
          //mapping the subjects
          rawData.forEach((element) => {
            element.subject = this.subjects[element.subject - 1]["text"];
            DataService.getAllTutorial().then((response) => {
              console.log("Data is ", response.data);
              let rawData = response.data;
              //mapping the subjects
              rawData.forEach((element) => {
                element.subject = this.subjects[element.subject - 1]["text"];
              });
              this.tutorials = rawData;
            });
          });
          this.tutorials = rawData;
        }
      );
    },

    flip(event, id) {
      let card = this.$refs[id][0];
      //let frontcard = this.$ref["front-" + id][0];
      console.log(card.classList);

      if (!card.classList.contains("is-flipped")) {
        card.classList.add("is-flipped");
      }

      console.log(card);
      this.setHeight();
    },

    unflip(event, id) {
      let card = this.$refs[id][0];
      console.log(card.classList);

      if (card.classList.contains("is-flipped")) {
        card.classList.remove("is-flipped");
      }
      console.log(card);
    },

    setHeight() {
      let elements = document.querySelectorAll(".des");
      let title_elements = document.querySelectorAll(".des-title");

      elements.forEach((element) => {
        console.log(element.offsetHeight);
        element.style.height =
          element.parentElement.parentElement.offsetHeight * 0.62 + "px";

        console.log(element.offsetHeight);
      });
      title_elements.forEach(function(element) {
        console.log(element.offsetHeight);
        element.style.height =
          element.parentElement.parentElement.offsetHeight * 0.165 + "px";
      });
    },

    show(bool) {
      this.dialog = bool;
    },

    view(tutorialId) {
      console.log(tutorialId);
    },

    editTutorial(tutorialId) {
      this.$router.push({
        name: "editTutorial",
        params: { tutorialId: tutorialId },
      });
    },

    deleteTutorial(tutorialId) {
      console.log("delete", tutorialId);

      DataService.delete("tutorial/deleteTutorial", tutorialId).then(
        (response) => {
          console.log(response);
        }
      );

      this.tutorials.forEach((element, index, object) => {
        if (tutorialId === element._id) object.splice(index, 1);
        console.log(tutorialId);
      });
    },
  },
};
</script>
