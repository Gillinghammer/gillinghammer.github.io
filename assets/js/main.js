$(document).ready(function() {
  var client = new ZeroClipboard( $("img") );
  client.on( "copy", function (event) {
    var clipboard = event.clipboardData;
    var code = event.target.parentNode.childNodes[5].getAttribute('data-code')
    clipboard.setData( "text/plain", event.target.parentNode.childNodes[5].getAttribute('data-code') );
    $('#alertbar').removeClass("fadeOutUp");
    $('#alertbar').removeClass("invisible");
    $('#alertbar').addClass("fadeInDown");
    $('#alertbar span').html("Copied URL to Clipboard!")
    setTimeout(function() {
      $('#alertbar').removeClass("fadeInDown");
      $('#alertbar').addClass("fadeOutUp");
    }, 2000)
    
    console.log(event.target.parentNode.childNodes[5].getAttribute('data-code'))
  });

  $('.referral img').hover(
      function(e){
        $(e.currentTarget).addClass("darken");
        $(e.currentTarget.parentNode.childNodes[3]).removeClass("flipInX");
        $(e.currentTarget.parentNode.childNodes[5]).removeClass("flipOutX");
        $(e.currentTarget.parentNode.childNodes[3]).addClass("flipOutX");
        $(e.currentTarget.parentNode.childNodes[3]).addClass("hidden");
        $(e.currentTarget.parentNode.childNodes[5]).removeClass("hidden");
        $(e.currentTarget.parentNode.childNodes[5]).addClass("flipInX");
        setTimeout(function() {
          $(e.currentTarget).removeClass("darken");
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