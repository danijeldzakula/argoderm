var slSpead = 700; //ÑÐºÐ¾Ñ€Ð¾ÑÑ‚ÑŒ Ð¿ÐµÑ€ÐµÐ»Ð¸ÑÑ‚Ñ‹Ð²Ð°Ð½Ð¸Ñ ÑÐ»Ð°Ð¹Ð´Ð¾Ð²
var slTimeOut = 86400000; //Ð²Ñ€ÐµÐ¼Ñ Ð·Ð°Ð´ÐµÐ¶ÐºÐ¸ Ð¿Ð¾ÐºÐ°Ð·Ð° ÑÐ»Ð°Ð¹Ð´Ð°
var slNeedLinks = true; //ÑƒÐ¿Ñ€Ð°Ð²Ð»ÑÐµÑ‚ ÑÑÑ‹Ð»ÐºÐ°Ð¼Ð¸ "Ð¡Ð»ÐµÐ´ÑƒÑŽÑ‰Ð¸Ð¹ " Ð¸ "ÐŸÑ€ÐµÐ´Ñ‹Ð´ÑƒÑ‰Ð¸Ð¹" - ÐµÑÐ»Ð¸ Ð·Ð½Ð°Ñ‡ÐµÐ½Ð¸Ðµ ÑÑ‚Ð¾Ð¹ Ð¿ÐµÑ€ÐµÐ¼ÐµÐ½Ð½Ð¾Ð¹ Ñ€Ð°Ð²Ð½Ð¾ true, Ñ‚Ð¾ ÑÑ‚Ð¸ ÑÑÑ‹Ð»ÐºÐ¸ Ð±ÑƒÐ´ÑƒÑ‚ Ð¾Ñ‚Ð¾Ð±Ñ€Ð°Ð¶Ð°Ñ‚ÑŒÑÑ, Ð° ÐµÑÐ»Ð¸ false, Ñ‚Ð¾ ÑÐ¾Ð¾Ñ‚Ð²ÐµÑ‚ÑÑ‚Ð²ÐµÐ½Ð½Ð¾ Ð¸Ñ… Ð½Ðµ Ð±ÑƒÐ´ÐµÑ‚
//Ð¾Ð¿Ñ€ÐµÐ´ÐµÐ»ÑÐµÐ¼ ÑÐºÐ¾Ñ€Ð¾ÑÑŒ Ð´Ð»Ñ Ð¾Ð¿ÐµÑ€Ñ‹Ð¼Ð¸Ð½Ð¸
var isMobile = {
    Opera: function () {
        return navigator.userAgent.match(/Opera Mini/i);
    }
};
if (isMobile.Opera()) {
    slSpead = 100;
};
///
$(document).ready(function (e) {
    $('.slide').css({
        "position": "absolute"
        , "top": '0'
        , "left": '0'
    }).hide().eq(0).show();
    var slideNum = 0; //ÑÑ‡ÐµÑ‚Ñ‡Ð¸Ðº, Ð½Ð¾Ð¼ÐµÑ€ Ð°ÐºÑ‚Ð¸Ð²Ð½Ð¾Ð³Ð¾ ÑÐ»Ð°Ð¹Ð´Ð°
    var slideTime;
    slideCount = $("#slider .slide").size();
    var animSlide = function (arrow) { // ÐžÑÐ½Ð¾Ð²Ð½Ð°Ñ Ñ„ÑƒÐ½ÐºÑ†Ð¸Ñ, Ð»Ð¾Ð³Ð¸ÐºÐ° Ð½Ð°ÑˆÐµÐ³Ð¾ ÑÐ»Ð°Ð¹Ð´ÐµÑ€Ð°
        clearTimeout(slideTime);
        $('.slide').eq(slideNum).fadeOut(slSpead);
        if (arrow == "next") {
            if (slideNum == (slideCount - 1)) {
                slideNum = 0;
            } else {
                slideNum++
            }
        } else if (arrow == "prew") {
            if (slideNum == 0) {
                slideNum = slideCount - 1;
            } else {
                slideNum -= 1
            }
        } else {
            slideNum = arrow;
        }
        $('.slide').eq(slideNum).fadeIn(slSpead, rotator);
        $(".control-slide.active").removeClass("active");
        $('.control-slide').eq(slideNum).addClass('active');
    };
    if (slNeedLinks) {
        var $linkArrow = $('<button id="prewbutton"></button><button id="nextbutton"></button>')
            .prependTo('#slider');
        $('#nextbutton').click(function () {
            animSlide("next");

        });
        $('#prewbutton').click(function () {
            animSlide("prew");
        })
    }
    var $adderSpan = '';
    $('.slide').each(function (index) {
        $adderSpan += '<span class = "control-slide">' + index + '</span>';
    });
    $('<div class ="sli-links">' + $adderSpan + '</div>').appendTo('#slider-wrap');
    $(".control-slide:first").addClass("active");

    $('.control-slide').click(function () {
        var goToNum = parseFloat($(this).text());
        animSlide(goToNum);
    });
    var pause = false; //Ð¾Ñ‚Ð²ÐµÑ‡Ð°ÐµÑ‚ Ð·Ð° Ð¾ÑÑ‚Ð°Ð½Ð¾Ð²ÐºÑƒ ÑÐ»Ð°Ð¹Ð´ÐµÑ€Ð°, ÐµÑÐ»Ð¸ user Ð½Ð°Ð²ÐµÐ» ÐºÑƒÑ€ÑÐ¾Ñ€ Ð½Ð° ÑÐ»Ð°Ð¹Ð´
    var rotator = function () {
        if (!pause) {
            slideTime = setTimeout(function () {
                animSlide('next')
            }, slTimeOut);
        }
    };
    $('#slider-wrap').hover(
        function () {
            clearTimeout(slideTime);
            pause = true;
        }
        , function () {
            pause = false;
            rotator();
        });
    rotator();
});





