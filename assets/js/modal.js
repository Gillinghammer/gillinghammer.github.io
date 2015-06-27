$(document).ready(function() {

  $('#photos').on( "click", ".pure-img" , function(event) {
    console.log("blah", event.currentTarget.parentNode.childNodes[1].innerHTML);
    var img_src = event.currentTarget.currentSrc;
    var img_location = event.currentTarget.parentNode.childNodes[1].innerHTML;
    var img_caption = event.currentTarget.parentNode.lastChild.innerText;

    var div_content = "<div><img src='" + img_src + "'/>" +
                      "<h2>" + img_location + "</h2>" +
                      "<p>" + img_caption + "</p></div>"
    vex.open({
      content: div_content
    });
  });
  
});