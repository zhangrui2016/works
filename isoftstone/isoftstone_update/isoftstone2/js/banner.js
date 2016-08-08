/// <reference path="jQuery.js" />


var OneSlider = function (params) {
    var defaults = {
        durtion:8000
    }
    var len = $(".banner>div").length; //当前len是4
    var index = 0;
    var adTimer = null;
    $(".outer>div").eq(0).show(); //初始化第一张显示
    $(".navl>img").eq(0).attr("src", "images/pointCurrent.png");

    function showImg(nindex) {
        index = nindex; //同步自动和点击的index
        $(".banner>div").fadeOut().eq(nindex).stop(true, true).fadeIn();
        $(".navl>img").attr("src", "images/point.png").eq(nindex).attr("src", "images/pointCurrent.png");
    }

    $(".navl>img").each(function (i) {
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

var ThreeSlider = function () {
    var defaults = {
        durtion:3000
    }
    function showImg_lev3(nindex) {
        index_lev3 = nindex; //同步自动和点击的index
        $(".ble3_ani>ul>li").fadeOut().eq(nindex).stop(true, true).fadeIn();
        $(".ble3_menu>span").removeClass("current").eq(nindex).addClass("current");
    }
    $(".level").each(function (i,domEle) {  //遍历4次
        $(domEle).find(".ban_level3>ul>li.level1").each(function (j,domEle2) { //遍历5次
            len_lev3 = $(domEle2).find(".ble3_ani>ul>li").length;
            var lis_lev3 = $(domEle2).find(".ble3_ani>ul>li"); //找出所有做动画的li
            var span_lev3 = $(domEle2).find(".ble3_menu>span"); //找出对应做动画的下标
            console.log("len_lev3:" + len_lev3);
            index_lev3 = 0;
            adTimer_lev3 = null;
            lis_lev3.eq(0).show();
            span_lev3.eq(0).addClass("current");

            span_lev3.each(function (k) {
                $(this).click(function () {
                    showImg_lev3(k);
                })
            })
            
 
        })
        
    });
    
    return {
        start: function () {
            adTimer_lev3 = setInterval(function () {
                if (index_lev3 == len_lev3 - 1) { index_lev3 = -1; }
                showImg_lev3(index_lev3 + 1);

            }, defaults.durtion);
        },
        stop: function () {
            clearInterval(adTimer_lev3);
        }
    }

}

var slider,sliderT;
$(function () {
   
    slider = new OneSlider();
    //slider.start();

    //看3层是否存在 如果存在就停止1层动画
    function visible() { 
        var isVisible = false;
        $(".ban_level3").each(function () {
            if ($(this).is(":visible")) {
                isVisible = true;
                return false; //停止循环
            }
        })
        return isVisible;
    }
    if (visible()) {
        slider.stop();
    }
   
    //左侧复制一个li 复制第一个li
    var left_lev3 = document.getElementById("conleft_level3");
    var left_lev3lis = left_lev3.getElementsByTagName("li");
    var clone_li = left_lev3lis.item(0).cloneNode(true);
    left_lev3.appendChild(clone_li);

    //hotjob复制一个li 复制第一个li
    var right_lev3 = document.getElementById("conri_lev3ul");
    var right_lev3lis = right_lev3.getElementsByTagName("li");
    var clone_liri = right_lev3lis.item(0).cloneNode(true);
    right_lev3.appendChild(clone_liri);

    /*计算Featured Capabilities中动画的长度*/
    var oLevel2 = $(".ban_level2_con2");
    var oUl = $(".level2_ul");
    var oLis = $(".ban_level2_con2>.level2_ul>li");
    var olev2bg = $(".ban_level2bg"); //2层动画黑色背景
    var lenli = oLis.length;
    var banner = $(".banner");
    var nav = $(".nav");
    var olevel3 = $(".ban_level3bg"); //取到3级的黑色层
    var oLiwidth;
    function level2Width() {
        var bodyWid = document.body.clientWidth;
        if (bodyWid < 1024) {
            oLiwidth = (bodyWid * 0.7 * 0.7) / 3;
        } else {
            oLiwidth = (bodyWid * 0.56 * 0.7) / 3;
        }
        //高度取三者中的最大值
        var oLiheight = $(".ban_level2_banri").height() > $(".ban_level2_banle").height() ? $(".ban_level2_banri").height() : $(".ban_level2_banle").height();
        var CapH = $(".ban_level2_con1").height();
        var oLiheight = oLiheight > CapH ? oLiheight : CapH;
        oLis.each(function () {
            $(this).css({ "width": oLiwidth, "height": oLiheight });
        })

        oUl.width(oLiwidth * lenli);
        oUl.height(oLiheight);
        oLevel2.width(oLiwidth * 3 + 1);
        oLevel2.height(oLiheight);
        olev2bg.height(oLiheight);

        var bannerH = banner.height();
        var navH = nav.height();
        olevel3.height(bannerH - navH);
        $(".ban_level3").height(bannerH - navH);
        $(".ban_level3>ul").height(bannerH - navH);
        $(".ban_level3_con").height((bannerH - navH) * 0.75);//3层内容实际高度
        $(".ban_level3>ul>li.level1").each(function () {
            $(this).height(bannerH - navH);
        })
        

        //3层动画高度问题

        if ($(".ble3_ani>img").height() > 0) {
            var ble3H = $(".ble3_ani>img").height();
            $(".ble3_ani>ul>li").height(ble3H);
            $(".ble3_ani>ul").height(ble3H);
            $(".ble3_ani").height(ble3H);
        }
        else {
            $(".ble3_ani>img").load(function () {
                var ble3H = $(".ble3_ani>img").height();
                $(".ble3_ani>ul>li").height(ble3H);
                $(".ble3_ani>ul").height(ble3H);
                $(".ble3_ani").height(ble3H);
            });
        }
        
        //Newsroom左侧内容初始化
        left_lev3lis = $("#conleft_level3>li");
        len_left = left_lev3lis.length;
        if (bodyWid < 768) {
            width_left = bodyWid *0.9* 0.32 * 0.9; //算左侧宽度
        } else if (bodyWid > 768 && bodyWid < 1024) {
            width_left = bodyWid * 0.9 * 0.26 * 0.9;
        } else {
            width_left = bodyWid * 0.7 * 0.26 * 0.9;
        }
        var hei_left = $(".conleft_level3>ul>li").eq(0).height();
        $(".conleft_level3>ul>li").width(width_left);
        $(".conleft_level3>ul").width(width_left * len_left);
        $(".conleft_level3").width(width_left * len_left);
        $(".conleft_level2").width(width_left);
        $(".conleft_level2").height(hei_left);

        //hotjob右侧内容初始化
        right_lev3lis = $("#conri_lev3ul>li");
        len_right = right_lev3lis.length;
        if (bodyWid < 768) {
            width_right = bodyWid * 0.9 * 0.26 * 0.9; //算左侧宽度
        } else if (bodyWid > 768 && bodyWid < 1024) {
            width_right = bodyWid * 0.9 * 0.22 * 0.9;
        } else {
            width_right = bodyWid * 0.7 * 0.22 * 0.9;
        }
        var hei_right = $("#conri_lev3ul>li").eq(0).height();
        $("#conri_lev3ul>li").width(width_right);
        $("#conri_lev3ul").width(width_right * len_right);
        $(".conright_level3").width(width_right * len_right);
        $(".conright_level2").width(width_right);
        $(".conright_level2").height(hei_right);
        
    }
    level2Width();
    

    $(window).resize(function () {
        level2Width();

        if (oUl.css("left")) {
            oUl.css("left", -oLiwidth * step);
        }
        if ($(".conleft_level3").css("left")) {
            $(".conleft_level3").css("left", -width_left * left_step);
        }
        if ($(".conright_level3").css("left")) {
            $(".conright_level3").css("left", -width_right * right_step);
        }
    });

    //Newsroom点击向左滚动
    left_step = 0;
    var imghref_le = $("#news_left").attr("href");
    var imgsrc_le = $("#news_left").attr("src");
    var imghref_ri = $("#news_right").attr("href");
    var imgsrc_ri = $("#news_right").attr("src");
    $("#news_left").click(function () {
        left_step++;
        if (left_step < len_left - 1) {
            $(".conleft_level3").stop(true, true).animate({ "left": -width_left * left_step }, 500);
            $(this).attr("src", imgsrc_le);
            $("#news_right").attr("src", imgsrc_ri);
            if (left_step == len_left - 2) {
                $(this).attr("src", imghref_le);
                $("#news_right").attr("src", imgsrc_ri);
            }
        } else {
            $(this).attr("src", imghref_le);
            $("#news_right").attr("src", imgsrc_ri);
            left_step = len_left - 2;
        }
          
    })
    //Newsroom点击向右滚动
    $("#news_right").click(function () {
        left_step--;
        if (left_step > -1) {
            $(".conleft_level3").stop(true, true).animate({ "left": -width_left * left_step }, 500);
            $(this).attr("src", imgsrc_ri);
            $("#news_left").attr("src", imgsrc_le);
            if (left_step == 0) {
                $(this).attr("src", imghref_ri);
                $("#news_left").attr("src", imgsrc_le);
            }
        } else {
            $(this).attr("src", imghref_ri);
            $("#news_left").attr("src", imgsrc_le);
            left_step = 0;
        }

    })
    //Newsroom自动动画
    function autoMv() {
        left_step++;
        if (left_step == len_left) {
            left_step = 1;
            $(".conleft_level3").css("left", 0);
        }
        $(".conleft_level3").animate({ "left": -width_left * left_step }, 500);
        $("#news_left").attr("src", imgsrc_le);
        $("#news_right").attr("src", imgsrc_ri);
        
    }
    var slidingFlag = setInterval(autoMv, 8000);
    $(".conleft_level2").hover(function () {
        clearInterval(slidingFlag);
    }, function () {
        slidingFlag = setInterval(autoMv, 8000);
    });
    $("#news_right").hover(function () {
        clearInterval(slidingFlag);
    }, function () {
        slidingFlag = setInterval(autoMv, 8000);
    });
    $("#news_left").hover(function () {
        clearInterval(slidingFlag);
    }, function () {
        slidingFlag = setInterval(autoMv, 8000);
    });



    //hotJobs点击向左滚动
    right_step = 0;
    var ri_imghref_le = $("#hot_left").attr("href");
    var ri_imgsrc_le = $("#hot_left").attr("src");
    var ri_imghref_ri = $("#hot_right").attr("href");
    var ri_imgsrc_ri = $("#hot_right").attr("src");
    $("#hot_left").click(function () {
        right_step++;
        if (right_step < len_right - 1) {
            $(".conright_level3").stop(true, true).animate({ "left": -width_right * right_step }, 500);
            $(this).attr("src", ri_imgsrc_le);
            $("#hot_right").attr("src", ri_imgsrc_ri);
            if (right_step == len_right - 2) {
                $(this).attr("src", ri_imghref_le);
                $("#hot_right").attr("src", ri_imgsrc_ri);
            }
        } else {
            $(this).attr("src", ri_imghref_le);
            $("#hot_right").attr("src", ri_imgsrc_ri);
            right_step = len_right - 2;
        }

    })
    //hotJobs点击向右滚动
    $("#hot_right").click(function () {
        right_step--;
        if (right_step > -1) {
            $(".conright_level3").stop(true, true).animate({ "left": -width_right * right_step }, 500);
            $(this).attr("src", ri_imgsrc_ri);
            $("#hot_left").attr("src", ri_imgsrc_le);
            if (right_step == 0) {
                $(this).attr("src", ri_imghref_ri);
                $("#hot_left").attr("src", ri_imgsrc_le);
            }
        } else {
            $(this).attr("src", ri_imghref_ri);
            $("#hot_left").attr("src", ri_imgsrc_le);
            right_step = 0;
        }

    })
    //hotJobs自动动画
    function autoMvri() {
        right_step++;
        if (right_step == len_right) {
            right_step = 1;
            $(".conright_level3").css("left", 0);
        }
        $(".conright_level3").animate({ "left": -width_right * right_step }, 500);
        $("#hot_left").attr("src", ri_imgsrc_le);
        $("#hot_right").attr("src", ri_imgsrc_ri);

    }
    var slidingFlag_ri = setInterval(autoMvri, 8000);
    $(".conright_level2").hover(function () {
        clearInterval(slidingFlag_ri);
    }, function () {
        slidingFlag_ri = setInterval(autoMvri, 8000);
    });
    $("#hot_right").hover(function () {
        clearInterval(slidingFlag_ri);
    }, function () {
        slidingFlag_ri = setInterval(autoMvri, 8000);
    });
    $("#hot_left").hover(function () {
        clearInterval(slidingFlag_ri);
    }, function () {
        slidingFlag_ri = setInterval(autoMvri, 8000);
    });


    //banenr2层动画
    var step = 0;
    $(".ban_level2_con3>span>img").each(function (i,v) {
        $(this).click(function () {
            var oLiwidth = $(".ban_level2").eq(i).width() * 0.7 / 3;
            var $ul = $(this).parent().parent().prev().children();
            var length = $ul.children().length;
            if (step <length - 3) { //做动画的条件是li总数-3
                step++;
                $ul.animate({ "left": -oLiwidth * step }, 500);
  
            } else {
                $ul.animate({ "left": 0 }, 500);
                step = 0;
            }
        })
        
        
    })
   

    //点2层出3层的动画  3层对应索引显示 其它隐藏

    $(".level").each(function (j) {
        $(".ban_level2_con2>ul>li",this).each(function (i, v) {
            $(this).click(function(){
                var index3 = i; //当前点击的索引
                console.log("当前索引为："+index3);
                var ban3Lis = $(this).parent().parent().parent().next().children().children(); //获取3层li
                ban3Lis.parent().parent().fadeIn();
                ban3Lis.fadeOut().eq(index3).stop(true, true).fadeIn(500);
                slider.stop();     //1层动画停止
                sliderT = new ThreeSlider();
                sliderT.start();  //3层动画开启
            })
        
        })


    });

    //点击三层关闭 关闭3层动画 1层动画开始轮播
    $(".ble3_del").click(function () {
        $(this).parent().fadeOut();
        $(this).parent().parent().parent().fadeOut();
        slider.start();  

    })
    
})


