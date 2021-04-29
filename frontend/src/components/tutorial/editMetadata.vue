<template>
  <v-container class="meta-data-container">
    <v-container class="meta-data-container">
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
<style>
.meta-data-container {
  max-width: none !important;
}
</style>
<script>
import DataService from "../../services/DataService";
import subjectsList from "../../assets/subjects.json";

export default {
  components: {},
  data() {
    return {
      formData: new FormData(), //define a formData for form inpp=ut
      subjects: subjectsList,
      title: "",
      subject: "",
      description: "",
      thumbnail: "",
      published: "",
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
    // Fetch tutorial information when the editMeta component is created.
    this.fetchTutorial();
  },

  methods: {
    // Function to fetch tutorial information
    fetchTutorial() {
      // Do a get request to fetch certain tutorial information
      DataService.get(
        "tutorial/getOneTutorial",
        this.$route.params.tutorialId
      ).then((response) => {
        const rawData = response.data;
        this.title = rawData.title;
        this.subject = rawData.subject;
        this.description = rawData.description;
        this.published = rawData.published;
        this.thumbnail = rawData.thumbnail;
      });
    },

    fileChange(file) {
      //function to handle the change of Thumbnail
      if (file != null) {
        this.loading = true;
        this.formData.append("file", file);
        DataService.uploadThumbnail(this.formData)
          .then((response) => {
            this.thumbnail = response.data.location;
            this.formData = new FormData();
            this.loading = false;
          })
          .catch((err) => {
            // Prompt error and alert messages
            if (err.response.status == 401 || err.response.status == 403) {
              alert("Please Login again");
              // Sign out the user automatically
              this.$store.dispatch("auth/signout");
              this.$router.push("/home").catch(() => {});
            } else if (err.response.status == 400) {
              alert(err.response.data.message);
            }
          });
      } else {
        alert("No file selected!");
      }
    },

    save() {
      //update/save the edited data to database
      const data = {
        tutorial_id: this.$route.params.tutorialId,
        title: this.title,
        subject: this.subject,
        description: this.description,
        published: this.published,
        thumbnail: this.thumbnail,
      };

      // Do a put request to update tutorial information to server and database
      DataService.put("tutorial/editTutorial", data)
        .then(() => {
          alert("Saved successfully!");
        })
        .catch((err) => {
          // Prompt error and alert messages
          if (err.response.status == 401 || err.response.status == 403) {
            alert("Please Login again");
            // Sign out the user automatically
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
