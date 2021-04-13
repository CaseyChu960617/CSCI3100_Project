<template>
  <v-col cols="12" sm="12" md="10">
    <v-card elevation="16" outlined>
      <v-card-title class="display-1 pa-5">
        <v-icon class="pr-3" color="black" size="40">mdi-account-cog</v-icon
        >Profile</v-card-title
      >
      <v-container>
        <v-row
          ><v-col cols="12" sm="12" md="4" align-self="center"
            ><v-row justify="center"
              ><v-avatar
                v-if="account.profileImage"
                size="200"
                style="cursor: pointer"
                @click.stop="dialog = true"
              >
                <v-img :src="account.profileImage" height="100%" />
              </v-avatar>
              <v-avatar
                v-else
                color="grey"
                size="200"
                @click.stop="dialog = true"
              >
                <span class="white--text headline">
                  {{ account.username[0] }}</span
                >
              </v-avatar></v-row
            >
            <v-row justify="center"> </v-row></v-col
          ><v-col cols="12" sm="12" md="8">
            <v-container>
              <v-text-field
                readonly
                v-model="account.email"
                label="Email"
              ></v-text-field>
              <v-text-field
                readonly
                v-model="account.username"
                label="Username"
              ></v-text-field>
              <v-row>
                <v-col cols="6">
                  <v-text-field
                    readonly
                    v-model="account.firstname"
                    label="Firstname"
                  ></v-text-field>
                </v-col>
                <v-col cols="6">
                  <v-text-field
                    readonly
                    v-model="account.lastname"
                    label="Lastname"
                  ></v-text-field> </v-col
              ></v-row>
              <v-text-field
                readonly
                v-model="genderlist[account.gender - 1]"
                label="Gender"
              ></v-text-field>
              <v-row class="my-3">
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
                <v-btn text class="ml-4" v-else @click="follow()">Follow</v-btn>
              </v-row></v-container
            ></v-col
          ></v-row
        >
      </v-container>
    </v-card>
  </v-col>
</template>

<script>
import DataService from "../services/DataService";
//import authHeader from "../services/auth-header.js";
export default {
  data() {
    return {
      account: "",
      followed: null,
      genderlist: ["Male", "Female", "Prefer not to disclose"],
    };
  },
  computed: {
    currentUser() {
      return this.$store.state.auth.user;
    },
  },
  created() {
    if (this.$route.params.user_id === undefined)
      alert("User profile does not exist.");
    else this.fetchProfile();
  },

  methods: {
    fetchProfile() {
      console.log(this.$route.params.user_id);
      //this.uid = this.$route.params.uid;

      DataService.get("user/getProfile", this.$route.params.user_id)
        .then((response) => {
          this.account = response.data;
          console.log(response.data);
        })
        .then(() => {
          console.log(this.currentUser.following);
          this.checkFollowed();
        });
    },

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
