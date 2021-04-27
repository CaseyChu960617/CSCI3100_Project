<template>
  <v-container fluid class="pa-0">
    <v-row no-gutters justify="center">
      <!-- class="hidden-sm-and-down" -->
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
