    // Preloader
    $(window).on('load', function() {
        if ($('#preloader').length) {
        $('#preloader').delay(100).fadeOut('slow', function() {
            $(this).remove();
        });
        }
    });

    //scroll header active
    $(window).on("scroll", function () {
        $(this).scrollTop() > 130 ? $(".header-part").addClass("active") : $(".header-part").removeClass("active");
    }),

    //dropdown link
    $(function () {
        $(".dropdown-link").click(function () {
            $(this).next().slideToggle('slow'), $(".dropdown-list:visible").length > 1 && ($(".dropdown-list:visible").hide(), $(this).next().show());
        });
    }),

    //header category
    $(".header-cate, .cate-btn").on("click", function () {
        $("body").css("overflow", "hidden"),
            $(".category-part").addClass("active"),
            $(".category-close").on("click", function () {
                $("body").css("overflow", "inherit"), $(".category-part").removeClass("active");
            });
    }),

    // header user
    $(".header-user").on("click", function () {
        $("body").css("overflow", "hidden"),
            $(".mobile-nav").addClass("active"),
            $(".nav-close").on("click", function () {
                $("body").css("overflow", "inherit"), $(".mobile-nav").removeClass("active");
            });
    }),

    // header cart
    $(".header-cart, .cart-btn").on("click", function () {
        $("body").css("overflow", "hidden"),
            $(".cart-part").addClass("active"),
            $(".cart-close").on("click", function () {
                $("body").css("overflow", "inherit"), $(".cart-part").removeClass("active");
            });
    }),

    //coupon button
    $(".coupon-btn").on("click", function () {
        $(this).hide(), $(".coupon-form").css("display", "flex");
    }),

    //header search
    $(".header-src").on("click", function () {
        $(".header-form").toggleClass("active"), $(this).children(".far fa-search").toggleClass("far fa-times");
    }),

    //wishlist toggle
    $(".wish").on("click", function () {
        $(this).toggleClass("active");
    }),

    //product auantity
    $(".action-plus").on("click", function () {
        var i = $(this).closest(".product-action").children(".action-input").get(0).value++,
            c = $(this).closest(".product-action").children(".action-minus");
        i > 0 && c.removeAttr("disabled");
    }),
    $(".action-minus").on("click", function () {
        2 == $(this).closest(".product-action").children(".action-input").get(0).value-- && $(this).attr("disabled", "disabled");
    }),

    //review  widget btn
    $(".review-widget-btn").on("click", function () {
        $(this).next(".review-widget-list").toggle();
    }),

    //offer select
    $(".offer-select").on("click", function () {
        $(this).text("Copied!");
    }),

    //modal
    $(".modal").on("shown.bs.modal", function (i) {
        $(".preview-slider, .thumb-slider").slick("setPosition"), $(".product-details-image").addClass("slider-opacity");
    }),

    //profile card contact
    $(".profile-card.contact").on("click", function () {
        $(".profile-card.active").removeClass("active"), $(this).addClass("active");
    }),

    //profile card
    $(".profile-card.address").on("click", function () {
        $(".profile-card.active").removeClass("active"), $(this).addClass("active");
    }),

    //payment card
    $(".payment-card.payment").on("click", function () {
        $(".payment-card.active").removeClass("active"), $(this).addClass("active");
    });


    //countdown
    $('[data-countdown]').each(function() {
        var $this = $(this),
            finalDate = $(this).data('countdown');
            $this.countdown(finalDate, function(event) {
            $this.html(event.strftime(
                 '<span class="days">%-D<small>days</small></span><span class="hour">%-H<small>hours</small></span><span class="minutes">%M<small>minutes</small></span><span  class="second">%S<small>seconds</small></span>'            ));
        });
    });

  // Back to top button
  $(window).scroll(function() {
    if ($(this).scrollTop() > 100) {
      $('.back-to-top').fadeIn('slow');
    } else {
      $('.back-to-top').fadeOut('slow');
    }
  });

  $('.back-to-top').click(function() {
    $('html, body').animate({
      scrollTop: 0
    }, 1500);
  });
