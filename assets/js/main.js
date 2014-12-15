$(document).ready(function() {

    $( "#menu" ).click(function() {
      $( '#navigation' ).slideUp("fast", function() {
        $('#menuClosed').removeClass('hide');
      });
    });

    $( "#menuClosed" ).click(function() {
      $( '#navigation' ).slideDown("fast", function() {
        $('#menuClosed').addClass('hide');
        $('#navigation').removeClass('hide');
      });
    });

});