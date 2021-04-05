<template>
  <v-container fluid class="pa-0">
    <v-row no-gutters>
      <v-spacer />
      <v-col mt="5" md="3" class="hidden-sm-and-down mt-5">
        <v-card elevation="16">
          <v-card-title>Chat list</v-card-title>
          <v-divider />
          <v-virtual-scroll
            bench="25"
            min-height="74vh"
            max-height="74vh"
            item-height="70"
            :items="chats"
          >
            <template v-slot:default="{ item }">
              <v-list-item @click="selectChat(item._id)">
                <v-list-item-content>
                  <v-list-item-title class="text-wrap">
                    <strong>{{ item.user.username }}</strong>
                  </v-list-item-title>
                </v-list-item-content>
              </v-list-item>
              <v-divider />
            </template>
          </v-virtual-scroll>
        </v-card>
      </v-col>

      <v-col cols="12" md="6" sm="12"
        ><chat :chatId="chatId" v-if="chatId" /><v-card v-else
          >No chat</v-card
        ></v-col
      ><v-spacer />
    </v-row>
  </v-container>
</template>

<script>
import DataService from "../services/DataService";
//import authHeader from "../services/auth-header.js";
import chat from "../components/chat/chat.vue";

export default {
  components: { chat },
  data() {
    return { chats: [], loading: true, chatId: null };
  },
  created() {
    this.fetchChatList();
  },
  computed: {
    items() {
      return Array.from({ length: 20 }, (k, v) => v + 1);
    },
  },
  methods: {
    fetchChatList() {
      this.loading = true;
      //console.log(this.$store.state.auth.user.uid);
      DataService.get("chat/getAllChats", this.$store.state.auth.user.uid)
        .then((response) => {
          console.log(response.data);
          const rawData = response.data;

          rawData.forEach((element) => {
            if (element.userA._id == this.$store.state.auth.user.uid) {
              this.chats.push({ user: element.userB, _id: element._id });
            } else {
              this.chats.push({ user: element.userA, _id: element._id });
            }
          });
          console.log(this.chats[0]);
          this.loading = false;
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

    selectChat(id) {
      this.chatId = id;
      console.log("chatId is ", this.chatId);
    },
  },
};
</script>
