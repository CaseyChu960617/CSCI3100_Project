<template>
  <v-container
    ><v-container>
      Tutorial metaData:
      <v-card class="pa-5">
        <v-row>
          <v-col col="9">
            <v-text-field v-model="title" label="title" type="text" clearable>
            </v-text-field>
          </v-col>
          <v-col col="3">
            <v-select
              v-model="published"
              :items="publishedlist"
              item-text="text"
              item-value="value"
              label="publish?"
              clearable
              :rules="[rules.required]"
            ></v-select>
          </v-col>
        </v-row>
        <v-row>
          <v-col col="9">
            <v-textarea
              v-model="description"
              label="description"
              type="text"
              clearable
            ></v-textarea>
          </v-col>
        </v-row>

        <v-form enctype="multipart/form-data">
          Upload thumbnail
          <input name="file" single type="file" @change="fileChange" />
          <v-btn @click="uploadProPic">Upload</v-btn>
        </v-form>
        <v-avatar size="200" v-if="src">
          <v-img :src="src" height="100%" />
        </v-avatar>
        <v-btn @click="save">Save</v-btn>
      </v-card>
    </v-container>
    <v-container> </v-container></v-container
></template>

<script>
import DataService from "../../services/DataService";
export default {
  components: {},
  data() {
    return {
      title: "",
      description: "",
      thumbnail: "",
      published: "",
      publishedlist: [
        { text: "publish", value: true },
        { text: "not publish", value: false },
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
      });
    },
  },
};
</script>
