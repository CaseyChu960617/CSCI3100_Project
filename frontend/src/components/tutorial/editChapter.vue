<template>
  <v-container>
    <v-container>
      <v-text-field v-model="chapter.title" label="Title" type="text" clearable>
      </v-text-field>
      <template>
        <v-container max-height="500px">
          <ckeditor
            :editor="editor"
            v-model="chapter.content"
            :config="editorConfig"
          ></ckeditor>
        </v-container>
      </template>
    </v-container>
    <v-row justify="center">
      <v-btn rounded color="#99CFEA" class="black--text my-5" @click="save"
        >Save</v-btn
      ></v-row
    >
  </v-container>
</template>
<style>
.ck-editor__editable {
  height: 600px;
}
</style>
<script>
//ckeditor features
import DataService from "../../services/DataService"; //ckeditor features
import ClassicEditor from "@ckeditor/ckeditor5-editor-classic/src/classiceditor"; //ckeditor features
import EssentialsPlugin from "@ckeditor/ckeditor5-essentials/src/essentials"; //ckeditor features
import BoldPlugin from "@ckeditor/ckeditor5-basic-styles/src/bold"; //ckeditor features
import ItalicPlugin from "@ckeditor/ckeditor5-basic-styles/src/italic"; //ckeditor features
import LinkPlugin from "@ckeditor/ckeditor5-link/src/link"; //ckeditor features
import ParagraphPlugin from "@ckeditor/ckeditor5-paragraph/src/paragraph"; //ckeditor features
import List from "@ckeditor/ckeditor5-list/src/list"; //ckeditor features
import MathType from "@wiris/mathtype-ckeditor5/src/plugin"; //ckeditor features
import Font from "@ckeditor/ckeditor5-font/src/font"; //ckeditor features
import Underline from "@ckeditor/ckeditor5-basic-styles/src/underline"; //ckeditor features
import Strikethrough from "@ckeditor/ckeditor5-basic-styles/src/strikethrough"; //ckeditor features
import Code from "@ckeditor/ckeditor5-basic-styles/src/code"; //ckeditor features
import Subscript from "@ckeditor/ckeditor5-basic-styles/src/subscript"; //ckeditor features
import Superscript from "@ckeditor/ckeditor5-basic-styles/src/superscript"; //ckeditor features
import SimpleUploadAdapter from "@ckeditor/ckeditor5-upload/src/adapters/simpleuploadadapter"; //ckeditor features
import HtmlEmbed from "@ckeditor/ckeditor5-html-embed/src/htmlembed"; //ckeditor features
import MediaEmbed from "@ckeditor/ckeditor5-media-embed/src/mediaembed"; //ckeditor features
import Image from "@ckeditor/ckeditor5-image/src/image"; //ckeditor features
import ImageToolbar from "@ckeditor/ckeditor5-image/src/imagetoolbar"; //ckeditor features
import ImageCaption from "@ckeditor/ckeditor5-image/src/imagecaption"; //ckeditor features
import ImageStyle from "@ckeditor/ckeditor5-image/src/imagestyle"; //ckeditor features
import ImageResize from "@ckeditor/ckeditor5-image/src/imageresize"; //ckeditor features
import LinkImage from "@ckeditor/ckeditor5-link/src/linkimage"; //ckeditor features
import ImageInsert from "@ckeditor/ckeditor5-image/src/imageinsert"; //ckeditor features
import Heading from "@ckeditor/ckeditor5-heading/src/heading"; //ckeditor features
import Highlight from "@ckeditor/ckeditor5-highlight/src/highlight"; //ckeditor features
import PageBreak from "@ckeditor/ckeditor5-page-break/src/pagebreak"; //ckeditor features
import SpecialCharacters from "@ckeditor/ckeditor5-special-characters/src/specialcharacters"; //ckeditor features
import SpecialCharactersEssentials from "@ckeditor/ckeditor5-special-characters/src/specialcharactersessentials"; //ckeditor features
import RemoveFormat from "@ckeditor/ckeditor5-remove-format/src/removeformat"; //ckeditor features
import CodeBlock from "@ckeditor/ckeditor5-code-block/src/codeblock"; //ckeditor features
import Indent from "@ckeditor/ckeditor5-indent/src/indent"; //ckeditor features
import IndentBlock from "@ckeditor/ckeditor5-indent/src/indentblock"; //ckeditor features
import Alignment from "@ckeditor/ckeditor5-alignment/src/alignment"; //ckeditor features
import dotenv from "dotenv";
import authHeader from "../../services/auth-header";
dotenv.config();

export default {
  props: ["chapterId", "tutorial_id"],
  components: {},

  data() {
    return {
      chapter: null,
      testing: "<div class='v-card v-sheet theme--light><p>123</p></div>",
      editorData: "ch",
      editor: ClassicEditor,
      //editor function configuration
      editorConfig: {
        //plugins or functions used in ckeditor
        plugins: [
          Heading,
          EssentialsPlugin,
          BoldPlugin,
          Alignment,
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
          Indent,
          IndentBlock,
          Image,
          RemoveFormat,
          ImageToolbar,
          ImageCaption,
          CodeBlock,
          ImageStyle,
          ImageResize,
          LinkImage,
          ImageInsert,
          PageBreak,
          SpecialCharacters,
          SpecialCharactersEssentials,
        ],
        //render the functions in ckeditor toolbar
        toolbar: {
          items: [
            "heading",
            "bold",
            "italic",
            "fontSize",
            "|",
            "mediaEmbed",
            "linkImage",
            "insertImage",
            "|",
            "undo",
            "redo",
            "alignment",
            "outdent",
            "indent",
            "subscript",
            "superscript",
            "specialCharacters",
            "Highlight",
            "bulletedList",
            "numberedList",
            "removeFormat",
            "|",
            "code",
            "codeBlock",
            "subscript",
            "superscript",
            "HtmlEmbed",
            "imageStyle:full",
            "imageStyle:side",
            "imageTextAlternative",
          ],
        },
        //set height of editor
        height: "400px",
        //font sizes supported
        fontSize: {
          options: ["tiny", "default", "big"],
        },

        simpleUpload: {
          // The URL that the images are uploaded to.
          uploadUrl:
            process.env.VUE_APP_DOMAIN_URL + "/upload/uploadTutorialPic",

          // Enable the XMLHttpRequest.withCredentials property.
          withCredentials: false,

          // Headers sent along with the XMLHttpRequest to the upload server.
          headers: {},
        },
      },
    };
  },

  created() {
    // Fetch one chapter when the editChapter component is first created
    this.fetchOneChapter();
  },

  methods: {
    // fetch data of one chapter
    fetchOneChapter() {
      // Do a get request to fetch data of one chapter
      DataService.get("tutorial/getOneChapter", this.chapterId).then(
        (response) => {
          this.chapter = response.data;
        }
      );
    },

    //using iframely to render the video and enable it to be shown
    EnableVideo() {
      document.querySelectorAll("oembed[url]").forEach((element) => {
        window.iframely.load(element, element.attributes.url.value);
      });
    },

    //save the edited data into varaibles
    save() {
      const data = {
        tutorial_id: this.tutorial_id,
        chapter_id: this.chapterId,
        title: this.chapter.title,
        content: this.chapter.content,
      };

      // Do a put request to update the chapter information to server and database
      DataService.put("tutorial/editChapter", data, { headers: authHeader() })
        .then(() => {
          // After the editting, fetch the latest data of the chapter
          DataService.get("tutorial/getOneChapter", this.chapterId).then(
            (response) => {
              this.chapter = response.data;
              alert("Saved successfully!");
              // Fetch the updated tutorial information
              this.$emit("fetchTutorial");
            }
          );
        })
        .catch((err) => {
          // Prompt error and alert messages
          if (err.response.status == 401 || err.response.status == 403) {
            alert("Please Login again");
            this.$store.dispatch("auth/signout");
            this.$router.push("/home").catch(() => {});
          } else if (err.response.status == 400) {
            alert(err.response.data.message);
          }
        });
    },
  },

  // Watch the change of chapterId
  watch: {
    chapterId() {
      // Fetch the chapter information
      this.fetchOneChapter();
    },
  },

  //to import iframely script by inserting script tag at the begininging of document
  mounted() {
    //create a script tag
    const plugin = document.createElement("script");
    //set it to be javascript tag
    plugin.setAttribute("type", "text/javascript");
    //set the src of the iframely script
    plugin.setAttribute(
      "src",
      "https://cdnjs.cloudflare.com/ajax/libs/mathjax/2.7.6/MathJax.js?config=TeX-MML-AM_CHTML"
    );

    plugin.async = true;
    //append it to the html document
    document.head.appendChild(plugin);
  },
};
</script>
