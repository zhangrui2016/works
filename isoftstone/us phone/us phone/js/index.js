/// <reference path="jQuery.js" />
var OneSlider = function () {
    var defaults = {
        durtion: 8000
    }
    var len = $("#banner>ul>li").length; //当前len是4
    var index = 0;
    var adTimer = null;
    $("#banner>ul>li").eq(0).show(); //初始化第一张显示
    $(".banner_bar>img").eq(0).attr("src", "images/current@2x.png");

    function showImg(nindex) {
        index = nindex; //同步自动和点击的index
        $("#banner>ul>li").fadeOut().eq(nindex).stop(true, true).fadeIn();
        $(".banner_bar>img").attr("src", "images/notCurrent@2x.png").eq(nindex).attr("src", "images/current@2x.png");
    }

    $(".banner_bar>img").each(function (i) {
        $(this).click(function () {
            showImg(i);
        })
    });

    return {
        start: function () {
            adTimer = setInterval(function () {
                if (index == len - 1) { index = -1; }
                showImg(index + 1);

            }, defaults.durtion);

        },
        stop: function () {
            clearInterval(adTimer);
        }
    }
}

var slider;
$(function () {
    slider = new OneSlider();
    slider.start();

    

    //初始化层上内容 如果li的个数大于1 显示更多 否则不显示更多
    $("#banner>ul>li").each(function (i) {
        var childLi = $(this).find(".ban_conlev>ul>li");
        var pMore = childLi.parent().prev();
        if (childLi.length > 1) {
            pMore.show();
        } else {
            pMore.hide();
            
        }
    })

    //初始化层上面内容 算出宽高 方便做动画
    
    function bannerCon() {
        var bodyWid = document.body.clientWidth;
        ban_liwid = bodyWid * 0.92;
        $(".ban_conlev>ul>li").each(function () {
            $(this).css("width", ban_liwid);
        })
        $(".ban_conlev").css("width", ban_liwid);
        $("#banner>ul>li").each(function (i) {
            var childLi_len = $(this).find(".ban_conlev>ul>li").length;
            var childUl = $(this).find(".ban_conlev>ul");
            childUl.css("width", ban_liwid * childLi_len);
            if (parseFloat(childUl.css("left")) < 0) {
                childUl.css("left", -ban_liwid * step);
            } else {
                childUl.css("left", 0);
            }

        })

    }
    bannerCon();
    
    //点击更多 可以切换到第2个li的内容
    var step = 0;
    $("p.more").each(function (i, v) {
        $(this).click(function () {
            var $ul = $(this).next();
            var length = $ul.children().length;
            if (step < length - 1) { //做动画的条件是li总数-1
                step++;
                $ul.animate({ "left": -ban_liwid * step }, 500);

            } else {
                $ul.animate({ "left": 0 }, 500);
                step = 0;
            }
            slider.stop(); //1层动画停止
            slider.start();
        })


    })

    //初始化内容右侧宽度
    function contentW() {
        var bodyWid = document.body.clientWidth;
        var ban_liwid = bodyWid * 0.92; 
        $(".conleft_level4con").width(ban_liwid - 80);
        
    }
    contentW()

    //方便现在看
    $(window).resize(function () {
        bannerCon();
        contentW()
    })

})