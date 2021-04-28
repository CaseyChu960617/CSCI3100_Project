<template>
  <v-container fluid class="pa-0">
    <v-row no-gutters justify="center">
      <v-col cols="12" md="3"
        ><v-card tile elevation="16" outlined :height="height"
          ><ThreadNavBar @refreshList="fetchThreadList(0)"/>
          <ThreadList :threadList="threadList" :loading="listLoading"/></v-card
      ></v-col>
      <v-col cols="0" md="7"
        ><v-card tile elevation="16" outlined :height="height"
          ><Thread
            :thread="thread"
            :loading="threadLoading"
            @refreshThread="fetchOneThread($route.params.thread_id)"/></v-card
      ></v-col>
    </v-row>
  </v-container>
</template>

<script>
import DataService from "../services/DataService"; //handling HTTP request (GET,POST,PUT,DELETE,...)
import ThreadNavBar from "../components/discussion/threadNavBar.vue"; //using a child component threadNavBar to render the navbar for thread
import ThreadList from "../components/discussion/threadList.vue"; //using a child component ThreadList to render the list of thread
import Thread from "../components/discussion/thread.vue"; //using a child component Thread to render each thread

export default {
  components: {
    Thread, //declare the component thread
    ThreadList, //delcare the component threadList
    ThreadNavBar, //delcare the component threadnavBar
  },
  data() {
    return {
      threadList: [],
      thread: null,
      listLoading: false, //for rendering loading animation
      threadLoading: false, //for rendering loading animation
    };
  },
  created() {
    //fetch defaut thread cateory to be ALL
    this.fetchThreadList(0);
    //fetch the thread
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
    //watch the change of the category of the threadlist and render the correpsonding threadlist
    "$route.params.sub_id"() {
      this.fetchThreadList(this.$route.params.sub_id);
    },
    //watch the change of the thread id when user select other thread to render the correpsonding thread
    "$route.params.thread_id"() {
      if (this.$route.params.thread_id) {
        this.fetchOneThread(this.$route.params.thread_id);
      }
    },
  },
  methods: {
    //fetch defaut thread list with respect to different cateogeory, sub_id is the id of the category
    fetchThreadList(sub_id) {
      //list is loading
      this.listLoading = true;
      //get the all threads in the threadList with that category
      DataService.getSubThread(sub_id)
        .then((response) => {
          this.threadList = response.data;
          this.listLoading = false;
        })
        .catch((err) => {
          this.listLoading = false;
          if (err.response.status == 401 || err.response.status == 403) {
            alert("Please Login again");
            this.$router.push("/home");
          } else {
            alert(err.response.data.message);
          }
        });
    },
    //fetch one thread for user to view its content on the right of the window
    fetchOneThread(thread_id) {
      //thread is loading
      this.threadLoading = true;
      //get one thread from database
      DataService.getOneThread(thread_id)
        .then((response) => {
          this.thread = response.data;
          this.threadLoading = false;
        })
        .catch((err) => {
          this.threadLoading = false;
          if (err.response.status == 401 || err.response.status == 403) {
            alert("Please Login again");
            this.$router.push("/home");
          } else {
            alert(err.response.data.message);
          }
        });
    },
  },
};
</script>
