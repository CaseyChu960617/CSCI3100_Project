<!--The page for showing newest tutorials-->
<template>
  <v-container>
    <v-row justify="center">
      <v-col sm="11">
        <v-card-title>What's new in tutorials ?</v-card-title>
        <v-container>
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

              <v-card
                elevation="8"
                class="card__face card__face--back"
                ref="back"
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
        </v-container>
      </v-col>
    </v-row>
  </v-container>
</template>
<style>
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
import DataService from "../services/DataService"; //handling HTTP request (GET,POST,PUT,DELETE,...)

export default {
  components: {},
  data() {
    return {
      tutorials: [],
      threads: [],
      title: "",
      loading: true,
    };
  },
  computed: {
    currentUser() {
      //store the current user data
      return this.$store.state.auth.user;
    },
  },

  created() {
    //fetch lastest turoials when enter the page
    this.fetchLatestTutorials();
    this.fetchLatestDiscussions();
    //add resize event to sizeheight of the card
    window.addEventListener("resize", this.setHeight);
    //set height of the card
    this.setHeight();
  },

  methods: {
    //function tp fetch lastest turoials from db
    fetchLatestTutorials() {
      DataService.getLatestTutorials().then((response) => {
        const rawData = response.data;
        //mapping the subjects
        rawData.forEach((element) => {
          element.subject = this.subjects[element.subject - 1]["text"];
        });
        //get the data to the local variable/data vue
        this.tutorials = rawData;
      });
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
    //redirect to viewtutorial
    viewTutorial(tutorial_id) {
      this.$router.push({
        name: "viewTutorial",
        params: { tutorial_id: tutorial_id },
      });
    },
  },
};
</script>
