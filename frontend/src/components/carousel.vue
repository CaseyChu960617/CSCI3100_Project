<template>
  <v-carousel cycle hide-delimiter-background show-arrows-on-hover>
    <v-carousel-item v-for="i in 8" :key="i">
      <v-img :src="require(`../assets/Homepage/` + i + `.jpg`)"></v-img>
    </v-carousel-item>
  </v-carousel>
</template>
<style>
@media (max-width: 959px) {
  .v-carousel {
    height: 50vw !important;
  }
}
</style>
