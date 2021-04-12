<template>
  <v-container fluid class="pa-5">
    <v-card
      class="header pa-3"
      style="
        height: 65px;
        background: white;
        z-index: 5;
        border-bottom-left-radius: 0px;
        border-bottom-right-radius: 0px;
      "
    >
      <div>
        <span class="mr-2">
          <v-avatar size="45" v-if="chatOpp.profileImage">
            <v-img :src="chatOpp.profileImage" height="100%" />
          </v-avatar>
          <v-avatar v-else color="grey" size="45">
            <span class="white--text headline"> {{ chatOpp.username[0] }}</span>
          </v-avatar> </span
        >{{ chatOpp.username }}
      </div>
    </v-card>
    <v-card
      max-height="calc(70vh - 60px)"
      min-height="calc(70vh - 60px)"
      style="overflow-y: scroll; width: 100%; padding: 12px"
      class="scroll-bar blue-grey lighten-5 ml-auto mr-auto"
      elevation="16"
      v-bind:style="messages.length == 0 ? 'display:flex' : ''"
      ><!--max-width:400px;-->

      <v-container
        v-if="messages.length == 0"
        align="center"
        justify="center"
        style="align-self: center; text-align: center"
        ;
      >
        展開激情對話
      </v-container>

      <v-row justify="space-around d-flex flex-column">
        <v-card v-for="message in messages" :key="message.timestamp" flat>
          <v-list-item
            :key="message.timestamp"
            v-if="message.sender.username.localeCompare(currentUser.username)"
            class="blue-grey lighten-5"
          >
            <v-list-item-avatar size="50" class="align-self-start mr-2">
              <v-avatar size="50" v-if="chatOpp.profileImage">
                <v-img :src="chatOpp.profileImage" height="100%" />
              </v-avatar>
              <v-avatar v-else color="grey" size="50">
                <span class="white--text headline">
                  {{ chatOpp.username[0] }}</span
                >
              </v-avatar>
            </v-list-item-avatar>
            <div
              class="received-message"
              style="
                align-items: center;
                align-self: center;
                display: flex;
                flex-wrap: wrap;
                flex: 1 1;
                overflow: hidden;
                padding: 12px 0;
              "
            >
              <v-card color="#808080" class="flex-none">
                <v-card-text class="white--text pa-2 d-flex flex-column">
                  <span class="text-caption"
                    >{{ message.sender.username }}
                  </span>
                  <span
                    class="align-self-start text-subtitle-1"
                    style="max-width: 100%"
                    >{{ message.message }}</span
                  >
                  <span class="text-caption font-italic align-self-end">{{
                    message.timestamp
                  }}</span>
                </v-card-text>
              </v-card>
            </div>
          </v-list-item>
          <v-list-item
            v-else
            :key="message.timestamp"
            class="blue-grey lighten-5"
          >
            <div
              class="sent-message justify-end"
              style="
                align-items: center;
                align-self: center;
                display: flex;
                flex-wrap: wrap;
                flex: 1 1;
                overflow: hidden;
                padding: 12px 0;
              "
            >
              <v-card color="primary" class="flex-none">
                <v-card-text class="white--text pa-2 d-flex flex-column">
                  <span class="text-caption"
                    >{{ message.sender.username }}
                  </span>
                  <span class="text-subtitle-1 chat-message">{{
                    message.message
                  }}</span>
                  <span class="text-caption font-italic align-self-end">{{
                    message.timestamp
                  }}</span>
                </v-card-text>
              </v-card>
            </div>
            <v-list-item-avatar size="50" class="align-self-start ml-2">
              <v-avatar size="50" v-if="currentUser.profileImage">
                <v-img :src="currentUser.profileImage" height="100%" />
              </v-avatar>
              <v-avatar v-else color="grey" size="50">
                <span class="white--text headline">
                  {{ currentUser.username[0] }}</span
                >
              </v-avatar>
            </v-list-item-avatar>
          </v-list-item>
        </v-card>
      </v-row>
    </v-card>
    <!--<ul class="list-group list-group-flush ">-->
    <!--<small class="text-white">{{ currentUser.username }} is typing</small>
        <li
          class="list-group-item"
          v-for="(message, index) in messages"
          v-bind:key="index"
        >
          <span>
            {{ message.user }}
            <small>:{{ message.message }}</small>
          </span>
        </li>
        </ul>-->
    <!--  <v-virtual-scroll :items="messages" height="300" item-height="64">
        <template v-slot:default="{ item }">
          <v-list-item :key="item">
            <v-list-item-action>
              <v-btn fab small depressed color="primary"> </v-btn>
            </v-list-item-action>

            <v-list-item-content>
              <v-list-item-title>
                {{ item.message }}
              </v-list-item-title>
            </v-list-item-content>

            <v-list-item-action>
              <v-icon small>
                {{ item.user }}
              </v-icon>
            </v-list-item-action>
          </v-list-item>

          <v-divider></v-divider>
        </template>
      </v-virtual-scroll>-->

    <v-card
      style="width: 100%; padding: 12px; margin-right: auto; margin-left: auto"
      class="scroll-bar blue-grey lighten-5 nl-auto mr-auto"
      elevation="16"
    >
      <form @submit.prevent="send">
        <div>
          <v-row>
            <v-col>
              <v-text-field
                type="text"
                class="form control mx-2"
                v-model="newMessage"
                label="展開激情對話"
              ></v-text-field>
            </v-col>
            <v-btn
              class="mr-4"
              elevation="2"
              color="primary"
              v-on:click="send"
              justify="center"
              align="center"
              style="text-align: center; display: inline; align-self: center"
              >Send</v-btn
            >
          </v-row>
        </div>
      </form>
    </v-card>
  </v-container>
</template>

<script>
//import io from "socket.io-client";
import DataService from "../../services/DataService";

export default {
  props: ["chatId", "socket", "oppUsername"],
  computed: {
    currentUser() {
      return this.$store.state.auth.user;
    },
  },

  data() {
    return {
      loading: false,
      //oppID: this.$route.params.oppId,
      newMessage: null,
      messages: [],
      //make connection to socket io
      userA: null,
      userB: null,
      chatOpp: null,
      options: {
        weekday: "long",
        year: "numeric",
        month: "numberic",
        day: "numeric",
      },
    };
  },

  methods: {
    send() {
      if (this.newMessage != null) {
        console.log("chat id is ", this.chatId);
        this.socket.emit(
          "send",
          {
            chatId: this.chatId,
            sender: {
              _id: this.currentUser.user_id,
              username: this.currentUser.username,
              profileImage: this.currentUser.profileImage,
            },
            message: this.newMessage,
            timestamp: new Date().toLocaleString("zh-HK"),
          },
          this.chatId
        );
        const scrollbar = document.querySelector(".scroll-bar");
        scrollbar.scrollTo(0, scrollbar.scrollHeight);
      }
    },

    getOneChat() {
      this.loading = true;
      console.log(this.chatId);
      //const data = {
      //  uid_1: this.currentUser.uid,
      //  uid_2: this.oppId,
      //};
      DataService.get("chat/getOneChat", this.chatId)
        .then((response) => {
          console.log(response.data.messages);
          this.messages = response.data.messages;
          this.loading = false;

          if (response.data.userA._id == this.currentUser.uid)
            this.chatOpp = response.data.userB;
          else this.chatOpp = response.data.userA;
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
  },

  watch: {
    chatId() {
      this.getOneChat();
    },
  },

  created() {
    this.getOneChat();
  },

  mounted() {
    //this.socket.emit("joinRoom", {
    //  chatId: this.chatId,
    //  sender: this.currentUser.username,
    //});

    console.log("Join " + this.chatId + " Room");

    this.socket.on("updateMessage", (data) => {
      //pushed to daatbsae

      this.messages = [...this.messages, data];
      console.log(this.newMessage);
      this.newMessage = null;
    });
  },
};
</script>
