$(document).ready(function(){
  console.log('doc ready'); //TODO: remove

  // mainslider init
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
  // eof mainslider init

  // footer slider
  // options http://kenwheeler.github.io/slick/
  $('.footer-slider').slick({
    dots: false,
    infinite: true,
    speed: 300,
    slidesToShow: 5,
    slidesToScroll: 1,
    centerMode: true,
    autoplay: true,
    draggable: false,
    autoplaySpeed: 2000,
    variableWidth: true
  });
  // eof footer-slider

  // fake input placeholder
  $('form').find('input').on('input', function (e) {
    $(e.currentTarget).attr('data-empty', !e.currentTarget.value);
  });
  // eof fake input placeholder

  // google maps footer
  //TODO: remove comments
  google.maps.event.addDomListener(window, 'load', init);
    function init() {
      // Basic options for a simple Google Map
      // For more options see: https://developers.google.com/maps/documentation/javascript/reference#MapOptions
      var mapOptions = {
        // How zoomed in you want the map to start at (always required)
        zoom: 15,
        disableDefaultUI: true, // disable controls

        // The latitude and longitude to center the map (always required)
        center: new google.maps.LatLng(50.406626,30.6757033), //TODO: fix position

        // How you would like to style the map.
        // This is where you would paste any style found on Snazzy Maps.
        styles: [{"featureType":"landscape","elementType":"all","stylers":[{"color":"#dfdfdf"}]},{"featureType":"poi.park","elementType":"geometry.fill","stylers":[{"visibility":"off"}]},{"featureType":"road","elementType":"geometry","stylers":[{"lightness":100},{"visibility":"on"},{"color":"#c64566"}]},{"featureType":"road","elementType":"labels","stylers":[{"visibility":"off"}]},{"featureType":"transit.station.airport","elementType":"all","stylers":[{"visibility":"off"}]},{"featureType":"transit.station.bus","elementType":"all","stylers":[{"visibility":"off"}]},{"featureType":"water","elementType":"geometry.fill","stylers":[{"color":"#1d71b8"}]}]
      };

      // Get the HTML DOM element that will contain your map
      // We are using a div with id="map" seen below in the <body>
      var mapElement = document.getElementById('map-footer');

      // Create the Google Map using our element and options defined above
      var map = new google.maps.Map(mapElement, mapOptions);
      var image = {
        url: 'img/i-footer-info-map-top.svg',
        // This marker is 20 pixels wide by 32 pixels high.
        size: new google.maps.Size(41, 58),
        // The origin for this image is (0, 0).
        origin: new google.maps.Point(0, 0),
        // The anchor for this image is the base of the flagpole at (0, 32).
        anchor: new google.maps.Point(0, 58)
      };
      var image2 = {
        url: 'img/i-footer-info-map-bottom.svg',
        // This marker is 20 pixels wide by 32 pixels high.
        size: new google.maps.Size(58, 22),
        // The origin for this image is (0, 0).
        origin: new google.maps.Point(0, 0),
        // The anchor for this image is the base of the flagpole at (0, 32).
        anchor: new google.maps.Point(8, 15)
      };
      // Let's also add a marker while we're at it
      var marker = new google.maps.Marker({
        position: new google.maps.LatLng(50.406626,30.6757033),
        map: map,
        icon: image,
        // animation: google.maps.Animation.DROP, // appear animation
        title: 'Toyota Автосамит'
      });
      var marker2 = new google.maps.Marker({
        position: new google.maps.LatLng(50.406626,30.6757033),
        map: map,
        icon: image2,
        // animation: google.maps.Animation.DROP, // appear animation
        title: ''
      });
      marker.setAnimation(google.maps.Animation.BOUNCE);
    }
  // eof google maps footer

  //toggle filters page 2
  $("a[data-toggle]").click(function(e) {
    e.preventDefault();  // prevent navigating
    var selector = $(this).data("toggle");  // get corresponding element
    if( $(this).hasClass("toggle-active") ) {  // если уже нажата, то скрыть
      $(selector).hide();
      $(this).removeClass("toggle-active");
    }  else {                                 // если не нажата, то очистить все а потом показать нужное
      $("div.filter-wrapper").hide();
      $("a.filter__item").removeClass("toggle-active");
      $(selector).show();
      $(this).addClass("toggle-active");
    }
  });



  //replace svg img to inline //TODO: fix images
  // https://medium.com/@asadalikanwal/controlling-svg-via-css-for-transitions-and-hover-effects-fcd9b48a4562
  $(function() {
    $('img.svg').each(function() {
             var $img = $(this);
             var imgID = $img.attr('id');
             var imgClass = $img.attr('class');
             var imgURL = $img.attr('src');
    $.get(imgURL, function(data) {
                 // Get the SVG tag, ignore the rest
                 var $svg = $(data).find('svg');
    // Add replaced image's ID to the new SVG
                 if (typeof imgID !== 'undefined') {
                     $svg = $svg.attr('id', imgID);
                 }
                 // Add replaced image's classes to the new SVG
                 if (typeof imgClass !== 'undefined') {
                     $svg = $svg.attr('class', imgClass + ' replaced-svg');
                 }
    // Remove any invalid XML tags as per http://validator.w3.org
                 $svg = $svg.removeAttr('xmlns:a');
    // Replace image with new SVG
                 $img.replaceWith($svg);
    }, 'xml');
    });
  });

  //disable dummy anchor events
  $("a").click(function(){
    if ($(this).attr("href")=="#") {
      console.log("# click");
      return false;
    }
  });

  // 04 slider
   $('.slider').slick({
    slidesToShow: 1,
    slidesToScroll: 1,
    // arrows: true,
    fade: true,
    asNavFor: '.slider-carousel'
  });

  $('.slider-carousel').slick({
    dots: true,
    infinite: true,
    // speed: 300,
    // slidesToShow: 5,
    slidesToScroll: 1,
    centerMode: true,
    // autoplay: true,
    draggable: false,
    // autoplaySpeed: 2000,
    variableWidth: true,
    asNavFor: '.slider',
    focusOnSelect: true

  });

  // sticky header 
  var sc;
  var nav = $("nav");
  var navOffsetY = nav.offset().top;
  $(window).scroll(function(){
    sc = $(document).scrollTop();
    if (sc>navOffsetY) {
      nav.addClass("nav--fixed");
    }
    else {
      nav.removeClass("nav--fixed");
    }
  });
  
  // nav.clone().addClass('nav--fixed').appendTo("body");
  // eof sticky header
});  // eof doc.ready
