$(document).ready(function(){
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
    speed: 1000,
    slidesToShow: 5,
    slidesToScroll: 1,
    centerMode: true,
    autoplay: true,
    draggable: false,
    autoplaySpeed: 2000,
    cssEase: 'ease-in-out',
    variableWidth: true
  });
  // eof footer-slider
if(screen.width > 1023){
  $('.test-drive-bigslider').slick({
   slidesToShow: 1,
   slidesToScroll: 1,
   arrows: false,
   fade: true,
   asNavFor: '.test-drive-slider__list'
 });
 $('.test-drive-slider__list').slick({
   slidesToShow: 3,
   slidesToScroll: 1,
   asNavFor: '.test-drive-bigslider',
   dots: false,
   centerMode: true,
   nextArrow: $(".test-drive-slider__nav--next"),
   prevArrow: $(".test-drive-slider__nav--prev"),
   focusOnSelect: true
 });

   // Get the current slide
  var currentSlide = $('.test-drive-slider__list').slick('slickCurrentSlide');
}

  // story, offer sliders
  $('.a-news-grid').slick({
    dots: false,
    arrows: true,
    infinite: true,
    speed: 500,
    slidesToShow: 4,
    slidesToScroll: 1,
    draggable: true,
    nextArrow: $(".postnav__arrow--next"),
    prevArrow: $(".postnav__arrow--prev"),
    cssEase: 'ease-in-out',
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
        }
      },
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1
        }
      }
    ]
  });

  // fake input placeholder
  $('form').find('input').on('input', function (e) {
    $(e.currentTarget).attr('data-empty', !e.currentTarget.value);
  });
  // eof fake input placeholder

  // google maps footer
  google.maps.event.addDomListener(window, 'load', init);
    function init() {
      var mapOptions = {
        zoom: 15,
        disableDefaultUI: true,
        center: new google.maps.LatLng(50.406626,30.6757033),
        styles: [{"featureType":"landscape","elementType":"all","stylers":[{"color":"#dfdfdf"}]},{"featureType":"poi.park","elementType":"geometry.fill","stylers":[{"visibility":"off"}]},{"featureType":"road","elementType":"geometry","stylers":[{"lightness":100},{"visibility":"on"},{"color":"#c64566"}]},{"featureType":"road","elementType":"labels","stylers":[{"visibility":"off"}]},{"featureType":"transit.station.airport","elementType":"all","stylers":[{"visibility":"off"}]},{"featureType":"transit.station.bus","elementType":"all","stylers":[{"visibility":"off"}]},{"featureType":"water","elementType":"geometry.fill","stylers":[{"color":"#1d71b8"}]}]
      };

      var mapElement = document.getElementById('map-footer');
      var map = new google.maps.Map(mapElement, mapOptions);

      var mapElement1;
      if (mapElement1=document.getElementById("map-contacts")) {
        var map1 = new google.maps.Map(mapElement1, mapOptions);
      }
      // var mapElement1 = document.getElementById('map-contacts');
      // var map1 = new google.maps.Map(mapElement1, mapOptions);

      var image = {
        url: 'img/i-footer-info-map-top.svg',
        size: new google.maps.Size(41, 58),
        origin: new google.maps.Point(0, 0),
        anchor: new google.maps.Point(0, 58)
      };
      var image2 = {
        url: 'img/i-footer-info-map-bottom.svg',
        size: new google.maps.Size(58, 22),
        origin: new google.maps.Point(0, 0),
        anchor: new google.maps.Point(8, 15)
      };
      var marker = new google.maps.Marker({
        position: new google.maps.LatLng(50.406626,30.6757033),
        map: map,
        icon: image,
        // animation: google.maps.Animation.DROP, // appear animation
        title: 'Toyota Автосаміт'
      });
      var marker2 = new google.maps.Marker({
        position: new google.maps.LatLng(50.406626,30.6757033),
        map: map,
        icon: image2,
        //animation: google.maps.Animation.DROP, // appear animation
        title: ''
      });

      var marker3 = new google.maps.Marker({
        position: new google.maps.LatLng(50.406626,30.6757033),
        map: map1,
        icon: image,
        // animation: google.maps.Animation.DROP, // appear animation
        title: 'Toyota Автосаміт'
      });
      var marker4 = new google.maps.Marker({
        position: new google.maps.LatLng(50.406626,30.6757033),
        map: map1,
        icon: image2,
        //animation: google.maps.Animation.DROP, // appear animation
        title: ''
      });

      marker.setAnimation(google.maps.Animation.BOUNCE);
      marker3.setAnimation(google.maps.Animation.BOUNCE);
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

  //replace svg img to inline
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

  // var mySVGsToInject = document.querySelectorAll('img.svg');
  // SVGInjector(mySVGsToInject);

  //disable dummy anchor events //TODO: remove
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

  // smooth scroll to anchor  (page 04)
  $(document).on('click', 'a[href^="#"]', function (event) {
    event.preventDefault();
    $('html, body').animate({
        scrollTop: $($.attr(this, 'href')).offset().top-$(".nav").height()
    }, 500);
  });
  // eof smooth scroll to anchor  (page 04)

  // color-selector (04)
  $(".color-selector__item").click(function(){
    $(".js-color-name").text($(this).attr("data-color"));
    $(".color-selector__item").removeClass("color-selector__item--active");
    $(this).addClass("color-selector__item--active");
  });
  // eof color-selector (04)

  // 17 touch
    $(".page-touch-listing__slider").fotorama({
      autoplay: false,
      loop: true,
      arrows: "always",
      margin: 0//,
      // transition: "crossfade"
      // transition: "dissolve"
    });

    // arrow for slider
    $(".page-touch-listing__slider").each(function(){
      $(this).find(".fotorama__arr--prev").prependTo($(this).find(".fotorama__nav__shaft"));
      $(this).find(".fotorama__arr--next").appendTo($(this).find(".fotorama__nav__shaft"));
    });

  // eof 17 touch

  // pagenav tabs (31)
    $(".js-pagenav .pagenav__link").click(function(){
      $(this).parent().addClass("pagenav__item--active");
      $(this).parent().siblings().removeClass("pagenav__item--active");
      if ($(".tab-item--active").attr("data-tab")!=$(this).attr("data-tab")) {
        $(".tab-item--active").removeClass("tab-item--active").hide();
        $(".tab-item[data-tab="+$(this).attr("data-tab")+"]").fadeIn(400).addClass("tab-item--active");
      }
    });
  // eof pagenav tabs (31)

//(14)
  $(".incr-btn").on("click", function (e) {
      var $button = $(this);
      var oldValue = $button.parent().find('.quantity').val();
      $button.parent().find('.incr-btn[data-action="decrease"]').removeClass('inactive');
      if ($button.data('action') == "increase") {
          var newVal = parseFloat(oldValue) + 1;
      } else {
          // Don't allow decrementing below 1
          if (oldValue >= 1) {
              var newVal = parseFloat(oldValue) - 1;
          } else {
              newVal = 0;
              $button.addClass('inactive');
          }
      }
      $button.parent().find('.quantity').val(newVal);
      e.preventDefault();
  });
//eof counter

  (function() {
    var contents = $('.service-terms__item-container');
    var titles = $('.service-terms__item');
    titles.on('click', function() {
      var title = $(this);
      contents.filter(':visible').slideUp(function() {
        titles.removeClass('is-opened');
        $(this).parent('.service-terms__item').removeClass('is-opened');
      });
      var content = title.children('.service-terms__item-container');
      if (!content.is(':visible')) {
        content.slideDown(function() {
          $(this).parent('.service-terms__item').addClass('is-opened')
        });
      }
    });
  })();

  (function() {
    var contents = $('.vacancies-terms__item-container');
    var titles = $('.vacancies-terms__item');
    titles.on('click', function() {
      var title = $(this);
      contents.filter(':visible').slideUp(function() {
        titles.removeClass('is-opened');
        $(this).parent('.vacancies-terms__item').removeClass('is-opened');
      });
      var content = title.children('.vacancies-terms__item-container');
      if (!content.is(':visible')) {
        content.slideDown(function() {
          $(this).parent('.vacancies-terms__item').addClass('is-opened')
        });
      }
    });
  })();

  // popups
  // open by element with class as trigger and data as target
  $(".js-open-popup").click(function(){
    $("."+$(this).attr("data-popup")).addClass("popup--visible");
  });

  // close, //TODO: add closing by esc key
  $(".popup__dim, .popup__close, .popup__cancel").click(function() {
    $(this).parents(".popup").removeClass("popup--visible");
    return false;
  });

  $(".popup__switcher").click(function(){
    if (!$(this).hasClass("popup__switcher--active")) {
      $(".popup__switcher").removeClass("popup__switcher--active");
      $(this).addClass("popup__switcher--active");
    }
    var currentTab = $(".popup__switcher").index($(this));
    var currentForm = $(this).parents(".popup");
    currentForm.find(".popup__main").hide();
    currentForm.find(".popup__main").eq(currentTab).fadeIn(400);
  });
  // eof popups


  // scroll elements reveal
    window.sr = ScrollReveal({ reset: false, mobile: false });
    sr.reveal('section>.section-title, section>.section-subtitle', { duration: 500, scale: 1, opacity: 0, distance: '40px' });
  // eof scroll elements reveal

  // drag and drop
  dragula([document.getElementById("carlist"),document.getElementById("carbox")]);
  // eof drag and drop

  // popup loader
  // ADD form ajax here
  $(".js-popup-send").click(function(){
    var popupSend = $(this).parents(".popup");
    popupSend.addClass("popup--sending");
    setTimeout(function(){
      popupSend.removeClass("popup--sending");
    }, 4000);
    return false;
  });
  // eof popup loader

});  // eof doc.ready
