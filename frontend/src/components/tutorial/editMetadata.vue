<template>
  <v-container
    ><v-container>
      Tutorial Information
      <v-card class="pa-5">
        <v-row>
          <v-col col="9">
            <v-text-field v-model="title" label="Title" type="text" clearable>
            </v-text-field>
          </v-col>
          <v-col col="3">
            <v-select
              v-model="published"
              :items="publishedlist"
              item-text="text"
              item-value="value"
              label="Publish"
              :rules="[rules.required]"
            ></v-select>
          </v-col>
        </v-row>
        <v-row>
          <v-col col="3">
            <v-select
              v-model="subject"
              :items="subjects"
              item-text="text"
              item-value="value"
              label="Publish"
              :rules="[rules.required]"
            ></v-select>
          </v-col>
          <v-spacer />
        </v-row>
        <v-row>
          <v-col col="9">
            <v-textarea
              v-model="description"
              label="Description"
              type="text"
              clearable
            ></v-textarea>
          </v-col>
        </v-row>

        <v-form enctype="multipart/form-data">
          <div>Upload Thumbnail</div>
          <input name="file" single type="file" @change="fileChange" />

          <!--<v-img src="../../assets/Homepage/2.jpg" v-else />-->
          <v-btn @click="uploadThumbnail">Upload</v-btn>
        </v-form>
        <div>
          <v-card-title>Preview</v-card-title>
        </div>
        <div>
          <v-img max-width="500px" v-if="!noThumbnail" :src="thumbnail" />
          <v-img max-width="500px" v-else src="../../assets/Homepage/1.jpg" />
        </div>

        <v-btn @click="save">Save</v-btn>
      </v-card>
    </v-container>
    <v-container> </v-container></v-container
></template>

<script>
import DataService from "../../services/DataService";

import subjectsList from "../../assets/subjects.json";

export default {
  components: {},
  data() {
    return {
      formData: new FormData(),
      subjects: subjectsList,
      title: "",
      subject: "",
      description: "",
      thumbnail: "",
      published: "",
      noThumbnail: "",
      publishedlist: [
        { text: "published", value: 1 },
        { text: "not published", value: 2 },
      ],
      rules: {
        required: (value) => !!value || "Required",
      },
    };
  },
  created() {
    //console.log(this.$route.params.tutorialId);
    this.fetchTutorial();
  },
  methods: {
    fetchTutorial() {
      //console.log(this.$route.params.tutorialId);
      DataService.get(
        "tutorial/getOneTutorial",
        this.$route.params.tutorialId
      ).then((response) => {
        //console.log(response.data);
        const rawData = response.data;
        this.title = rawData.title;
        this.subject = rawData.subject;
        this.description = rawData.description;
        this.published = rawData.published;
        this.thumbnail = rawData.thumbnail;
        if (this.thumbnail == "") this.noThumbnail = true;
      });
    },

    fileChange(e) {
      this.formData.append("file", e.target.files[0]);
    },

    uploadThumbnail() {
      DataService.upload("uploadThumbnail", this.formData).then((response) => {
        this.thumbnail = response.data.location;
        this.formData = new FormData();
      });
    },

    save() {
      const data = {
        tutorial_id: this.$route.params.tutorialId,
        title: this.title,
        subject: this.subject,
        description: this.description,
        published: this.published,
        thumbnail: this.thumbnail,
      };
      DataService.put("tutorial/editTutorial", data).then((response) => {
        console.log(response.data);
        alert("success");
      });
    },
  },
};
</script>
