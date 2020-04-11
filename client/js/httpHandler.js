(function() {

  const serverUrl = 'http://127.0.0.1:3000';

  //
  // TODO: build the swim command fetcher here
  //
  var ajaxgetreq = function(cb){
   $.ajax({
    type: 'GET',
    url: 'http://127.0.0.1:3000',
    success:cb,
    error:function(error){
      console.log(error);
    }
    })
  };

  setInterval( function(){
    ajaxgetreq( (data) => {
      var d = JSON.parse(data);
      console.log(d)
      SwimTeam.move(d.directions);
    })
  }, 10000 );


  /////////////////////////////////////////////////////////////////////
  // The ajax file uplaoder is provided for your convenience!
  // Note: remember to fix the URL below.
  /////////////////////////////////////////////////////////////////////

  const ajaxFileUplaod = (file) => {
    var formData = new FormData();
    formData.append("file", file);
    $.ajax({
      type: 'POST',
      data: formData,
      url: `http://127.0.0.1:3000/background.jpg`,
      cache: false,
      contentType: false,
      processData: false,
      success: () => {
        // reload the page
        window.location = window.location.href;
      }
    });
  };

  $('form').on('submit', function(e) {
    e.preventDefault();

    var form = $('form .file')[0];
    if (form.files.length === 0) {
      console.log('No file selected!');
      return;
    }

    var file = form.files[0];
    if (file.type !== 'image/jpeg') {
      console.log('Not a jpg file!');
      return;
    }
    ajaxFileUplaod(file);
  });

})();
