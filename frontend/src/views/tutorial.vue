<template>
  <v-container fluid class="pa-0">
    <v-row no-gutters>
      <v-spacer />
      <v-col md="3" class="hidden-sm-and-down">
        <v-card elevation="16">
          <v-card-title
            >Tutorial<v-spacer /><v-btn icon @click.stop="dialog = true"
              ><v-icon>mdi-plus</v-icon></v-btn
            ></v-card-title
          >
          <modal
            :dialog.sync="dialog"
            :editedItem="editedItem"
            :title="`${title}`"
            @show="show"
            @submit="save()"
          ></modal>
          <v-divider />
          <v-virtual-scroll
            bench="25"
            min-height="83vh"
            max-height="83vh"
            item-height="75"
            :items="items"
          >
            <template v-slot:default="{ item }">
              <v-list-item :key="item">
                <v-list-item-content>
                  <v-list-item-title class="text-wrap">
                    <strong>ID {{ item }}</strong>
                  </v-list-item-title>
                </v-list-item-content>
              </v-list-item>
              <v-divider />
            </template>
          </v-virtual-scroll>
        </v-card>
      </v-col>
      <v-col md="6" sm="12"
        ><v-card tile elevation="16" outlined height="100%">
          <v-card-text>content</v-card-text>
        </v-card></v-col
      ><v-spacer />
    </v-row>
  </v-container>
</template>

<script>
import modal from "../components/modal/tutor.vue";

export default {
  components: {
    modal,
  },
  data() {
    return {
      title: "",
      dialog: false,
      load: true,
      editedItem: {},
    };
  },
  computed: {
    items() {
      return Array.from({ length: 20 }, (k, v) => v + 1);
    },
  },
  methods: {
    show(bool) {
      this.dialog = bool;
    },
  },
};
</script>