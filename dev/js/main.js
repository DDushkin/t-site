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
});
 
