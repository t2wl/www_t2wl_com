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
    var swiper = new Swiper('.swiper-container3', {
        nextButton: '.swiper-button-next',
        prevButton: '.swiper-button-prev',
        loop: true,
        slidesPerView: 2,
        spaceBetween : 50,
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

    $('.slidedown-s').click(function(event) {
            $(this).next().slideToggle();
    });

    $('.slidedown').hover(function(event) {
        $(this).find('dl').stop().slideDown();
    },function(){
        $(this).find('dl').stop().slideUp();
    });

    try {
     var m_top = $('.mou-items').offset().top;
    } catch (e) {
     console.log(e.name + ": " + e.message);
    }

    $(document).scroll(function(event) {
        var top = document.body.scrollTop || document.documentElement.scrollTop;
        if(m_top && top > m_top){
            $('.mou-items').css({'position':'fixed','right':'175px',"top":"0"});
        }else if(top < m_top){
            $('.mou-items').attr('style','');
            console.log('obj');
        }
        if (top !== 0) {
            $('.fixed-footer').hide();
        } else {
            $('.fixed-footer').show();
        }
    });
});
