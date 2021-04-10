<template>
  <v-container>
    <v-card> </v-card>
    <v-row justify="center">
      <v-col sm="11">
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

        <!-- <v-divider />
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
          </v-virtual-scroll> -->

        <!-- <v-col md="6" sm="12"
        ><v-card tile elevation="16" outlined height="100%">
          <v-card-text>content</v-card-text>
        </v-card></v-col
      ><v-spacer />-->
        <v-container>
          <v-row>
            <v-col
              cols="12"
              sm="6"
              md="4"
              v-for="tutorial in tutorials"
              :key="tutorial"
            >
              <v-card elevation="8">
                <v-img src="../assets/Homepage/1.jpg"></v-img>
                <v-card-title>Tutorial Title</v-card-title>
                <v-card-text>Subject </v-card-text>
                <v-card-text> Instructor </v-card-text>
              </v-card>
            </v-col>
          </v-row>
        </v-container>
      </v-col>
    </v-row>

    <v-speed-dial
      v-model="fab"
      :top="top"
      :bottom="bottom"
      :right="right"
      :left="left"
      :direction="direction"
      :open-on-hover="hover"
      :transition="transition"
    >
      <v-btn
        id="main-btn"
        slot="activator"
        v-model="fab"
        color="#99CFEA"
        dark
        fab
        @click="toggle()"
      >
        <v-icon v-if="buttonClose == -1" color="black">mdi-menu</v-icon>
        <v-icon v-if="buttonClose == 1" color="black">mdi-close</v-icon>
      </v-btn>
      <v-btn
        class="extended mr-0"
        fab
        dark
        small
        color="#1F5A98"
        width="185px"
        @click.stop="dialog = true"
      >
        <!--<v-icon style="float:left">mdi-plus</v-icon>-->
        Create tutorial
      </v-btn>
      <v-btn class="extended mr-0" fab dark small color="#1F5A98" width="185px">
        <!--<v-icon style="float:left">mdi-book-open-blank-variant</v-icon>-->View
        my tutorials
      </v-btn>
    </v-speed-dial>
  </v-container>
</template>
<style>
.v-speed-dial {
  position: sticky !important;
  right: 15vw;
  bottom: 10vh;
}
#create .v-btn--floating {
  position: relative;
}

#main-btn {
  position: relative;
  float: right;
}
.v-btn.extended {
  width: 150px;
  margin-right: 75px;
  border-radius: 25px;
  align-content: left;
}
.v-speed-dial__list {
  align-items: flex-end !important;
}
</style>
<script>
import modal from "../components/modal/tutorForm.vue";

export default {
  components: {
    modal,
  },
  data() {
    return {
      tutorials: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 12, 12],
      title: "",
      dialog: false,
      load: true,
      editedItem: {},
      buttonClose: -1,
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
    toggle() {
      this.buttonClose *= -1;
    },
  },
};
</script>
