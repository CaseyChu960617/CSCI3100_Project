<template>
  <span>
    <v-card
      tile
      elevation="16"
      outlined
      height="100%"
      :loading="loading"
      v-if="thread"
    >
      <v-card-title>{{ thread.title }}</v-card-title>
      <v-card-text>{{ thread.content }}</v-card-text>
    </v-card>
    <v-card tile elevation="16" outlined height="100%" v-else>
      <v-card-text>have not selected any thread</v-card-text>
    </v-card>
  </span>
</template>

<script>
import DataService from "../../services/DataService";

export default {
  props: ["id"],
  data() {
    return { thread: null, loading: true };
  },
  watch: {
    id() {
      this.fetchThread();
    },
  },
  methods: {
    fetchThread() {
      this.loading = true;
      DataService.getOneThread(this.id)
        .then((response) => {
          // console.log(response);
          this.thread = response.data;
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
  },
};
</script>