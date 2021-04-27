<template>
  <v-container>
    <v-card> </v-card>
    <v-row justify="center">
      <v-col sm="11">
        <v-card-title
          >Check out for latest tutorials !<v-spacer /><v-btn
            icon
            @click.stop="dialog = true"
            ><v-icon>mdi-plus</v-icon></v-btn
          ></v-card-title
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
      editedItem: {},
      buttonClose: -1,
    };
  },
  computed: {
    items() {
      return Array.from({ length: 20 }, (k, v) => v + 1);
    },
  },

  created() {
    this.fetchUserTutorials();
    window.addEventListener("resize", this.setHeight);
    this.setHeight();
  },
  destroyed() {
    window.removeEventListener("resize", this.setDesHeight);
  },
  mounted() {
    //window.removeEventListener("resize", this.setDesHeight);
  },

  methods: {
    show(bool) {
      this.dialog = bool;
    },
    toggle() {
      this.buttonClose *= -1;
    },

    flip(event, id) {
      let card = this.$refs[id][0];
      //let frontcard = this.$ref["front-" + id][0];
      console.log(card.classList);

      if (!card.classList.contains("is-flipped")) {
        card.classList.add("is-flipped");
      }
      this.setHeight();
    },

    unflip(event, id) {
      let card = this.$refs[id][0];

      if (card.classList.contains("is-flipped")) {
        card.classList.remove("is-flipped");
      }
    },

    setHeight() {
      let elements = document.querySelectorAll(".des");
      let title_elements = document.querySelectorAll(".des-title");

      elements.forEach(function(element) {
        element.style.height =
          element.parentElement.parentElement.offsetHeight * 0.68 + "px";
      });
      title_elements.forEach(function(element) {
        element.style.height =
          element.parentElement.parentElement.offsetHeight * 0.15 + "px";
      });
    },

    fetchUserTutorials() {
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

    goToMyTutorial() {
      this.$router.push({
        name: "myTutorial",
      });
    },

    viewTutorial(tutorial_id) {
      this.$router.push({
        name: "viewTutorial",
        params: { tutorial_id: tutorial_id },
      });
    },
  },
};
</script>
