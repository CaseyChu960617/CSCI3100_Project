<template>
  <v-container v-if="thread" fluid class="pa-0">
    <v-card tile elevation="16" outlined :height="height" :loading="loading">
      <v-card-title
        ><router-link
          :to="{ name: 'profile', params: { user_id: thread.author._id } }"
          >{{ thread.author.username }}</router-link
        ></v-card-title
      >
      <v-card-text
        class="thread-content pa-5"
        v-html="thread.content"
      ></v-card-text>
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
      <v-card-title
        ><router-link
          :to="{ name: 'profile', params: { user_id: comment.author._id } }"
          >{{ comment.author.username }}</router-link
        ></v-card-title
      >
      <v-card-text>{{ comment.content }}</v-card-text>
    </v-card>
  </v-container>
  <v-container v-else fluid class="pa-0">
    <v-card tile elevation="16" outlined :height="height">
      <v-card-text>have not selected any thread</v-card-text>
    </v-card>
  </v-container>
</template>
<style>
.thread-content {
  overflow-y: scroll;
  height: 78vh;
  /* min-height: 65vh; */
  max-height: 500px;
}

img {
  max-width: 600px;
}

.iframely-responsive > * {
  top: 0;
  left: 0;
  max-width: 622.2px;
  max-height: 350px;
  position: absolute;
  border: 0;
}
</style>
<script>
//import DataService from "../../services/DataService";

export default {
  props: ["thread", "loading"],
  data() {
    return {};
  },

  computed: {
    height() {
      return window.innerHeight - 200;
    },
  },
  methods: {},
};
</script>
