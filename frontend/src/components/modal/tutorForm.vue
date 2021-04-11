<template>
  <v-dialog v-model="dialog" max-width="40%" @click:outside="close">
    <v-card>
      <v-card-title class="headline">
        Create your own Tutorial<v-spacer /><v-btn icon @click="close"
          ><v-icon>mdi-close</v-icon></v-btn
        >
      </v-card-title>
      <v-card-text>
        <v-container>
          <v-form v-model="isValid">
            <v-row>
              <v-col cols="12">
                <v-text-field
                  v-model="title"
                  label="Title"
                  :rules="[rules.required]"
                ></v-text-field>
              </v-col>
              <v-col cols="12">
                <v-select
                  v-model="subject"
                  :items="subjects"
                  label="Subject"
                  :rules="[rules.required]"
                ></v-select>
              </v-col>
              <v-col cols="12">
                <v-textarea
                  v-model="description"
                  label="Description"
                  hint="Briefly describe the tutorial"
                  :rules="[rules.required]"
                ></v-textarea>
              </v-col>
            </v-row>
          </v-form>
        </v-container>
      </v-card-text>
      <v-card-actions>
        <v-spacer />
        <div>
          <!--<v-btn color="blue darken-1" text @click="close">Preview</v-btn>-->
          <v-btn color="blue darken-1" text @click="create" :disabled="!isValid"
            >Start creating</v-btn
          >
        </div>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
import subjectsList from "../../assets/subjects.json";
import DataService from "../../services/DataService";

export default {
  props: ["dialog", "editedItem"],
  data() {
    return {
      Item: {},
      isValid: false,
      rules: {
        required: (value) => !!value || "Required",
      },
      subjects: subjectsList,
      title: null,
      subject: null,
      description: null,
    };
  },
  computed: {
    currentUser() {
      return this.$store.state.auth.user;
    },
  },
  created: function() {
    if (Object.keys(this.editedItem).length > 0) {
      Object.assign(this.Item, this.editedItem);
    }
  },
  methods: {
    close() {
      this.$emit("show", false);
    },
    create() {
      this.$emit("update:editedItem", this.Item);
      this.$emit("submit");
      console.log(this.title);
      console.log(this.subject);
      console.log(this.description);
      const data = {
        uid: this.currentUser.uid,
        title: this.title,
        subject: this.subject,
        description: this.description,
      };
      DataService.post("tutorial/createTutorial", data).then((response) => {
        console.log(response.data);
        let tutorialId = response.data._id;
        console.log("tutorialId:" + tutorialId);
        this.$router.push({
          name: "editTutorial",
          params: { tutorialId: tutorialId },
        });
      });
    },
  },
};
</script>
