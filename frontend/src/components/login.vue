<template>
  <v-layout class="mt-8" justify-center>
    <v-flex xs12 sm8 md4>
      <v-card class="elevation-12">
        <v-toolbar dark>
          <v-toolbar-title>Login form</v-toolbar-title>
          <v-spacer></v-spacer>
        </v-toolbar>
        <v-card-text>
          <v-form>
            <v-text-field
              prepend-icon="mdi-account"
              v-model="username"
              label="Username"
              type="text"
            ></v-text-field>
            <v-text-field
              prepend-icon="mdi-lock"
              v-model="password"
              label="Password"
              type="password"
            ></v-text-field>
          </v-form>
        </v-card-text>
        <v-card-actions>
          <div v-if="message" class="ml-4 mb-2 red--text">
            {{ message }}
          </div>
          <v-spacer></v-spacer>
          <v-btn dark @click="logIn" class="mr-4 mb-2">Login</v-btn>
        </v-card-actions>
      </v-card>
    </v-flex>
  </v-layout>
</template>

<script>
export default {
  data() {
    return {
      username: null,
      password: null,
      message: "",
    };
  },
  created: function () {
    this.$store.dispatch("auth/logout");
  },
  methods: {
    logIn() {
      this.$store
        .dispatch("auth/login", {
          username: this.username,
          password: this.password,
        })
        .then(() => {
          this.$router.push("/user");
        })
        .catch((err) => {
          this.message = err.response.data.message;
          this.password = "";
        });
    },
  },
};
</script>
