<template>
  <v-container fluid class="pa-0">
    <v-row no-gutters>
      <v-spacer />
      <v-btn @click="createThread"> Post </v-btn>
      <v-col md="3" class="hidden-sm-and-down">
        <v-card elevation="16">
          <v-card-title>Discussion Thread</v-card-title>
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
      <v-col md="6" sm="12"><Thread :id="id"/></v-col><v-spacer />
    </v-row>
  </v-container>
</template>

<script>
import DataService from "../services/DataService";
import authHeader from "../services/auth-header.js";
import Thread from "../components/discussion/thread.vue";

export default {
  components: {
    Thread,
  },
  data() {
    return { threads: [], loading: true, id: null };
  },
  created() {
    this.fetchThreadList();
  },
  computed: {
    items() {
      return Array.from({ length: 20 }, (k, v) => v + 1);
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
  },
};
</script>
