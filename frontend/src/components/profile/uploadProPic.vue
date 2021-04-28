<template>
  <v-dialog v-model="dialog" max-width="500px" @click:outside="close">
    <v-card>
      <v-card-title>Upload Image</v-card-title>
      <v-container
        ><v-file-input
          label="File input"
          prepend-icon="mdi-camera"
          accept="image/*"
          @change="fileChange"
        />
        <v-card-text>Preview</v-card-text>
        <v-row justify="center">
          <div v-if="loading">
            <v-progress-circular
              indeterminate
              color="primary"
            ></v-progress-circular>
          </div>
          <div v-else>
            <v-avatar v-if="tempsrc" size="200">
              <v-img :src="tempsrc" height="100%" />
            </v-avatar>
            <v-avatar v-else color="grey" size="200">
              <span class="white--text headline">
                {{ currentUser.username[0] }}</span
              >
            </v-avatar>
          </div></v-row
        >
      </v-container>
      <v-card-actions
        ><v-spacer /><v-btn v-if="!tempsrc" text @click="close">Close</v-btn
        ><v-btn v-else text @click="save">Save</v-btn></v-card-actions
      >
    </v-card>
  </v-dialog>
</template>

<script>
import DataService from "../../services/DataService";

export default {
  props: ["dialog", "src"],

  data() {
    return {
      tempsrc: this.src,
      formData: new FormData(),
      loading: false,
    };
  },
  computed: {
    currentUser() {
      return this.$store.state.auth.user;
    },
  },
  methods: {
    close() {
      // Close the modal.
      this.$emit("show", false);
      this.formData = new FormData();
    },

    fileChange(file) {
      if (file) {
        this.loading = true;
        this.formData.append("file", file);

        // Do a post request to upload profile picture to cloud storage.
        DataService.uploadProPic(this.formData)
          .then((response) => {
            this.tempsrc = response.data.location;
            this.formData = new FormData();
            this.loading = false;
          })
          .catch((err) => {
            // Prompt error and alert messages.
            if (err.response.status == 401 || err.response.status == 403) {
              alert("Please Login again");
              // Sign out the user automatically.
              this.$store.dispatch("auth/signout");
              this.$router.push("/home").catch(() => {});
            } else if (err.response.status == 400) {
              alert(err.response.data.message);
            }
          });
      }
    },

    save() {
      const data = {
        my_user_id: this.currentUser.user_id,
        profileImage: this.tempsrc,
      };

      DataService.updateProPic(data)
        .then((response) => {
          // Update the profile picture locally.
          var user = JSON.parse(localStorage.getItem("user"));
          user.profileImage = response.data;
          localStorage.setItem("user", JSON.stringify(user));
          this.$store.dispatch("auth/uploadProPic", response.data);
          console.log(response.data);
          this.close();
          this.$emit("refreshProfile");
        })
        .catch((err) => {
            // Prompt error and alert messages.
            if (err.response.status == 401 || err.response.status == 403) {
              alert("Please Login again");
              // Sign out the user automatically.
              this.$store.dispatch("auth/signout");
              this.$router.push("/home").catch(() => {});
            } else if (err.response.status == 400) {
              alert(err.response.data.message);
            }
        });
    },
  },
};
</script>
