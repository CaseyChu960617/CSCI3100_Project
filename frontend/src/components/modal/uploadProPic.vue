<template>
  <v-dialog v-model="dialog" max-width="40%" @click:outside="close">
    <v-card height="50vh"> </v-card>
  </v-dialog>
</template>

<script>
export default {
  props: ["dialog"],

  data() {
    return {};
  },
  methods: {
    close() {},
    handleUploaded() {},
  },
};
</script>
