<template>
  <v-card>
    <v-toolbar flat>
      <v-toolbar-title class="display-1 pt-4 pl-4"
        >Member Registration</v-toolbar-title
      >
    </v-toolbar>
    <v-card-text>
      <v-form v-model="isValid">
        <v-container>
          <v-row>
            <v-col cols="4">
              <v-text-field
                v-model="account.firstname"
                label="First Name"
                type="text"
                clearable
                :rules="[rules.required]"
              ></v-text-field>
            </v-col>
            <v-col cols="4"
              ><v-text-field
                v-model="account.lastname"
                label="Last Name"
                type="text"
                clearable
                :rules="[rules.required]"
              ></v-text-field>
            </v-col>
            <v-col cols="4"
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
            :rules="[rules.required]"
          ></v-text-field>
          <v-text-field
            v-model="account.email"
            label="Link Email"
            type="text"
            suffix="@link.cuhk.edu.hk"
            clearable
            :rules="[rules.required]"
          ></v-text-field>
          <v-row>
            <v-col cols="5">
              <v-text-field
                v-model="account.password"
                label="Password"
                clearable
                :rules="[rules.required]"
                @keypress.enter="signin"
                :append-icon="show1 ? 'mdi-eye' : 'mdi-eye-off'"
                :type="show1 ? 'text' : 'password'"
                @click:append="show1 = !show1"
              ></v-text-field
            ></v-col>
            <v-spacer />
            <v-col cols="5">
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
        required: (value) => !!value || "Required",
        repeat: (value) =>
          value == this.account.password || "Password doesn't match",
      },
    };
  },
  methods: {
    signup() {
      var temp = this.account.email;
      this.account.email = this.account.email + "@link.cuhk.edu.hk";
      DataService.post("auth/signup", this.account)
        .then((res) => {
          alert(res.data.message);
          if (res.data.accessToken) {
            localStorage.setItem("user", JSON.stringify(res.data));
          }
          this.$store.dispatch("auth/registered", res.data);
          this.$router.push("/profile");
          this.account.email = temp;
        })
        .catch((err) => {
          this.message = err;
          this.account.email = temp;
        });
    },
    back() {
      this.$emit("switchform");
    },
  },
};
</script>
