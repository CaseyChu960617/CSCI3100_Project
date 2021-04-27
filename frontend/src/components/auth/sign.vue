<template>
  <v-container fluid class="mt-4">
    <div v-if="!signup">
      <v-row>
        <v-spacer />
        <v-col md="6" sm="12"><Carousel /> </v-col>
        <v-col md="4" sm="12"><Signin @switchform="switchform" /> </v-col
        ><v-spacer />
      </v-row>
    </div>
    <div v-else>
      <v-row justify="center">
        <v-col cols="6">
          <Signup @switchform="switchform" />
        </v-col>
      </v-row>
    </div>
  </v-container>
</template>

<script>
import Signin from "./signin.vue";
import Signup from "./signup.vue";
import Carousel from "../carousel.vue";

export default {
  components: {
    Signin,
    Signup,
    Carousel,
  },
  data() {
    return {
      signup: false,
    };
  },
  methods: {
    switchform() {
      this.signup = !this.signup;
      console.log(this.signup);
    },
  },
};
</script>
