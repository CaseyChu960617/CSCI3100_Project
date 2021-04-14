<template>
  <v-container v-if="thread" fluid class="pa-0">
    <v-app-bar>
      <v-app-bar-title>
        {{ thread.title }}
      </v-app-bar-title>
    </v-app-bar>

    <v-virtual-scroll
      bench="100"
      :height="height"
      item-height="65"
      :items="tmpThread.comments"
    >
      <template v-slot:default="{ item }">
        <v-card
          v-if="item.commentSection"
          :loading="commentloading"
          outlined
          elevation="8"
          height="100%"
          class="ma-2 pt-4"
        >
          <v-card-title class="pt-0">Comment</v-card-title>
          <ckeditor
            :editor="editor"
            v-model="content"
            :config="editorConfig"
          ></ckeditor>
          <v-row justify="center">
            <v-btn
              rounded
              color="#99CFEA"
              class="black--text my-5"
              @click="post()"
              >Post</v-btn
            ></v-row
          >
        </v-card>
        <v-card v-else outlined elevation="8" height="100%" class="ma-2 pt-4">
          <router-link
            class="pl-4"
            :to="{ name: 'profile', params: { user_id: item.author._id } }"
            >{{ item.author.username }}</router-link
          ><v-divider class="mt-2" />
          <v-card-text v-html="item.content"></v-card-text>
        </v-card>
      </template>
    </v-virtual-scroll>
  </v-container>
  <v-container v-else fluid class="pa-0">
    <v-card-text class="title text-center"
      >Have not selected any thread</v-card-text
    >
  </v-container>
</template>
<style>
/* .thread-content { */
/* overflow-y: scroll;
  height: 78vh; */
/* min-height: 65vh; */
/* max-height: 500px; */
/* } */

img {
  width: 400px;
}

.iframely-responsive > * {
  top: 0;
  left: 0;
  max-width: 622.2px;
  max-height: 350px;
  position: absolute;
  border: 0;
}
</style>

<script>
import DataService from "../../services/DataService";
import authHeader from "../../services/auth-header.js";
import ClassicEditor from "@ckeditor/ckeditor5-editor-classic/src/classiceditor";
import EssentialsPlugin from "@ckeditor/ckeditor5-essentials/src/essentials";
import BoldPlugin from "@ckeditor/ckeditor5-basic-styles/src/bold";
import ItalicPlugin from "@ckeditor/ckeditor5-basic-styles/src/italic";
import LinkPlugin from "@ckeditor/ckeditor5-link/src/link";
import ParagraphPlugin from "@ckeditor/ckeditor5-paragraph/src/paragraph";
import List from "@ckeditor/ckeditor5-list/src/list";
import MathType from "@wiris/mathtype-ckeditor5/src/plugin";
import Font from "@ckeditor/ckeditor5-font/src/font";
import Underline from "@ckeditor/ckeditor5-basic-styles/src/underline";
import Strikethrough from "@ckeditor/ckeditor5-basic-styles/src/strikethrough";
import Code from "@ckeditor/ckeditor5-basic-styles/src/code";
import Subscript from "@ckeditor/ckeditor5-basic-styles/src/subscript";
import Superscript from "@ckeditor/ckeditor5-basic-styles/src/superscript";
import SimpleUploadAdapter from "@ckeditor/ckeditor5-upload/src/adapters/simpleuploadadapter";
import HtmlEmbed from "@ckeditor/ckeditor5-html-embed/src/htmlembed";
import MediaEmbed from "@ckeditor/ckeditor5-media-embed/src/mediaembed";
import Image from "@ckeditor/ckeditor5-image/src/image";
import ImageToolbar from "@ckeditor/ckeditor5-image/src/imagetoolbar";
import ImageCaption from "@ckeditor/ckeditor5-image/src/imagecaption";
import ImageStyle from "@ckeditor/ckeditor5-image/src/imagestyle";
import ImageResize from "@ckeditor/ckeditor5-image/src/imageresize";
import LinkImage from "@ckeditor/ckeditor5-link/src/linkimage";
import ImageInsert from "@ckeditor/ckeditor5-image/src/imageinsert";
import Heading from "@ckeditor/ckeditor5-heading/src/heading";
import Highlight from "@ckeditor/ckeditor5-highlight/src/highlight";
import PageBreak from "@ckeditor/ckeditor5-page-break/src/pagebreak";
import SpecialCharacters from "@ckeditor/ckeditor5-special-characters/src/specialcharacters";
import SpecialCharactersEssentials from "@ckeditor/ckeditor5-special-characters/src/specialcharactersessentials";
import dotenv from "dotenv";
dotenv.config();
export default {
  props: ["thread", "loading"],
  data() {
    return {
      tmpThread: { commnets: [] },
      commentloading: false,
      content: "",
      editor: ClassicEditor,
      editorConfig: {
        plugins: [
          Heading,
          EssentialsPlugin,
          BoldPlugin,
          ItalicPlugin,
          Highlight,
          LinkPlugin,
          ParagraphPlugin,
          List,
          MathType,
          Font,
          Superscript,
          Code,
          Strikethrough,
          Underline,
          Subscript,
          SimpleUploadAdapter,
          HtmlEmbed,
          MediaEmbed,
          Image,
          ImageToolbar,
          ImageCaption,
          ImageStyle,
          ImageResize,
          LinkImage,
          ImageInsert,
          PageBreak,
          SpecialCharacters,
          SpecialCharactersEssentials,
        ],

        toolbar: {
          items: [
            "heading",
            "bold",
            "italic",
            "fontSize",
            "undo",
            "redo",
            "subscript",
            "superscript",
            "specialCharacters",
            "Highlight",
            "bulletedList",
            "numberedList",
            "|",
            "mediaEmbed",
            "linkImage",
            "insertImage",
            "code",
            "subscript",
            "superscript",
            "HtmlEmbed",

            "imageStyle:full",
            "imageStyle:side",
            "|",
            "imageTextAlternative",
            "pagebreak",
          ],
        },
        fontSize: {
          options: ["tiny", "default", "big"],
        },
        simpleUpload: {
          // The URL that the images are uploaded to.
          uploadUrl:
            process.env.VUE_APP_DOMAIN_URL + "/upload/uploadDiscussionPic",

          // Enable the XMLHttpRequest.withCredentials property.
          withCredentials: false,

          // Headers sent along with the XMLHttpRequest to the upload server.
          headers: {
            //    "X-CSRF-TOKEN": "CSRF-Token",
            //    Authorization: "Bearer <JSON Web Token>",
          },
        },
      },
    };
  },
  created() {
    if (this.thread) {
      this.appendThread();
    }
  },
  watch: {
    thread() {
      this.appendThread();
    },
  },
  computed: {
    height() {
      return window.innerHeight - 200 - 65;
    },
    threadLength() {
      return this.tmpThread.comments.length;
    },
  },
  methods: {
    appendThread() {
      this.tmpThread = JSON.parse(JSON.stringify(this.thread));
      this.tmpThread.comments.unshift({
        _id: this.thread._id,
        author: this.thread.author,
        content: this.thread.content,
        createdAt: this.thread.createdAt,
      });
      this.tmpThread.comments.push({
        commentSection: true,
      });
    },

    enableVideo() {
      document.querySelectorAll("oembed[url]").forEach((element) => {
        window.iframely.load(element, element.attributes.url.value);
      });
    },

    updated() {
      this.enableVideo();
    },

    post() {
      this.commentloading = true;
      const data = {
        user_id: this.$store.state.auth.user.user_id,
        thread_id: this.thread._id,
        content: this.content,
      };
      DataService.postComment(data, {
        headers: authHeader(),
      })
        .then((res) => {
          this.content = "";
          this.commentloading = false;
          this.$emit("refreshThread", res.data._id);
        })
        .catch(() => {
          this.content = "";
          this.commentloading = false;
        });
    },
  },

  mounted() {
    const plugin = document.createElement("script");
    plugin.setAttribute(
      "src",
      `//cdn.iframe.ly/embed.js?api_key=${process.env.VUE_APP_IFRAMELY_API_KEY}`
    );
    plugin.async = true;
    document.head.appendChild(plugin);
    console.log("plugin is ", plugin);
  },
  updated() {
    this.enableVideo();
  },
};
</script>
