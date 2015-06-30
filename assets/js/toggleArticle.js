$(document).ready(function() {

  $('#home article h2 span').click(function(e) {
    e.preventDefault();
    article_contents = e.currentTarget.parentElement.parentElement.childNodes
    for(var i = 0; i < article_contents.length; i++) {
      if(article_contents[i].nodeName === "P") {
        if($(e.currentTarget.parentElement.parentElement.childNodes[i]).is(":visible")) {
          $(e.currentTarget.parentElement.parentElement.childNodes[i]).slideUp( "slow" );
          $(e.currentTarget).addClass( "hidden" );
          $(e.currentTarget.previousSibling).removeClass("hidden");
        } else {
          $(e.currentTarget.parentElement.parentElement.childNodes[i]).slideDown( "slow" );
          $(e.currentTarget).addClass( "hidden" );
          $(e.currentTarget.nextSibling).removeClass("hidden");
        }
      }
    }
  })

});