<template>
  <span
    ><v-row v-if="loading" justify="center" class="mt-8">
      <v-progress-circular
        indeterminate
        size="100"
        color="primary"
      ></v-progress-circular>
    </v-row>
    <v-virtual-scroll
      v-else
      bench="25"
      height="100%"
      item-height="70"
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
};
</script>
