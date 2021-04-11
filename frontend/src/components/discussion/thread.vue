<template>
  <span>
    <v-container v-if="thread">
      <v-card
        tile
        elevation="16"
        outlined
        height="80%"
        :loading="loading"
        class="mb-4"
      >
        <v-card-title @click="selectProfile(thread.author._id)">{{
          thread.author.username
        }}</v-card-title>
        <v-card-text>{{ thread.content }}</v-card-text>
      </v-card>
      <v-card
        v-for="comment in thread.comments"
        :key="comment"
        tile
        elevation="16"
        outlined
        height="40%"
        :loading="loading"
        class="mb-4"
      >
        <v-card-title @click="selectProfile(comment.author._id)">{{
          comment.author.username
        }}</v-card-title>
        <v-card-text>{{ comment.content }}</v-card-text>
      </v-card>
    </v-container>
    <v-container v-else>
      <v-card tile elevation="16" outlined height="40%">
        <v-card-text>have not selected any thread</v-card-text>
      </v-card>
    </v-container>
  </span>
</template>

<script>
import DataService from "../../services/DataService";

export default {
  props: ["id"],
  data() {
    return { thread: null, loading: true, uid: null };
  },
  watch: {
    id() {
      this.fetchThread();
    },
  },

  methods: {
    fetchThread() {
      console.log(this.id);
      this.loading = true;
      DataService.getOneThread(this.id)
        .then((response) => {
          // console.log(response);
          //console.log(response.data);
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
    selectProfile(uid) {
      const currentUser = this.$store.state.auth.user;
      console.log(currentUser);
      this.uid = uid;
      if (currentUser.uid == this.uid) this.$router.push({ path: "/profile" });
      else
        this.$router.push({
          name: "userProfile",
          params: { uid: this.uid },
        });
    },
  },
};
</script>
