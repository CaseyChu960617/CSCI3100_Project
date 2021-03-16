<template>
  <v-layout class="mt-8" justify-center>
    <v-flex xs12 sm8 md3>
      <v-card class="elevation-12">
        <v-toolbar dark>
          <v-toolbar-title>Sign In</v-toolbar-title>
          <v-spacer></v-spacer>
        </v-toolbar>
        <v-card-text>
          <v-form>
            
            <v-text-field
              prepend-icon="mdi-account"
              v-model="email"
              label="Email"
              type="text"
              @keypress.enter="signin"
            ></v-text-field>
            <v-text-field
              prepend-icon="mdi-lock"
              v-model="password"
              label="Password"
              type="password"
              @keypress.enter="signin"
            ></v-text-field>
          </v-form>
        </v-card-text>
        <v-card-actions>
          <div v-if="message" class="ml-4 mb-2 red--text">
            {{ message }}
          </div>
          <v-spacer></v-spacer>
          <v-btn dark @click="signin"  class="mr-4 mb-2">Sign In</v-btn>
        </v-card-actions>
      </v-card>
    </v-flex>
  </v-layout>
</template>

<script>
export default {
  data() {
    return {
      email: null,
      password: null,
      message: "",
    };
  },
  created: function () {
    this.$store.dispatch("auth/signout");
  },
  methods: {
    signin() {
      this.$store
        .dispatch("auth/signin", {
          email: this.email,
          password: this.password,
        })
        .then(() => {
          this.$router.push("/profile");
        })
        .catch((err) => {
          this.message = err.response.data.error;
          this.password = "";
        });
    },
  },
};
</script>
