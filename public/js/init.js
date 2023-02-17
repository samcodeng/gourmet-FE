(function ($) {
  $(function () {
    $(".parallax").parallax();
    $(".reviews .owl-carousel").owlCarousel({
      loop: false,
      dots: true,
      nav: true,
      center: false,
      margin: 5,
      responsiveClass: true,
      autoplay: false,
      autoplayTimeout: 2000,
      autoplayHoverPause: false,
      responsive: {
        0: {
          items: 1,
          nav: false,
          dots: true,
        },
        600: {
          items: 1,
          dots: true,
          nav: false,
        },
        1000: {
          items: 1,
          dots: true,
        },
      },
    });
  }); // end of document ready
})(jQuery); // end of jQuery name space
