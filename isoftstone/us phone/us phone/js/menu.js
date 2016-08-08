/// <reference path="jQuery.js" />
$(function () {
    //导航切换
    $(".text-menu").click(function () {
        var lev1_menu = $(".navigation");
        var $img = $(this).find("img");
        if (lev1_menu.is(":visible")) {
            lev1_menu.hide();
            $img.attr("src", "images/arrow_whiteDown@2x.png");
        } else {
            lev1_menu.show();
            $img.attr("src", "images/arrow_whiteUp@2x.png");
        }
    })

    $(".dropdown>a").click(function () {
        var lev2_menu = $(this).next();
        var $img = $(this).children("img");
        if (lev2_menu.is(":visible")) {
            lev2_menu.hide();
            $img.attr("src", "images/arrow_whiteDown@2x.png");
        } else {
            lev2_menu.show();
            $img.attr("src", "images/arrow_whiteUp@2x.png");
            //关闭其它
            $(this).parent().siblings().children(".dropdown-menu").hide();
            var $siblingimg = $(this).parent().siblings().children("a").children("img");
            $siblingimg.attr("src", "images/arrow_whiteDown@2x.png");
        }
        return false; //阻止跳转
    })

    //列表页面展示更多 目前显示10条 如果内容多余10条 会有更多
    var hide_lis=$(".listdiv>ul>li:gt(9)");
    hide_lis.hide();
    var len_listlis = $(".listdiv>ul>li").length;
    var list_more = $(".listmore");
    if (len_listlis > 10) {
        list_more.show();
    } else {
        list_more.hide();
    }
    list_more.click(function () {
        var lis_el = $(".listdiv>ul>li:eq(10)");
        var $span = $(".listmore>span");
        var $img = $(".listmore>img");
        if (lis_el.is(":visible")) {
            hide_lis.hide();
            $span.text("MORE");
            $img.attr("src", "images/arrow_redDown@2x.png");
        } else {
            hide_lis.show();
            $span.text("UP");
            $img.attr("src", "images/arrow_redUp@2x.png");
        }
    })

    //高清屏上调用@2x.png
    if (window.devicePixelRatio == 1) {
        var $imgAll = $("img");
        $imgAll.each(function () {
            var $img_datasrc = $(this).attr("data-src");
            if ($img_datasrc) {
                $(this).attr("src", $img_datasrc);
            }
            
        })
    }

})