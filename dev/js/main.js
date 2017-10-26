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
        url: 'img/i-footer-map.svg',
        // This marker is 20 pixels wide by 32 pixels high.
        size: new google.maps.Size(83, 102),
        // The origin for this image is (0, 0).
        origin: new google.maps.Point(0, 0),
        // The anchor for this image is the base of the flagpole at (0, 32).
        anchor: new google.maps.Point(0, 80)
      };
      // Let's also add a marker while we're at it
      var marker = new google.maps.Marker({
        position: new google.maps.LatLng(50.406626,30.6757033),
        map: map,
        icon: image,
        // animation: google.maps.Animation.DROP, // appear animation
        title: 'Toyota Автосамит'
      });
      marker.setAnimation(google.maps.Animation.BOUNCE);
    }
  // eof google maps footer

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
});  // eof doc.ready
