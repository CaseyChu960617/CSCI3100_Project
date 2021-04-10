<template>
  <v-dialog v-model="dialog" max-width="40%" @click:outside="close">
    <v-card height="50vh">
      <v-container>
        <!--UPLOAD-->
        <v-form enctype="multipart/form-data">
          <h1>Upload images</h1>
          <input single type="file" @change="fileChange" />
          <v-btn @click="uploadProPic">Upload</v-btn>
        </v-form>
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
      formData: new FormData(),
    };
  },
  methods: {
    close() {
      this.$emit("show", false);
    },

    fileChange(e) {
      console.log(e.target.files[0]);
      this.formData.append("file", e.target.files[0]);
    },

    uploadProPic() {
      console.log(this.formData);
      DataService.upload("uploadProPic", this.formData).then((response) => {
        console.log(response.data);
      });
    },
  },
};
</script>
