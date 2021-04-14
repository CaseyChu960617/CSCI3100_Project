<template>
  <v-container fluid class="pa-0">
    <v-row no-gutters justify="center">
      <!-- class="hidden-sm-and-down" -->
      <v-col cols="12" md="3"
        ><v-card tile elevation="16" outlined :height="height"
          ><ThreadNavBar @refreshList="fetchThreadList(0)" />
          <ThreadList :threadList="threadList" :loading="listLoading" /></v-card
      ></v-col>
      <v-col cols="0" md="7"
        ><v-card tile elevation="16" outlined :height="height"
          ><Thread :thread="thread" :loading="threadLoading" /></v-card
      ></v-col>
    </v-row>

    <!-- <v-speed-dial
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
        <v-icon style="float:left">mdi-plus</v-icon>
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
        <v-icon style="float:left">mdi-book-open-blank-variant</v-icon>View
        My threads
      </v-btn>
    </v-speed-dial> -->
  </v-container>
</template>

<script>
import DataService from "../services/DataService";
//import authHeader from "../services/auth-header.js";
import ThreadNavBar from "../components/discussion/threadNavBar.vue";
import ThreadList from "../components/discussion/threadList.vue";
import Thread from "../components/discussion/thread.vue";

export default {
  components: {
    Thread,
    ThreadList,
    ThreadNavBar,
  },
  data() {
    return {
      threadList: [],
      thread: null,
      listLoading: false,
      threadLoading: false,
      buttonClose: -1,
    };
  },
  created() {
    this.fetchThreadList(0);
    if (this.$route.params.thread_id) {
      this.fetchOneThread(this.$route.params.thread_id);
    }
  },
  computed: {
    height() {
      return window.innerHeight - 200;
    },
  },
  watch: {
    "$route.params.sub_id"() {
      this.fetchThreadList(this.$route.params.sub_id);
    },
    "$route.params.thread_id"() {
      if (this.$route.params.thread_id) {
        this.fetchOneThread(this.$route.params.thread_id);
      }
    },
  },
  methods: {
    fetchThreadList(sub_id) {
      this.listLoading = true;
      DataService.getSubThread(sub_id)
        .then((response) => {
          this.threadList = response.data;
          this.listLoading = false;
        })
        .catch((err) => {
          this.listLoading = false;
          console.log(err);
          if (err.response.status == 401 || err.response.status == 403) {
            alert("Please Login again");
            this.$router.push("/home");
          } else {
            alert(err.response.data.message);
          }
        });
    },
    fetchOneThread(thread_id) {
      this.threadLoading = true;
      DataService.getOneThread(thread_id)
        .then((response) => {
          this.thread = response.data;
          this.threadLoading = false;
        })
        .catch((err) => {
          this.threadLoading = false;
          console.log(err);
          if (err.response.status == 401 || err.response.status == 403) {
            alert("Please Login again");
            this.$router.push("/home");
          } else {
            alert(err.response.data.message);
          }
        });
    },
    // createThread() {
    //   const data = {
    //     category: 4,
    //     title: "qqq",
    //     content: "ewqewqeqweqw",
    //   };
    //   DataService.createThread(data, {
    //     headers: authHeader(),
    //   });
    // },

    // toggle() {
    //   this.buttonClose *= -1;
    // },
  },
};
</script>


<style>
/* .v-speed-dial {
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
} */
</style>