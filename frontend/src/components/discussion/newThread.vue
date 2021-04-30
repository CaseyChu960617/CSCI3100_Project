<template>
  <v-dialog v-model="dialog" width="800px" @click:outside="close">
    <v-card>
      <v-card-title class="headline">
        New Thread<v-spacer /><v-btn icon @click="close"
          ><v-icon>mdi-close</v-icon></v-btn
        >
      </v-card-title>
      <v-card-text>
        <v-container>
          <v-form v-model="isValid">
            <v-row>
              <v-text-field
                class="mx-5"
                v-model="title"
                label="Title"
                clearable
                :rules="[rules.required]"
              ></v-text-field> </v-row
            ><v-row>
              <v-autocomplete
                class="mx-5"
                v-model="subject"
                :items="subjects"
                label="Subject"
                clearable
                :rules="[rules.required]"
              ></v-autocomplete> </v-row
            ><v-row
              ><v-container>
                <ckeditor
                  :editor="editor"
                  v-model="content"
                  :config="editorConfig"
                  :rules="[rules.required]"
                ></ckeditor></v-container
            ></v-row>
          </v-form>
        </v-container>
      </v-card-text>
      <v-card-actions>
        <v-spacer />
        <v-btn color="blue darken-1" text @click="create" :disabled="!isValid"
          >Create</v-btn
        >
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>
<script>
import subjectsList from "../../assets/subjects.json";
import DataService from "../../services/DataService";
import ClassicEditor from "@ckeditor/ckeditor5-editor-classic/src/classiceditor"; //import ckeditor features
import EssentialsPlugin from "@ckeditor/ckeditor5-essentials/src/essentials"; //import ckeditor features
import BoldPlugin from "@ckeditor/ckeditor5-basic-styles/src/bold"; //import ckeditor features
import ItalicPlugin from "@ckeditor/ckeditor5-basic-styles/src/italic"; //import ckeditor features
import LinkPlugin from "@ckeditor/ckeditor5-link/src/link"; //import ckeditor features
import ParagraphPlugin from "@ckeditor/ckeditor5-paragraph/src/paragraph"; //import ckeditor features
import List from "@ckeditor/ckeditor5-list/src/list"; //import ckeditor features
import MathType from "@wiris/mathtype-ckeditor5"; //import ckeditor features
import Font from "@ckeditor/ckeditor5-font/src/font"; //import ckeditor features
import Underline from "@ckeditor/ckeditor5-basic-styles/src/underline"; //import ckeditor features
import Strikethrough from "@ckeditor/ckeditor5-basic-styles/src/strikethrough"; //import ckeditor features
import Code from "@ckeditor/ckeditor5-basic-styles/src/code"; //import ckeditor features
import Subscript from "@ckeditor/ckeditor5-basic-styles/src/subscript"; //import ckeditor features
import Superscript from "@ckeditor/ckeditor5-basic-styles/src/superscript"; //import ckeditor features
import SimpleUploadAdapter from "@ckeditor/ckeditor5-upload/src/adapters/simpleuploadadapter"; //import ckeditor features
import HtmlEmbed from "@ckeditor/ckeditor5-html-embed/src/htmlembed"; //import ckeditor features
import MediaEmbed from "@ckeditor/ckeditor5-media-embed/src/mediaembed"; //import ckeditor features
import Image from "@ckeditor/ckeditor5-image/src/image"; //import ckeditor features
import ImageToolbar from "@ckeditor/ckeditor5-image/src/imagetoolbar"; //import ckeditor features
import ImageCaption from "@ckeditor/ckeditor5-image/src/imagecaption"; //import ckeditor features
import ImageStyle from "@ckeditor/ckeditor5-image/src/imagestyle"; //import ckeditor features
import ImageResize from "@ckeditor/ckeditor5-image/src/imageresize"; //import ckeditor features
import LinkImage from "@ckeditor/ckeditor5-link/src/linkimage"; //import ckeditor features
import ImageInsert from "@ckeditor/ckeditor5-image/src/imageinsert"; //import ckeditor features
import Heading from "@ckeditor/ckeditor5-heading/src/heading"; //import ckeditor features
import Highlight from "@ckeditor/ckeditor5-highlight/src/highlight"; //import ckeditor features
import PageBreak from "@ckeditor/ckeditor5-page-break/src/pagebreak"; //import ckeditor features
import dotenv from "dotenv";
import authHeader from "../../services/auth-header"
dotenv.config();
export default {
  props: ["dialog"],
  data() {
    return {
      Item: {},
      isValid: false,
      rules: {
        required: (value) => !!value || "Required",
      },
      subjects: subjectsList,
      title: null,
      subject: null,
      content: null,

      editor: ClassicEditor,
      //configuration of the editor
      editorConfig: {
        //plugins for the editor
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
        ],
        //toolbar for the editor
        toolbar: {
          items: [
            "heading",
            "mediaEmbed",
            "bold",
            "italic",
            "fontSize",
            "undo",
            "redo",
            "subscript",
            "superscript",
            "Highlight",
            "bulletedList",
            "numberedList",
            "|",
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
          shouldNotGroupWhenFull: true,
        },
        //height of the editor
        height: "400px",
        //allowed fontsize
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
          headers: {},
        },
      },
    };
  },
  computed: {
    currentUser() {
      //store the currentuser
      return this.$store.state.auth.user;
    },
    height() {
      //set the viewing window height
      return window.innerHeight - 200;
    },
  },
  mounted() {
    //append script tag to import iframely script for rendering video from its url
    const plugin = document.createElement("script");
    plugin.setAttribute(
      "src",
      "//cdn.iframe.ly/embed.js?api_key=48f28ce86bc9c78e94f884"
    );
    plugin.async = true;
    document.head.appendChild(plugin);
  },
  methods: {
    //close the modal when user leaves
    close() {
      this.$emit("show", false);
    },
    //function to create thread
    create() {
      const data = {
        user_id: this.currentUser.user_id,
        title: this.title,
        subject: this.subject,
        content: this.content,
      };

      // Do a post request to create a new dicussion thread.
      DataService.createThread(data, { headers: authHeader() })
        .then((response) => {
          let thread_id = response.data;
          alert("Discussion thread created successfully.");
          this.close();
          this.$router.push({
            name: "discussion",
            params: { thread_id: thread_id },
          });
          this.$emit("refreshList");
        })
        .catch((err) => {
          // Prompt error and alert messages
          if (err.response.status == 401 || err.response.status == 403) {
            alert("Please Login again");
            // Sign out the user automatically
            this.$store.dispatch("auth/signout");
            this.$router.push("/home").catch(() => {});
          } else if (err.response.status == 400) {
            alert(err.response.data.message);
          }
        });
    },

    //function to render the video by its url using iframely
    EnableVideo() {
      document.querySelectorAll("oembed[url]").forEach((element) => {
        window.iframely.load(element, element.attributes.url.value);
      });
    },
  },
};
</script>
