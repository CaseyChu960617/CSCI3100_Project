<template>
  <v-dialog v-model="dialog" max-width="20%" @click:outside="close">
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
          <v-btn color="blue darken-1" text @click="close">Not Save</v-btn>
          <v-btn color="blue darken-1" text @click="save">Save</v-btn>
        </div>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
export default {
  props: ["dialog", "currentId"],
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

    save() {
      console.log(this.currentId);
      this.$emit("autosave", this.currentId);
    },
  },
};
</script>
