/**************************************************************************
 * jquery.themepunch.revolution.js - jQuery Plugin for kenburn Slider
 * @version: 2.3 (15.02.2013)
 * @requires jQuery v1.7 or later (tested on 1.9)
 * @author ThemePunch
**************************************************************************/

(function (e, t) {
    function n(t, n) {
        t.find(".defaultimg").each(function (i) {
            p(e(this), n);
            n.height = Math.round(n.startheight * (n.width / n.startwidth));
            t.height(n.height);
            p(e(this), n);
            try {
                t.parent().find(".tp-bannershadow").css({
                    width: n.width
                })
            } catch (s) {}
            var o = t.find(">ul >li:eq(" + n.act + ") .slotholder");
            var u = t.find(">ul >li:eq(" + n.next + ") .slotholder");
            y(t, n);
            u.find(".defaultimg").css({
                opacity: 0
            });
            o.find(".defaultimg").css({
                opacity: 1
            });
            b(t, n);
            var a = t.find(">ul >li:eq(" + n.next + ")");
            t.find(".tp-caption").each(function () {
                e(this).stop(true, true)
            });
            k(a, n);
            r(n, t)
        })
    }

    function r(e, t) {
        e.cd = 0;
        if (e.videoplaying != true) {
            var n = t.find(".tp-bannertimer");
            if (n.length > 0) {
                n.stop();
                n.css({
                    width: "0%"
                });
                n.animate({
                    width: "100%"
                }, {
                    duration: e.delay - 100,
                    queue: false,
                    easing: "linear"
                })
            }
            clearTimeout(e.thumbtimer);
            e.thumbtimer = setTimeout(function () {
                o(t);
                h(t, e)
            }, 200)
        }
    }

    function i(e, t) {
        e.cd = 0;
        w(t, e);
        var n = t.find(".tp-bannertimer");
        if (n.length > 0) {
            n.stop();
            n.css({
                width: "0%"
            });
            n.animate({
                width: "100%"
            }, {
                duration: e.delay - 100,
                queue: false,
                easing: "linear"
            })
        }
    }

    function s(n, r) {
        var s = n.parent();
        if (r.navigationType == "thumb" || r.navsecond == "both") {
            s.append('<div class="tp-bullets tp-thumbs ' + r.navigationStyle + '"><div class="tp-mask"><div class="tp-thumbcontainer"></div></div></div>')
        }
        var a = s.find(".tp-bullets.tp-thumbs .tp-mask .tp-thumbcontainer");
        var f = a.parent();
        f.width(r.thumbWidth * r.thumbAmount);
        f.height(r.thumbHeight);
        f.parent().width(r.thumbWidth * r.thumbAmount);
        f.parent().height(r.thumbHeight);
        n.find(">ul:first >li").each(function (e) {
            var r = n.find(">ul:first >li:eq(" + e + ")");
            if (r.data("thumb") != t) var i = r.data("thumb");
            else var i = r.find("img:first").attr("src");
            a.append('<div class="bullet thumb"><img src="' + i + '"></div>');
            var s = a.find(".bullet:first")
        });
        var l = 100;
        a.find(".bullet").each(function (t) {
            var s = e(this);
            if (t == r.slideamount - 1) s.addClass("last");
            if (t == 0) s.addClass("first");
            s.width(r.thumbWidth);
            s.height(r.thumbHeight);
            if (l > s.outerWidth(true)) l = s.outerWidth(true);
            s.click(function () {
                if (r.transition == 0 && s.index() != r.act) {
                    r.next = s.index();
                    i(r, n)
                }
            })
        });
        var c = l * n.find(">ul:first >li").length;
        var h = a.parent().width();
        r.thumbWidth = l;
        if (h < c) {
            e(document).mousemove(function (t) {
                e("body").data("mousex", t.pageX)
            });
            a.parent().mouseenter(function () {
                var t = e(this);
                t.addClass("over");
                var r = t.offset();
                var i = e("body").data("mousex") - r.left;
                var s = t.width();
                var o = t.find(".bullet:first").outerWidth(true);
                var a = o * n.find(">ul:first >li").length;
                var f = a - s + 15;
                var l = f / s;
                i = i - 30;
                var c = 0 - i * l;
                if (c > 0) c = 0;
                if (c < 0 - a + s) c = 0 - a + s;
                u(t, c, 200)
            });
            a.parent().mousemove(function () {
                var t = e(this);
                var r = t.offset();
                var i = e("body").data("mousex") - r.left;
                var s = t.width();
                var o = t.find(".bullet:first").outerWidth(true);
                var a = o * n.find(">ul:first >li").length;
                var f = a - s + 15;
                var l = f / s;
                i = i - 30;
                var c = 0 - i * l;
                if (c > 0) c = 0;
                if (c < 0 - a + s) c = 0 - a + s;
                u(t, c, 0)
            });
            a.parent().mouseleave(function () {
                var t = e(this);
                t.removeClass("over");
                o(n)
            })
        }
    }

    function o(e) {
        var t = e.parent().find(".tp-bullets.tp-thumbs .tp-mask .tp-thumbcontainer");
        var n = t.parent();
        var r = n.offset();
        var i = n.find(".bullet:first").outerWidth(true);
        var s = n.find(".bullet.selected").index() * i;
        var o = n.width();
        var i = n.find(".bullet:first").outerWidth(true);
        var a = i * e.find(">ul:first >li").length;
        var f = a - o;
        var l = f / o;
        var c = 0 - s;
        if (c > 0) c = 0;
        if (c < 0 - a + o) c = 0 - a + o;
        if (!n.hasClass("over")) {
            u(n, c, 200)
        }
    }

    function u(e, t, n) {
        e.stop();
        e.find(".tp-thumbcontainer").animate({
            left: t + "px"
        }, {
            duration: n,
            queue: false
        })
    }

    function a(t, n) {
        if (n.navigationType == "bullet" || n.navigationType == "both") {
            t.parent().append('<div class="tp-bullets simplebullets ' + n.navigationStyle + '"></div>')
        }
        var r = t.parent().find(".tp-bullets");
        t.find(">ul:first >li").each(function (e) {
            var n = t.find(">ul:first >li:eq(" + e + ") img:first").attr("src");
            r.append('<div class="bullet"></div>');
            var i = r.find(".bullet:first")
        });
        r.find(".bullet").each(function (r) {
            var s = e(this);
            if (r == n.slideamount - 1) s.addClass("last");
            if (r == 0) s.addClass("first");
            s.click(function () {
                var e = false;
                if (n.navigationArrows == "withbullet" || n.navigationArrows == "nexttobullets") {
                    if (s.index() - 1 == n.act) e = true
                } else {
                    if (s.index() == n.act) e = true
                } if (n.transition == 0 && !e) {
                    if (n.navigationArrows == "withbullet" || n.navigationArrows == "nexttobullets") {
                        n.next = s.index() - 1
                    } else {
                        n.next = s.index()
                    }
                    i(n, t)
                }
            })
        });
        r.append('<div class="tpclear"></div>');
        h(t, n)
    }

    function f(e, n) {
        var r = e.find(".tp-bullets");
        var s = "";
        var o = n.navigationStyle;
        if (n.navigationArrows == "none") s = "visibility:none";
        n.soloArrowStyle = "default";
        if (n.navigationArrows != "none" && n.navigationArrows != "nexttobullets") o = n.soloArrowStyle;
        e.parent().append('<div style="' + s + '" class="tp-leftarrow tparrows ' + o + '"></div>');
        e.parent().append('<div style="' + s + '" class="tp-rightarrow tparrows ' + o + '"></div>');
        e.parent().find(".tp-rightarrow").click(function () {
            if (n.transition == 0) {
                if (e.data("showus") != t && e.data("showus") != -1) n.next = e.data("showus") - 1;
                else n.next = n.next + 1;
                e.data("showus", -1);
                if (n.next >= n.slideamount) n.next = 0;
                if (n.next < 0) n.next = 0;
                if (n.act != n.next) i(n, e)
            }
        });
        e.parent().find(".tp-leftarrow").click(function () {
            if (n.transition == 0) {
                n.next = n.next - 1;
                n.leftarrowpressed = 1;
                if (n.next < 0) n.next = n.slideamount - 1;
                i(n, e)
            }
        });
        h(e, n)
    }

    function l(e, t) {
        if (t.touchenabled == "on") e.swipe({
            data: e,
            swipeRight: function () {
                if (t.transition == 0) {
                    t.next = t.next - 1;
                    t.leftarrowpressed = 1;
                    if (t.next < 0) t.next = t.slideamount - 1;
                    i(t, e)
                }
            },
            swipeLeft: function () {
                if (t.transition == 0) {
                    t.next = t.next + 1;
                    if (t.next == t.slideamount) t.next = 0;
                    i(t, e)
                }
            },
            allowPageScroll: "auto"
        })
    }

    function c(e, t) {
        var n = e.parent().find(".tp-bullets");
        var r = e.parent().find(".tparrows");
        if (n == null) {
            e.append('<div class=".tp-bullets"></div>');
            var n = e.parent().find(".tp-bullets")
        }
        if (r == null) {
            e.append('<div class=".tparrows"></div>');
            var r = e.parent().find(".tparrows")
        }
        e.data("hidethumbs", t.hideThumbs);
        n.addClass("hidebullets");
        r.addClass("hidearrows");
        n.hover(function () {
            n.addClass("hovered");
            clearTimeout(e.data("hidethumbs"));
            n.removeClass("hidebullets");
            r.removeClass("hidearrows")
        }, function () {
            n.removeClass("hovered");
            if (!e.hasClass("hovered") && !n.hasClass("hovered")) e.data("hidethumbs", setTimeout(function () {
                n.addClass("hidebullets");
                r.addClass("hidearrows")
            }, t.hideThumbs))
        });
        r.hover(function () {
            n.addClass("hovered");
            clearTimeout(e.data("hidethumbs"));
            n.removeClass("hidebullets");
            r.removeClass("hidearrows")
        }, function () {
            n.removeClass("hovered")
        });
        e.on("mouseenter", function () {
            e.addClass("hovered");
            clearTimeout(e.data("hidethumbs"));
            n.removeClass("hidebullets");
            r.removeClass("hidearrows")
        });
        e.on("mouseleave", function () {
            e.removeClass("hovered");
            if (!e.hasClass("hovered") && !n.hasClass("hovered")) e.data("hidethumbs", setTimeout(function () {
                n.addClass("hidebullets");
                r.addClass("hidearrows")
            }, t.hideThumbs))
        })
    }

    function h(e, t) {
        var n = e.parent();
        var r = n.find(".tp-bullets");
        var i = n.find(".tp-leftarrow");
        var s = n.find(".tp-rightarrow");
        if (t.navigationType == "thumb" && t.navigationArrows == "nexttobullets") t.navigationArrows = "solo";
        if (t.navigationArrows == "nexttobullets") {
            i.prependTo(r).css({
                "float": "left"
            });
            s.insertBefore(r.find(".tpclear")).css({
                "float": "left"
            })
        }
        if (t.navigationArrows != "none" && t.navigationArrows != "nexttobullets") {
            i.css({
                position: "absolute"
            });
            s.css({
                position: "absolute"
            });
            if (t.soloArrowLeftValign == "center") i.css({
                top: "50%",
                marginTop: t.soloArrowLeftVOffset - Math.round(i.innerHeight() / 2) + "px"
            });
            if (t.soloArrowLeftValign == "bottom") i.css({
                bottom: 0 + t.soloArrowLeftVOffset + "px"
            });
            if (t.soloArrowLeftValign == "top") i.css({
                top: 0 + t.soloArrowLeftVOffset + "px"
            });
            if (t.soloArrowLeftHalign == "center") i.css({
                left: "50%",
                marginLeft: t.soloArrowLeftHOffset - Math.round(i.innerWidth() / 2) + "px"
            });
            if (t.soloArrowLeftHalign == "left") i.css({
                left: 0 + t.soloArrowLeftHOffset + "px"
            });
            if (t.soloArrowLeftHalign == "right") i.css({
                right: 0 + t.soloArrowLeftHOffset + "px"
            });
            if (t.soloArrowRightValign == "center") s.css({
                top: "50%",
                marginTop: t.soloArrowRightVOffset - Math.round(s.innerHeight() / 2) + "px"
            });
            if (t.soloArrowRightValign == "bottom") s.css({
                bottom: 0 + t.soloArrowRightVOffset + "px"
            });
            if (t.soloArrowRightValign == "top") s.css({
                top: 0 + t.soloArrowRightVOffset + "px"
            });
            if (t.soloArrowRightHalign == "center") s.css({
                left: "50%",
                marginLeft: t.soloArrowRightHOffset - Math.round(s.innerWidth() / 2) + "px"
            });
            if (t.soloArrowRightHalign == "left") s.css({
                left: 0 + t.soloArrowRightHOffset + "px"
            });
            if (t.soloArrowRightHalign == "right") s.css({
                right: 0 + t.soloArrowRightHOffset + "px"
            });
            if (i.position() != null) i.css({
                top: Math.round(parseInt(i.position().top, 0)) + "px"
            });
            if (s.position() != null) s.css({
                top: Math.round(parseInt(s.position().top, 0)) + "px"
            })
        }
        if (t.navigationArrows == "none") {
            i.css({
                visibility: "hidden"
            });
            s.css({
                visibility: "hidden"
            })
        }
        if (t.navigationVAlign == "center") r.css({
            top: "50%",
            marginTop: t.navigationVOffset - Math.round(r.innerHeight() / 2) + "px"
        });
        if (t.navigationVAlign == "bottom") r.css({
            bottom: 0 + t.navigationVOffset + "px"
        });
        if (t.navigationVAlign == "top") r.css({
            top: 0 + t.navigationVOffset + "px"
        });
        if (t.navigationHAlign == "center") r.css({
            left: "50%",
            marginLeft: t.navigationHOffset - Math.round(r.innerWidth() / 2) + "px"
        });
        if (t.navigationHAlign == "left") r.css({
            left: 0 + t.navigationHOffset + "px"
        });
        if (t.navigationHAlign == "right") r.css({
            right: 0 + t.navigationHOffset + "px"
        })
    }

    function p(e, n) {
        n.width = parseInt(n.container.width(), 0);
        n.height = parseInt(n.container.height(), 0);
        n.bw = n.width / n.startwidth;
        n.bh = n.height / n.startheight;
        if (n.bh > 1) {
            n.bw = 1;
            n.bh = 1
        }
        if (e.data("orgw") != t) {
            e.width(e.data("orgw"));
            e.height(e.data("orgh"))
        }
        var r = n.width / e.width();
        var i = n.height / e.height();
        n.fw = r;
        n.fh = i;
        if (e.data("orgw") == t) {
            e.data("orgw", e.width());
            e.data("orgh", e.height())
        }
        if (n.fullWidth == "on") {
            var s = n.container.parent().width();
            var o = n.container.parent().height();
            var u = o / e.data("orgh");
            var a = s / e.data("orgw");
            e.width(e.width() * u);
            e.height(o);
            if (e.width() < s) {
                e.width(s + 50);
                var a = e.width() / e.data("orgw");
                e.height(e.data("orgh") * a)
            }
            if (e.width() > s) {
                e.data("fxof", s / 2 - e.width() / 2);
                e.css({
                    position: "absolute",
                    left: e.data("fxof") + "px"
                })
            }
            if (e.height() <= o) {
                e.data("fyof", 0);
                e.css({
                    position: "absolute",
                    top: e.data("fyof") + "px"
                })
            }
            if (e.height() > o && e.data("fullwidthcentering") == "on") {
                e.data("fyof", o / 2 - e.height() / 2);
                e.css({
                    position: "absolute",
                    top: e.data("fyof") + "px"
                })
            }
        } else {
            e.width(n.width);
            e.height(e.height() * r);
            if (e.height() < n.height && e.height() != 0 && e.height() != null) {
                e.height(n.height);
                e.width(e.data("orgw") * i)
            }
        }
        e.data("neww", e.width());
        e.data("newh", e.height());
        if (n.fullWidth == "on") {
            n.slotw = Math.ceil(e.width() / n.slots)
        } else {
            n.slotw = Math.ceil(n.width / n.slots)
        }
        n.sloth = Math.ceil(n.height / n.slots)
    }

    function d(n, r) {
        n.find(".tp-caption").each(function () {
            e(this).addClass(e(this).data("transition"));
            e(this).addClass("start")
        });
        n.find(">ul:first >li").each(function (n) {
            var r = e(this);
            if (r.data("link") != t) {
                var i = r.data("link");
                var s = "_self";
                var o = 2;
                if (r.data("slideindex") == "back") o = 0;
                var u = r.data("linktoslide");
                if (r.data("target") != t) s = r.data("target");
                if (i == "slide") {
                    r.append('<div class="tp-caption sft slidelink" style="z-index:' + o + ';" data-x="0" data-y="0" data-linktoslide="' + u + '" data-start="0"><a><div></div></a></div>')
                } else {
                    u = "no";
                    r.append('<div class="tp-caption sft slidelink" style="z-index:' + o + ';" data-x="0" data-y="0" data-linktoslide="' + u + '" data-start="0"><a target="' + s + '" href="' + i + '"><div></div></a></div>')
                }
            }
        });
        n.find(">ul:first >li >img").each(function (t) {
            var n = e(this);
            n.addClass("defaultimg");
            p(n, r);
            p(n, r);
            n.wrap('<div class="slotholder"></div>');
            n.css({
                opacity: 0
            });
            n.data("li-id", t)
        })
    }

    function v(e, n, r) {
        var i = e;
        var s = i.find("img");
        p(s, n);
        var o = s.attr("src");
        var u = s.css("background-color");
        var a = s.data("neww");
        var f = s.data("newh");
        var l = s.data("fxof");
        if (l == t) l = 0;
        var c = s.data("fyof");
        if (s.data("fullwidthcentering") != "on" || c == t) c = 0;
        var h = 0;
        if (!r) var h = 0 - n.slotw;
        for (var d = 0; d < n.slots; d++) i.append('<div class="slot" style="position:absolute;top:' + (0 + c) + "px;left:" + (l + d * n.slotw) + "px;overflow:hidden;width:" + n.slotw + "px;height:" + f + 'px"><div class="slotslide" style="position:absolute;top:0px;left:' + h + "px;width:" + n.slotw + "px;height:" + f + 'px;overflow:hidden;"><img style="background-color:' + u + ";position:absolute;top:0px;left:" + (0 - d * n.slotw) + "px;width:" + a + "px;height:" + f + 'px" src="' + o + '"></div></div>')
    }

    function m(e, n, r) {
        var i = e;
        var s = i.find("img");
        p(s, n);
        var o = s.attr("src");
        var u = s.css("background-color");
        var a = s.data("neww");
        var f = s.data("newh");
        var l = s.data("fxof");
        if (l == t) l = 0;
        var c = s.data("fyof");
        if (s.data("fullwidthcentering") != "on" || c == t) c = 0;
        var h = 0;
        if (!r) var h = 0 - n.sloth;
        for (var d = 0; d < n.slots + 2; d++) i.append('<div class="slot" style="position:absolute;' + "top:" + (c + d * n.sloth) + "px;" + "left:" + l + "px;" + "overflow:hidden;" + "width:" + a + "px;" + "height:" + n.sloth + 'px"' + '><div class="slotslide" style="position:absolute;' + "top:" + h + "px;" + "left:0px;width:" + a + "px;" + "height:" + n.sloth + "px;" + 'overflow:hidden;"><img style="position:absolute;' + "background-color:" + u + ";" + "top:" + (0 - d * n.sloth) + "px;" + "left:0px;width:" + a + "px;" + "height:" + f + 'px" src="' + o + '"></div></div>')
    }

    function g(e, n, r) {
        var i = e;
        var s = i.find("img");
        p(s, n);
        var o = s.attr("src");
        var u = s.css("background-color");
        var a = s.data("neww");
        var f = s.data("newh");
        var l = s.data("fxof");
        if (l == t) l = 0;
        var c = s.data("fyof");
        if (s.data("fullwidthcentering") != "on" || c == t) c = 0;
        var h = 0;
        var d = 0;
        if (n.sloth > n.slotw) d = n.sloth;
        else d = n.slotw; if (!r) {
            var h = 0 - d
        }
        n.slotw = d;
        n.sloth = d;
        var v = 0;
        var m = 0;
        for (var g = 0; g < n.slots; g++) {
            m = 0;
            for (var y = 0; y < n.slots; y++) {
                i.append('<div class="slot" ' + 'style="position:absolute;' + "top:" + (c + m) + "px;" + "left:" + (l + v) + "px;" + "width:" + d + "px;" + "height:" + d + "px;" + 'overflow:hidden;">' + '<div class="slotslide" data-x="' + v + '" data-y="' + m + '" ' + 'style="position:absolute;' + "top:" + 0 + "px;" + "left:" + 0 + "px;" + "width:" + d + "px;" + "height:" + d + "px;" + 'overflow:hidden;">' + '<img style="position:absolute;' + "top:" + (0 - m) + "px;" + "left:" + (0 - v) + "px;" + "width:" + a + "px;" + "height:" + f + "px" + "background-color:" + u + ';"' + 'src="' + o + '"></div></div>');
                m = m + d
            }
            v = v + d
        }
    }

    function y(n, r, i) {
        if (i == t) i == 80;
        setTimeout(function () {
            n.find(".slotholder .slot").each(function () {
                clearTimeout(e(this).data("tout"));
                e(this).remove()
            });
            r.transition = 0
        }, i)
    }

    function b(e, t) {
        var n = e.find(">li:eq(" + t.act + ")");
        var r = e.find(">li:eq(" + t.next + ")");
        var i = r.find(".tp-caption");
        if (i.find("iframe") == 0) {
            if (i.hasClass("hcenter")) i.css({
                height: t.height + "px",
                top: "0px",
                left: t.width / 2 - i.outerWidth() / 2 + "px"
            });
            else if (i.hasClass("vcenter")) i.css({
                width: t.width + "px",
                left: "0px",
                top: t.height / 2 - i.outerHeight() / 2 + "px"
            })
        }
    }

    function w(n, r) {
        n.trigger("revolution.slide.onbeforeswap");
        r.transition = 1;
        r.videoplaying = false;
        try {
            var i = n.find(">ul:first-child >li:eq(" + r.act + ")")
        } catch (s) {
            var i = n.find(">ul:first-child >li:eq(1)")
        }
        r.lastslide = r.act;
        var u = n.find(">ul:first-child >li:eq(" + r.next + ")");
        var a = i.find(".slotholder");
        var f = u.find(".slotholder");
        i.css({
            visibility: "visible"
        });
        u.css({
            visibility: "visible"
        });
        if (r.ie) {
            if (u.data("transition") == "boxfade") u.data("transition", "boxslide");
            if (u.data("transition") == "slotfade-vertical") u.data("transition", "slotzoom-vertical");
            if (u.data("transition") == "slotfade-horizontal") u.data("transition", "slotzoom-horizontal")
        }
        if (u.data("delay") != t) {
            r.cd = 0;
            r.delay = u.data("delay")
        } else {
            r.delay = r.origcd
        }
        i.css({
            left: "0px",
            top: "0px"
        });
        u.css({
            left: "0px",
            top: "0px"
        });
        if (u.data("differentissplayed") == "prepared") {
            u.data("differentissplayed", "done");
            u.data("transition", u.data("savedtransition"));
            u.data("slotamount", u.data("savedslotamount"));
            u.data("masterspeed", u.data("savedmasterspeed"))
        }
        if (u.data("fstransition") != t && u.data("differentissplayed") != "done") {
            u.data("savedtransition", u.data("transition"));
            u.data("savedslotamount", u.data("slotamount"));
            u.data("savedmasterspeed", u.data("masterspeed"));
            u.data("transition", u.data("fstransition"));
            u.data("slotamount", u.data("fsslotamount"));
            u.data("masterspeed", u.data("fsmasterspeed"));
            u.data("differentissplayed", "prepared")
        }
        var l = 0;
        if (u.data("transition") == "boxslide") l = 0;
        else if (u.data("transition") == "boxfade") l = 1;
        else if (u.data("transition") == "slotslide-horizontal") l = 2;
        else if (u.data("transition") == "slotslide-vertical") l = 3;
        else if (u.data("transition") == "curtain-1") l = 4;
        else if (u.data("transition") == "curtain-2") l = 5;
        else if (u.data("transition") == "curtain-3") l = 6;
        else if (u.data("transition") == "slotzoom-horizontal") l = 7;
        else if (u.data("transition") == "slotzoom-vertical") l = 8;
        else if (u.data("transition") == "slotfade-horizontal") l = 9;
        else if (u.data("transition") == "slotfade-vertical") l = 10;
        else if (u.data("transition") == "fade") l = 11;
        else if (u.data("transition") == "slideleft") l = 12;
        else if (u.data("transition") == "slideup") l = 13;
        else if (u.data("transition") == "slidedown") l = 14;
        else if (u.data("transition") == "slideright") l = 15;
        else if (u.data("transition") == "papercut") l = 16;
        else if (u.data("transition") == "3dcurtain-horizontal") l = 17;
        else if (u.data("transition") == "3dcurtain-vertical") l = 18;
        else if (u.data("transition") == "cubic" || u.data("transition") == "cube") l = 19;
        else if (u.data("transition") == "flyin") l = 20;
        else if (u.data("transition") == "turnoff") l = 21;
        else {
            l = Math.round(Math.random() * 21);
            u.data("slotamount", Math.round(Math.random() * 12 + 4))
        } if (u.data("transition") == "random-static") {
            l = Math.round(Math.random() * 16);
            if (l > 15) l = 15;
            if (l < 0) l = 0
        }
        if (u.data("transition") == "random-premium") {
            l = Math.round(Math.random() * 6 + 16);
            if (l > 21) l = 21;
            if (l < 16) l = 16
        }
        var c = -1;
        if (r.leftarrowpressed == 1 || r.act > r.next) c = 1;
        if (u.data("transition") == "slidehorizontal") {
            l = 12;
            if (r.leftarrowpressed == 1) l = 15
        }
        if (u.data("transition") == "slidevertical") {
            l = 13;
            if (r.leftarrowpressed == 1) l = 14
        }
        r.leftarrowpressed = 0;
        if (l > 21) l = 21;
        if (l < 0) l = 0;
        if ((r.ie || r.ie9) && l > 18) {
            l = Math.round(Math.random() * 16);
            u.data("slotamount", Math.round(Math.random() * 12 + 4))
        }
        if (r.ie && (l == 17 || l == 16 || l == 2 || l == 3 || l == 9 || l == 10)) l = Math.round(Math.random() * 3 + 12);
        if (r.ie9 && l == 3) l = 4;
        var h = 300;
        if (u.data("masterspeed") != t && u.data("masterspeed") > 99 && u.data("masterspeed") < 4001) h = u.data("masterspeed");
        n.parent().find(".bullet").each(function () {
            var t = e(this);
            t.removeClass("selected");
            if (r.navigationArrows == "withbullet" || r.navigationArrows == "nexttobullets") {
                if (t.index() - 1 == r.next) t.addClass("selected")
            } else {
                if (t.index() == r.next) t.addClass("selected")
            }
        });
        n.find(">li").each(function () {
            var t = e(this);
            if (t.index != r.act && t.index != r.next) t.css({
                "z-index": 16
            })
        });
        i.css({
            "z-index": 18
        });
        u.css({
            "z-index": 20
        });
        u.css({
            opacity: 0
        });
        L(i, r);
        k(u, r);
        if (u.data("slotamount") == t || u.data("slotamount") < 1) {
            r.slots = Math.round(Math.random() * 12 + 4);
            if (u.data("transition") == "boxslide") r.slots = Math.round(Math.random() * 6 + 3)
        } else {
            r.slots = u.data("slotamount")
        } if (u.data("rotate") == t) r.rotate = 0;
        else if (u.data("rotate") == 999) r.rotate = Math.round(Math.random() * 360);
        else r.rotate = u.data("rotate"); if (!e.support.transition || r.ie || r.ie9) r.rotate = 0;
        if (r.firststart == 1) {
            i.css({
                opacity: 0
            });
            r.firststart = 0
        }
        if (l == 0) {
            h = h + 100;
            if (r.slots > 10) r.slots = 10;
            u.css({
                opacity: 1
            });
            g(a, r, true);
            g(f, r, false);
            f.find(".defaultimg").css({
                opacity: 0
            });
            f.find(".slotslide").each(function (t) {
                var s = e(this);
                if (r.ie9) s.transition({
                    top: 0 - r.sloth,
                    left: 0 - r.slotw
                }, 0);
                else s.transition({
                    top: 0 - r.sloth,
                    left: 0 - r.slotw,
                    rotate: r.rotate
                }, 0);
                setTimeout(function () {
                    s.transition({
                        top: 0,
                        left: 0,
                        scale: 1,
                        rotate: 0
                    }, h * 1.5, function () {
                        if (t == r.slots * r.slots - 1) {
                            y(n, r);
                            f.find(".defaultimg").css({
                                opacity: 1
                            });
                            if (u.index() != i.index()) a.find(".defaultimg").css({
                                opacity: 0
                            });
                            r.act = r.next;
                            o(n)
                        }
                    })
                }, t * 15)
            })
        }
        if (l == 1) {
            if (r.slots > 5) r.slots = 5;
            u.css({
                opacity: 1
            });
            g(f, r, false);
            f.find(".defaultimg").css({
                opacity: 0
            });
            f.find(".slotslide").each(function (t) {
                var s = e(this);
                s.css({
                    opacity: 0
                });
                s.find("img").css({
                    opacity: 0
                });
                if (r.ie9) s.find("img").transition({
                    top: Math.random() * r.slotw - r.slotw + "px",
                    left: Math.random() * r.slotw - r.slotw + "px"
                }, 0);
                else s.find("img").transition({
                    top: Math.random() * r.slotw - r.slotw + "px",
                    left: Math.random() * r.slotw - r.slotw + "px",
                    rotate: r.rotate
                }, 0);
                var l = Math.random() * 1e3 + (h + 200);
                if (t == r.slots * r.slots - 1) l = 1500;
                s.find("img").transition({
                    opacity: 1,
                    top: 0 - s.data("y") + "px",
                    left: 0 - s.data("x") + "px",
                    rotate: 0
                }, l);
                s.transition({
                    opacity: 1
                }, l, function () {
                    if (t == r.slots * r.slots - 1) {
                        y(n, r);
                        f.find(".defaultimg").css({
                            opacity: 1
                        });
                        if (u.index() != i.index()) a.find(".defaultimg").css({
                            opacity: 0
                        });
                        r.act = r.next;
                        o(n)
                    }
                })
            })
        }
        if (l == 2) {
            h = h + 200;
            u.css({
                opacity: 1
            });
            v(a, r, true);
            v(f, r, false);
            f.find(".defaultimg").css({
                opacity: 0
            });
            a.find(".slotslide").each(function () {
                var t = e(this);
                t.transit({
                    left: r.slotw + "px",
                    rotate: 0 - r.rotate
                }, h, function () {
                    y(n, r);
                    f.find(".defaultimg").css({
                        opacity: 1
                    });
                    if (u.index() != i.index()) a.find(".defaultimg").css({
                        opacity: 0
                    });
                    r.act = r.next;
                    o(n)
                })
            });
            f.find(".slotslide").each(function () {
                var t = e(this);
                if (r.ie9) t.transit({
                    left: 0 - r.slotw + "px"
                }, 0);
                else t.transit({
                    left: 0 - r.slotw + "px",
                    rotate: r.rotate
                }, 0);
                t.transit({
                    left: "0px",
                    rotate: 0
                }, h, function () {
                    y(n, r);
                    f.find(".defaultimg").css({
                        opacity: 1
                    });
                    if (u.index() != i.index()) a.find(".defaultimg").css({
                        opacity: 0
                    });
                    if (r.ie) a.find(".defaultimg").css({
                        opacity: 1
                    });
                    r.act = r.next;
                    o(n)
                })
            })
        }
        if (l == 3) {
            h = h + 200;
            u.css({
                opacity: 1
            });
            m(a, r, true);
            m(f, r, false);
            f.find(".defaultimg").css({
                opacity: 0
            });
            a.find(".slotslide").each(function () {
                var t = e(this);
                t.transit({
                    top: r.sloth + "px",
                    rotate: r.rotate
                }, h, function () {
                    y(n, r);
                    f.find(".defaultimg").css({
                        opacity: 1
                    });
                    if (u.index() != i.index()) a.find(".defaultimg").css({
                        opacity: 0
                    });
                    r.act = r.next;
                    o(n)
                })
            });
            f.find(".slotslide").each(function () {
                var t = e(this);
                if (r.ie9) t.transit({
                    top: 0 - r.sloth + "px"
                }, 0);
                else t.transit({
                    top: 0 - r.sloth + "px",
                    rotate: r.rotate
                }, 0);
                t.transit({
                    top: "0px",
                    rotate: 0
                }, h, function () {
                    y(n, r);
                    f.find(".defaultimg").css({
                        opacity: 1
                    });
                    if (u.index() != i.index()) a.find(".defaultimg").css({
                        opacity: 0
                    });
                    r.act = r.next;
                    o(n)
                })
            })
        }
        if (l == 4) {
            u.css({
                opacity: 1
            });
            v(a, r, true);
            v(f, r, true);
            f.find(".defaultimg").css({
                opacity: 0
            });
            a.find(".defaultimg").css({
                opacity: 0
            });
            a.find(".slotslide").each(function (t) {
                var n = e(this);
                n.transit({
                    top: 0 + r.height + "px",
                    opacity: 1,
                    rotate: r.rotate
                }, h + t * (70 - r.slots))
            });
            f.find(".slotslide").each(function (t) {
                var s = e(this);
                if (r.ie9) s.transition({
                    top: 0 - r.height + "px",
                    opacity: 0
                }, 0);
                else s.transition({
                    top: 0 - r.height + "px",
                    opacity: 0,
                    rotate: r.rotate
                }, 0);
                s.transition({
                    top: "0px",
                    opacity: 1,
                    rotate: 0
                }, h + t * (70 - r.slots), function () {
                    if (t == r.slots - 1) {
                        y(n, r);
                        f.find(".defaultimg").css({
                            opacity: 1
                        });
                        if (u.index() != i.index()) a.find(".defaultimg").css({
                            opacity: 0
                        });
                        r.act = r.next;
                        o(n)
                    }
                })
            })
        }
        if (l == 5) {
            u.css({
                opacity: 1
            });
            v(a, r, true);
            v(f, r, true);
            f.find(".defaultimg").css({
                opacity: 0
            });
            a.find(".defaultimg").css({
                opacity: 0
            });
            a.find(".slotslide").each(function (t) {
                var n = e(this);
                n.transition({
                    top: 0 + r.height + "px",
                    opacity: 1,
                    rotate: r.rotate
                }, h + (r.slots - t) * (70 - r.slots))
            });
            f.find(".slotslide").each(function (t) {
                var s = e(this);
                if (r.ie9) s.transition({
                    top: 0 - r.height + "px",
                    opacity: 0
                }, 0);
                else s.transition({
                    top: 0 - r.height + "px",
                    opacity: 0,
                    rotate: r.rotate
                }, 0);
                s.transition({
                    top: "0px",
                    opacity: 1,
                    rotate: 0
                }, h + (r.slots - t) * (70 - r.slots), function () {
                    if (t == 0) {
                        y(n, r);
                        f.find(".defaultimg").css({
                            opacity: 1
                        });
                        if (u.index() != i.index()) a.find(".defaultimg").css({
                            opacity: 0
                        });
                        r.act = r.next;
                        o(n)
                    }
                })
            })
        }
        if (l == 6) {
            u.css({
                opacity: 1
            });
            if (r.slots < 2) r.slots = 2;
            v(a, r, true);
            v(f, r, true);
            f.find(".defaultimg").css({
                opacity: 0
            });
            a.find(".defaultimg").css({
                opacity: 0
            });
            a.find(".slotslide").each(function (t) {
                var n = e(this);
                if (t < r.slots / 2) var i = (t + 2) * 60;
                else var i = (2 + r.slots - t) * 60;
                n.transition({
                    top: 0 + r.height + "px",
                    opacity: 1
                }, h + i)
            });
            f.find(".slotslide").each(function (t) {
                var s = e(this);
                if (r.ie9) s.transition({
                    top: 0 - r.height + "px",
                    opacity: 0
                }, 0);
                else s.transition({
                    top: 0 - r.height + "px",
                    opacity: 0,
                    rotate: r.rotate
                }, 0); if (t < r.slots / 2) var l = (t + 2) * 60;
                else var l = (2 + r.slots - t) * 60;
                s.transition({
                    top: "0px",
                    opacity: 1,
                    rotate: 0
                }, h + l, function () {
                    if (t == Math.round(r.slots / 2)) {
                        y(n, r);
                        f.find(".defaultimg").css({
                            opacity: 1
                        });
                        if (u.index() != i.index()) a.find(".defaultimg").css({
                            opacity: 0
                        });
                        r.act = r.next;
                        o(n)
                    }
                })
            })
        }
        if (l == 7) {
            h = h * 3;
            u.css({
                opacity: 1
            });
            v(a, r, true);
            v(f, r, true);
            f.find(".defaultimg").css({
                opacity: 0
            });
            a.find(".slotslide").each(function () {
                var t = e(this).find("img");
                t.transition({
                    left: 0 - r.slotw / 2 + "px",
                    top: 0 - r.height / 2 + "px",
                    width: r.slotw * 2 + "px",
                    height: r.height * 2 + "px",
                    opacity: 0,
                    rotate: r.rotate
                }, h, function () {
                    y(n, r);
                    f.find(".defaultimg").css({
                        opacity: 1
                    });
                    if (u.index() != i.index()) a.find(".defaultimg").css({
                        opacity: 0
                    });
                    r.act = r.next;
                    o(n)
                })
            });
            /						/;
            f.find(".slotslide").each(function (t) {
                var s = e(this).find("img");
                if (r.ie9) s.transition({
                    left: 0 + "px",
                    top: 0 + "px",
                    opacity: 0
                }, 0);
                else s.transition({
                    left: 0 + "px",
                    top: 0 + "px",
                    opacity: 0,
                    rotate: r.rotate
                }, 0);
                s.transition({
                    left: 0 - t * r.slotw + "px",
                    top: 0 + "px",
                    width: f.find(".defaultimg").data("neww") + "px",
                    height: f.find(".defaultimg").data("newh") + "px",
                    opacity: 1,
                    rotate: 0
                }, h, function () {
                    y(n, r);
                    f.find(".defaultimg").css({
                        opacity: 1
                    });
                    if (u.index() != i.index()) a.find(".defaultimg").css({
                        opacity: 0
                    });
                    r.act = r.next;
                    o(n)
                })
            })
        }
        if (l == 8) {
            h = h * 3;
            u.css({
                opacity: 1
            });
            m(a, r, true);
            m(f, r, true);
            f.find(".defaultimg").css({
                opacity: 0
            });
            a.find(".slotslide").each(function () {
                var t = e(this).find("img");
                t.transition({
                    left: 0 - r.width / 2 + "px",
                    top: 0 - r.sloth / 2 + "px",
                    width: r.width * 2 + "px",
                    height: r.sloth * 2 + "px",
                    opacity: 0,
                    rotate: r.rotate
                }, h, function () {
                    y(n, r);
                    f.find(".defaultimg").css({
                        opacity: 1
                    });
                    if (u.index() != i.index()) a.find(".defaultimg").css({
                        opacity: 0
                    });
                    r.act = r.next;
                    o(n)
                })
            });
            f.find(".slotslide").each(function (t) {
                var s = e(this).find("img");
                if (r.ie9) s.transition({
                    left: 0 + "px",
                    top: 0 + "px",
                    opacity: 0
                }, 0);
                else s.transition({
                    left: 0 + "px",
                    top: 0 + "px",
                    opacity: 0,
                    rotate: r.rotate
                }, 0);
                s.transition({
                    left: 0 + "px",
                    top: 0 - t * r.sloth + "px",
                    width: f.find(".defaultimg").data("neww") + "px",
                    height: f.find(".defaultimg").data("newh") + "px",
                    opacity: 1,
                    rotate: 0
                }, h, function () {
                    y(n, r);
                    f.find(".defaultimg").css({
                        opacity: 1
                    });
                    if (u.index() != i.index()) a.find(".defaultimg").css({
                        opacity: 0
                    });
                    r.act = r.next;
                    o(n)
                })
            })
        }
        if (l == 9) {
            u.css({
                opacity: 1
            });
            r.slots = r.width / 20;
            v(f, r, true);
            f.find(".defaultimg").css({
                opacity: 0
            });
            var p = 0;
            f.find(".slotslide").each(function (t) {
                var n = e(this);
                p++;
                n.transition({
                    opacity: 0,
                    x: 0,
                    y: 0
                }, 0);
                n.data("tout", setTimeout(function () {
                    n.transition({
                        x: 0,
                        y: 0,
                        opacity: 1
                    }, h)
                }, t * 4))
            });
            setTimeout(function () {
                y(n, r);
                f.find(".defaultimg").css({
                    opacity: 1
                });
                if (u.index() != i.index()) a.find(".defaultimg").css({
                    opacity: 0
                });
                if (r.ie) a.find(".defaultimg").css({
                    opacity: 1
                });
                r.act = r.next;
                o(n)
            }, h + p * 4)
        }
        if (l == 10) {
            u.css({
                opacity: 1
            });
            r.slots = r.height / 20;
            m(f, r, true);
            f.find(".defaultimg").css({
                opacity: 0
            });
            var p = 0;
            f.find(".slotslide").each(function (t) {
                var n = e(this);
                p++;
                n.transition({
                    opacity: 0,
                    x: 0,
                    y: 0
                }, 0);
                n.data("tout", setTimeout(function () {
                    n.transition({
                        x: 0,
                        y: 0,
                        opacity: 1
                    }, h)
                }, t * 4))
            });
            setTimeout(function () {
                y(n, r);
                f.find(".defaultimg").css({
                    opacity: 1
                });
                if (u.index() != i.index()) a.find(".defaultimg").css({
                    opacity: 0
                });
                if (r.ie) a.find(".defaultimg").css({
                    opacity: 1
                });
                r.act = r.next;
                o(n)
            }, h + p * 4)
        }
        if (l == 11) {
            u.css({
                opacity: 1
            });
            r.slots = 1;
            v(f, r, true);
            f.find(".defaultimg").css({
                opacity: 0
            });
            var p = 0;
            f.find(".slotslide").each(function (t) {
                var n = e(this);
                p++;
                if (r.ie9 || r.ie) {
                    if (r.ie) n.css({
                        position: "static"
                    });
                    n.transition({
                        opacity: 0
                    }, 0)
                } else n.transition({
                    opacity: 0,
                    rotate: r.rotate
                }, 0); if (r.ie9 || r.ie) {
                    n.transition({
                        opacity: 1
                    }, h)
                } else {
                    n.transition({
                        opacity: 1,
                        rotate: 0
                    }, h)
                }
            });
            setTimeout(function () {
                y(n, r);
                f.find(".defaultimg").css({
                    opacity: 1
                });
                if (u.index() != i.index()) a.find(".defaultimg").css({
                    opacity: 0
                });
                if (r.ie) a.find(".defaultimg").css({
                    opacity: 1
                });
                r.act = r.next;
                o(n)
            }, h)
        }
        if (l == 12 || l == 13 || l == 14 || l == 15) {
            h = h * 3;
            u.css({
                opacity: 1
            });
            r.slots = 1;
            v(f, r, true);
            v(a, r, true);
            a.find(".defaultimg").css({
                opacity: 0
            });
            f.find(".defaultimg").css({
                opacity: 0
            });
            var d = r.width;
            var b = r.height;
            if (r.fullWidth == "on") {
                d = r.container.parent().width();
                b = r.container.parent().height()
            }
            var w = f.find(".slotslide");
            if (l == 12)
                if (r.ie9) {
                    w.transition({
                        left: d + "px"
                    }, 0)
                } else {
                    w.transition({
                        left: d + "px",
                        rotate: r.rotate
                    }, 0)
                } else if (l == 15)
                if (r.ie9) w.transition({
                    left: 0 - r.width + "px"
                }, 0);
                else w.transition({
                    left: 0 - r.width + "px",
                    rotate: r.rotate
                }, 0);
            else if (l == 13)
                if (r.ie9) w.transition({
                    top: b + "px"
                }, 0);
                else w.transition({
                    top: b + "px",
                    rotate: r.rotate
                }, 0);
            else if (l == 14)
                if (r.ie9) w.transition({
                    top: 0 - r.height + "px"
                }, 0);
                else w.transition({
                    top: 0 - r.height + "px",
                    rotate: r.rotate
                }, 0);
            w.transition({
                left: "0px",
                top: "0px",
                opacity: 1,
                rotate: 0
            }, h, function () {
                y(n, r, 0);
                if (u.index() != i.index()) a.find(".defaultimg").css({
                    opacity: 0
                });
                f.find(".defaultimg").css({
                    opacity: 1
                });
                r.act = r.next;
                o(n)
            });
            var E = a.find(".slotslide");
            if (l == 12) E.transition({
                left: 0 - d + "px",
                opacity: 1,
                rotate: 0
            }, h);
            else if (l == 15) E.transition({
                left: d + "px",
                opacity: 1,
                rotate: 0
            }, h);
            else if (l == 13) E.transition({
                top: 0 - b + "px",
                opacity: 1,
                rotate: 0
            }, h);
            else if (l == 14) E.transition({
                top: b + "px",
                opacity: 1,
                rotate: 0
            }, h)
        }
        if (l == 16) {
            i.css({
                position: "absolute",
                "z-index": 20
            });
            u.css({
                position: "absolute",
                "z-index": 15
            });
            i.wrapInner('<div class="tp-half-one"></div>');
            i.find(".tp-half-one").clone(true).appendTo(i).addClass("tp-half-two");
            i.find(".tp-half-two").removeClass("tp-half-one");
            i.find(".tp-half-two").wrapInner('<div class="tp-offset"></div>');
            var S = i.find(".defaultimg");
            if (S.length > 0 && S.data("fullwidthcentering") == "on") {
                var x = S.height() / 2;
                var T = S.position().top
            } else {
                var x = r.height / 2;
                var T = 0
            }
            i.find(".tp-half-one").css({
                width: r.width + "px",
                height: T + x + "px",
                overflow: "hidden",
                position: "absolute",
                top: "0px",
                left: "0px"
            });
            i.find(".tp-half-two").css({
                width: r.width + "px",
                height: T + x + "px",
                overflow: "hidden",
                position: "absolute",
                top: T + x + "px",
                left: "0px"
            });
            i.find(".tp-half-two .tp-offset").css({
                position: "absolute",
                top: 0 - x - T + "px",
                left: "0px"
            });
            if (!e.support.transition) {
                i.find(".tp-half-one").animate({
                    opacity: 0,
                    top: 0 - r.height / 2 + "px"
                }, {
                    duration: 500,
                    queue: false
                });
                i.find(".tp-half-two").animate({
                    opacity: 0,
                    top: r.height + "px"
                }, {
                    duration: 500,
                    queue: false
                })
            } else {
                var N = Math.round(Math.random() * 40 - 20);
                var C = Math.round(Math.random() * 40 - 20);
                var A = Math.random() * 1 + 1;
                var O = Math.random() * 1 + 1;
                i.find(".tp-half-one").transition({
                    opacity: 1,
                    scale: A,
                    rotate: N,
                    y: 0 - r.height / 1.4 + "px"
                }, 800, "in");
                i.find(".tp-half-two").transition({
                    opacity: 1,
                    scale: O,
                    rotate: C,
                    y: 0 + r.height / 1.4 + "px"
                }, 800, "in");
                if (i.html() != null) u.transition({
                    scale: .8,
                    x: r.width * .1,
                    y: r.height * .1,
                    rotate: N
                }, 0).transition({
                    rotate: 0,
                    scale: 1,
                    x: 0,
                    y: 0
                }, 600, "snap")
            }
            f.find(".defaultimg").css({
                opacity: 1
            });
            setTimeout(function () {
                i.css({
                    position: "absolute",
                    "z-index": 18
                });
                u.css({
                    position: "absolute",
                    "z-index": 20
                });
                f.find(".defaultimg").css({
                    opacity: 1
                });
                a.find(".defaultimg").css({
                    opacity: 0
                });
                if (i.find(".tp-half-one").length > 0) {
                    i.find(".tp-half-one >img, .tp-half-one >div").unwrap()
                }
                i.find(".tp-half-two").remove();
                r.transition = 0;
                r.act = r.next
            }, 800);
            u.css({
                opacity: 1
            })
        }
        if (l == 17) {
            h = h + 100;
            if (r.slots > 10) r.slots = 10;
            u.css({
                opacity: 1
            });
            m(a, r, true);
            m(f, r, false);
            f.find(".defaultimg").css({
                opacity: 0
            });
            f.find(".slotslide").each(function (t) {
                var s = e(this);
                s.transition({
                    opacity: 0,
                    rotateY: 350,
                    rotateX: 40,
                    perspective: "1400px"
                }, 0);
                setTimeout(function () {
                    s.transition({
                        opacity: 1,
                        top: 0,
                        left: 0,
                        scale: 1,
                        perspective: "150px",
                        rotate: 0,
                        rotateY: 0,
                        rotateX: 0
                    }, h * 2, function () {
                        if (t == r.slots - 1) {
                            y(n, r);
                            f.find(".defaultimg").css({
                                opacity: 1
                            });
                            if (u.index() != i.index()) a.find(".defaultimg").css({
                                opacity: 0
                            });
                            r.act = r.next;
                            o(n)
                        }
                    })
                }, t * 100)
            })
        }
        if (l == 18) {
            h = h + 100;
            if (r.slots > 10) r.slots = 10;
            u.css({
                opacity: 1
            });
            v(a, r, true);
            v(f, r, false);
            f.find(".defaultimg").css({
                opacity: 0
            });
            f.find(".slotslide").each(function (t) {
                var s = e(this);
                s.transition({
                    rotateX: 10,
                    rotateY: 310,
                    perspective: "1400px",
                    rotate: 0,
                    opacity: 0
                }, 0);
                setTimeout(function () {
                    s.transition({
                        top: 0,
                        left: 0,
                        scale: 1,
                        perspective: "150px",
                        rotate: 0,
                        rotateY: 0,
                        rotateX: 0,
                        opacity: 1
                    }, h * 2, function () {
                        if (t == r.slots - 1) {
                            y(n, r);
                            f.find(".defaultimg").css({
                                opacity: 1
                            });
                            if (u.index() != i.index()) a.find(".defaultimg").css({
                                opacity: 0
                            });
                            r.act = r.next;
                            o(n)
                        }
                    })
                }, t * 100)
            })
        }
        if (l == 19) {
            h = h + 100;
            if (r.slots > 10) r.slots = 10;
            u.css({
                opacity: 1
            });
            v(a, r, true);
            v(f, r, false);
            f.find(".defaultimg").css({
                opacity: 0
            });
            var M = u.css("z-index");
            var _ = i.css("z-index");
            f.find(".slotslide").each(function (t) {
                var s = e(this);
                s.parent().css({
                    overflow: "visible"
                });
                s.css({
                    background: "#333"
                });
                if (c == 1) s.transition({
                    opacity: 0,
                    left: 0,
                    top: r.height / 2,
                    perspective: r.height * 100,
                    rotate3d: "1, 0, 0, -90deg "
                }, 0);
                else s.transition({
                    opacity: 0,
                    left: 0,
                    top: 0 - r.height / 2,
                    perspective: r.height * 100,
                    rotate3d: "1, 0, 0, 90deg "
                }, 0);
                setTimeout(function () {
                    s.transition({
                        opacity: 1,
                        top: 0,
                        rotate3d: " 1, 0, 0, 0deg "
                    }, h * 2, function () {
                        if (t == r.slots - 1) {
                            y(n, r);
                            f.find(".defaultimg").css({
                                opacity: 1
                            });
                            if (u.index() != i.index()) a.find(".defaultimg").css({
                                opacity: 0
                            });
                            r.act = r.next;
                            o(n)
                        }
                    })
                }, t * 150)
            });
            a.find(".slotslide").each(function (t) {
                var n = e(this);
                n.parent().css({
                    overflow: "visible"
                });
                n.css({
                    background: "#333"
                });
                n.transition({
                    top: 0,
                    perspective: r.height * 100,
                    rotate3d: "1, 0, 0, 0deg"
                }, 0);
                a.find(".defaultimg").css({
                    opacity: 0
                });
                setTimeout(function () {
                    if (c == 1) n.transition({
                        opacity: .6,
                        left: 0,
                        top: 0 - r.height / 2,
                        rotate3d: "1, 0, 0, 90deg"
                    }, h * 2, function () {});
                    else n.transition({
                        opacity: .6,
                        left: 0,
                        top: 0 + r.height / 2,
                        rotate3d: "1, 0, 0, -90deg"
                    }, h * 2, function () {})
                }, t * 150)
            })
        }
        if (l == 20) {
            h = h + 100;
            if (r.slots > 10) r.slots = 10;
            u.css({
                opacity: 1
            });
            m(a, r, true);
            m(f, r, false);
            f.find(".defaultimg").css({
                opacity: 0
            });
            f.find(".slotslide").each(function (t) {
                var s = e(this);
                s.parent().css({
                    overflow: "visible"
                });
                if (c == 1) s.transition({
                    scale: .8,
                    top: 0,
                    left: 0 - r.width,
                    perspective: r.width,
                    rotate3d: "2, 5, 0, 110deg"
                }, 0);
                else s.transition({
                    scale: .8,
                    top: 0,
                    left: 0 + r.width,
                    perspective: r.width,
                    rotate3d: "2, 5, 0, -110deg"
                }, 0);
                setTimeout(function () {
                    s.transition({
                        scale: .8,
                        left: 0,
                        perspective: r.width,
                        rotate3d: "1, 5, 0, 0deg"
                    }, h * 2, "ease").transition({
                        scale: 1
                    }, 200, "out", function () {
                        if (t == r.slots - 1) {
                            y(n, r);
                            f.find(".defaultimg").css({
                                opacity: 1
                            });
                            if (u.index() != i.index()) a.find(".defaultimg").css({
                                opacity: 0
                            });
                            r.act = r.next;
                            o(n)
                        }
                    })
                }, t * 100)
            });
            a.find(".slotslide").each(function (t) {
                var n = e(this);
                n.transition({
                    scale: .5,
                    left: 0,
                    perspective: 500,
                    rotate3d: "1, 5, 0, 5deg"
                }, 300, "in-out");
                a.find(".defaultimg").css({
                    opacity: 0
                });
                setTimeout(function () {
                    if (c == 1) n.transition({
                        top: 0,
                        left: r.width / 2,
                        perspective: r.width,
                        rotate3d: "0, -3, 0, 70deg",
                        opacity: 0
                    }, h * 2, "out", function () {});
                    else n.transition({
                        top: 0,
                        left: 0 - r.width / 2,
                        perspective: r.width,
                        rotate3d: "0, -3, 0, -70deg",
                        opacity: 0
                    }, h * 2, "out", function () {})
                }, t * 100)
            })
        }
        if (l == 21) {
            h = h + 100;
            if (r.slots > 10) r.slots = 10;
            u.css({
                opacity: 1
            });
            m(a, r, true);
            m(f, r, false);
            f.find(".defaultimg").css({
                opacity: 0
            });
            f.find(".slotslide").each(function (t) {
                var s = e(this);
                if (c == 1) s.transition({
                    top: 0,
                    left: 0 - r.width / 2,
                    perspective: r.width * 2,
                    rotate3d: "0, 100, 0, 90deg"
                }, 0);
                else s.transition({
                    top: 0,
                    left: 0 + r.width / 2,
                    perspective: r.width * 2,
                    rotate3d: "0, 100, 0, -90deg"
                }, 0);
                setTimeout(function () {
                    s.transition({
                        left: 0,
                        perspective: r.width * 2,
                        rotate3d: "0, 0, 0, 0deg"
                    }, h * 2, function () {
                        if (t == r.slots - 1) {
                            y(n, r);
                            f.find(".defaultimg").css({
                                opacity: 1
                            });
                            if (u.index() != i.index()) a.find(".defaultimg").css({
                                opacity: 0
                            });
                            r.act = r.next;
                            o(n)
                        }
                    })
                }, t * 100)
            });
            a.find(".slotslide").each(function (t) {
                var n = e(this);
                n.transition({
                    left: 0,
                    perspective: r.width * 2,
                    rotate3d: "0, 0, 0, 0deg"
                }, 0);
                a.find(".defaultimg").css({
                    opacity: 0
                });
                setTimeout(function () {
                    if (c == 1) n.transition({
                        top: 0,
                        left: r.width / 2,
                        perspective: r.width,
                        rotate3d: "0, 1000, 0, -90deg"
                    }, h * 1.5, function () {});
                    else n.transition({
                        top: 0,
                        left: 0 - r.width / 2,
                        perspective: r.width,
                        rotate3d: "0, 1000, 0, +90deg"
                    }, h * 1.5, function () {})
                }, t * 100)
            })
        }
        var D = {};
        D.slideIndex = r.next + 1;
        n.trigger("revolution.slide.onchange", D);
        setTimeout(function () {
            n.trigger("revolution.slide.onafterswap")
        }, h);
        n.trigger("revolution.slide.onvideostop")
    }

    function E() {}

    function S(t) {
        if (t.data == YT.PlayerState.PLAYING) {
            var n = e("body").find(".tp-bannertimer");
            var r = n.data("opt");
            n.stop();
            r.videoplaying = true;
            r.videostartednow = 1
        } else {
            var n = e("body").find(".tp-bannertimer");
            var r = n.data("opt");
            if (r.conthover == 0) n.animate({
                width: "100%"
            }, {
                duration: r.delay - r.cd - 100,
                queue: false,
                easing: "linear"
            });
            r.videoplaying = false;
            r.videostoppednow = 1
        }
    }

    function x(e) {
        e.target.playVideo()
    }

    function T(e, t, n) {
        if (e.addEventListener) {
            e.addEventListener(t, n, false)
        } else {
            e.attachEvent(t, n, false)
        }
    }

    function N(t) {
        var n = $f(t);
        n.addEvent("ready", function (t) {
            n.addEvent("play", function (t) {
                var n = e("body").find(".tp-bannertimer");
                var r = n.data("opt");
                n.stop();
                r.videoplaying = true
            });
            n.addEvent("finish", function (t) {
                var n = e("body").find(".tp-bannertimer");
                var r = n.data("opt");
                if (r.conthover == 0) n.animate({
                    width: "100%"
                }, {
                    duration: r.delay - r.cd - 100,
                    queue: false,
                    easing: "linear"
                });
                r.videoplaying = false;
                r.videostartednow = 1
            });
            n.addEvent("pause", function (t) {
                var n = e("body").find(".tp-bannertimer");
                var r = n.data("opt");
                if (r.conthover == 0) n.animate({
                    width: "100%"
                }, {
                    duration: r.delay - r.cd - 100,
                    queue: false,
                    easing: "linear"
                });
                r.videoplaying = false;
                r.videostoppednow = 1
            })
        })
    }

    function C(t) {
        var n = $f(t);
        n.addEvent("ready", function (e) {
            n.api("play")
        });
        n.addEvent("play", function (t) {
            var n = e("body").find(".tp-bannertimer");
            var r = n.data("opt");
            n.stop();
            r.videoplaying = true
        });
        n.addEvent("finish", function (t) {
            var n = e("body").find(".tp-bannertimer");
            var r = n.data("opt");
            if (r.conthover == 0) n.animate({
                width: "100%"
            }, {
                duration: r.delay - r.cd - 100,
                queue: false,
                easing: "linear"
            });
            r.videoplaying = false;
            r.videostartednow = 1
        });
        n.addEvent("pause", function (t) {
            var n = e("body").find(".tp-bannertimer");
            var r = n.data("opt");
            if (r.conthover == 0) n.animate({
                width: "100%"
            }, {
                duration: r.delay - r.cd - 100,
                queue: false,
                easing: "linear"
            });
            r.videoplaying = false;
            r.videostoppednow = 1
        })
    }

    function k(n, r, i) {
        n.find(".tp-caption").each(function (i) {
            offsetx = r.width / 2 - r.startwidth / 2;
            if (r.bh > 1) {
                r.bw = 1;
                r.bh = 1
            }
            if (r.bw > 1) {
                r.bw = 1;
                r.bh = 1
            }
            var s = r.bw;
            var o = r.bh;
            var u = n.find(".tp-caption:eq(" + i + ")");
            var a = 0;
            if (r.width < r.hideCaptionAtLimit && u.data("captionhidden") == "on") {
                u.addClass("tp-hidden-caption");
                a = 1
            } else {
                if (r.width < r.hideAllCaptionAtLilmit) {
                    u.addClass("tp-hidden-caption");
                    a = 1
                } else {
                    u.removeClass("tp-hidden-caption")
                }
            }
            u.stop(true, true);
            if (a == 0) {
                if (u.data("linktoslide") != t) {
                    u.css({
                        cursor: "pointer"
                    });
                    if (u.data("linktoslide") != "no") {
                        u.click(function () {
                            var t = e(this);
                            var n = t.data("linktoslide");
                            if (n != "next" && n != "prev") {
                                r.container.data("showus", n);
                                r.container.parent().find(".tp-rightarrow").click()
                            } else if (n == "next") r.container.parent().find(".tp-rightarrow").click();
                            else if (n == "prev") r.container.parent().find(".tp-leftarrow").click()
                        })
                    }
                }
                if (u.hasClass("coloredbg")) offsetx = 0;
                if (offsetx < 0) offsetx = 0;
                var f = 0;
                clearTimeout(u.data("timer"));
                clearTimeout(u.data("timer-end"));
                var l = "iframe" + Math.round(Math.random() * 1e3 + 1);
                if (u.find("iframe").length > 0) {
                    u.find("iframe").each(function () {
                        var n = e(this);
                        if (n.attr("src").toLowerCase().indexOf("youtube") >= 0) {
                            if (!n.hasClass("HasListener")) {
                                try {
                                    n.attr("id", l);
                                    var r;
                                    if (u.data("autoplay") == true) r = new YT.Player(l, {
                                        events: {
                                            onStateChange: S,
                                            onReady: x
                                        }
                                    });
                                    else r = new YT.Player(l, {
                                        events: {
                                            onStateChange: S
                                        }
                                    });
                                    n.addClass("HasListener");
                                    u.data("player", r)
                                } catch (i) {}
                            } else {
                                if (u.data("autoplay") == true) {
                                    var r = u.data("player");
                                    r.playVideo()
                                }
                            }
                        } else {
                            if (n.attr("src").toLowerCase().indexOf("vimeo") >= 0) {
                                if (!n.hasClass("HasListener")) {
                                    n.addClass("HasListener");
                                    n.attr("id", l);
                                    var s = n.attr("src");
                                    var o = {},
                                        a = s,
                                        f = /([^&=]+)=([^&]*)/g,
                                        c;
                                    while (c = f.exec(a)) {
                                        o[decodeURIComponent(c[1])] = decodeURIComponent(c[2])
                                    }
                                    if (o["player_id"] != t) {
                                        s = s.replace(o["player_id"], l)
                                    } else {
                                        s = s + "&player_id=" + l
                                    }
                                    try {
                                        s = s.replace("api=0", "api=1")
                                    } catch (i) {}
                                    s = s + "&api=1";
                                    n.attr("src", s);
                                    var r = u.find("iframe")[0];
                                    if (u.data("autoplay") == true) $f(r).addEvent("ready", C);
                                    else $f(r).addEvent("ready", N)
                                } else {
                                    if (u.data("autoplay") == true) {
                                        var n = u.find("iframe");
                                        var h = n.attr("id");
                                        var p = $f(h);
                                        p.api("pause")
                                    }
                                }
                            }
                        }
                    })
                }
                if (u.hasClass("randomrotate") && (r.ie || r.ie9)) u.removeClass("randomrotate").addClass("sfb");
                u.removeClass("noFilterClass");
                var c = 0;
                var h = 0;
                if (u.find("img").length > 0) {
                    var p = u.find("img");
                    if (p.data("ww") == t) p.data("ww", p.width());
                    if (p.data("hh") == t) p.data("hh", p.height());
                    var d = p.data("ww");
                    var v = p.data("hh");
                    p.width(d * r.bw);
                    p.height(v * r.bh);
                    c = p.width();
                    h = p.height()
                } else {
                    if (u.find("iframe").length > 0) {
                        var p = u.find("iframe");
                        if (u.data("ww") == t) {
                            u.data("ww", p.width())
                        }
                        if (u.data("hh") == t) u.data("hh", p.height());
                        var d = u.data("ww");
                        var v = u.data("hh");
                        var m = u;
                        if (m.data("fsize") == t) m.data("fsize", parseInt(m.css("font-size"), 0) || 0);
                        if (m.data("pt") == t) m.data("pt", parseInt(m.css("paddingTop"), 0) || 0);
                        if (m.data("pb") == t) m.data("pb", parseInt(m.css("paddingBottom"), 0) || 0);
                        if (m.data("pl") == t) m.data("pl", parseInt(m.css("paddingLeft"), 0) || 0);
                        if (m.data("pr") == t) m.data("pr", parseInt(m.css("paddingRight"), 0) || 0);
                        if (m.data("mt") == t) m.data("mt", parseInt(m.css("marginTop"), 0) || 0);
                        if (m.data("mb") == t) m.data("mb", parseInt(m.css("marginBottom"), 0) || 0);
                        if (m.data("ml") == t) m.data("ml", parseInt(m.css("marginLeft"), 0) || 0);
                        if (m.data("mr") == t) m.data("mr", parseInt(m.css("marginRight"), 0) || 0);
                        if (m.data("bt") == t) m.data("bt", parseInt(m.css("borderTop"), 0) || 0);
                        if (m.data("bb") == t) m.data("bb", parseInt(m.css("borderBottom"), 0) || 0);
                        if (m.data("bl") == t) m.data("bl", parseInt(m.css("borderLeft"), 0) || 0);
                        if (m.data("br") == t) m.data("br", parseInt(m.css("borderRight"), 0) || 0);
                        if (m.data("lh") == t) m.data("lh", parseInt(m.css("lineHeight"), 0) || 0);
                        var g = r.width;
                        var y = r.height;
                        if (g > r.startwidth) g = r.startwidth;
                        if (y > r.startheight) y = r.startheight;
                        if (!u.hasClass("fullscreenvideo")) u.css({
                            "font-size": m.data("fsize") * r.bw + "px",
                            "padding-top": m.data("pt") * r.bh + "px",
                            "padding-bottom": m.data("pb") * r.bh + "px",
                            "padding-left": m.data("pl") * r.bw + "px",
                            "padding-right": m.data("pr") * r.bw + "px",
                            "margin-top": m.data("mt") * r.bh + "px",
                            "margin-bottom": m.data("mb") * r.bh + "px",
                            "margin-left": m.data("ml") * r.bw + "px",
                            "margin-right": m.data("mr") * r.bw + "px",
                            "border-top": m.data("bt") * r.bh + "px",
                            "border-bottom": m.data("bb") * r.bh + "px",
                            "border-left": m.data("bl") * r.bw + "px",
                            "border-right": m.data("br") * r.bw + "px",
                            "line-height": m.data("lh") * r.bh + "px",
                            height: v * r.bh + "px",
                            "white-space": "nowrap"
                        });
                        else u.css({
                            width: r.startwidth * r.bw,
                            height: r.startheight * r.bh
                        });
                        p.width(d * r.bw);
                        p.height(v * r.bh);
                        c = p.width();
                        h = p.height()
                    } else {
                        var m = u;
                        if (m.data("fsize") == t) m.data("fsize", parseInt(m.css("font-size"), 0) || 0);
                        if (m.data("pt") == t) m.data("pt", parseInt(m.css("paddingTop"), 0) || 0);
                        if (m.data("pb") == t) m.data("pb", parseInt(m.css("paddingBottom"), 0) || 0);
                        if (m.data("pl") == t) m.data("pl", parseInt(m.css("paddingLeft"), 0) || 0);
                        if (m.data("pr") == t) m.data("pr", parseInt(m.css("paddingRight"), 0) || 0);
                        if (m.data("mt") == t) m.data("mt", parseInt(m.css("marginTop"), 0) || 0);
                        if (m.data("mb") == t) m.data("mb", parseInt(m.css("marginBottom"), 0) || 0);
                        if (m.data("ml") == t) m.data("ml", parseInt(m.css("marginLeft"), 0) || 0);
                        if (m.data("mr") == t) m.data("mr", parseInt(m.css("marginRight"), 0) || 0);
                        if (m.data("bt") == t) m.data("bt", parseInt(m.css("borderTop"), 0) || 0);
                        if (m.data("bb") == t) m.data("bb", parseInt(m.css("borderBottom"), 0) || 0);
                        if (m.data("bl") == t) m.data("bl", parseInt(m.css("borderLeft"), 0) || 0);
                        if (m.data("br") == t) m.data("br", parseInt(m.css("borderRight"), 0) || 0);
                        if (m.data("lh") == t) m.data("lh", parseInt(m.css("lineHeight"), 0) || 0);
                        u.css({
                            "font-size": m.data("fsize") * r.bw + "px",
                            "padding-top": m.data("pt") * r.bh + "px",
                            "padding-bottom": m.data("pb") * r.bh + "px",
                            "padding-left": m.data("pl") * r.bw + "px",
                            "padding-right": m.data("pr") * r.bw + "px",
                            "margin-top": m.data("mt") * r.bh + "px",
                            "margin-bottom": m.data("mb") * r.bh + "px",
                            "margin-left": m.data("ml") * r.bw + "px",
                            "margin-right": m.data("mr") * r.bw + "px",
                            "border-top": m.data("bt") * r.bh + "px",
                            "border-bottom": m.data("bb") * r.bh + "px",
                            "border-left": m.data("bl") * r.bw + "px",
                            "border-right": m.data("br") * r.bw + "px",
                            "line-height": m.data("lh") * r.bh + "px",
                            "white-space": "nowrap"
                        });
                        h = u.outerHeight(true);
                        c = u.outerWidth(true)
                    }
                } if (u.hasClass("fade")) {
                    u.css({
                        opacity: 0,
                        left: s * u.data("x") + offsetx + "px",
                        top: r.bh * u.data("y") + "px"
                    })
                }
                if (u.hasClass("randomrotate")) {
                    u.css({
                        left: s * u.data("x") + offsetx + "px",
                        top: o * u.data("y") + f + "px"
                    });
                    var b = Math.random() * 2 + 1;
                    var w = Math.round(Math.random() * 200 - 100);
                    var E = Math.round(Math.random() * 200 - 100);
                    var T = Math.round(Math.random() * 200 - 100);
                    u.data("repx", E);
                    u.data("repy", T);
                    u.data("repo", u.css("opacity"));
                    u.data("rotate", w);
                    u.data("scale", b);
                    u.transition({
                        opacity: 0,
                        scale: b,
                        rotate: w,
                        x: E,
                        y: T,
                        duration: "0ms"
                    })
                } else {
                    if (r.ie || r.ie9) {} else {
                        if (u.find("iframe").length == 0) u.transition({
                            scale: 1,
                            rotate: 0
                        })
                    }
                } if (u.hasClass("lfr")) {
                    u.css({
                        opacity: 1,
                        left: 15 + r.width + "px",
                        top: r.bh * u.data("y") + "px"
                    })
                }
                if (u.hasClass("lfl")) {
                    u.css({
                        opacity: 1,
                        left: -15 - c + "px",
                        top: r.bh * u.data("y") + "px"
                    })
                }
                if (u.hasClass("sfl")) {
                    u.css({
                        opacity: 0,
                        left: s * u.data("x") - 50 + offsetx + "px",
                        top: r.bh * u.data("y") + "px"
                    })
                }
                if (u.hasClass("sfr")) {
                    u.css({
                        opacity: 0,
                        left: s * u.data("x") + 50 + offsetx + "px",
                        top: r.bh * u.data("y") + "px"
                    })
                }
                if (u.hasClass("lft")) {
                    u.css({
                        opacity: 1,
                        left: s * u.data("x") + offsetx + "px",
                        top: -25 - h + "px"
                    })
                }
                if (u.hasClass("lfb")) {
                    u.css({
                        opacity: 1,
                        left: s * u.data("x") + offsetx + "px",
                        top: 25 + r.height + "px"
                    })
                }
                if (u.hasClass("sft")) {
                    u.css({
                        opacity: 0,
                        left: s * u.data("x") + offsetx + "px",
                        top: r.bh * u.data("y") - 50 + "px"
                    })
                }
                if (u.hasClass("sfb")) {
                    u.css({
                        opacity: 0,
                        left: s * u.data("x") + offsetx + "px",
                        top: r.bh * u.data("y") + 50 + "px"
                    })
                }
                u.data("timer", setTimeout(function () {
                    u.css({
                        visibility: "visible"
                    });
                    if (u.hasClass("fade")) {
                        u.data("repo", u.css("opacity"));
                        u.animate({
                            opacity: 1
                        }, {
                            duration: u.data("speed"),
                            complete: function () {
                                if (r.ie) e(this).addClass("noFilterClass")
                            }
                        })
                    }
                    if (u.hasClass("randomrotate")) {
                        u.transition({
                            opacity: 1,
                            scale: 1,
                            left: s * u.data("x") + offsetx + "px",
                            top: o * u.data("y") + f + "px",
                            rotate: 0,
                            x: 0,
                            y: 0,
                            duration: u.data("speed")
                        });
                        if (r.ie) u.addClass("noFilterClass")
                    }
                    if (u.hasClass("lfr") || u.hasClass("lfl") || u.hasClass("sfr") || u.hasClass("sfl") || u.hasClass("lft") || u.hasClass("lfb") || u.hasClass("sft") || u.hasClass("sfb")) {
                        var n = u.data("easing");
                        if (n == t) n = "linear";
                        u.data("repx", u.position().left);
                        u.data("repy", u.position().top);
                        u.data("repo", u.css("opacity"));
                        u.animate({
                            opacity: 1,
                            left: s * u.data("x") + offsetx + "px",
                            top: r.bh * u.data("y") + "px"
                        }, {
                            duration: u.data("speed"),
                            easing: n,
                            complete: function () {
                                if (r.ie) e(this).addClass("noFilterClass")
                            }
                        })
                    }
                }, u.data("start")));
                if (u.data("end") != t) u.data("timer-end", setTimeout(function () {
                    if ((r.ie || r.ie9) && (u.hasClass("randomrotate") || u.hasClass("randomrotateout"))) {
                        u.removeClass("randomrotate").removeClass("randomrotateout").addClass("fadeout")
                    }
                    A(u, r)
                }, u.data("end")))
            }
        });
        var s = jQuery("body").find(".tp-bannertimer");
        s.data("opt", r)
    }

    function L(e, t) {
        e.find(".tp-caption").each(function (n) {
            var r = e.find(".tp-caption:eq(" + n + ")");
            r.stop(true, true);
            clearTimeout(r.data("timer"));
            clearTimeout(r.data("timer-end"));
            var i = r.data("easing");
            i = "easeInOutSine";
            var s = r.data("repx");
            var o = r.data("repy");
            var u = r.data("repo");
            var a = r.data("rotate");
            var f = r.data("scale");
            if (r.find("iframe").length > 0) {
                try {
                    var l = r.find("iframe");
                    var c = l.attr("id");
                    var h = $f(c);
                    h.api("pause")
                } catch (p) {}
                try {
                    var d = r.data("player");
                    d.stopVideo()
                } catch (p) {}
            }
            try {
                A(r, t)
            } catch (p) {}
        })
    }

    function A(n, r) {
        if (n.hasClass("randomrotate") && (r.ie || r.ie9)) n.removeClass("randomrotate").addClass("sfb");
        if (n.hasClass("randomrotateout") && (r.ie || r.ie9)) n.removeClass("randomrotateout").addClass("stb");
        var i = n.data("endspeed");
        if (i == t) i = n.data("speed");
        var s = n.data("repx");
        var o = n.data("repy");
        var u = n.data("repo");
        if (r.ie) {
            n.css({
                opacity: "inherit",
                filter: "inherit"
            })
        }
        if (n.hasClass("ltr") || n.hasClass("ltl") || n.hasClass("str") || n.hasClass("stl") || n.hasClass("ltt") || n.hasClass("ltb") || n.hasClass("stt") || n.hasClass("stb")) {
            s = n.position().left;
            o = n.position().top;
            if (n.hasClass("ltr")) s = r.width + 60;
            else if (n.hasClass("ltl")) s = 0 - n.width() - 60;
            else if (n.hasClass("ltt")) o = 0 - n.height() - 60;
            else if (n.hasClass("ltb")) o = r.height + 60;
            else if (n.hasClass("str")) {
                s = s + 50;
                u = 0
            } else if (n.hasClass("stl")) {
                s = s - 50;
                u = 0
            } else if (n.hasClass("stt")) {
                o = o - 50;
                u = 0
            } else if (n.hasClass("stb")) {
                o = o + 50;
                u = 0
            }
            var a = n.data("endeasing");
            if (a == t) a = "linear";
            n.animate({
                opacity: u,
                left: s + "px",
                top: o + "px"
            }, {
                duration: n.data("endspeed"),
                easing: a,
                complete: function () {
                    e(this).css({
                        visibility: "hidden"
                    })
                }
            });
            if (r.ie) n.removeClass("noFilterClass")
        } else if (n.hasClass("randomrotateout")) {
            n.transition({
                opacity: 0,
                scale: Math.random() * 2 + .3,
                left: Math.random() * r.width + "px",
                top: Math.random() * r.height + "px",
                rotate: Math.random() * 40,
                duration: i,
                complete: function () {
                    e(this).css({
                        visibility: "hidden"
                    })
                }
            });
            if (r.ie) n.removeClass("noFilterClass")
        } else if (n.hasClass("fadeout")) {
            if (r.ie) n.removeClass("noFilterClass");
            n.animate({
                opacity: 0
            }, {
                duration: 200,
                complete: function () {
                    e(this).css({
                        visibility: "hidden"
                    })
                }
            })
        } else if (n.hasClass("lfr") || n.hasClass("lfl") || n.hasClass("sfr") || n.hasClass("sfl") || n.hasClass("lft") || n.hasClass("lfb") || n.hasClass("sft") || n.hasClass("sfb")) {
            if (n.hasClass("lfr")) s = r.width + 60;
            else if (n.hasClass("lfl")) s = 0 - n.width() - 60;
            else if (n.hasClass("lft")) o = 0 - n.height() - 60;
            else if (n.hasClass("lfb")) o = r.height + 60;
            var a = n.data("endeasing");
            if (a == t) a = "linear";
            n.animate({
                opacity: u,
                left: s + "px",
                top: o + "px"
            }, {
                duration: n.data("endspeed"),
                easing: a,
                complete: function () {
                    e(this).css({
                        visibility: "hidden"
                    })
                }
            });
            if (r.ie) n.removeClass("noFilterClass")
        } else if (n.hasClass("fade")) {
            n.animate({
                opacity: 0
            }, {
                duration: i,
                complete: function () {
                    e(this).css({
                        visibility: "hidden"
                    })
                }
            });
            if (r.ie) n.removeClass("noFilterClass")
        } else if (n.hasClass("randomrotate")) {
            n.transition({
                opacity: 0,
                scale: Math.random() * 2 + .3,
                left: Math.random() * r.width + "px",
                top: Math.random() * r.height + "px",
                rotate: Math.random() * 40,
                duration: i
            });
            if (r.ie) n.removeClass("noFilterClass")
        }
    }

    function O(t, n) {
        t.children().each(function () {
            e(this).die("click");
            e(this).die("mouseenter");
            e(this).die("mouseleave");
            e(this).unbind("hover")
        });
        t.die("click", "mouseenter", "mouseleave");
        clearInterval(n.cdint);
        t = null
    }

    function M(n, r) {
        r.cd = 0;
        r.loop = 0;
        if (r.stopAfterLoops != t && r.stopAfterLoops > -1) r.looptogo = r.stopAfterLoops;
        else r.looptogo = 9999999; if (r.stopAtSlide != t && r.stopAtSlide > -1) r.lastslidetoshow = r.stopAtSlide;
        else r.lastslidetoshow = 999; if (r.looptogo == 0) r.stopLoop = "on";
        if (r.slideamount > 1 && !(r.stopAfterLoops == 0 && r.stopAtSlide == 1)) {
            var i = n.find(".tp-bannertimer");
            if (i.length > 0) {
                i.css({
                    width: "0%"
                });
                i.animate({
                    width: "100%"
                }, {
                    duration: r.delay - 100,
                    queue: false,
                    easing: "linear"
                })
            }
            i.data("opt", r);
            r.cdint = setInterval(function () {
                if (e("body").find(n).length == 0) O(n, r);
                if (n.data("conthover-changed") == 1) {
                    r.conthover = n.data("conthover");
                    n.data("conthover-changed", 0)
                }
                if (r.conthover != 1 && r.videoplaying != true && r.width > r.hideSliderAtLimit) r.cd = r.cd + 100;
                if (r.fullWidth != "on")
                    if (r.width > r.hideSliderAtLimit) n.parent().removeClass("tp-hide-revslider");
                    else n.parent().addClass("tp-hide-revslider");
                if (r.videostartednow == 1) {
                    n.trigger("revolution.slide.onvideoplay");
                    r.videostartednow = 0
                }
                if (r.videostoppednow == 1) {
                    n.trigger("revolution.slide.onvideostop");
                    r.videostoppednow = 0
                }
                if (r.cd >= r.delay) {
                    r.cd = 0;
                    r.act = r.next;
                    r.next = r.next + 1;
                    if (r.next > n.find(">ul >li").length - 1) {
                        r.next = 0;
                        r.looptogo = r.looptogo - 1;
                        if (r.loop <= 0) {
                            r.stopLoop = "on"
                        }
                    }
                    if (r.stopLoop == "on" && r.next == r.lastslidetoshow - 1) {
                        clearInterval(r.cdint);
                        n.find(".tp-bannertimer").css({
                            visibility: "hidden"
                        });
                        n.trigger("revolution.slide.onstop")
                    }
                    w(n, r);
                    if (i.length > 0) {
                        i.css({
                            width: "0%"
                        });
                        i.animate({
                            width: "100%"
                        }, {
                            duration: r.delay - 100,
                            queue: false,
                            easing: "linear"
                        })
                    }
                }
            }, 100);
            n.hover(function () {
                if (r.onHoverStop == "on") {
                    r.conthover = 1;
                    i.stop();
                    n.trigger("revolution.slide.onpause")
                }
            }, function () {
                if (n.data("conthover") != 1) {
                    n.trigger("revolution.slide.onresume");
                    r.conthover = 0;
                    if (r.onHoverStop == "on" && r.videoplaying != true) {
                        i.animate({
                            width: "100%"
                        }, {
                            duration: r.delay - r.cd - 100,
                            queue: false,
                            easing: "linear"
                        })
                    }
                }
            })
        }
    }
    e.fn.extend({
        revolution: function (r) {
            e.fn.revolution.defaults = {
                delay: 9e3,
                startheight: 500,
                startwidth: 960,
                hideThumbs: 200,
                thumbWidth: 100,
                thumbHeight: 50,
                thumbAmount: 5,
                navigationType: "bullet",
                navigationArrows: "withbullet",
                navigationStyle: "round",
                navigationHAlign: "center",
                navigationVAlign: "bottom",
                navigationHOffset: 0,
                navigationVOffset: 20,
                soloArrowLeftHalign: "left",
                soloArrowLeftValign: "center",
                soloArrowLeftHOffset: 20,
                soloArrowLeftVOffset: 0,
                soloArrowRightHalign: "right",
                soloArrowRightValign: "center",
                soloArrowRightHOffset: 20,
                soloArrowRightVOffset: 0,
                touchenabled: "on",
                onHoverStop: "on",
                stopAtSlide: -1,
                stopAfterLoops: -1,
                hideCaptionAtLimit: 0,
                hideAllCaptionAtLilmit: 0,
                hideSliderAtLimit: 0,
                shadow: 1,
                fullWidth: "off"
            };
            r = e.extend({}, e.fn.revolution.defaults, r);
            return this.each(function () {
                var i = r;
                var o = e(this);
                if (!o.hasClass("revslider-initialised")) {
                    o.addClass("revslider-initialised");
                    i.firefox13 = false;
                    i.ie = !e.support.opacity;
                    i.ie9 = document.documentMode == 9;
                    var u = e.fn.jquery.split("."),
                        h = parseFloat(u[0]),
                        p = parseFloat(u[1]),
                        v = parseFloat(u[2] || "0");
                    if (h == 1 && p < 7) {
                        o.html('<div style="text-align:center; padding:40px 0px; font-size:20px; color:#992222;"> The Current Version of jQuery:' + u + " <br>Please update your jQuery Version to min. 1.7 in Case you wish to use the Revolution Slider Plugin</div>")
                    }
                    if (!e.support.transition) e.fn.transition = e.fn.animate;
                    e.cssEase["bounce"] = "cubic-bezier(0,1,0.5,1.3)";
                    o.find(".caption").each(function () {
                        e(this).addClass("tp-caption")
                    });
                    o.find(".tp-caption iframe").each(function () {
                        try {
                            if (e(this).attr("src").indexOf("you") > 0) {
                                var t = document.createElement("script");
                                t.src = "http://www.youtube.com/player_api";
                                var n = document.getElementsByTagName("script")[0];
                                n.parentNode.insertBefore(t, n)
                            }
                        } catch (r) {}
                    });
                    o.find(".tp-caption iframe").each(function () {
                        try {
                            if (e(this).attr("src").indexOf("vim") > 0) {
                                var t = document.createElement("script");
                                t.src = "http://a.vimeocdn.com/js/froogaloop2.min.js";
                                var n = document.getElementsByTagName("script")[0];
                                n.parentNode.insertBefore(t, n)
                            }
                        } catch (r) {}
                    });
                    if (i.shuffle == "on") {
                        for (var m = 0; m < o.find(">ul:first-child >li").length; m++) {
                            var g = Math.round(Math.random() * o.find(">ul:first-child >li").length);
                            o.find(">ul:first-child >li:eq(" + g + ")").prependTo(o.find(">ul:first-child"))
                        }
                    }
                    i.slots = 4;
                    i.act = -1;
                    i.next = 0;
                    if (i.startWithSlide != t) i.next = i.startWithSlide;
                    i.origcd = i.delay;
                    i.firststart = 1;
                    if (i.navigationHOffset == t) i.navOffsetHorizontal = 0;
                    if (i.navigationVOffset == t) i.navOffsetVertical = 0;
                    o.append('<div class="tp-loader"></div>');
                    if (o.find(".tp-bannertimer").length == 0) o.append('<div class="tp-bannertimer" style="visibility:hidden"></div>');
                    var y = o.find(".tp-bannertimer");
                    if (y.length > 0) {
                        y.css({
                            width: "0%"
                        })
                    }
                    o.addClass("tp-simpleresponsive");
                    i.container = o;
                    i.slideamount = o.find(">ul:first >li").length;
                    if (o.height() == 0) o.height(i.startheight);
                    if (i.startwidth == t || i.startwidth == 0) i.startwidth = o.width();
                    if (i.startheight == t || i.startheight == 0) i.startheight = o.height();
                    i.width = o.width();
                    i.height = o.height();
                    i.bw = i.startwidth / o.width();
                    i.bh = i.startheight / o.height();
                    if (i.width != i.startwidth) {
                        i.height = Math.round(i.startheight * (i.width / i.startwidth));
                        o.height(i.height)
                    }
                    if (i.shadow != 0) {
                        o.parent().append('<div class="tp-bannershadow tp-shadow' + i.shadow + '"></div>');
                        o.parent().find(".tp-bannershadow").css({
                            width: i.width
                        })
                    }
                    o.find("ul").css({
                        display: "none"
                    });
                    o.waitForImages(function () {
                        o.find("ul").css({
                            display: "block"
                        });
                        d(o, i);
                        if (i.slideamount > 1) a(o, i);
                        if (i.slideamount > 1) s(o, i);
                        if (i.slideamount > 1) f(o, i);
                        e("#unvisible_button").click(function () {
                            i.navigationArrows = e(".selectnavarrows").val();
                            i.navigationType = e(".selectnavtype").val();
                            i.navigationStyle = e(".selectnavstyle").val();
                            i.soloArrowStyle = "default";
                            e(".tp-bullets").remove();
                            e(".tparrows").remove();
                            if (i.slideamount > 1) a(o, i);
                            if (i.slideamount > 1) s(o, i);
                            if (i.slideamount > 1) f(o, i)
                        });
                        l(o, i);
                        if (i.hideThumbs > 0) c(o, i);
                        o.waitForImages(function () {
                            o.find(".tp-loader").fadeOut(600);
                            setTimeout(function () {
                                w(o, i);
                                if (i.slideamount > 1) M(o, i);
                                o.trigger("revolution.slide.onloaded")
                            }, 600)
                        })
                    });
                    e(window).resize(function () {
                        if (e("body").find(o) != 0)
                            if (o.outerWidth(true) != i.width) {
                                n(o, i)
                            }
                    })
                }
            })
        },
        revpause: function (t) {
            return this.each(function () {
                var t = e(this);
                t.data("conthover", 1);
                t.data("conthover-changed", 1);
                t.trigger("revolution.slide.onpause");
                var n = t.parent().find(".tp-bannertimer");
                n.stop()
            })
        },
        revresume: function (t) {
            return this.each(function () {
                var t = e(this);
                t.data("conthover", 0);
                t.data("conthover-changed", 1);
                t.trigger("revolution.slide.onresume");
                var n = t.parent().find(".tp-bannertimer");
                var r = n.data("opt");
                n.animate({
                    width: "100%"
                }, {
                    duration: r.delay - r.cd - 100,
                    queue: false,
                    easing: "linear"
                })
            })
        },
        revnext: function (t) {
            return this.each(function () {
                var t = e(this);
                t.parent().find(".tp-rightarrow").click()
            })
        },
        revprev: function (t) {
            return this.each(function () {
                var t = e(this);
                t.parent().find(".tp-leftarrow").click()
            })
        },
        revmaxslide: function (t) {
            return e(this).find(">ul:first-child >li").length
        },
        revcurrentslide: function (t) {
            var n = e(this);
            var r = n.parent().find(".tp-bannertimer");
            var i = r.data("opt");
            return i.act
        },
        revlastslide: function (t) {
            var n = e(this);
            var r = n.parent().find(".tp-bannertimer");
            var i = r.data("opt");
            return i.lastslide
        },
        revshowslide: function (t) {
            return this.each(function () {
                var n = e(this);
                n.data("showus", t);
                n.parent().find(".tp-rightarrow").click()
            })
        }
    })
})(jQuery)
