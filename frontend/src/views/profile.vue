<template>
  <v-container>
    <v-row>
      <v-col md="6">
        <div class="container mt-4">
          <h3>Profile</h3>
          <p>ID: {{ currentUser.uid }}</p>
          <p>Username: {{ currentUser.username }}</p>
          <p>First Name: {{ currentUser.firstname }}</p>
          <p>Last Name: {{ currentUser.lastname }}</p>
          <p>Email: {{ currentUser.email }}</p>
          <p>Gender: {{ currentUser.gender }}</p>
        </div>
        <v-btn @click="editProfile()">Edit Profile</v-btn>
      </v-col>
      <v-col md="6"
        ><div class="container mt-4">
          <v-avatar size="200" v-if="currentUser.profileImage">
            <v-img :src="currentUser.profileImage" height="100%" />
          </v-avatar>
          <v-avatar v-else color="grey" size="200">
            <span class="white--text headline">
              {{ currentUser.username[0] }}</span
            >
          </v-avatar>
        </div>
        <v-btn @click.stop="dialog = true">Upload Profile Picture</v-btn>
        <modal :dialog.sync="dialog" @show="show"></modal>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import modal from "../components/modal/uploadProPic.vue";
export default {
  data() {
    return {
      dialog: false,
    };
  },
  components: {
    modal,
  },
  computed: {
    currentUser() {
      return this.$store.state.auth.user;
    },
  },
  mounted() {
    if (!this.currentUser) {
      this.$router.push("/home");
    }
  },

  methods: {
    editProfile() {
      this.$router.push({ path: "/editProfile" });
    },

    show(bool) {
      this.dialog = bool;
    },
  },
};
</script>
