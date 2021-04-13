<template>
  <span>
    <v-app-bar>
      <v-app-bar-nav-icon @click="drawer = true"></v-app-bar-nav-icon>
      <v-app-bar-title>Discussion</v-app-bar-title>

      <v-spacer></v-spacer>

      <v-btn icon @click="dialog = true">
        <v-icon>mdi-plus</v-icon>
      </v-btn>
      <NewThread :dialog="dialog" @show="show" />
    </v-app-bar>
    <v-navigation-drawer v-model="drawer" absolute temporary width="80%">
      <v-list nav>
        <v-list-item
          v-for="subject in subjects"
          :key="subject.value"
          @click="selectCat(subject.value)"
        >
          <v-list-item-title class="text-center">{{
            subject.code
          }}</v-list-item-title>
        </v-list-item>
      </v-list>
    </v-navigation-drawer>
  </span>
</template>

<script>
import subjectlist from "../../assets/subjects.json";
import NewThread from "./newThread.vue";

export default {
  components: {
    NewThread,
  },
  data() {
    return {
      drawer: false,
      dialog: false,
      subjects: null,
    };
  },
  created() {
    this.subjects = JSON.parse(JSON.stringify(subjectlist));
    if (this.subjects[0].value != 0) {
      this.subjects.unshift({ value: 0, code: "All" });
    }
  },
  methods: {
    selectCat(sub_id) {
      this.drawer = false;
      this.$router
        .push({
          params: {
            sub_id: sub_id,
          },
        })
        .catch(() => {});
    },
    show(bool) {
      this.dialog = bool;
    },
  },
};
</script>
