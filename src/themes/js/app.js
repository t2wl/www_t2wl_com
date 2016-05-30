jQuery(document).ready(function($) {
    var swiper = new Swiper('.swiper-container1', {
        nextButton: '.swiper-button-next',
        prevButton: '.swiper-button-prev',
        loop: true,
    });
    var swiper = new Swiper('.swiper-container2', {
        nextButton: '.swiper-button-next',
        prevButton: '.swiper-button-prev',
        loop: true,
        slidesPerView: 3,
    });

    $(window).resize(function() {
        if (document.body.scrollWidth <= 920) {
            var swiper = new Swiper('.swiper-container2', {
                slidesPerView: 2,
            });
        } else {
            var swiper = new Swiper('.swiper-container2', {
                slidesPerView: 3,
            });
        }
    });

    $(document).scroll(function(event) {
        var top = document.body.scrollTop || document.documentElement.scrollTop;
        if (top !== 0) {
            $('.fixed-footer').hide();
        } else {
            $('.fixed-footer').show();
        }
    });
});
