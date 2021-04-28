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
    <!--<v-btn @click="hi()">dasdsa</v-btn>-->
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
import DataService from "../../services/DataService";
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
import RemoveFormat from "@ckeditor/ckeditor5-remove-format/src/removeformat";
import CodeBlock from "@ckeditor/ckeditor5-code-block/src/codeblock";
import Indent from "@ckeditor/ckeditor5-indent/src/indent";
import IndentBlock from "@ckeditor/ckeditor5-indent/src/indentblock";
import Alignment from "@ckeditor/ckeditor5-alignment/src/alignment";
import dotenv from "dotenv";
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
      editorConfig: {
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

        toolbar: {
          items: [
            "heading",
            "bold",
            "italic",
            "fontSize",
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
            "mediaEmbed",
            "linkImage",
            "insertImage",
            "code",
            "codeBlock",
            "subscript",
            "superscript",
            "HtmlEmbed",

            "imageStyle:full",
            "imageStyle:side",
            "|",
            "imageTextAlternative",
          ],
        },

        height: "400px",
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

    EnableVideo() {
      document.querySelectorAll("oembed[url]").forEach((element) => {
        window.iframely.load(element, element.attributes.url.value);
      });
    },

    save() {
      const data = {
        tutorial_id: this.tutorial_id,
        chapter_id: this.chapterId,
        title: this.chapter.title,
        content: this.chapter.content,
      };

      // Do a put request to update the chapter information to server and database
      DataService.put("tutorial/editChapter", data)
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

  mounted() {
    const plugin = document.createElement("script");
    plugin.setAttribute("type", "text/javascript");
    plugin.setAttribute(
      "src",
      "https://cdnjs.cloudflare.com/ajax/libs/mathjax/2.7.6/MathJax.js?config=TeX-MML-AM_CHTML"
    );

    plugin.async = true;
    document.head.appendChild(plugin);
  },
};
</script>
