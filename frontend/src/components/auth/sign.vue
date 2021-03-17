<template>
  <v-container fluid>
    <v-row>
      <v-spacer />
      <v-col cols="6"><Carousel /> </v-col>
      <v-col cols="3"><Signin /> </v-col><v-spacer />
    </v-row>
  </v-container>
</template>

<script>
import Signin from "./signin.vue";
import Carousel from "../carousel.vue";

export default {
  components: {
    Signin,
    Carousel,
  },
};
</script>
