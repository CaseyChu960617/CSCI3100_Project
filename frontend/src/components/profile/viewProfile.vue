<template>
  <v-col cols="12" sm="12" md="10">
    <v-card elevation="16" outlined>
      <v-card-title class="display-1 pa-10">
        <v-icon class="pr-3" color="black" size="40">mdi-account-cog</v-icon
        >Profile</v-card-title
      >
      <v-container>
        <v-row
          ><v-col cols="12" sm="12" md="4" align-self="center"
            ><v-row justify="center"
              ><v-avatar v-if="profile.profileImage" size="200">
                <v-img :src="profile.profileImage" height="100%" />
              </v-avatar>
              <v-avatar v-else color="grey" size="200">
                <span class="white--text headline"> {{ firstChar }}</span>
              </v-avatar></v-row
            ></v-col
          ><v-col cols="12" sm="12" md="8">
            <v-container>
              <!-- <v-text-field
                readonly
                v-model="profile.email"
                label="Email"
              ></v-text-field> -->
              <v-text-field
                readonly
                v-model="profile.username"
                label="Username"
                type="text"
              ></v-text-field>
              <v-row>
                <v-col cols="6">
                  <v-text-field
                    readonly
                    v-model="profile.firstname"
                    label="First Name"
                    type="text"
                  ></v-text-field>
                </v-col>
                <v-col cols="6">
                  <v-text-field
                    readonly
                    v-model="profile.lastname"
                    label="Last Name"
                    type="text"
                  ></v-text-field> </v-col
              ></v-row>
              <v-text-field
                readonly
                v-model="gender"
                label="Gender"
                type="text"
              ></v-text-field>
              <v-row class="my-1">
                <v-btn text @click="startChat(account._id)"
                  >Start chatting</v-btn
                >
                <v-btn text class="ml-4" @click="follow()">View Threads</v-btn>
                <v-btn text class="ml-4" @click="viewUserTutorials()"
                  >View Tutorials</v-btn
                >
                <v-btn text class="ml-4" v-if="followed" @click="unfollow()"
                  >Unfollow</v-btn
                >
                <v-btn text class="ml-4" v-else @click="follow()"
                  >Follow</v-btn
                ></v-row
              ></v-container
            ></v-col
          ></v-row
        >
      </v-container>
    </v-card>
  </v-col>
</template>

<script>
import DataService from "../../services/DataService";

export default {
  props: ["profile"],
  data() {
    return {
      genderlist: ["Male", "Female", "Prefer not to disclose"],
    };
  },
  computed: {
    gender() {
      return this.genderlist[this.profile.gender - 1];
    },
    firstChar() {
      var str = this.profile.username + "";
      return str.substring(0, 1);
    },
  },
  methods: {
    startChat(id) {
      var chatId = "";
      var oppUsername = this.account.username;
      DataService.post("chat/getOneChat", {
        user_id_1: this.currentUser.user_id,
        user_id_2: id,
      }).then((response) => {
        chatId = response.data._id;
        this.$router.push({
          name: "chat",
          params: { chatId: chatId, oppUsername },
        });
      });
    },

    checkFollowed() {
      this.followed = false;
      this.currentUser.following.forEach((element) => {
        if (element._id === this.account._id) {
          this.followed = true;
        }
      });
    },

    follow() {
      const data = {
        my_user_id: this.currentUser.user_id,
        follow_id: this.account._id,
      };
      DataService.put("user/follow", data).then((response) => {
        const following = [];
        response.data.forEach((element) => {
          following.push({ _id: element });
        });
        this.currentUser.following = following;
        this.checkFollowed();
      });
    },

    unfollow() {
      const data = {
        my_user_id: this.currentUser.user_id,
        follow_id: this.account._id,
      };

      DataService.put("user/unfollow", data).then((response) => {
        const following = [];
        response.data.forEach((element) => {
          following.push({ _id: element });
        });
        this.currentUser.following = following;
        this.checkFollowed();
      });
    },

    viewUserTutorials() {
      this.$router.push({
        name: "userTutorial",
        params: {
          user_id: this.account._id,
        },
      });
    },
  },
};
</script>
