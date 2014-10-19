$(window).load(function(){
  $("#resume_cv #headline h2").addClass("animated pulse");
});
$(window).scroll(function() {    
    var scroll = $(window).scrollTop();
    
    if (scroll >= 100 ) {
      $("#general_assembly").addClass("animated fadeInRightBig show");
    }
    if (scroll >= 400) {
      $("#haystack").addClass("animated fadeInLeftBig show");
    }
    if (scroll >= 700) {
      $("#tesla_motors").addClass("animated fadeInRightBig show");
    }
    if (scroll >= 900) {
      $("#skills_and_education").addClass("animated zoomInDown show");
    }
});