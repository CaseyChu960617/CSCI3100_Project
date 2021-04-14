<template>
  <span
    ><v-row v-if="loading" justify="center" class="mt-8">
      <v-progress-circular
        indeterminate
        size="100"
        color="primary"
      ></v-progress-circular>
    </v-row>
    <span v-else>
      <v-virtual-scroll
        v-if="haveList"
        :bench="threadList.length"
        :height="height"
        item-height="65"
        :items="threadList"
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
      <v-card v-else height="100%"
        ><p class="pt-4 headline text-center">No Thread</p></v-card
      >
    </span>
  </span>
</template>

<script>
export default {
  props: ["threadList", "loading"],

  methods: {
    selectThread(thread_id) {
      this.$router
        .push({
          params: {
            thread_id: thread_id,
          },
        })
        .catch(() => {});
    },
  },
  computed: {
    haveList() {
      if (!this.threadList) return false;
      if (this.threadList.length > 0) return true;
      return false;
    },
    height() {
      return window.innerHeight - 200 - 65;
    },
  },
};
</script>
