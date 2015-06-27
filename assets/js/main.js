$(document).ready(function() {
  // toggles referral code animation
  $('.referral img').hover(function(e) {toggleReferralState(e)});

  $( window ).resize(function() {
    closeMenu();
  });
  
  $(".menu").click(function(e) {
    menuStatus = e.currentTarget.getAttribute('data-menu')
    switch(menuStatus) {
      case "closed":
      openMenu();
      break;
      case "open":
      closeMenu();
      break;
    }
  });

  $("a.links.aboutme").click(function(e) {
    e.preventDefault();
    expandProfile();
  });
  // navigate to referral panel
  $('a.links').click(function(e) {
    e.preventDefault();
    $('.isActive').removeClass('isActive');
    $target = $(e.target);
    $target.addClass('isActive');
    document.location.hash = e.currentTarget.getAttribute("data-name");
  });
  // clipboard functionalty
  loadClipboard();
  // watching url hash for changes and routes accordingly
  window.onhashchange = function(){
    updateRoute();
  }

});

collapseProfile = function() {
  $('.profile-section').removeClass('pure-u-lg-6-24')
  $('#profile').addClass('collapsed')
  $('#panel').removeClass("pure-u-lg-18-24")
  $('.profile-section').addClass('pure-u-lg-2-24')
  $('#panel').addClass("pure-u-lg-22-24")
}
expandProfile = function() {
  $('.profile-section').removeClass('pure-u-lg-2-24')
  $('#profile').removeClass('collapsed')
  $('.aboutme').addClass('hidden');
  $('#panel').removeClass("pure-u-lg-22-24")
  $('#panel').addClass("pure-u-lg-18-24")
  $('.profile-section').addClass('pure-u-lg-6-24')
}

closeMenu = function() {
  $('.pages-mobile').slideUp( "fast" );
  $('.extra-mobile').slideUp( "fast" );
  $('.menu').attr('data-menu', 'closed');
  $('.menu i').addClass('fa-chevron-down');
  $('.menu i').removeClass('fa-chevron-up');
}

openMenu = function() {
  $('.pages-mobile').slideDown( "fast" );
  $('.extra-mobile').slideDown( "fast" );
  $('.menu').attr('data-menu', 'open');
  $('.menu i').removeClass('fa-chevron-down');
  $('.menu i').addClass('fa-chevron-up');
}

updateRoute = function() {
  var url_hash = document.location.hash;
  collapseProfile();
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
  closeMenu();
}

loadUpdatesPanel = function() {$('#updates').removeClass("hidden")}

loadReferralPanel = function() {$('#referrals').removeClass("hidden")}
closeReferralPanel = function() {$('#referrals').addClass("hidden")}

loadHomePanel = function() {$('#home').removeClass("hidden")}
closeHomePanel = function() {$('#home').addClass("hidden")}
closeUpdatesPanel = function() {$('#updates').addClass("hidden")}

loadPhotosPanel = function(feed) {
  $('#photos').removeClass("hidden");
    var photo_content = "";
    var photos_headline = '<div class="pure-u-1 center-me"><h1>My personal instagram stream, <a href="http://instagram.com/gillinghammer/" target="_blank">follow&nbsp;me!</a></h1></div>';
  $.each(feed, function( index, value ) {
    var instagram_url = value.images.standard_resolution.url
    var created_time = value.created_time
    value.location.name == undefined ? location_string = "" : location_string = "<i class='fa fa-map-marker'></i> " + value.location.name
    var geo_location = location_string;
    var caption_text = value.caption.text
    var div_content = "<div class='pure-u-1 pure-u-sm-12-24 pure-u-md-8-24 pure-u-lg-6-24 instagram_img caption'>" +
                        "<img src='" + instagram_url + "' class='pure-img insta-photo'/>" +
                        "<h2>" + geo_location + "</h2>" +
                        "<p class='hidden'>" + caption_text + "</p></div>"
    photo_content = photo_content + div_content
  });
  $("#photos").append(photos_headline + photo_content);
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
      // console.log("instgram authenticated", response.data)
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