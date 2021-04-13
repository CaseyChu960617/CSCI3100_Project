<template>
  <v-container fluid class="pa-0">
    <v-row no-gutters>
      <v-col md="3" class="hidden-sm-and-down pa-5">
        <v-card elevation="16">
          <!-- <v-btn @click="createThread"> Post </v-btn> -->
          <v-app-bar>
            <v-app-bar-nav-icon @click="drawer = true"></v-app-bar-nav-icon>
            <v-app-bar-title>Discussion Thread</v-app-bar-title>

            <v-spacer></v-spacer>

            <v-btn icon @click="dialog = true">
              <v-icon>mdi-plus</v-icon>
            </v-btn>
          </v-app-bar>
          <v-navigation-drawer v-model="drawer" absolute temporary>
            <v-list nav>
              <v-list-item-group>
                <v-list-item
                  @click="
                    cat = -1;
                    drawer = false;
                  "
                >
                  <v-list-item-title>All</v-list-item-title>
                </v-list-item>
                <v-list-item
                  @click="
                    cat = 1;
                    drawer = false;
                  "
                >
                  <v-list-item-title>Cat 1</v-list-item-title>
                </v-list-item>

                <v-list-item
                  @click="
                    cat = 2;
                    drawer = false;
                  "
                >
                  <v-list-item-title>Cat 2</v-list-item-title>
                </v-list-item>

                <v-list-item
                  @click="
                    cat = 3;
                    drawer = false;
                  "
                >
                  <v-list-item-title>Cat 3</v-list-item-title>
                </v-list-item>

                <v-list-item
                  @click="
                    cat = 4;
                    drawer = false;
                  "
                >
                  <v-list-item-title>Cat 4</v-list-item-title>
                </v-list-item>
              </v-list-item-group>
            </v-list>
          </v-navigation-drawer>
          <v-divider />
          <v-virtual-scroll
            bench="25"
            min-height="83vh"
            max-height="83vh"
            item-height="70"
            :items="threads"
          >
            <template v-slot:default="{ item }">
              <v-list-item @click="selectThread(item._id)">
                <v-list-item-content>
                  {{ item.author.username }}
                  <v-list-item-title class="text-wrap">
                    <strong>{{ item.title }}</strong>
                  </v-list-item-title>
                </v-list-item-content>
              </v-list-item>
              <v-divider />
            </template>
          </v-virtual-scroll>
        </v-card>
      </v-col>
      <v-col md="9" sm="12" class="pa-5"><Thread :id="id" /></v-col>
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
        Create thread
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
        My threads
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
</style>
<script>
import DataService from "../services/DataService";
import authHeader from "../services/auth-header.js";
import Thread from "../components/discussion/thread.vue";

export default {
  components: {
    Thread,
  },

  data() {
    return {
      threads: [],
      loading: true,
      id: null,
      buttonClose: -1,
      drawer: false,
      cat: -1,
      dialog: false,
    };
  },

  created() {
    this.fetchThreadList();
  },
  watch: {
    cat() {
      if (this.cat != -1) {
        this.fetchCatList();
      }
    },
  },
  methods: {
    fetchThreadList() {
      this.loading = true;
      DataService.getAllThread()
        .then((response) => {
          console.log(response.data);
          this.threads = response.data;
          this.loading = false;
        })
        .catch((err) => {
          console.log(err);
          if (err.response.status == 401 || err.response.status == 403) {
            alert("Please Login again");
            this.$router.push("/home");
          } else {
            alert(err.response.data.message);
          }
        });
    },
    fetchCatList() {
      this.loading = true;
      DataService.getCatThread(this.cat)
        .then((response) => {
          console.log(response.data);
          this.threads = response.data;
          this.loading = false;
        })
        .catch((err) => {
          console.log(err);
          if (err.response.status == 401 || err.response.status == 403) {
            alert("Please Login again");
            this.$router.push("/home");
          } else {
            alert(err.response.data);
          }
        });
    },
    createThread() {
      const data = {
        category: 4,
        title: "qqq",
        content: "ewqewqeqweqw",
      };
      DataService.createThread(data, {
        headers: authHeader(),
      });
    },
    selectThread(id) {
      this.id = id;
    },

    toggle() {
      this.buttonClose *= -1;
    },
  },
};
</script>
