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
        breakpoints: {
            920: {
              slidesPerView: 2,
            }
        }
    });
    var swiper = new Swiper('.swiper-container3', {
        nextButton: '.swiper-button-next',
        prevButton: '.swiper-button-prev',
        loop: true,
        slidesPerView: 2,
        breakpoints: {
            920: {
              slidesPerView: 1,
            }
        }
    });

    var swiper = new Swiper('.swiper-container4', {
        nextButton: '.swiper-button-next',
        prevButton: '.swiper-button-prev',
        loop: true,
        slidesPerView: 2,
        spaceBetween:30,
        breakpoints: {
            920: {
              slidesPerView: 1,
            }
        }
    });

    var swiper = new Swiper('.swiper-container5', {
        nextButton: '.swiper-button-next',
        prevButton: '.swiper-button-prev',
        loop: true,
        slidesPerView: 2,
        spaceBetween:30
    });

    /*$(window).resize(function() {
        if (document.body.scrollWidth <= 920) {
            var swiper = new Swiper('.swiper-container2', {
                slidesPerView: 2,
            });
            var swiper = new Swiper('.swiper-container3', {
                slidesPerView: 1,
            });
            var swiper = new Swiper('.swiper-container4', {
                slidesPerView: 1,
            });
        } else {
            var swiper = new Swiper('.swiper-container2', {
                slidesPerView: 3,
            });
            var swiper = new Swiper('.swiper-container3', {
                slidesPerView: 2,
            });
            var swiper = new Swiper('.swiper-container4', {
                slidesPerView: 2,
                spaceBetween:30
            });
        }
    });*/

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
            $('.mou-items').css({'position':'fixed','right':'-5px',"top":"0","width":"24%"});
        }else if(top < m_top){
            $('.mou-items').attr('style','');
            console.log('obj');
        }
        if (top !== 0) {
            $('.fixed-footer').addClass('active');
        } else {
            $('.fixed-footer').removeClass('active');
        }
    });
});
