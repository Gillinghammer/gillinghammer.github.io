$(document).ready(function() {

  $('#photos').on( "click", ".pure-img" , function(event) {
    console.log("hello", event.currentTarget.currentSrc);
    var img_src = event.currentTarget.currentSrc

    var div_content = "<div><img src='" + img_src + "'/></div>"
    vex.open({
      content: div_content
    });
  });
  
});