<template>
  <v-container>
    <v-row justify="center">
      <EditProfile v-if="edit" @switchform="switchform" />
      <ChangePassword v-else @switchform="switchform" />
    </v-row>
  </v-container>
</template>

<script>
import EditProfile from "../components/profile/editProfile.vue";
import ChangePassword from "../components/profile/changePassword.vue";
import DataService from "../services/DataService";
import authHeader from "../services/auth-header.js";

export default {
  components: {
    EditProfile,
    ChangePassword,
  },
  data() {
    return {
      edit: true,
    };
  },
  methods: {
    editProfile() {
      this.$router.push({ path: "/editProfile" });
    },
    changePassword() {},
    saveProfile() {
      DataService.updateProfile(this.account, {
        headers: authHeader(),
      })
        .then((response) => {
          console.log(response.data);
        })
        .catch((err) => {
          console.log(err);
          if (err.response.status == 401 || err.response.status == 403) {
            alert("Please Login again");
            this.$router.push("/home");
          } else {
            alert(err.response.data.message);
          }
        });
    },
    switchform() {
      this.edit = !this.edit;
    },
  },
};
</script>
