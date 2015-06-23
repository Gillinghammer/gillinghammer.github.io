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
      case "#updates":
          closeHomePanel();
          closePhotosPanel();
          closeReferralPanel();
          loadUpdatesPanel();
          break;
      case "#referrals":
          closeHomePanel();
          closePhotosPanel();
          closeUpdatesPanel();
          loadReferralPanel();
          break;
      case "":
          closeReferralPanel();
          closePhotosPanel();
          closeUpdatesPanel();
          loadHomePanel();
          break;
      case "#photos":
          closeReferralPanel();
          closeHomePanel();
          closeUpdatesPanel();
          loadInstafeed();
          break;
      default:
          closeHomePanel();
          closePhotosPanel();
          closeUpdatesPanel();
          loadReferralPanel();
  }
}

loadUpdatesPanel = function() {$('#updates').removeClass("hidden")}

loadReferralPanel = function() {$('#referrals').removeClass("hidden")}
closeReferralPanel = function() {$('#referrals').addClass("hidden")}

loadHomePanel = function() {$('#home').removeClass("hidden")}
closeHomePanel = function() {$('#home').addClass("hidden")}
closeUpdatesPanel = function() {$('#updates').addClass("hidden")}

loadPhotosPanel = function(feed) {
  $('#photos').removeClass("hidden");
  console.log("loading")
  $.each(feed, function( index, value ) {
    start_img_div = "<div class='pure-u-1 pure-u-md-15-24 instagram_img'>"
    img_string = "<img src='" + value.images.standard_resolution.url + "' class='pure_img'/>";
    end_img_div = "</div>"
    date_formated = value.created_time
    value.location.name == undefined ? location_string = "" : location_string = "<i class='fa fa-map-marker'></i> " + value.location.name
    location_formated = "<h2>" + location_string + "</h2>"
    start_caption_div = "<div class='pure-u-1 pure-u-md-9-24 caption'>"
    date_string = "<date>" + date_formated + "</date>"
    caption_string = "<p>" + value.caption.text + "</p>"
    end_caption_div = "</div>"
    $("#photos").append(start_caption_div + location_formated + caption_string + end_caption_div + start_img_div + img_string + end_img_div);
  });
}
closePhotosPanel = function() {$('#photos').addClass("hidden")}

loadInstafeed = function() {
  console.log("loading instafeed")
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
      console.log("instgram authenticated", response.data)
      feed = response.data;
      loadPhotosPanel(feed);
  });
}

loadClipboard = function() {
  var client = new ZeroClipboard( $(".icon") );
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