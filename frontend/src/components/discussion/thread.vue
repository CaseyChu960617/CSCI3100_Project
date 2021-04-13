<template>
  <v-container v-if="thread" fluid class="pa-0">
    <v-card tile elevation="16" outlined :height="height" :loading="loading">
      <v-card-title
        ><router-link
          :to="{ name: 'profile', params: { user_id: thread.author._id } }"
          >{{ thread.author.username }}</router-link
        ></v-card-title
      >
      <v-card-text v-html="thread.content"></v-card-text>
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
