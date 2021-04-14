<template>
  <v-dialog v-model="dialog" max-width="40%" @click:outside="close">
    <v-card>
      <v-card-title class="headline">
        Autosave
      </v-card-title>
      <v-card-text>
        <v-container>
          <v-row>
            <v-col cols="12"> </v-col>
          </v-row>
        </v-container>
      </v-card-text>
      <v-card-actions>
        <v-spacer />
        <div>
          <!--<v-btn color="blue darken-1" text @click="close">Preview</v-btn>-->
          <v-btn color="blue darken-1" text>Save</v-btn>
        </div>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
import subjectsList from "../../assets/subjects.json";
import DataService from "../../services/DataService";

export default {
  props: ["dialog"],
  data() {
    return {};
  },
  computed: {
    currentUser() {
      return this.$store.state.auth.user;
    },
  },
  created: function() {},
  methods: {
    close() {
      this.$emit("show", false);
    },
  },
};
</script>
