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
    //store the data of current user
    currentUser() {
      return this.$store.state.auth.user;
    },
  },

  methods: {
    //emit an event to close the tutorial form when user leaves
    close() {
      this.$emit("show", false);
    },
    //functio to create a new tutorial
    create() {
      this.$emit("update:editedItem", this.Item);
      this.$emit("submit");
      const data = {
        user_id: this.currentUser.user_id,
        title: this.title,
        subject: this.subject,
        description: this.description,
      };

      // Do a post request to create a new tutorial.
      DataService.post("tutorial/createTutorial", data)
        .then((response) => {
          let tutorialId = response.data;
          console.log("tutorialId is" + tutorialId);
          this.$router.push({
            name: "editTutorial",
            params: { tutorialId: tutorialId },
          });
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
