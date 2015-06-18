$(document).ready(function() {
  var client = new ZeroClipboard( $("img") );
  client.on( "copy", function (event) {
    var clipboard = event.clipboardData;
    clipboard.setData( "text/plain", event.target.parentNode.childNodes[5].getAttribute('data-code') );
    console.log(event.target.parentNode.childNodes[5].getAttribute('data-code'))
  });

  $('.referral img').hover(
      function(e){
        $(e.currentTarget.parentNode.childNodes[3]).removeClass("flipInX");
        $(e.currentTarget.parentNode.childNodes[5]).removeClass("flipOutX");
        $(e.currentTarget.parentNode.childNodes[3]).addClass("flipOutX");
        $(e.currentTarget.parentNode.childNodes[3]).addClass("hidden");
        $(e.currentTarget.parentNode.childNodes[5]).removeClass("hidden");
        $(e.currentTarget.parentNode.childNodes[5]).addClass("flipInX");
        setTimeout(function() {
            $(e.currentTarget.parentNode.childNodes[3]).removeClass("flipOutX");
            $(e.currentTarget.parentNode.childNodes[3]).removeClass("hidden");
            $(e.currentTarget.parentNode.childNodes[3]).addClass("flipInX");
            $(e.currentTarget.parentNode.childNodes[5]).removeClass("flipInX");
            $(e.currentTarget.parentNode.childNodes[5]).addClass("flipOutX");
            $(e.currentTarget.parentNode.childNodes[5]).addClass("hidden");
        }, 4000);
      }
  )
});