<template>
  <div>
  <v-app-bar color="#1F5A98" class="white--text" flat height="125">
    <v-img
        src="../assets/Logo/urge.gif"
        max-width="150"
        contain
        position="left"
        style="cursor: pointer"
      ></v-img>
      
      <v-card-text  style="overflow-y: auto; height:100px; maxWidth: 500px;" max-width="500">
        Urge is intended to provide a peer-to-peer knowledge-sharing platform among CUHK students, which aims to provide tutorial sharing, a discussion forum with social media-like interaction for CUHK students. 
      </v-card-text>


      <v-divider></v-divider>
      <div style="display: flex; justify-content: flex-end">
      <v-card-text class="white--text text-right;">
        Contact: template@urge.com<br />
        Copyright reserved<br />
        {{ new Date().getFullYear() }} — <strong>Urge</strong>
      </v-card-text>
      </div>

  </v-app-bar>
  </div>
</template>

