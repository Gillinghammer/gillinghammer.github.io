$(document).ready(function() {

  // Nav slide down to fixed element
  $("nav").before($("nav").clone().addClass("animateIt"));
      $(window).on("scroll", function () {
          $("body").toggleClass("down", ($(window).scrollTop() > 100));
      });


  // Carousel settings
  $('.carousel').slick({
    speed: 2500,
    adaptiveHeight: false,
    autoplay: false,
    cssEase: 'ease',
    arrows: false,
    draggable: false
  });

  $('#previous').click(function(){
    $('.carousel').slick('slickPrev');
  });
  $('#next').click(function(){
    $('.carousel').slick('slickNext');
  });

});