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
                  v-model="editedItem.title"
                  label="Title"
                  :rules="[rules.required]"
                ></v-text-field>
              </v-col>
              <v-col cols="12">
                <v-text-field
                  v-model="editedItem.title"
                  label="Subject"
                  :rules="[rules.required]"
                ></v-text-field>
              </v-col>
              <v-col cols="12">
                <v-textarea
                  v-model="editedItem.content"
                  label="Description"
                ></v-textarea>
              </v-col>
            </v-row>
          </v-form>
        </v-container>
      </v-card-text>
      <v-card-actions>
        <v-spacer />
        <div>
          <v-btn color="blue darken-1" text @click="close">Preview</v-btn>
          <v-btn color="blue darken-1" text @click="save" :disabled="!isValid"
            >Post</v-btn
          >
        </div>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
export default {
  props: ["dialog", "editedItem", "title"],
  data() {
    return {
      Item: {},
      isValid: false,
      rules: {
        required: (value) => !!value || "Required",
      },
    };
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
    save() {
      this.$emit("update:editedItem", this.Item);
      this.$emit("submit");
    },
  },
};
</script>
