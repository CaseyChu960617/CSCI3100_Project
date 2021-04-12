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
    switchform() {
      this.edit = !this.edit;
    },
  },
};
</script>
