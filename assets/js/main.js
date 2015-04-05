$(document).ready(function() {

  // Nav slide down to fixed element
  $("nav").before($("nav").clone().addClass("animateIt"));
    $(window).on("scroll", function () {
      $("body").toggleClass("down", ($(window).scrollTop() > 100));
  });


  // Carousel settings
  $('.blog-carousel').slick({
  infinite: true,
  speed: 2500,
  autoplay: true,
  slidesToShow: 1,
  arrows: false
});



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