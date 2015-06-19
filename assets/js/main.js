$(document).ready(function() {
  // toggles referral code animation
  $('.referral img').hover(function(e) {toggleReferralState(e)});

  // navigate to referral panel
  $('a.links').click(function(e) {
    e.preventDefault();
    document.location.hash = e.currentTarget.getAttribute("data-name");
  });

  // clipboard functionalty
  loadClipboard();

  // watching url hash for changes and routes accordingly
  window.onhashchange = function(){
    updateRoute();
  }
});

updateRoute = function() {
  var url_hash = document.location.hash;
  switch(url_hash) {
      case "#referrals":
          closeHomePanel();
          closePhotosPanel();
          loadReferralPanel();
          break;
      case "":
          closeReferralPanel();
          closePhotosPanel();
          loadHomePanel();
          break;
      case "#photos":
          closeReferralPanel();
          closeHomePanel();
          loadInstafeed();
          break;
      default:
          closeHomePanel();
          closePhotosPanel();
          loadReferralPanel();
  }
}

loadReferralPanel = function() {$('#referrals').removeClass("hidden")}
closeReferralPanel = function() {$('#referrals').addClass("hidden")}

loadHomePanel = function() {$('#home').removeClass("hidden")}
closeHomePanel = function() {$('#home').addClass("hidden")}

loadPhotosPanel = function(feed) {
  $('#photos').removeClass("hidden");
  console.log("loading")
  $.each(feed, function( index, value ) {
    img_url = value.images.standard_resolution.url;
    start_div = "<div class='pure-u-1 item'>"
    img_string = "<img src='" + img_url + "' class='instagram_img'/>";
    caption_string = "<p class='caption center-me'>" + value.caption.text + "</p>"
    end_div = "</div>"
    $(".instagram").append(start_div + img_string + caption_string + end_div);
  });
}
closePhotosPanel = function() {$('#photos').addClass("hidden")}

loadInstafeed = function() {
  var feed = {}
  $('.instagram').instagram({
    clientId: '10de702ffab441f89ec21f2224d93b62',
    client_secret: '43c285eb4eb249909e4459f95164f51a',
    accessToken: '1988146.10de702.38fd9f21a31f47249e5333ef7c6a9da8',
    grant_type: 'authorization_code',
    redirect_uri: 'http://localhost:4000',
    userId: 1988146
  });
  $('.instagram').on('didLoadInstagram', function(event, response) {
      console.log("instgram authenticated")
      feed = response.data;
      loadPhotosPanel(feed);
  });
}

loadClipboard = function() {
  var client = new ZeroClipboard( $("img") );
  client.on( "copy", function (event) {
    sendToClipboard(event);
  });
}

sendToClipboard = function(event) {
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
  }, 2000);
}

toggleReferralState = function(e) {
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