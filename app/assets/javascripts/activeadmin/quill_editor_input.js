$(function() {
  quillEditorInit(document);

  $(document).on('polymorphic_has_many_form:inserted', '.polymorphic_has_many_container', function(event, fieldset) {
    return quillEditorInit();
  });

  $(document).on('has_many_form:inserted', '.has_many_container', function(event, fieldset) {
    return quillEditorInit();
  });

  function quillEditorInit(container) {
    var editors = document.querySelectorAll( '.quill-editor' );
    var default_options = {
      modules: {
        toolbar: [
          ['bold', 'italic', 'underline'],
          ['link', 'blockquote', 'code-block'],
          [{ 'script': 'sub'}, { 'script': 'super' }],
          [{ 'align': [] }, { list: 'ordered' }, { list: 'bullet' }],
          [{ 'color': [] }, { 'background': [] }],
          ['clean'],
          // [{ 'size': ['small', false, 'large', 'huge'] }],
          // [{ 'header': [1, 2, 3, 4, 5, 6, false] }],
        ]
      },
      placeholder: '',
      theme: 'snow'
    };

    for( var i = 0; i < editors.length; i++ ) {
      var content = editors[i].querySelector( '.quill-editor-content' );
      if( content && editors[i]['_quill-editor'] === undefined) {
        var options = editors[0].getAttribute( 'data-options' ) ? JSON.parse( editors[0].getAttribute( 'data-options' ) ) : default_options;
        editors[i]['_quill-editor'] = new Quill( content, options );
      }
    }

    var formtastic = document.querySelector( 'form.formtastic' );
    if( formtastic ) {
      formtastic.onsubmit = function() {
        for( var i = 0; i < editors.length; i++ ) {
          var input = editors[i].querySelector( 'input[type="hidden"]' );
          input.value = editors[i]['_quill-editor'].root.innerHTML;
          // input.value = editors[i]['_quill-editor'].getContents();
          // input.value = editors[i].querySelector( '.quill-editor-content' ).innerHTML;
        }
      };
    }
  }
});