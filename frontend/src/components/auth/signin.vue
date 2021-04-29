<template>
  <v-card>
    <v-toolbar flat>
      <v-toolbar-title class="display-1 pt-4 pl-4"
        >Account Login</v-toolbar-title
      >
    </v-toolbar>
    <v-card-text>
      <v-form v-model="isValid">
        <v-text-field
          prepend-icon="mdi-account"
          v-model="email"
          label="Email"
          type="text"
          :rules="[rules.required]"
        ></v-text-field>
        <v-text-field
          prepend-icon="mdi-lock"
          v-model="password"
          label="Password"
          :rules="[rules.required]"
          @keypress.enter="signin"
          :append-icon="show1 ? 'mdi-eye' : 'mdi-eye-off'"
          :type="show1 ? 'text' : 'password'"
          @click:append="show1 = !show1"
        ></v-text-field>
      </v-form>
    </v-card-text>
    <div v-if="message" class="ml-4 mb-2 red--text">
      {{ message }}
    </div>
    <div class="mx-4 py-2">
      <v-btn
        rounded
        block
        @click="signin"
        class="my-4 black--text"
        color="#99CFEA"
        >Sign In</v-btn
      >
      <v-btn
        rounded
        block
        class="mt-4 mb-8 black--text"
        color="#99CFEA"
        @click="signup"
        >Sign Up</v-btn
      >
    </div>
  </v-card>
</template>

<script>
export default {
  data() {
    return {
      email: "",
      password: "",
      message: "",
      isValid: false,
      show1: false,
      rules: {
        required: (value) => !!value || "Required",
      },
    };
  },
  methods: {
    signin() {
      // If the inputs are valid
      if (this.isValid) {
        // Do post request with the inputs
        this.$store
          .dispatch("auth/signin", {
            email: this.email,
            password: this.password,
          })
          .then(() => {
            // Redirect to home page
            this.$router.push("/home");
          })
          .catch((err) => {
            if (err.response.status == 400) {
              this.message = err.response.data.message;
            }
          });
      }
      // If the inputs are not valid.
      else this.message = "Email/Password cannot be empty.";
    },
    signup() {
      this.$emit("switchform");
    },
  },
};
</script>
