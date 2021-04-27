<template>
  <v-container
    ><v-container>
      Tutorial Information
      <v-card class="pa-5">
        <v-row>
          <v-col col="9" class="px-5 pt-5">
            <v-text-field v-model="title" label="Title" type="text" clearable>
            </v-text-field>
          </v-col>
          <v-col col="3" class="px-5 pt-5">
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
          <v-col col="3" class="px-5">
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
          <v-col col="9" class="px-5">
            <v-textarea
              v-model="description"
              label="Description"
              type="text"
              clearable
            ></v-textarea>
          </v-col>
        </v-row>
        <v-row>
          <v-col col="3">
            <v-form enctype="multipart/form-data">
              <v-card-title>Upload Thumbnail</v-card-title>
              <v-file-input
                class="pl-4"
                label="File input"
                prepend-icon="mdi-camera"
                accept="image/*"
                @change="fileChange"
              />
            </v-form>
          </v-col>
        </v-row>
        <div>
          <v-card-title>Preview</v-card-title>
        </div>
        <v-row justify="center">
          <v-col col="3" class="pl-6">
            <div v-if="loading">
              <v-progress-circular
                indeterminate
                color="primary"
              ></v-progress-circular>
            </div>
            <div v-else>
              <v-img max-width="500px" v-if="thumbnail" :src="thumbnail" />
              <v-img
                max-width="500px"
                v-else
                src="../../assets/Homepage/1.jpg"
              />
            </div>
          </v-col>
        </v-row>
        <v-row justify="center">
          <v-btn rounded color="#99CFEA" class="black--text my-5" @click="save"
            >Save</v-btn
          ></v-row
        >
      </v-card>
    </v-container>
    <v-container> </v-container></v-container
></template>

<script>
import DataService from "../../services/DataService";
//import authHeader from "../../services/auth-header.js";
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
      //noThumbnail: "",
      publishedlist: [
        { text: "published", value: 1 },
        { text: "not published", value: 0 },
      ],
      rules: {
        required: (value) => !!value || "Required",
      },
      loading: false,
      tempsrc: null,
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
        //if (this.thumbnail == "") this.noThumbnail = true;
        //console.log(this.noThumbnail);
      });
    },

    fileChange(file) {
      if (file != null) {
        console.log(file);
        this.loading = true;
        this.formData.append("file", file);
        DataService.uploadThumbnail(this.formData).then((response) => {
          this.thumbnail = response.data.location;
          this.formData = new FormData();
          this.loading = false;
        });
      } else {
        alert("No file selected!");
      }
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
      DataService.put(
        "tutorial/editTutorial",
        data
        //,
        //{
        //  headers: authHeader(),
        //}
      ).then((response) => {
        console.log(response.data);
        alert("Saved successfully!");
        // this.$emit("changeID");
      });
    },
  },
};
</script>
