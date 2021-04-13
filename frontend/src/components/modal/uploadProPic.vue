<template>
  <v-dialog v-model="dialog" max-width="80%" @click:outside="close">
    <v-card height="80vh">
      <v-container>
        <!--UPLOAD-->
        <v-form enctype="multipart/form-data">
          <h1>Upload images</h1>
          <input name="file" single type="file" @change="fileChange" />
          <v-btn @click="uploadProPic">Upload</v-btn>
        </v-form>
        <v-avatar size="200" v-if="src">
          <v-img :src="src" height="100%" />
        </v-avatar>
        <v-btn @click="save">Save</v-btn>
      </v-container>
    </v-card>
  </v-dialog>
</template>

<script>
import DataService from "../../services/DataService";

export default {
  props: ["dialog"],

  data() {
    return {
      src: null,
      formData: new FormData(),
    };
  },

  computed: {
    currentUser() {
      return this.$store.state.auth.user;
    },
  },

  methods: {
    close() {
      this.$emit("show", false);
      //this.$emit("fetchProfile");
      this.formData = new FormData();
    },

    fileChange(e) {
      this.formData.append("file", e.target.files[0]);
    },

    uploadProPic() {
      console.log(this.formData);
      DataService.upload("uploadProPic", this.formData).then((response) => {
        this.src = response.data.location;
        this.formData = new FormData();
      });
    },

    save() {
      const data = {
        my_user_id: this.currentUser.user_id,
        profileImage: this.src,
      };
      DataService.put("user/updateProPic", data).then((response) => {
        var user = JSON.parse(localStorage.getItem("user"));
        user.profileImage = response.data;
        localStorage.setItem("user", JSON.stringify(user));
        this.$store.dispatch("auth/uploadProPic", response.data);
        console.log(response.data);
        this.close();
      });
    },
  },
};
</script>
