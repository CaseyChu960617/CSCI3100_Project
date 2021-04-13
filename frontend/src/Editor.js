import SimpleUploadAdapter from "@ckeditor/ckeditor5-upload/src/adapters/simpleuploadadapter";
import ClassicEditor from '@ckeditor/ckeditor5-editor-classic/src/classiceditor'


ClassicEditor
	.create( document.querySelector( '#editor' ), {
		plugins: [ SimpleUploadAdapter ],
		toolbar: [ "heading",
        "|",
        "bold",
        "italic",
        "link",
        "bulletedList",
        "numberedList",
        "|",
        "insertTable",
        "|",
        "imageUpload",
        "mediaEmbed",
        "|",
        "undo",
        "redo", ],
        table: {
            toolbar: ["tableColumn", "tableRow", "mergeTableCells"],
	} } )
	.then( editor => {
		console.log( 'Editor was initialized', editor );
	} )
	.catch( error => {
		console.error( error.stack );
	} );