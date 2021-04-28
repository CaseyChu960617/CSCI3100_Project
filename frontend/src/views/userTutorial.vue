<template>
  <v-container>
    <v-card> </v-card>
    <v-row justify="center">
      <v-col sm="11">
        <v-card-title>Check out for his/her tutorials !</v-card-title>
        <modal
          :dialog.sync="dialog"
          :editedItem="editedItem"
          :title="`${title}`"
          @show="show"
          @submit="save()"
        ></modal>

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
              <v-img
                height="250px"
                v-if="tutorial.thumbnail"
                :src="tutorial.thumbnail"
              ></v-img>
              <v-img
                height="250px"
                v-else
                src="../assets/Homepage/1.jpg"
              ></v-img>
              <v-card-title>{{ tutorial.title }}</v-card-title>
              <v-card-text class="sub">{{ tutorial.subject }} </v-card-text>
              <v-card-text>
                Instructor {{ tutorial.author.username }}
              </v-card-text>
            </v-card>

            <v-card elevation="8" class="card__face card__face--back" ref="back"
              ><div>
                <v-card-title class="des-title">Description</v-card-title>
                <v-card-text class="des"
                  >{{ tutorial.description }}
                </v-card-text>

                <div class="btn-container">
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
        @click="toggle()"
      >
        <v-icon v-if="buttonClose == -1" color="black">mdi-menu</v-icon>
        <v-icon v-if="buttonClose == 1" color="black">mdi-close</v-icon>
      </v-btn>
      <v-btn
        class="extended mr-0"
        fab
        dark
        small
        color="#1F5A98"
        width="185px"
        @click.stop="dialog = true"
      >
        <!--<v-icon style="float:left">mdi-plus</v-icon>-->
        Create tutorial
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
        <!--<v-icon style="float:left">mdi-book-open-blank-variant</v-icon>-->View
        my tutorials
      </v-btn>
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
.v-speed-dial--direction-top .v-speed-dial__list {
  margin-bottom: 20px;
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
.edit-btn {
  position: absolute;
  bottom: 10px;
  left: 76px;
}
.view-btn {
  position: absolute;
  bottom: 10px;
}
.des::-webkit-scrollbar {
  display: none;
}

/* Hide scrollbar for IE, Edge and Firefox */
.des {
  -ms-overflow-style: none; /* IE and Edge */
  scrollbar-width: none; /* Firefox */
}

.btn-container {
  position: absolute;
  bottom: 10px;
}
</style>
<script>
import modal from "../components/modal/tutorForm.vue"; //using a child component to render a pop-up modal on the same page
import DataService from "../services/DataService"; //handling HTTP request (GET,POST,PUT,DELETE,...)
import subjectsList from "../assets/subjects.json"; //import a json object from a json file stored CUHK subject list

export default {
  components: {
    modal, //declare modal component
  },
  data() {
    return {
      subjects: subjectsList,
      tutorials: [],
      title: "",
      dialog: false, //boolean varaible of whether the modal is pop up or not
      load: true,
      editedItem: {},
      buttonClose: -1, //boolean to determine the close should be closed or not
    };
  },

  created() {
    //fetch tutorial when enter this page
    this.fetchUserTutorials();
    window.addEventListener("resize", this.setHeight);
    this.setHeight();
  },

  methods: {
    show(bool) {
      //set boolean of showing the modal
      this.dialog = bool;
    },
    toggle() {
      //set boolean to determine the close should be closed or not
      this.buttonClose *= -1;
    },

    //function triggered when hover the card for flipping
    flip(event, id) {
      let card = this.$refs[id][0];

      if (!card.classList.contains("is-flipped")) {
        card.classList.add("is-flipped");
      }

      //set the height to prevent overflow

      this.setHeight();
    },

    //function triggered when hover the card for unflipping
    unflip(event, id) {
      let card = this.$refs[id][0];

      if (card.classList.contains("is-flipped")) {
        card.classList.remove("is-flipped");
      }
    },

    //function to dynamically set the height of the card to prevent overflow
    setHeight() {
      let elements = document.querySelectorAll(".des");
      let title_elements = document.querySelectorAll(".des-title");

      //set card description height
      elements.forEach(function(element) {
        element.style.height =
          //reference to parent height in DOM tree
          element.parentElement.parentElement.offsetHeight * 0.68 + "px";
      });
      //set card title height
      title_elements.forEach(function(element) {
        element.style.height =
          //reference to parent height in DOM tree
          element.parentElement.parentElement.offsetHeight * 0.15 + "px";
      });
    },

    //function to fetch user tutorials
    fetchUserTutorials() {
      //get request

      DataService.get(
        "tutorial/userTutorials",
        this.$route.params.user_id
      ).then((response) => {
        let rawData = response.data;
        //mapping the subjects
        rawData.forEach((element) => {
          element.subject = this.subjects[element.subject - 1]["text"];
        });
        this.tutorials = rawData;
      });
    },

    //redirect to mytutorial
    goToMyTutorial() {
      this.$router.push({
        name: "myTutorial",
      });
    },

    //redirect the viewtutorial
    viewTutorial(tutorial_id) {
      this.$router.push({
        name: "viewTutorial",
        params: { tutorial_id: tutorial_id },
      });
    },
  },
};
</script>
