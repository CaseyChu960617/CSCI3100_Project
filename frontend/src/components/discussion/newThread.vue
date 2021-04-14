<template>
  <v-dialog v-model="dialog" width="800px" @click:outside="close">
    <v-card height="750px">
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
              ><v-container class="mx-15">
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
        <!--<v-btn color="blue darken-1" text @click="close">Preview</v-btn>-->
        <v-btn color="blue darken-1" text @click="create" :disabled="!isValid"
          >Create</v-btn
        >
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>
<style>
.ck-editor__editable {
  height: 150px;
}
</style>
<script>
import subjectsList from "../../assets/subjects.json";
import DataService from "../../services/DataService";
import authHeader from "../../services/auth-header.js";

import ClassicEditor from "@ckeditor/ckeditor5-editor-classic/src/classiceditor";
import EssentialsPlugin from "@ckeditor/ckeditor5-essentials/src/essentials";
import BoldPlugin from "@ckeditor/ckeditor5-basic-styles/src/bold";
import ItalicPlugin from "@ckeditor/ckeditor5-basic-styles/src/italic";
import LinkPlugin from "@ckeditor/ckeditor5-link/src/link";
import ParagraphPlugin from "@ckeditor/ckeditor5-paragraph/src/paragraph";
import List from "@ckeditor/ckeditor5-list/src/list";
import MathType from "@wiris/mathtype-ckeditor5";
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
          shouldNotGroupWhenFull: true,
        },
        height: "400px",
        fontSize: {
          options: ["tiny", "default", "big"],
        },
        simpleUpload: {
          // The URL that the images are uploaded to.
          uploadUrl: "http://localhost:9000/upload/uploadDiscussionPic",

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
  computed: {
    currentUser() {
      return this.$store.state.auth.user;
    },
    height() {
      return window.innerHeight - 200;
    },
  },
  mounted() {
    const plugin = document.createElement("script");
    plugin.setAttribute(
      "src",
      "//cdn.iframe.ly/embed.js?api_key=48f28ce86bc9c78e94f884"
    );
    plugin.async = true;
    document.head.appendChild(plugin);
  },
  methods: {
    close() {
      this.$emit("show", false);
    },
    create() {
      const data = {
        user_id: this.currentUser.user_id,
        title: this.title,
        subject: this.subject,
        content: this.content,
      };
      DataService.createThread(data, {
        headers: authHeader(),
      }).then((response) => {
        let thread_id = response.data;
        alert("Success");
        this.close();
        this.$router.push({
          name: "discussion",
          params: { thread_id: thread_id },
        });
        this.$emit("selectCat");
      });
    },
    EnableVideo() {
      document.querySelectorAll("oembed[url]").forEach((element) => {
        window.iframely.load(element, element.attributes.url.value);
      });
      //alert(this.editor);
      //console.log(this.editor);
    },
  },
};
</script>

<style>
.ck-editor__editable {
  height: 44vh;
}
</style>
