<template>
  <v-card>
    <v-toolbar flat>
      <v-toolbar-title
        class="display-1 pl-3 mt-5"
        style=" white-space: break-spaces;"
        id="mem-reg"
        >Member Registration</v-toolbar-title
      >
    </v-toolbar>
    <v-card-text>
      <v-form v-model="isValid">
        <v-container>
          <v-row>
            <v-col md="4" class="col-12">
              <v-text-field
                v-model="account.firstname"
                label="First Name"
                type="text"
                clearable
                :rules="[rules.required]"
              ></v-text-field>
            </v-col>
            <v-col md="4" class="col-12"
              ><v-text-field
                v-model="account.lastname"
                label="Last Name"
                type="text"
                clearable
                :rules="[rules.required]"
              ></v-text-field>
            </v-col>
            <v-col md="4" class="col-12"
              ><v-select
                v-model="account.gender"
                :items="genderlist"
                item-text="text"
                item-value="value"
                label="Gender"
                clearable
                :rules="[rules.required]"
              ></v-select> </v-col
          ></v-row>
          <v-text-field
            v-model="account.username"
            label="Username"
            type="text"
            clearable
            :counter="10"
            maxlength="10"
          ></v-text-field>
          <v-text-field
            v-model="email"
            label="Link Email"
            type="text"
            suffix="@link.cuhk.edu.hk"
            clearable
            :rules="[rules.required]"
          ></v-text-field>
          <v-row>
            <v-col md="5" class="col-12">
              <v-text-field
                v-model="account.password"
                label="Password"
                clearable
                :rules="[rules.required, rules.min]"
                @keypress.enter="signin"
                :append-icon="show1 ? 'mdi-eye' : 'mdi-eye-off'"
                :type="show1 ? 'text' : 'password'"
                @click:append="show1 = !show1"
                hint="At least 8 characters"
              ></v-text-field
            ></v-col>
            <v-spacer />
            <v-col md="5" class="col-12">
              <v-text-field
                v-model="repeatpassword"
                label="Repeat Password"
                clearable
                :rules="[rules.required, rules.repeat]"
                @keypress.enter="signin"
                :append-icon="show1 ? 'mdi-eye' : 'mdi-eye-off'"
                :type="show1 ? 'text' : 'password'"
                @click:append="show1 = !show1"
              ></v-text-field></v-col
          ></v-row>
        </v-container>
      </v-form>
    </v-card-text>
    <div v-if="message" class="ml-4 mb-2 red--text">
      {{ message }}
    </div>
    <div class="mx-4 py-2">
      <v-btn
        rounded
        block
        @click="signup"
        class="my-4 black--text"
        color="#99CFEA"
        :disabled="!isValid"
        >Register</v-btn
      >
      <v-btn
        rounded
        block
        @click="back"
        class="my-4 black--text"
        color="#99CFEA"
        >Back</v-btn
      >
    </div>
  </v-card>
</template>
<style>
@media screen and (max-width: 392px) {
  #mem-reg {
    white-space: break-spaces;
    font-size: 30px !important;
  }
}
#mem-reg {
  padding-top: 25px;
}
</style>

<script>
import DataService from "../../services/DataService";

export default {
  data() {
    return {
      account: {
        firstname: "",
        lastname: "",
        gender: "",
        username: "",
        email: "",
        password: "",
      },
      email: "",
      repeatpassword: "",
      genderlist: [
        { text: "Male", value: 1 },
        { text: "Female", value: 2 },
        { text: "Prefer not to disclose", value: 3 },
      ],
      message: "",
      isValid: false,
      show1: false,
      rules: {
        min: (value) => value.length >= 8 || "Min 8 characters",
        required: (value) => !!value || "Required",
        repeat: (value) =>
          value == this.account.password || "Password doesn't match",
      },
    };
  },
  methods: {
    //function to signup
    signup() {
      // The email has to be cuhk link email.
      this.account.email = this.email + "@link.cuhk.edu.hk";

      // Do post request with the inputs
      DataService.post("auth/signup", this.account)
        .then((response) => {
          // Store accessToken and other user information to local storage
          if (response.data.accessToken) {
            localStorage.setItem("user", JSON.stringify(response.data));
          }
          this.$store.dispatch("auth/registered", response.data);
          //this.$router.push("/profile");
        })
        .catch((err) => {
          if (err.response.status == 400) {
            this.message = err.response.data.message;
          }
        });
    },
    //swtich form and render the original signin view
    back() {
      this.$emit("switchform");
    },
  },
};
</script>
