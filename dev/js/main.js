$(document).ready(function(){
  console.log('doc ready'); //TODO: remove

  //mainslider init
  // http://fotorama.io/customize/initialization/
  $(".mainslider").fotorama({
    autoplay: true,
    loop: true,
    arrows: "always",
    margin: 0//,
    // transition: "crossfade"
    // transition: "dissolve"
  });
  $(".fotorama__arr--next").appendTo(".fotorama__nav__shaft");
  $(".fotorama__arr--prev").prependTo(".fotorama__nav__shaft");



  //toggle filters page 2
  $("div[data-toggle]").click(function(e) {
    e.preventDefault();  // prevent navigating
    var selector = $(this).data("toggle");  // get corresponding element
    if( $(this).hasClass("toggle-active") ) {  // если уже нажата, то скрыть
      $(selector).hide();
      $(this).removeClass("toggle-active");
    }  else {                                 // если не нажата, то очистить все а потом показать нужное
      $("div.filter-wrapper").hide();
      $("div.filter__item").removeClass("toggle-active");
      $(selector).show();
      $(this).addClass("toggle-active");
    }
  });

  
});
