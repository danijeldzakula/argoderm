var slSpead = 700; //скорость перелистывания слайдов
var slTimeOut = 86400000; //время задежки показа слайда
var slNeedLinks = true; //управляет ссылками "Следующий " и "Предыдущий" - если значение этой переменной равно true, то эти ссылки будут отображаться, а если false, то соответственно их не будет
//определяем скорось для оперымини
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
    var slideNum = 0; //счетчик, номер активного слайда
    var slideTime;
    slideCount = $("#slider .slide").size();
    var animSlide = function (arrow) { // Основная функция, логика нашего слайдера
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
    var pause = false; //отвечает за остановку слайдера, если user навел курсор на слайд
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



function startTimer() {
    var my_timer = document.getElementById("my_timer");
    //var time = my_timer.innerHTML;
    //var arr = time.split(":");
    var h = $(".hour").html();
    var m = $(".min").html();
    var s = $(".sec").html();
    if (s == 0) {
        if (m == 0) {
            if (h == 0) {
                //alert("           ");

                $('.timer__item-title').hide();
                $('.timer__finish').show();
                return;
            }
            h--;
            m = 59;
            if (h < 10)
                h = "0" + h;
        }
        m--;
        if (m < 10)
            m = "0" + m;
        s = 59;
    }
    else
        s--;
    if (s < 10)
        s = "0" + s;
    $(".hour").html(h);
    $(".min").html(m);
    $(".sec").html(s);
    setTimeout(startTimer, 1000);
}
startTimer();

