/**
 * cubeportfolio v1.4 - http://scriptpie.com
 *
 * Copyright - 2014 Mihai Buricea (http://www.scriptpie.com)
 * All rights reserved.
 *
 * You may not modify and/or redistribute this file
 * save cases where Extended License has been purchased
 *
 */
(function (e, t, n, r) {
    "use strict";
    var i = "cbp",
        s = "." + i;
    if (typeof Object.create !== "function") {
        Object.create = function (e) {
            function t() {}
            t.prototype = e;
            return new t
        }
    }
    e.expr[":"].uncached = function (t) {
        if (!e(t).is('img[src!=""]')) {
            return false
        }
        var n = new Image;
        n.src = t.src;
        return !n.complete
    };
    var o = {
        init: function (e, t) {
            var n = this,
                r;
            n.cubeportfolio = e;
            n.type = t;
            n.isOpen = false;
            n.options = n.cubeportfolio.options;
            if (t === "singlePageInline") {
                n.matrice = [-1, -1];
                n.height = 0;
                n._createMarkupSinglePageInline();
                return
            }
            n._createMarkup();
            if (n.options.singlePageDeeplinking && t === "singlePage") {
                n.url = location.href;
                if (n.url.slice(-1) == "#") {
                    n.url = n.url.slice(0, -1)
                }
                r = n.cubeportfolio.blocksAvailable.find(n.options.singlePageDelegate).filter(function (e) {
                    return n.url.split("#cbp=")[1] === this.getAttribute("href")
                })[0];
                if (r) {
                    n.url = n.url.replace(/#cbp=(.+)/ig, "");
                    n.openSinglePage(n.cubeportfolio.blocksAvailable, r)
                }
            }
        },
        _createMarkup: function () {
            var t = this;
            t.wrap = e("<div/>", {
                "class": "cbp-popup-wrap cbp-popup-" + t.type,
                "data-action": t.type === "lightbox" ? "close" : ""
            }).on("click" + s, function (n) {
                if (t.stopEvents) {
                    return
                }
                var r = e(n.target).attr("data-action");
                if (t[r]) {
                    t[r]();
                    n.preventDefault()
                }
            });
            t.content = e("<div/>", {
                "class": "cbp-popup-content"
            }).appendTo(t.wrap);
            e("<div/>", {
                "class": "cbp-popup-loadingBox"
            }).appendTo(t.wrap);
            if (t.cubeportfolio.browser === "ie8") {
                t.bg = e("<div/>", {
                    "class": "cbp-popup-ie8bg",
                    "data-action": t.type === "lightbox" ? "close" : ""
                }).appendTo(t.wrap)
            }
            t.navigationWrap = e("<div/>", {
                "class": "cbp-popup-navigation-wrap"
            }).appendTo(t.wrap);
            t.navigation = e("<div/>", {
                "class": "cbp-popup-navigation"
            }).appendTo(t.navigationWrap);
            t.closeButton = e("<button/>", {
                "class": "cbp-popup-close",
                title: "Close (Esc arrow key)",
                type: "button",
                "data-action": "close"
            }).appendTo(t.navigation);
            t.nextButton = e("<button/>", {
                "class": "cbp-popup-next",
                title: "Next (Right arrow key)",
                type: "button",
                "data-action": "next"
            }).appendTo(t.navigation);
            t.prevButton = e("<button/>", {
                "class": "cbp-popup-prev",
                title: "Previous (Left arrow key)",
                type: "button",
                "data-action": "prev"
            }).appendTo(t.navigation);
            if (t.type === "singlePage") {
                if (t.options.singlePageShowCounter) {
                    t.counter = e("<div/>", {
                        "class": "cbp-popup-singlePage-counter"
                    }).appendTo(t.navigation)
                }
                t.content.on("click" + s, t.options.singlePageDelegate, function (e) {
                    e.preventDefault();
                    var n, r = t.dataArray.length,
                        i = this.getAttribute("href");
                    for (n = 0; n < r; n++) {
                        if (t.dataArray[n].url == i) {
                            break
                        }
                    }
                    t.singlePageJumpTo(n - t.current)
                })
            }
            e(n).on("keydown" + s, function (e) {
                if (!t.isOpen) return;
                if (t.stopEvents) return;
                if (e.keyCode === 37) {
                    t.prev()
                } else if (e.keyCode === 39) {
                    t.next()
                } else if (e.keyCode === 27) {
                    t.close()
                }
            })
        },
        _createMarkupSinglePageInline: function () {
            var t = this;
            t.wrap = e("<div/>", {
                "class": "cbp-popup-singlePageInline"
            }).on("click" + s, function (n) {
                if (t.stopEvents) {
                    return
                }
                var r = e(n.target).attr("data-action");
                if (r) {
                    t[r]();
                    n.preventDefault()
                }
            });
            t.content = e("<div/>", {
                "class": "cbp-popup-content"
            }).appendTo(t.wrap);
            e("<div/>", {
                "class": "cbp-popup-loadingBox"
            }).appendTo(t.wrap);
            t.navigation = e("<div/>", {
                "class": "cbp-popup-navigation"
            }).appendTo(t.wrap);
            t.closeButton = e("<button/>", {
                "class": "cbp-popup-close",
                title: "Close (Esc arrow key)",
                type: "button",
                "data-action": "close"
            }).appendTo(t.navigation)
        },
        destroy: function () {
            var t = this;
            e(n).off("keydown" + s);
            t.cubeportfolio.$obj.off("click" + s, t.options.lightboxDelegate);
            t.cubeportfolio.$obj.off("click" + s, t.options.singlePageDelegate);
            t.content.off("click" + s, t.options.singlePageDelegate);
            t.cubeportfolio.$obj.off("click" + s, t.options.singlePageInlineDelegate);
            t.cubeportfolio.$obj.removeClass("cbp-popup-isOpening");
            t.cubeportfolio.blocks.removeClass("cbp-singlePageInline-active");
            t.wrap.remove()
        },
        openLightbox: function (r, i) {
            var s = this,
                o = 0,
                u, a = [],
                f;
            if (s.isOpen) return;
            if (s.cubeportfolio.singlePageInline && s.cubeportfolio.singlePageInline.isOpen) {
                s.cubeportfolio.singlePageInline.close()
            }
            s.isOpen = true;
            s.stopEvents = false;
            s.dataArray = [];
            s.current = null;
            u = i.getAttribute("href");
            if (u === null) {
                throw new Error("HEI! Your clicked element doesn't have a href attribute.")
            }
            e.each(r.find(s.options.lightboxDelegate), function (t, n) {
                var r = n.getAttribute("href"),
                    i = r,
                    f = "isImage";
                if (e.inArray(r, a) === -1) {
                    if (u == r) {
                        s.current = o
                    } else if (!s.options.lightboxGallery) {
                        return
                    }
                    if (/youtube/i.test(r)) {
                        i = "//www.youtube.com/embed/" + r.substring(r.lastIndexOf("v=") + 2) + "?autoplay=1";
                        f = "isYoutube"
                    } else if (/vimeo/i.test(r)) {
                        i = "//player.vimeo.com/video/" + r.substring(r.lastIndexOf("/") + 1) + "?autoplay=1";
                        f = "isVimeo"
                    } else if (/ted\.com/i.test(r)) {
                        i = "http://embed.ted.com/talks/" + r.substring(r.lastIndexOf("/") + 1) + ".html";
                        f = "isTed"
                    } else if (/(\.mp4)|(\.ogg)|(\.ogv)|(\.webm)/i.test(r)) {
                        if (r.indexOf("|") !== -1) {
                            i = r.split("|")
                        } else {
                            i = r.split("%7C")
                        }
                        f = "isSelfHosted"
                    }
                    s.dataArray.push({
                        src: i,
                        title: n.getAttribute(s.options.lightboxTitleSrc),
                        type: f
                    });
                    o++
                }
                a.push(r)
            });
            s.counterTotal = s.dataArray.length;
            if (s.counterTotal === 1) {
                s.nextButton.hide();
                s.prevButton.hide();
                s.dataActionImg = ""
            } else {
                s.nextButton.show();
                s.prevButton.show();
                s.dataActionImg = 'data-action="next"'
            }
            s.wrap.appendTo(n.body);
            s.scrollTop = e(t).scrollTop();
            e("html").css({
                overflow: "hidden",
                paddingRight: t.outerWidth - e(n).width()
            });
            s.wrap.show();
            f = s.dataArray[s.current];
            s[f.type](f)
        },
        openSinglePage: function (r, i) {
            var s = this,
                o = 0,
                u, a = [];
            if (s.isOpen) return;
            if (s.cubeportfolio.singlePageInline && s.cubeportfolio.singlePageInline.isOpen) {
                s.cubeportfolio.singlePageInline.close()
            }
            s.isOpen = true;
            s.stopEvents = false;
            s.dataArray = [];
            s.current = null;
            u = i.getAttribute("href");
            if (u === null) {
                throw new Error("HEI! Your clicked element doesn't have a href attribute.")
            }
            e.each(r.find(s.options.singlePageDelegate), function (t, n) {
                var r = n.getAttribute("href");
                if (e.inArray(r, a) === -1) {
                    if (u == r) {
                        s.current = o
                    }
                    s.dataArray.push({
                        url: r,
                        element: n
                    });
                    o++
                }
                a.push(r)
            });
            s.counterTotal = s.dataArray.length;
            s.wrap.appendTo(n.body);
            s.scrollTop = e(t).scrollTop();
            e("html").css({
                overflow: "hidden",
                paddingRight: t.outerWidth - e(n).width()
            });
            s.wrap.scrollTop(0);
            if (e.isFunction(s.options.singlePageCallback)) {
                s.options.singlePageCallback.call(s, s.dataArray[s.current].url, s.dataArray[s.current].element)
            }
            s.wrap.show();
            s.wrap.one(s.cubeportfolio.transitionEnd, function () {
                var e;
                if (s.options.singlePageStickyNavigation) {
                    s.wrap.addClass("cbp-popup-singlePage-sticky");
                    e = s.wrap[0].clientWidth;
                    s.navigationWrap.width(e);
                    s.navigation.width(e)
                }
            });
            if (s.cubeportfolio.browser === "ie8" || s.cubeportfolio.browser === "ie9") {
                setTimeout(function () {
                    s.wrap.addClass("cbp-popup-singlePage-sticky")
                }, 1e3);
                if (s.options.singlePageStickyNavigation) {
                    var f = s.wrap[0].clientWidth;
                    s.navigationWrap.width(f);
                    s.navigation.width(f)
                }
            }
            setTimeout(function () {
                s.wrap.addClass("cbp-popup-singlePage-open")
            }, 20);
            if (s.options.singlePageDeeplinking) {
                location.href = s.url + "#cbp=" + s.dataArray[s.current].url
            }
        },
        openSinglePageInline: function (n, r, i) {
            var s = this,
                o = 0,
                u = 0,
                a = 0,
                f, l = [],
                c, h;
            i = i || false;
            s.storeBlocks = n;
            s.storeCurrentBlock = r;
            if (s.isOpen) {
                if (s.dataArray[s.current].url != r.getAttribute("href")) {
                    s.cubeportfolio.singlePageInline.close("open", {
                        blocks: n,
                        currentBlock: r,
                        fromOpen: true
                    })
                } else {
                    s.close()
                }
                return
            }
            s.wrap.addClass("cbp-popup-loading");
            s.isOpen = true;
            s.stopEvents = false;
            s.dataArray = [];
            s.current = null;
            f = r.getAttribute("href");
            if (f === null) {
                throw new Error("HEI! Your clicked element doesn't have a href attribute.")
            }
            e.each(n.find(s.options.singlePageInlineDelegate), function (t, n) {
                var r = n.getAttribute("href");
                if (e.inArray(r, l) === -1) {
                    if (f == r) {
                        s.current = o
                    }
                    s.dataArray.push({
                        url: r,
                        element: n
                    });
                    o++
                }
                l.push(r)
            });
            e(s.dataArray[s.current].element).parents(".cbp-item").addClass("cbp-singlePageInline-active");
            s.counterTotal = s.dataArray.length;
            if (s.cubeportfolio.blocksClone) {
                if (s.cubeportfolio.ulHidden === "clone") {
                    s.wrap.prependTo(s.cubeportfolio.$ul)
                } else {
                    s.wrap.prependTo(s.cubeportfolio.$ulClone)
                }
            } else {
                s.wrap.prependTo(s.cubeportfolio.$ul)
            } if (s.options.singlePageInlinePosition === "top") {
                u = 0;
                a = s.cubeportfolio.cols - 1
            } else if (s.options.singlePageInlinePosition === "above") {
                o = Math.floor(s.current / s.cubeportfolio.cols);
                u = s.cubeportfolio.cols * o;
                a = s.cubeportfolio.cols * (o + 1) - 1
            } else {
                o = Math.floor(s.current / s.cubeportfolio.cols);
                u = Math.min(s.cubeportfolio.cols * (o + 1), s.counterTotal);
                a = Math.min(s.cubeportfolio.cols * (o + 2) - 1, s.counterTotal);
                c = Math.ceil((s.current + 1) / s.cubeportfolio.cols);
                h = Math.ceil(s.counterTotal / s.cubeportfolio.cols);
                if (c == h) {
                    s.lastColumn = true
                } else {
                    s.lastColumn = false
                } if (i) {
                    if (s.lastColumn) {
                        s.top = s.lastColumnHeight
                    }
                } else {
                    s.lastColumnHeight = s.cubeportfolio.height;
                    s.top = s.lastColumnHeight
                }
            }
            s.matrice = [u, a];
            s._resizeSinglePageInline();
            if (e.isFunction(s.options.singlePageInlineCallback)) {
                s.options.singlePageInlineCallback.call(s, s.dataArray[s.current].url, s.dataArray[s.current].element)
            }
            if (s.options.singlePageInlineInFocus) {
                s.scrollTop = e(t).scrollTop();
                e("body, html").animate({
                    scrollTop: s.wrap.offset().top - 150
                })
            }
        },
        _resizeSinglePageInline: function (t) {
            var n = this,
                r;
            t = t || false;
            n.height = n.content.outerHeight(true);
            n.cubeportfolio._layout();
            n.cubeportfolio._processStyle(n.cubeportfolio.transition);
            if (t) {
                n.wrap.removeClass("cbp-popup-loading")
            }
            n.cubeportfolio.$obj.addClass("cbp-popup-isOpening");
            n.wrap.css({
                height: n.height
            });
            n.wrap.css({
                top: n.top
            });
            r = n.lastColumn ? n.height : 0;
            n.cubeportfolio._resizeMainContainer(n.cubeportfolio.transition, r);
            if (n.options.singlePageInlineInFocus) {
                e("body, html").animate({
                    scrollTop: n.wrap.offset().top - 150
                })
            }
        },
        updateSinglePage: function (e) {
            var t = this,
                n;
            t.content.html(e);
            t.wrap.addClass("cbp-popup-ready");
            t.wrap.removeClass("cbp-popup-loading");
            if (t.options.singlePageShowCounter) {
                t.counter.text(t.current + 1 + " of " + t.counterTotal)
            }
            n = t.content.find(".cbp-slider");
            if (n) {
                t.slider = Object.create(u);
                t.slider._init(t, n)
            } else {
                t.slider = null
            }
        },
        updateSinglePageInline: function (e) {
            var t = this,
                n;
            t.content.html(e);
            t._loadSinglePageInline();
            n = t.content.find(".cbp-slider");
            if (n) {
                t.slider = Object.create(u);
                t.slider._init(t, n)
            } else {
                t.slider = null
            }
        },
        _loadSinglePageInline: function () {
            var t = this,
                n = [],
                r, i, o, u, a = /url\((['"]?)(.*?)\1\)/g;
            o = t.wrap.children().css("backgroundImage");
            if (o) {
                var f;
                while (f = a.exec(o)) {
                    n.push({
                        src: f[2]
                    })
                }
            }
            t.wrap.find("*").each(function () {
                var t = e(this);
                if (t.is("img:uncached")) {
                    n.push({
                        src: t.attr("src"),
                        element: t[0]
                    })
                }
                o = t.css("backgroundImage");
                if (o) {
                    var r;
                    while (r = a.exec(o)) {
                        n.push({
                            src: r[2],
                            element: t[0]
                        })
                    }
                }
            });
            var l = n.length,
                c = 0;
            if (l === 0) {
                t._resizeSinglePageInline(true)
            }
            var h = function () {
                c++;
                if (c == l) {
                    t._resizeSinglePageInline(true)
                }
            };
            for (r = 0; r < l; r++) {
                i = new Image;
                e(i).on("load" + s + " error" + s, h);
                i.src = n[r].src
            }
        },
        isImage: function (t) {
            var n = this,
                r = new Image;
            n.tooggleLoading(true);
            if (e('<img src="' + t.src + '">').is("img:uncached")) {
                e(r).on("load" + s + " error" + s, function () {
                    n.updateImagesMarkup(t.src, t.title, n.current + 1 + " of " + n.counterTotal);
                    n.tooggleLoading(false)
                });
                r.src = t.src
            } else {
                n.updateImagesMarkup(t.src, t.title, n.current + 1 + " of " + n.counterTotal);
                n.tooggleLoading(false)
            }
        },
        isVimeo: function (e) {
            var t = this;
            t.updateVideoMarkup(e.src, e.title, t.current + 1 + " of " + t.counterTotal)
        },
        isYoutube: function (e) {
            var t = this;
            t.updateVideoMarkup(e.src, e.title, t.current + 1 + " of " + t.counterTotal)
        },
        isTed: function (e) {
            var t = this;
            t.updateVideoMarkup(e.src, e.title, t.current + 1 + " of " + t.counterTotal)
        },
        isSelfHosted: function (e) {
            var t = this;
            t.updateSelfHostedVideo(e.src, e.title, t.current + 1 + " of " + t.counterTotal)
        },
        updateSelfHostedVideo: function (e, t, n) {
            var r = this,
                i;
            r.wrap.addClass("cbp-popup-lightbox-isIframe");
            var s = '<div class="cbp-popup-lightbox-iframe">' + '<video controls="controls" width="100%" height="auto">';
            for (i = 0; i < e.length; i++) {
                if (/(\.mp4)/i.test(e[i])) {
                    s += '<source src="' + e[i] + '" type="video/mp4">'
                } else if (/(\.ogg)|(\.ogv)/i.test(e[i])) {
                    s += '<source src="' + e[i] + '" type="video/ogg">'
                } else if (/(\.webm)/i.test(e[i])) {
                    s += '<source src="' + e[i] + '" type="video/webm">'
                }
            }
            s += "Your browser does not support the video tag." + "</video>" + '<div class="cbp-popup-lightbox-bottom">' + (t ? '<div class="cbp-popup-lightbox-title">' + t + "</div>" : "") + (r.options.lightboxShowCounter ? '<div class="cbp-popup-lightbox-counter">' + n + "</div>" : "") + "</div>" + "</div>";
            r.content.html(s);
            r.wrap.addClass("cbp-popup-ready");
            r.preloadNearbyImages()
        },
        updateVideoMarkup: function (e, t, n) {
            var r = this;
            r.wrap.addClass("cbp-popup-lightbox-isIframe");
            var i = '<div class="cbp-popup-lightbox-iframe">' + '<iframe src="' + e + '" frameborder="0" allowfullscreen scrolling="no"></iframe>' + '<div class="cbp-popup-lightbox-bottom">' + (t ? '<div class="cbp-popup-lightbox-title">' + t + "</div>" : "") + (r.options.lightboxShowCounter ? '<div class="cbp-popup-lightbox-counter">' + n + "</div>" : "") + "</div>" + "</div>";
            r.content.html(i);
            r.wrap.addClass("cbp-popup-ready");
            r.preloadNearbyImages()
        },
        updateImagesMarkup: function (e, t, n) {
            var r = this;
            r.wrap.removeClass("cbp-popup-lightbox-isIframe");
            var i = '<div class="cbp-popup-lightbox-figure">' + '<img src="' + e + '" class="cbp-popup-lightbox-img" ' + r.dataActionImg + " />" + '<div class="cbp-popup-lightbox-bottom">' + (t ? '<div class="cbp-popup-lightbox-title">' + t + "</div>" : "") + (r.options.lightboxShowCounter ? '<div class="cbp-popup-lightbox-counter">' + n + "</div>" : "") + "</div>" + "</div>";
            r.content.html(i);
            r.wrap.addClass("cbp-popup-ready");
            r.resizeImage();
            r.preloadNearbyImages()
        },
        next: function () {
            var e = this;
            e[e.type + "JumpTo"](1)
        },
        prev: function () {
            var e = this;
            e[e.type + "JumpTo"](-1)
        },
        lightboxJumpTo: function (e) {
            var t = this,
                n;
            t.current = t.getIndex(t.current + e);
            n = t.dataArray[t.current];
            t[n.type](n)
        },
        singlePageJumpTo: function (t) {
            var n = this;
            n.current = n.getIndex(n.current + t);
            if (e.isFunction(n.options.singlePageCallback)) {
                n.resetWrap();
                n.wrap.scrollTop(0);
                n.wrap.addClass("cbp-popup-loading");
                n.options.singlePageCallback.call(n, n.dataArray[n.current].url, n.dataArray[n.current].element);
                if (n.options.singlePageDeeplinking) {
                    location.href = n.url + "#cbp=" + n.dataArray[n.current].url
                }
            }
        },
        resetWrap: function () {
            var e = this;
            if (e.type === "singlePage" && e.options.singlePageDeeplinking) {
                location.href = e.url + "#"
            }
        },
        getIndex: function (e) {
            var t = this;
            e = e % t.counterTotal;
            if (e < 0) {
                e = t.counterTotal + e
            }
            return e
        },
        close: function (n, r) {
            var i = this;
            i.isOpen = false;
            if (i.type === "singlePageInline") {
                if (n === "open") {
                    i.wrap.addClass("cbp-popup-loading");
                    e(i.dataArray[i.current].element).parents(".cbp-item").removeClass("cbp-singlePageInline-active");
                    i.openSinglePageInline(r.blocks, r.currentBlock, r.fromOpen)
                } else {
                    i.matrice = [-1, -1];
                    i.cubeportfolio._layout();
                    i.cubeportfolio._processStyle(i.cubeportfolio.transition);
                    i.cubeportfolio._resizeMainContainer(i.cubeportfolio.transition);
                    i.wrap.css({
                        height: 0
                    });
                    e(i.dataArray[i.current].element).parents(".cbp-item").removeClass("cbp-singlePageInline-active");
                    if (i.cubeportfolio.browser === "ie8" || i.cubeportfolio.browser === "ie9") {
                        i.content.html("");
                        i.wrap.detach();
                        i.cubeportfolio.$obj.removeClass("cbp-popup-isOpening");
                        if (n === "promise") {
                            if (e.isFunction(r.callback)) {
                                r.callback.call(i.cubeportfolio)
                            }
                        }
                    } else {
                        i.wrap.one(i.cubeportfolio.transitionEnd, function () {
                            i.content.html("");
                            i.wrap.detach();
                            i.cubeportfolio.$obj.removeClass("cbp-popup-isOpening");
                            if (n === "promise") {
                                if (e.isFunction(r.callback)) {
                                    r.callback.call(i.cubeportfolio)
                                }
                            }
                        })
                    } if (i.options.singlePageInlineInFocus) {
                        e("body, html").animate({
                            scrollTop: i.scrollTop
                        })
                    }
                }
            } else if (i.type === "singlePage") {
                i.resetWrap();
                e(t).scrollTop(i.scrollTop);
                setTimeout(function () {
                    i.stopScroll = true;
                    i.navigationWrap.css({
                        top: i.wrap.scrollTop()
                    });
                    i.wrap.removeClass("cbp-popup-singlePage-open cbp-popup-singlePage-sticky");
                    if (i.cubeportfolio.browser === "ie8" || i.cubeportfolio.browser === "ie9") {
                        i.content.html("");
                        i.wrap.detach();
                        e("html").css({
                            overflow: "",
                            paddingRight: ""
                        });
                        i.navigationWrap.removeAttr("style")
                    }
                }, 0);
                i.wrap.one(i.cubeportfolio.transitionEnd, function () {
                    i.content.html("");
                    i.wrap.detach();
                    e("html").css({
                        overflow: "",
                        paddingRight: ""
                    });
                    i.navigationWrap.removeAttr("style")
                })
            } else {
                e("html").css({
                    overflow: "",
                    paddingRight: ""
                });
                e(t).scrollTop(i.scrollTop);
                i.content.html("");
                i.wrap.detach()
            }
        },
        tooggleLoading: function (e) {
            var t = this;
            t.stopEvents = e;
            t.wrap[e ? "addClass" : "removeClass"]("cbp-popup-loading")
        },
        resizeImage: function () {
            if (!this.isOpen) return;
            var n = e(t).height(),
                r = e(".cbp-popup-content").find("img"),
                i = parseInt(r.css("margin-top"), 10) + parseInt(r.css("margin-bottom"), 10);
            r.css("max-height", n - i + "px")
        },
        preloadNearbyImages: function () {
            var t = [],
                n, r = this,
                i;
            t.push(r.getIndex(r.current + 1));
            t.push(r.getIndex(r.current + 2));
            t.push(r.getIndex(r.current + 3));
            t.push(r.getIndex(r.current - 1));
            t.push(r.getIndex(r.current - 2));
            t.push(r.getIndex(r.current - 3));
            for (var s = t.length - 1; s >= 0; s--) {
                if (r.dataArray[t[s]].type === "isImage") {
                    i = r.dataArray[t[s]].src;
                    n = new Image;
                    if (e('<img src="' + i + '">').is("img:uncached")) {
                        n.src = i
                    }
                }
            }
        }
    };
    var u = {
        _init: function (t, n) {
            var r = this;
            r.current = 0;
            r.obj = n;
            r.$obj = e(n);
            r._createMarkup();
            r._events()
        },
        _createMarkup: function () {
            var t = this,
                n, r;
            t.$ul = t.$obj.children(".cbp-slider-wrap");
            t.$li = t.$ul.children(".cbp-slider-item");
            t.$li.eq(0).addClass("cbp-slider-item-current");
            t.$liLength = t.$li.length;
            n = e("<div/>", {
                "class": "cbp-slider-arrowWrap"
            }).appendTo(t.$obj);
            e("<div/>", {
                "class": "cbp-slider-arrowNext",
                "data-action": "nextItem"
            }).appendTo(n);
            e("<div/>", {
                "class": "cbp-slider-arrowPrev",
                "data-action": "prevItem"
            }).appendTo(n);
            r = e("<div/>", {
                "class": "cbp-slider-bulletWrap"
            }).appendTo(t.$obj);
            for (var i = 0; i < t.$liLength; i++) {
                var s = i === 0 ? " cbp-slider-bullet-current" : "";
                e("<div/>", {
                    "class": "cbp-slider-bullet" + s,
                    "data-action": "jumpToItem"
                }).appendTo(r)
            }
        },
        _events: function () {
            var t = this;
            t.$obj.on("click" + s, function (n) {
                var r = e(n.target).attr("data-action");
                if (t[r]) {
                    t[r](n);
                    n.preventDefault()
                }
            })
        },
        nextItem: function () {
            this.jumpTo(1)
        },
        prevItem: function () {
            this.jumpTo(-1)
        },
        jumpToItem: function (t) {
            var n = e(t.target);
            var r = n.index();
            this.jumpTo(r - this.current)
        },
        jumpTo: function (t) {
            var n = this,
                r, i = this.$li.eq(this.current);
            this.current = this.getIndex(this.current + t);
            r = this.$li.eq(this.current);
            r.addClass("cbp-slider-item-next");
            r.animate({
                opacity: 1
            }, function () {
                i.removeClass("cbp-slider-item-current");
                r.removeClass("cbp-slider-item-next").addClass("cbp-slider-item-current").removeAttr("style");
                var t = e(".cbp-slider-bullet");
                t.removeClass("cbp-slider-bullet-current");
                t.eq(n.current).addClass("cbp-slider-bullet-current")
            })
        },
        getIndex: function (e) {
            e = e % this.$liLength;
            if (e < 0) {
                e = this.$liLength + e
            }
            return e
        }
    };
    var a = {
        _main: function (t, n, r) {
            var i = this;
            i.styleQueue = [];
            i.isAnimating = false;
            i.defaultFilter = "*";
            i.registeredEvents = [];
            if (e.isFunction(r)) {
                i._registerEvent("initFinish", r, true)
            }
            i.options = e.extend({}, e.fn.cubeportfolio.options, n);
            i.obj = t;
            i.$obj = e(t);
            i.width = i.$obj.width();
            i.$obj.addClass("cbp cbp-loading");
            i.$ul = i.$obj.children();
            i.$ul.addClass("cbp-wrapper");
            if (i.options.displayType === "lazyLoading" || i.options.displayType === "fadeIn") {
                i.$ul.css({
                    opacity: 0
                })
            }
            if (i.options.displayType === "fadeInToTop") {
                i.$ul.css({
                    opacity: 0,
                    marginTop: 30
                })
            }
            i._browserInfo();
            i._initCSSandEvents();
            i._prepareBlocks();
            if (i.options.displayType === "lazyLoading" || i.options.displayType === "sequentially" || i.options.displayType === "bottomToTop" || i.options.displayType === "fadeInToTop") {
                i._load()
            } else {
                i._beforeDisplay()
            }
        },
        _browserInfo: function () {
            var e = this,
                n = navigator.appVersion,
                r, i;
            if (n.indexOf("MSIE 8.") !== -1) {
                e.browser = "ie8"
            } else if (n.indexOf("MSIE 9.") !== -1) {
                e.browser = "ie9"
            } else if (n.indexOf("MSIE 10.") !== -1) {
                e.browser = "ie10"
            } else if (t.ActiveXObject || "ActiveXObject" in t) {
                e.browser = "ie11"
            } else if (/android/gi.test(n)) {
                e.browser = "android"
            } else if (/iphone|ipad|ipod/gi.test(n)) {
                e.browser = "ios"
            } else if (/chrome/gi.test(n)) {
                e.browser = "chrome"
            } else {
                e.browser = ""
            } if (e.browser) {
                e.$obj.addClass("cbp-" + e.browser)
            }
            r = e._styleSupport("transition");
            i = e._styleSupport("animation");
            e.transition = e.transitionByFilter = r ? "css" : "animate";
            if (e.transition == "animate") return;
            e.transitionEnd = {
                WebkitTransition: "webkitTransitionEnd",
                MozTransition: "transitionend",
                OTransition: "oTransitionEnd otransitionend",
                transition: "transitionend"
            }[r];
            e.animationEnd = {
                WebkitAnimation: "webkitAnimationEnd",
                MozAnimation: "Animationend",
                OAnimation: "oAnimationEnd oanimationend",
                animation: "animationend"
            }[i];
            e.supportCSSTransform = e._styleSupport("transform");
            if (e.supportCSSTransform) {
                e._cssHooks()
            }
        },
        _styleSupport: function (e) {
            var t, r, i, s = e.charAt(0).toUpperCase() + e.slice(1),
                o = ["Moz", "Webkit", "O", "ms"],
                u = n.createElement("div");
            if (e in u.style) {
                r = e
            } else {
                for (i = o.length - 1; i >= 0; i--) {
                    t = o[i] + s;
                    if (t in u.style) {
                        r = t;
                        break
                    }
                }
            }
            u = null;
            return r
        },
        _cssHooks: function () {
            function r(r, i, s) {
                var o = e(r),
                    u = o.data("transformFn") || {},
                    a = {},
                    f, l = {},
                    c, h, p, d, v;
                a[s] = i;
                e.extend(u, a);
                for (f in u) {
                    c = u[f];
                    l[f] = n[f](c)
                }
                h = l.translate || "";
                p = l.scale || "";
                v = l.skew || "";
                d = h + p + v;
                o.data("transformFn", u);
                r.style[t.supportCSSTransform] = d
            }
            var t = this,
                n;
            if (t._has3d()) {
                n = {
                    translate: function (e) {
                        return "translate3d(" + e[0] + "px, " + e[1] + "px, 0) "
                    },
                    scale: function (e) {
                        return "scale3d(" + e + ", " + e + ", 1) "
                    },
                    skew: function (e) {
                        return "skew(" + e[0] + "deg, " + e[1] + "deg) "
                    }
                }
            } else {
                n = {
                    translate: function (e) {
                        return "translate(" + e[0] + "px, " + e[1] + "px) "
                    },
                    scale: function (e) {
                        return "scale(" + e + ") "
                    },
                    skew: function (e) {
                        return "skew(" + e[0] + "deg, " + e[1] + "deg) "
                    }
                }
            }
            e.cssNumber.scale = true;
            e.cssHooks.scale = {
                set: function (e, t) {
                    if (typeof t === "string") {
                        t = parseFloat(t)
                    }
                    r(e, t, "scale")
                },
                get: function (t, n) {
                    var r = e.data(t, "transformFn");
                    return r && r.scale ? r.scale : 1
                }
            };
            e.fx.step.scale = function (t) {
                e.cssHooks.scale.set(t.elem, t.now + t.unit)
            };
            e.cssNumber.translate = true;
            e.cssHooks.translate = {
                set: function (e, t) {
                    r(e, t, "translate")
                },
                get: function (t, n) {
                    var r = e.data(t, "transformFn");
                    return r && r.translate ? r.translate : [0, 0]
                }
            };
            e.cssNumber.skew = true;
            e.cssHooks.skew = {
                set: function (e, t) {
                    r(e, t, "skew")
                },
                get: function (t, n) {
                    var r = e.data(t, "transformFn");
                    return r && r.skew ? r.skew : [0, 0]
                }
            }
        },
        _has3d: function () {
            var e = n.createElement("p"),
                i, s = {
                    webkitTransform: "-webkit-transform",
                    OTransform: "-o-transform",
                    msTransform: "-ms-transform",
                    MozTransform: "-moz-transform",
                    transform: "transform"
                };
            n.body.insertBefore(e, null);
            for (var o in s) {
                if (e.style[o] !== r) {
                    e.style[o] = "translate3d(1px,1px,1px)";
                    i = t.getComputedStyle(e).getPropertyValue(s[o])
                }
            }
            n.body.removeChild(e);
            return i !== r && i.length > 0 && i !== "none"
        },
        _prepareBlocks: function () {
            var e = this,
                t;
            e.blocks = e.$ul.children(".cbp-item");
            e.blocksAvailable = e.blocks;
            e.blocks.wrapInner('<div class="cbp-item-wrapper"></div>');
            if (e.options.caption) {
                e._captionInit()
            }
        },
        _captionInit: function () {
            var e = this;
            e.$obj.addClass("cbp-caption-" + e.options.caption);
            e["_" + e.options.caption + "Caption"]()
        },
        _captionDestroy: function () {
            var e = this;
            e.$obj.removeClass("cbp-caption-" + e.options.caption);
            e["_" + e.options.caption + "CaptionDestroy"]()
        },
        _noneCaption: function () {},
        _noneCaptionDestroy: function () {},
        _pushTopCaption: function () {
            var t = this;
            if (t.browser === "ie8" || t.browser === "ie9") {
                e(".cbp-caption").on("mouseenter" + s, function () {
                    var t = e(this),
                        n = t.find(".cbp-caption-defaultWrap"),
                        r = t.find(".cbp-caption-activeWrap");
                    n.animate({
                        bottom: "100%"
                    }, "fast");
                    r.animate({
                        bottom: 0
                    }, "fast")
                }).on("mouseleave" + s, function (t) {
                    var n = e(this),
                        r = n.find(".cbp-caption-defaultWrap"),
                        i = n.find(".cbp-caption-activeWrap");
                    r.animate({
                        bottom: 0
                    }, "fast");
                    i.animate({
                        bottom: "-100%"
                    }, "fast")
                })
            }
        },
        _pushTopCaptionDestroy: function () {
            var t = this;
            if (t.browser === "ie8" || t.browser === "ie9") {
                e(".cbp-caption").off("mouseenter" + s + " mouseleave" + s);
                e(".cbp-caption").find(".cbp-caption-defaultWrap").removeAttr("style");
                e(".cbp-caption").find(".cbp-caption-activeWrap").removeAttr("style")
            }
        },
        _pushDownCaption: function () {
            var t = this;
            if (t.browser === "ie8" || t.browser === "ie9") {
                e(".cbp-caption").on("mouseenter" + s, function () {
                    var t = e(this),
                        n = t.find(".cbp-caption-defaultWrap"),
                        r = t.find(".cbp-caption-activeWrap");
                    n.animate({
                        bottom: "-100%"
                    }, "fast");
                    r.animate({
                        bottom: 0
                    }, "fast")
                }).on("mouseleave" + s, function (t) {
                    var n = e(this),
                        r = n.find(".cbp-caption-defaultWrap"),
                        i = n.find(".cbp-caption-activeWrap");
                    r.animate({
                        bottom: 0
                    }, "fast");
                    i.animate({
                        bottom: "100%"
                    }, "fast")
                })
            }
        },
        _pushDownCaptionDestroy: function () {
            var t = this;
            if (t.browser === "ie8" || t.browser === "ie9") {
                e(".cbp-caption").off("mouseenter" + s + " mouseleave" + s);
                e(".cbp-caption").find(".cbp-caption-defaultWrap").removeAttr("style");
                e(".cbp-caption").find(".cbp-caption-activeWrap").removeAttr("style")
            }
        },
        _revealBottomCaption: function () {
            var t = this;
            if (t.browser === "ie8" || t.browser === "ie9") {
                e(".cbp-caption").on("mouseenter" + s, function () {
                    var t = e(this),
                        n = t.find(".cbp-caption-defaultWrap");
                    n.animate({
                        bottom: "100%"
                    }, "fast")
                }).on("mouseleave" + s, function (t) {
                    var n = e(this),
                        r = n.find(".cbp-caption-defaultWrap");
                    r.animate({
                        bottom: 0
                    }, "fast")
                })
            }
        },
        _revealBottomCaptionDestroy: function () {
            var t = this;
            if (t.browser === "ie8" || t.browser === "ie9") {
                e(".cbp-caption").off("mouseenter" + s + " mouseleave" + s);
                e(".cbp-caption").find(".cbp-caption-defaultWrap").removeAttr("style")
            }
        },
        _revealTopCaption: function () {
            var t = this;
            if (t.browser === "ie8" || t.browser === "ie9") {
                e(".cbp-caption").on("mouseenter" + s, function () {
                    var t = e(this),
                        n = t.find(".cbp-caption-defaultWrap");
                    n.animate({
                        bottom: "-100%"
                    }, "fast")
                }).on("mouseleave" + s, function (t) {
                    var n = e(this),
                        r = n.find(".cbp-caption-defaultWrap");
                    r.animate({
                        bottom: 0
                    }, "fast")
                })
            }
        },
        _revealTopCaptionDestroy: function () {
            var t = this;
            if (t.browser === "ie8" || t.browser === "ie9") {
                e(".cbp-caption").off("mouseenter" + s + " mouseleave" + s);
                e(".cbp-caption").find(".cbp-caption-defaultWrap").removeAttr("style")
            }
        },
        _overlayBottomRevealCaption: function () {
            var t = this;
            if (t.browser === "ie8" || t.browser === "ie9") {
                e(".cbp-caption").on("mouseenter" + s, function () {
                    var t = e(this),
                        n = t.find(".cbp-caption-defaultWrap"),
                        r = t.find(".cbp-caption-activeWrap").height();
                    n.animate({
                        bottom: r
                    }, "fast")
                }).on("mouseleave" + s, function (t) {
                    var n = e(this),
                        r = n.find(".cbp-caption-defaultWrap");
                    r.animate({
                        bottom: 0
                    }, "fast")
                })
            }
        },
        _overlayBottomRevealCaptionDestroy: function () {
            var t = this;
            if (t.browser === "ie8" || t.browser === "ie9") {
                e(".cbp-caption").off("mouseenter" + s + " mouseleave" + s);
                e(".cbp-caption").find(".cbp-caption-defaultWrap").removeAttr("style")
            }
        },
        _overlayBottomPushCaption: function () {
            var t = this;
            if (t.browser === "ie8" || t.browser === "ie9") {
                e(".cbp-caption").on("mouseenter" + s, function () {
                    var t = e(this),
                        n = t.find(".cbp-caption-defaultWrap"),
                        r = t.find(".cbp-caption-activeWrap"),
                        i = r.height();
                    n.animate({
                        bottom: i
                    }, "fast");
                    r.animate({
                        bottom: 0
                    }, "fast")
                }).on("mouseleave" + s, function (t) {
                    var n = e(this),
                        r = n.find(".cbp-caption-defaultWrap"),
                        i = n.find(".cbp-caption-activeWrap"),
                        s = i.height();
                    r.animate({
                        bottom: 0
                    }, "fast");
                    i.animate({
                        bottom: -s
                    }, "fast")
                })
            }
        },
        _overlayBottomPushCaptionDestroy: function () {
            var t = this;
            if (t.browser === "ie8" || t.browser === "ie9") {
                e(".cbp-caption").off("mouseenter" + s + " mouseleave" + s);
                e(".cbp-caption").find(".cbp-caption-defaultWrap").removeAttr("style");
                e(".cbp-caption").find(".cbp-caption-activeWrap").removeAttr("style")
            }
        },
        _overlayBottomCaption: function () {
            var t = this;
            if (t.browser === "ie8" || t.browser === "ie9") {
                e(".cbp-caption").on("mouseenter" + s, function () {
                    e(this).find(".cbp-caption-activeWrap").animate({
                        bottom: 0
                    }, "fast")
                }).on("mouseleave" + s, function (t) {
                    var n = e(this).find(".cbp-caption-activeWrap");
                    n.animate({
                        bottom: -n.height()
                    }, "fast")
                })
            }
        },
        _overlayBottomCaptionDestroy: function () {
            var t = this;
            if (t.browser === "ie8" || t.browser === "ie9") {
                e(".cbp-caption").off("mouseenter" + s + " mouseleave" + s);
                e(".cbp-caption").find(".cbp-caption-activeWrap").removeAttr("style")
            }
        },
        _moveRightCaption: function () {
            var t = this;
            if (t.browser === "ie8" || t.browser === "ie9") {
                e(".cbp-caption").on("mouseenter" + s, function () {
                    e(this).find(".cbp-caption-activeWrap").animate({
                        left: 0
                    }, "fast")
                }).on("mouseleave" + s, function () {
                    var t = e(this).find(".cbp-caption-activeWrap");
                    t.animate({
                        left: -t.width()
                    }, "fast")
                })
            }
        },
        _moveRightCaptionDestroy: function () {
            var t = this;
            if (t.browser === "ie8" || t.browser === "ie9") {
                e(".cbp-caption").off("mouseenter" + s + " mouseleave" + s);
                e(".cbp-caption").find(".cbp-caption-activeWrap").removeAttr("style")
            }
        },
        _revealLeftCaption: function () {
            var t = this;
            if (t.browser === "ie8" || t.browser === "ie9") {
                e(".cbp-caption").on("mouseenter" + s, function () {
                    e(this).find(".cbp-caption-activeWrap").animate({
                        left: 0
                    }, "fast")
                }).on("mouseleave" + s, function () {
                    var t = e(this).find(".cbp-caption-activeWrap");
                    t.animate({
                        left: t.width()
                    }, "fast")
                })
            }
        },
        _revealLeftCaptionDestroy: function () {
            var t = this;
            if (t.browser === "ie8" || t.browser === "ie9") {
                e(".cbp-caption").off("mouseenter" + s + " mouseleave" + s);
                e(".cbp-caption").find(".cbp-caption-activeWrap").removeAttr("style")
            }
        },
        _minimalCaption: function () {
            var e = this
        },
        _minimalCaptionDestroy: function () {
            var e = this
        },
        _fadeInCaption: function () {
            var t = this,
                n;
            if (t.browser === "ie8" || t.browser === "ie9") {
                n = t.browser === "ie9" ? 1 : .8;
                e(".cbp-caption").on("mouseenter" + s, function () {
                    e(this).find(".cbp-caption-activeWrap").animate({
                        opacity: n
                    }, "fast")
                }).on("mouseleave" + s, function () {
                    e(this).find(".cbp-caption-activeWrap").animate({
                        opacity: 0
                    }, "fast")
                })

            }
        },
        _fadeInCaptionDestroy: function () {
            var t = this;
            if (t.browser === "ie8" || t.browser === "ie9") {
                e(".cbp-caption").off("mouseenter" + s + " mouseleave" + s);
                e(".cbp-caption").find(".cbp-caption-activeWrap").removeAttr("style")
            }
        },
        _overlayRightAlongCaption: function () {
            var t = this;
            if (t.browser === "ie8" || t.browser === "ie9") {
                e(".cbp-caption").on("mouseenter" + s, function () {
                    var t = e(this),
                        n = t.find(".cbp-caption-defaultWrap"),
                        r = t.find(".cbp-caption-activeWrap");
                    n.animate({
                        left: r.width() / 2
                    }, "fast");
                    r.animate({
                        left: 0
                    }, "fast")
                }).on("mouseleave" + s, function (t) {
                    var n = e(this),
                        r = n.find(".cbp-caption-defaultWrap"),
                        i = n.find(".cbp-caption-activeWrap");
                    r.animate({
                        left: 0
                    }, "fast");
                    i.animate({
                        left: -i.width()
                    }, "fast")
                })
            }
        },
        _overlayRightAlongCaptionDestroy: function () {
            var t = this;
            if (t.browser === "ie8" || t.browser === "ie9") {
                e(".cbp-caption").off("mouseenter" + s + " mouseleave" + s);
                e(".cbp-caption").find(".cbp-caption-defaultWrap").removeAttr("style");
                e(".cbp-caption").find(".cbp-caption-activeWrap").removeAttr("style")
            }
        },
        _overlayBottomAlongCaption: function () {
            var t = this;
            if (t.browser === "ie8" || t.browser === "ie9") {
                e(".cbp-caption").on("mouseenter" + s, function () {
                    var t = e(this),
                        n = t.find(".cbp-caption-defaultWrap"),
                        r = t.find(".cbp-caption-activeWrap");
                    n.animate({
                        bottom: r.height() / 2
                    }, "fast");
                    r.animate({
                        bottom: 0
                    }, "fast")
                }).on("mouseleave" + s, function (t) {
                    var n = e(this),
                        r = n.find(".cbp-caption-defaultWrap"),
                        i = n.find(".cbp-caption-activeWrap");
                    r.animate({
                        bottom: 0
                    }, "fast");
                    i.animate({
                        bottom: -i.height()
                    }, "fast")
                })
            }
        },
        _overlayBottomAlongCaptionDestroy: function () {
            var t = this;
            if (t.browser === "ie8" || t.browser === "ie9") {
                e(".cbp-caption").off("mouseenter" + s + " mouseleave" + s);
                e(".cbp-caption").find(".cbp-caption-defaultWrap").removeAttr("style");
                e(".cbp-caption").find(".cbp-caption-activeWrap").removeAttr("style")
            }
        },
        _zoomCaption: function () {
            var t = this,
                n;
            if (t.browser === "ie8" || t.browser === "ie9") {
                n = t.browser === "ie9" ? 1 : .8;
                e(".cbp-caption").on("mouseenter" + s, function () {
                    e(this).find(".cbp-caption-activeWrap").animate({
                        opacity: n
                    }, "fast")
                }).on("mouseleave" + s, function () {
                    e(this).find(".cbp-caption-activeWrap").animate({
                        opacity: 0
                    }, "fast")
                })
            }
        },
        _zoomCaptionDestroy: function () {
            var t = this;
            if (t.browser === "ie8" || t.browser === "ie9") {
                e(".cbp-caption").off("mouseenter" + s + " mouseleave" + s);
                e(".cbp-caption").find(".cbp-caption-activeWrap").removeAttr("style")
            }
        },
        _initCSSandEvents: function () {
            var n = this,
                i, o, u, a;
            e(t).on("resize" + s, function () {
                if (i) {
                    clearTimeout(i)
                }
                i = setTimeout(function () {
                    if (n.browser === "ie8") {
                        a = e(t).width();
                        if (u === r || u != a) {
                            u = a
                        } else {
                            return
                        }
                    }
                    n.$obj.removeClass("cbp-no-transition cbp-appendItems-loading");
                    if (n.options.gridAdjustment === "responsive") {
                        n._responsiveLayout()
                    }
                    n._layout();
                    n._processStyle(n.transition);
                    n._resizeMainContainer(n.transition);
                    if (n.lightbox) {
                        n.lightbox.resizeImage()
                    }
                    if (n.singlePage) {
                        if (n.singlePage.options.singlePageStickyNavigation) {
                            o = n.singlePage.wrap[0].clientWidth;
                            if (o > 0) {
                                n.singlePage.navigationWrap.width(o);
                                n.singlePage.navigation.width(o)
                            }
                        }
                    }
                    if (n.singlePageInline && n.singlePageInline.isOpen) {
                        n.singlePageInline.close()
                    }
                }, 50)
            })
        },
        _load: function () {
            var t = this,
                n = [],
                r, i, o, u, a = /url\((['"]?)(.*?)\1\)/g;
            o = t.$obj.children().css("backgroundImage");
            if (o) {
                var f;
                while (f = a.exec(o)) {
                    n.push({
                        src: f[2]
                    })
                }
            }
            t.$obj.find("*").each(function () {
                var t = e(this);
                if (t.is("img:uncached")) {
                    n.push({
                        src: t.attr("src"),
                        element: t[0]
                    })
                }
                o = t.css("backgroundImage");
                if (o) {
                    var r;
                    while (r = a.exec(o)) {
                        n.push({
                            src: r[2],
                            element: t[0]
                        })
                    }
                }
            });
            var l = n.length,
                c = 0;
            if (l === 0) {
                t._beforeDisplay()
            }
            var h = function () {
                c++;
                if (c == l) {
                    t._beforeDisplay();
                    return false
                }
            };
            for (r = 0; r < l; r++) {
                i = new Image;
                e(i).on("load" + s + " error" + s, h);
                i.src = n[r].src
            }
        },
        _beforeDisplay: function () {
            var e = this;
            if (e.options.animationType) {
                if (e["_" + e.options.animationType + "Init"]) {
                    e["_" + e.options.animationType + "Init"]()
                }
                e.$obj.addClass("cbp-animation-" + e.options.animationType);
                e.localColumnWidth = e.blocks.eq(0).outerWidth() + e.options.gapVertical;
                if (e.options.defaultFilter === "" || e.options.defaultFilter === "*") {
                    e._display()
                } else {
                    e.filter(e.options.defaultFilter, function () {
                        e._display()
                    }, e)
                }
            }
        },
        _display: function () {
            var e = this,
                t, n;
            if (e.options.gridAdjustment === "responsive") {
                e._responsiveLayout()
            }
            e._layout();
            e._processStyle("css");
            e._resizeMainContainer("css");
            if (e.options.displayType === "lazyLoading" || e.options.displayType === "fadeIn") {
                e.$ul.animate({
                    opacity: 1
                }, e.options.displayTypeSpeed)
            }
            if (e.options.displayType === "fadeInToTop") {
                e.$ul.animate({
                    opacity: 1,
                    marginTop: 0
                }, e.options.displayTypeSpeed)
            }
            if (e.options.displayType === "sequentially") {
                t = 0;
                e.blocks.css("opacity", 0);
                (function r() {
                    n = e.blocksAvailable.eq(t++);
                    if (n.length) {
                        n.animate({
                            opacity: 1
                        });
                        setTimeout(r, e.options.displayTypeSpeed)
                    }
                })()
            }
            if (e.options.displayType === "bottomToTop") {
                t = 0;
                e.blocks.css({
                    opacity: 0,
                    marginTop: 80
                });
                (function i() {
                    n = e.blocksAvailable.eq(t++);
                    if (n.length) {
                        n.animate({
                            opacity: 1,
                            marginTop: 0
                        }, 400);
                        setTimeout(i, e.options.displayTypeSpeed)
                    }
                })()
            }
            setTimeout(function () {
                e.$obj.removeClass("cbp-loading");
                e._triggerEvent("initFinish");
                e.$obj.trigger("initComplete");
                e.$obj.addClass("cbp-ready")
            }, 0);
            e.lightbox = null;
            if (e.$obj.find(e.options.lightboxDelegate)) {
                e.lightbox = Object.create(o);
                e.lightbox.init(e, "lightbox");
                e.$obj.on("click" + s, e.options.lightboxDelegate, function (t) {
                    e.lightbox.openLightbox(e.blocksAvailable, this);
                    t.preventDefault()
                })
            }
            e.singlePage = null;
            if (e.$obj.find(e.options.singlePageDelegate)) {
                e.singlePage = Object.create(o);
                e.singlePage.init(e, "singlePage");
                e.$obj.on("click" + s, e.options.singlePageDelegate, function (t) {
                    t.preventDefault();
                    e.singlePage.openSinglePage(e.blocksAvailable, this)
                })
            }
            e.singlePageInline = null;
            if (e.$obj.find(e.options.singlePageInlineDelegate)) {
                e.singlePageInline = Object.create(o);
                e.singlePageInline.init(e, "singlePageInline");
                e.$obj.on("click" + s, e.options.singlePageInlineDelegate, function (t) {
                    e.singlePageInline.openSinglePageInline(e.blocksAvailable, this);
                    t.preventDefault()
                })
            }
        },
        _layout: function () {
            var t = this;
            t._layoutReset();
            t.blocksAvailable.each(function (n, r) {
                var i = e(r),
                    s = Math.ceil(i.outerWidth() / t.localColumnWidth),
                    o = 0;
                s = Math.min(s, t.cols);
                if (t.singlePageInline && n >= t.singlePageInline.matrice[0] && n <= t.singlePageInline.matrice[1]) {
                    o = t.singlePageInline.height
                }
                if (s === 1) {
                    t._placeBlocks(i, t.colVert, o)
                } else {
                    var u = t.cols + 1 - s,
                        a = [],
                        f, l;
                    for (l = 0; l < u; l++) {
                        f = t.colVert.slice(l, l + s);
                        a[l] = Math.max.apply(Math, f)
                    }
                    t._placeBlocks(i, a, o)
                }
            })
        },
        _layoutReset: function () {
            var e, t = this,
                n;
            if (t.options.gridAdjustment === "alignCenter") {
                t.$obj.attr("style", "");
                t.width = t.$obj.width();
                t.cols = Math.max(Math.floor((t.width + t.options.gapVertical) / t.localColumnWidth), 1);
                t.width = t.cols * t.localColumnWidth - t.options.gapVertical;
                t.$obj.css("max-width", t.width)
            } else {
                t.width = t.$obj.width();
                t.cols = Math.max(Math.floor((t.width + t.options.gapVertical) / t.localColumnWidth), 1)
            }
            t.colVert = [];
            e = t.cols;
            while (e--) {
                t.colVert.push(0)
            }
        },
        _responsiveLayout: function () {
            var t = this,
                n, r;
            if (!t.columnWidthCache) {
                t.columnWidthCache = t.localColumnWidth
            } else {
                t.localColumnWidth = t.columnWidthCache
            }
            t.width = t.$obj.width() + t.options.gapVertical;
            t.cols = Math.max(Math.floor(t.width / t.localColumnWidth), 1);
            r = t.width % t.localColumnWidth;
            if (r / t.localColumnWidth > .5) {
                t.localColumnWidth = t.localColumnWidth - (t.localColumnWidth - r) / (t.cols + 1)
            } else {
                t.localColumnWidth = t.localColumnWidth + r / t.cols
            }
            t.localColumnWidth = parseInt(t.localColumnWidth, 10);
            n = t.localColumnWidth / t.columnWidthCache;
            t.blocks.each(function (r, i) {
                var s = e(this),
                    o = e.data(this, "cbp-wxh");
                if (!o) {
                    o = e.data(this, "cbp-wxh", {
                        width: s.outerWidth(),
                        height: s.outerHeight()
                    })
                }
                s.css("width", t.localColumnWidth - t.options.gapVertical);
                s.css("height", Math.floor(o.height * n))
            });
            if (t.blocksClone) {
                t.blocksClone.each(function (r, i) {
                    var s = e(this),
                        o = e.data(this, "cbp-wxh");
                    if (!o) {
                        o = e.data(this, "cbp-wxh", {
                            width: s.outerWidth(),
                            height: s.outerHeight()
                        })
                    }
                    s.css("width", t.localColumnWidth - t.options.gapVertical);
                    s.css("height", Math.floor(o.height * n))
                })
            }
        },
        _resizeMainContainer: function (e, t) {
            var n = this;
            t = t || 0;
            n.height = Math.max.apply(Math, n.colVert) + t;
            n.$obj[e]({
                height: n.height - n.options.gapHorizontal
            }, 400)
        },
        _processStyle: function (e) {
            var t = this;
            for (var n = t.styleQueue.length - 1; n >= 0; n--) {
                t.styleQueue[n].$el[e](t.styleQueue[n].style)
            }
            t.styleQueue = []
        },
        _placeBlocks: function (e, t, n) {
            var r = this,
                i = Math.min.apply(Math, t),
                s = 0,
                o, u, a, f, l, c;
            for (l = 0, c = t.length; l < c; l++) {
                if (t[l] === i) {
                    s = l;
                    break
                }
            }
            if (r.singlePageInline && n !== 0) {
                r.singlePageInline.top = i
            }
            i += n;
            o = Math.round(r.localColumnWidth * s);
            u = Math.round(i);
            r.styleQueue.push({
                $el: e,
                style: r.supportCSSTransform ? r._withCSS3(o, u) : r._withCSS2(o, u)
            });
            a = i + e.outerHeight() + r.options.gapHorizontal;
            f = r.cols + 1 - c;
            for (l = 0; l < f; l++) {
                r.colVert[s + l] = a
            }
        },
        _withCSS2: function (e, t) {
            return {
                left: e,
                top: t
            }
        },
        _withCSS3: function (e, t) {
            return {
                translate: [e, t]
            }
        },
        _duplicateContent: function (e) {
            var t = this;
            t.$ulClone = t.$ul.clone();
            t.blocksClone = t.$ulClone.children();
            t.$ulClone.css(e);
            t.ulHidden = "clone";
            t.$obj.append(t.$ulClone)
        },
        _fadeOutFilter: function (e, t, n) {
            var r = this;
            if (n !== "*") {
                t = t.filter(n);
                e = r.blocks.not(".cbp-item-hidden").not(n).addClass("cbp-item-hidden")
            }
            t.removeClass("cbp-item-hidden");
            r.blocksAvailable = r.blocks.filter(n);
            if (e.length) {
                r.styleQueue.push({
                    $el: e,
                    style: {
                        opacity: 0
                    }
                })
            }
            if (t.length) {
                r.styleQueue.push({
                    $el: t,
                    style: {
                        opacity: 1
                    }
                })
            }
            r._layout();
            r._processStyle(r.transitionByFilter);
            r._resizeMainContainer(r.transition);
            setTimeout(function () {
                r._filterFinish()
            }, 400)
        },
        _quicksandFilter: function (e, t, n) {
            var r = this;
            if (n !== "*") {
                t = t.filter(n);
                e = r.blocks.not(".cbp-item-hidden").not(n).addClass("cbp-item-hidden")
            }
            t.removeClass("cbp-item-hidden");
            r.blocksAvailable = r.blocks.filter(n);
            if (e.length) {
                r.styleQueue.push({
                    $el: e,
                    style: {
                        scale: .01,
                        opacity: 0
                    }
                })
            }
            if (t.length) {
                r.styleQueue.push({
                    $el: t,
                    style: {
                        scale: 1,
                        opacity: 1
                    }
                })
            }
            r._layout();
            r._processStyle(r.transitionByFilter);
            r._resizeMainContainer(r.transition);
            setTimeout(function () {
                r._filterFinish()
            }, 400)
        },
        _flipOutFilter: function (e, t, n) {
            var r = this;
            if (n !== "*") {
                t = t.filter(n);
                e = r.blocks.not(".cbp-item-hidden").not(n).addClass("cbp-item-hidden")
            }
            t.removeClass("cbp-item-hidden");
            r.blocksAvailable = r.blocks.filter(n);
            if (e.length) {
                if (r.browser === "ie8" || r.browser === "ie9") {
                    r.styleQueue.push({
                        $el: e,
                        style: {
                            opacity: 0
                        }
                    })
                } else {
                    e.find(".cbp-item-wrapper").removeClass("cbp-animation-flipOut-in").addClass("cbp-animation-flipOut-out")
                }
            }
            if (t.length) {
                if (r.browser === "ie8" || r.browser === "ie9") {
                    r.styleQueue.push({
                        $el: t,
                        style: {
                            opacity: 1
                        }
                    })
                } else {
                    t.find(".cbp-item-wrapper").removeClass("cbp-animation-flipOut-out").addClass("cbp-animation-flipOut-in")
                }
            }
            r._layout();
            r._processStyle(r.transitionByFilter);
            r._resizeMainContainer(r.transition);
            setTimeout(function () {
                r._filterFinish()
            }, 400)
        },
        _flipBottomFilter: function (e, t, n) {
            var r = this;
            if (n !== "*") {
                t = t.filter(n);
                e = r.blocks.not(".cbp-item-hidden").not(n).addClass("cbp-item-hidden")
            }
            t.removeClass("cbp-item-hidden");
            r.blocksAvailable = r.blocks.filter(n);
            if (e.length) {
                if (r.browser === "ie8" || r.browser === "ie9") {
                    r.styleQueue.push({
                        $el: e,
                        style: {
                            opacity: 0
                        }
                    })
                } else {
                    e.find(".cbp-item-wrapper").removeClass("cbp-animation-flipBottom-in").addClass("cbp-animation-flipBottom-out")
                }
            }
            if (t.length) {
                if (r.browser === "ie8" || r.browser === "ie9") {
                    r.styleQueue.push({
                        $el: t,
                        style: {
                            opacity: 1
                        }
                    })
                } else {
                    t.find(".cbp-item-wrapper").removeClass("cbp-animation-flipBottom-out").addClass("cbp-animation-flipBottom-in")
                }
            }
            r._layout();
            r._processStyle(r.transitionByFilter);
            r._resizeMainContainer(r.transition);
            setTimeout(function () {
                r._filterFinish()
            }, 400)
        },
        _scaleSidesFilter: function (e, t, n) {
            var r = this;
            if (n !== "*") {
                t = t.filter(n);
                e = r.blocks.not(".cbp-item-hidden").not(n).addClass("cbp-item-hidden")
            }
            t.removeClass("cbp-item-hidden");
            r.blocksAvailable = r.blocks.filter(n);
            if (e.length) {
                if (r.browser === "ie8" || r.browser === "ie9") {
                    r.styleQueue.push({
                        $el: e,
                        style: {
                            opacity: 0
                        }
                    })
                } else {
                    e.find(".cbp-item-wrapper").removeClass("cbp-animation-scaleSides-in").addClass("cbp-animation-scaleSides-out")
                }
            }
            if (t.length) {
                if (r.browser === "ie8" || r.browser === "ie9") {
                    r.styleQueue.push({
                        $el: t,
                        style: {
                            opacity: 1
                        }
                    })
                } else {
                    t.find(".cbp-item-wrapper").removeClass("cbp-animation-scaleSides-out").addClass("cbp-animation-scaleSides-in")
                }
            }
            r._layout();
            r._processStyle(r.transitionByFilter);
            r._resizeMainContainer(r.transition);
            setTimeout(function () {
                r._filterFinish()
            }, 400)
        },
        _skewFilter: function (e, t, n) {
            var r = this;
            if (n !== "*") {
                t = t.filter(n);
                e = r.blocks.not(".cbp-item-hidden").not(n).addClass("cbp-item-hidden")
            }
            t.removeClass("cbp-item-hidden");
            r.blocksAvailable = r.blocks.filter(n);
            if (e.length) {
                r.styleQueue.push({
                    $el: e,
                    style: {
                        skew: [50, 0],
                        scale: .01,
                        opacity: 0
                    }
                })
            }
            if (t.length) {
                r.styleQueue.push({
                    $el: t,
                    style: {
                        skew: [0, 0],
                        scale: 1,
                        opacity: 1
                    }
                })
            }
            r._layout();
            r._processStyle(r.transitionByFilter);
            r._resizeMainContainer(r.transition);
            setTimeout(function () {
                r._filterFinish()
            }, 400)
        },
        _sequentiallyInit: function () {
            this.transitionByFilter = "css"
        },
        _sequentiallyFilter: function (e, t, n) {
            var r = this,
                i = r.blocks,
                s = r.blocksAvailable;
            r.blocksAvailable = r.blocks.filter(n);
            r.$obj.addClass("cbp-no-transition");
            if (r.browser === "ie8" || r.browser === "ie9") {
                s[r.transition]({
                    top: "-=30",
                    opacity: 0
                }, 300)
            } else {
                s[r.transition]({
                    top: -30,
                    opacity: 0
                })
            }
            setTimeout(function () {
                if (n !== "*") {
                    t = t.filter(n);
                    e = r.blocks.not(".cbp-item-hidden").not(n).addClass("cbp-item-hidden")
                }
                t.removeClass("cbp-item-hidden");
                if (e.length) {
                    e.css({
                        display: "none"
                    })
                }
                if (t.length) {
                    t.css("display", "block")
                }
                r._layout();
                r._processStyle(r.transitionByFilter);
                r._resizeMainContainer(r.transition);
                if (r.browser === "ie8" || r.browser === "ie9") {
                    r.blocksAvailable.css("top", "-=30")
                }
                var i = 0,
                    s;
                (function o() {
                    s = r.blocksAvailable.eq(i++);
                    if (s.length) {
                        if (r.browser === "ie8" || r.browser === "ie9") {
                            s[r.transition]({
                                top: "+=30",
                                opacity: 1
                            })
                        } else {
                            s[r.transition]({
                                top: 0,
                                opacity: 1
                            })
                        }
                        setTimeout(o, 130)
                    } else {
                        setTimeout(function () {
                            r._filterFinish()
                        }, 600)
                    }
                })()
            }, 600)
        },
        _fadeOutTopInit: function () {
            this.transitionByFilter = "css"
        },
        _fadeOutTopFilter: function (e, t, n) {
            var r = this;
            r.blocksAvailable = r.blocks.filter(n);
            if (r.browser === "ie8" || r.browser === "ie9") {
                r.$ul[r.transition]({
                    top: -30,
                    opacity: 0
                }, 350)
            } else {
                r.$ul[r.transition]({
                    top: -30,
                    opacity: 0
                })
            }
            r.$obj.addClass("cbp-no-transition");
            setTimeout(function () {
                if (n !== "*") {
                    t = t.filter(n);
                    e = r.blocks.not(".cbp-item-hidden").not(n).addClass("cbp-item-hidden")
                }
                t.removeClass("cbp-item-hidden");
                if (e.length) {
                    e.css("opacity", 0)
                }
                if (t.length) {
                    t.css("opacity", 1)
                }
                r._layout();
                r._processStyle(r.transitionByFilter);
                r._resizeMainContainer(r.transition);
                if (r.browser === "ie8" || r.browser === "ie9") {
                    r.$ul[r.transition]({
                        top: 0,
                        opacity: 1
                    }, 350)
                } else {
                    r.$ul[r.transition]({
                        top: 0,
                        opacity: 1
                    })
                }
                setTimeout(function () {
                    r._filterFinish()
                }, 400)
            }, 400)
        },
        _boxShadowInit: function () {
            var e = this;
            if (e.browser === "ie8" || e.browser === "ie9") {
                e.options.animationType = "fadeOut"
            } else {
                e.blocksAvailable.append('<div class="cbp-animation-boxShadowMask"></div>')
            }
        },
        _boxShadowFilter: function (e, t, n) {
            var r = this;
            if (n !== "*") {
                t = t.filter(n);
                e = r.blocks.not(".cbp-item-hidden").not(n).addClass("cbp-item-hidden")
            }
            t.removeClass("cbp-item-hidden");
            var i = r.blocks.find(".cbp-animation-boxShadowMask");
            i.addClass("cbp-animation-boxShadowShow");
            i.removeClass("cbp-animation-boxShadowActive cbp-animation-boxShadowInactive");
            r.blocksAvailable = r.blocks.filter(n);
            var s = {};
            if (e.length) {
                e.find(".cbp-animation-boxShadowMask").addClass("cbp-animation-boxShadowActive");
                r.styleQueue.push({
                    $el: e,
                    style: {
                        opacity: 0
                    }
                });
                s = e.last()
            }
            if (t.length) {
                t.find(".cbp-animation-boxShadowMask").addClass("cbp-animation-boxShadowInactive");
                r.styleQueue.push({
                    $el: t,
                    style: {
                        opacity: 1
                    }
                });
                s = t.last()
            }
            r._layout();
            if (s.length) {
                s.one(r.transitionEnd, function () {
                    i.removeClass("cbp-animation-boxShadowShow");
                    r._filterFinish()
                })
            } else {
                i.removeClass("cbp-animation-boxShadowShow");
                r._filterFinish()
            }
            r._processStyle(r.transitionByFilter);
            r._resizeMainContainer(r.transition)
        },
        _bounceLeftInit: function () {
            var e = this;
            e._duplicateContent({
                left: "-100%",
                opacity: 0
            });
            e.transitionByFilter = "css";
            e.$ul.addClass("cbp-wrapper-front")
        },
        _bounceLeftFilter: function (e, t, n) {
            var r = this,
                i, s, o;
            r.$obj.addClass("cbp-no-transition");
            if (r.ulHidden === "clone") {
                r.ulHidden = "first";
                i = r.$ulClone;
                o = r.$ul;
                s = r.blocksClone
            } else {
                r.ulHidden = "clone";
                i = r.$ul;
                o = r.$ulClone;
                s = r.blocks
            }
            t = s.filter(".cbp-item-hidden");
            if (n !== "*") {
                t = t.filter(n);
                s.not(".cbp-item-hidden").not(n).addClass("cbp-item-hidden")
            }
            t.removeClass("cbp-item-hidden");
            r.blocksAvailable = s.filter(n);
            r._layout();
            o[r.transition]({
                left: "-100%",
                opacity: 0
            }).removeClass("cbp-wrapper-front").addClass("cbp-wrapper-back");
            i[r.transition]({
                left: 0,
                opacity: 1
            }).addClass("cbp-wrapper-front").removeClass("cbp-wrapper-back");
            r._processStyle(r.transitionByFilter);
            r._resizeMainContainer(r.transition);
            setTimeout(function () {
                r._filterFinish()
            }, 400)
        },
        _bounceTopInit: function () {
            var e = this;
            e._duplicateContent({
                top: "-100%",
                opacity: 0
            });
            e.transitionByFilter = "css";
            e.$ul.addClass("cbp-wrapper-front")
        },
        _bounceTopFilter: function (e, t, n) {
            var r = this,
                i, s, o;
            r.$obj.addClass("cbp-no-transition");
            if (r.ulHidden === "clone") {
                r.ulHidden = "first";
                i = r.$ulClone;
                o = r.$ul;
                s = r.blocksClone
            } else {
                r.ulHidden = "clone";
                i = r.$ul;
                o = r.$ulClone;
                s = r.blocks
            }
            t = s.filter(".cbp-item-hidden");
            if (n !== "*") {
                t = t.filter(n);
                s.not(".cbp-item-hidden").not(n).addClass("cbp-item-hidden")
            }
            t.removeClass("cbp-item-hidden");
            r.blocksAvailable = s.filter(n);
            r._layout();
            o[r.transition]({
                top: "-100%",
                opacity: 0
            }).removeClass("cbp-wrapper-front").addClass("cbp-wrapper-back");
            i[r.transition]({
                top: 0,
                opacity: 1
            }).addClass("cbp-wrapper-front").removeClass("cbp-wrapper-back");
            r._processStyle(r.transitionByFilter);
            r._resizeMainContainer(r.transition);
            setTimeout(function () {
                r._filterFinish()
            }, 400)
        },
        _bounceBottomInit: function () {
            var e = this;
            e._duplicateContent({
                top: "100%",
                opacity: 0
            });
            e.transitionByFilter = "css"
        },
        _bounceBottomFilter: function (e, t, n) {
            var r = this,
                i, s, o;
            r.$obj.addClass("cbp-no-transition");
            if (r.ulHidden === "clone") {
                r.ulHidden = "first";
                i = r.$ulClone;
                o = r.$ul;
                s = r.blocksClone
            } else {
                r.ulHidden = "clone";
                i = r.$ul;
                o = r.$ulClone;
                s = r.blocks
            }
            t = s.filter(".cbp-item-hidden");
            if (n !== "*") {
                t = t.filter(n);
                s.not(".cbp-item-hidden").not(n).addClass("cbp-item-hidden")
            }
            t.removeClass("cbp-item-hidden");
            r.blocksAvailable = s.filter(n);
            r._layout();
            o[r.transition]({
                top: "100%",
                opacity: 0
            }).removeClass("cbp-wrapper-front").addClass("cbp-wrapper-back");
            i[r.transition]({
                top: 0,
                opacity: 1
            }).addClass("cbp-wrapper-front").removeClass("cbp-wrapper-back");
            r._processStyle(r.transitionByFilter);
            r._resizeMainContainer(r.transition);
            setTimeout(function () {
                r._filterFinish()
            }, 400)
        },
        _moveLeftInit: function () {
            var e = this;
            e._duplicateContent({
                left: "100%",
                opacity: 0
            });
            e.$ulClone.addClass("no-trans");
            e.transitionByFilter = "css"
        },
        _moveLeftFilter: function (e, t, n) {
            var r = this,
                i, s, o;
            if (n !== "*") {
                t = t.filter(n);
                e = r.blocks.not(".cbp-item-hidden").not(n).addClass("cbp-item-hidden")
            }
            t.removeClass("cbp-item-hidden");
            r.$obj.addClass("cbp-no-transition");
            if (r.ulHidden === "clone") {
                r.ulHidden = "first";
                i = r.$ulClone;
                o = r.$ul;
                s = r.blocksClone
            } else {
                r.ulHidden = "clone";
                i = r.$ul;
                o = r.$ulClone;
                s = r.blocks
            }
            s.css("opacity", 0);
            s.addClass("cbp-item-hidden");
            r.blocksAvailable = s.filter(n);
            r.blocksAvailable.css("opacity", 1);
            r.blocksAvailable.removeClass("cbp-item-hidden");
            r._layout();
            o[r.transition]({
                left: "-100%",
                opacity: 0
            });
            i.removeClass("no-trans");
            if (r.transition === "css") {
                i[r.transition]({
                    left: 0,
                    opacity: 1
                });
                o.one(r.transitionEnd, function () {
                    o.addClass("no-trans").css({
                        left: "100%",
                        opacity: 0
                    });
                    r._filterFinish()
                })
            } else {
                i[r.transition]({
                    left: 0,
                    opacity: 1
                }, function () {
                    o.addClass("no-trans").css({
                        left: "100%",
                        opacity: 0
                    });
                    r._filterFinish()
                })
            }
            r._processStyle(r.transitionByFilter);
            r._resizeMainContainer(r.transition)
        },
        _slideLeftInit: function () {
            var e = this;
            e._duplicateContent({});
            e.$ul.addClass("cbp-wrapper-front");
            e.$ulClone.css("opacity", 0);
            e.transitionByFilter = "css"
        },
        _slideLeftFilter: function (e, t, n) {
            var r = this,
                i, s, o, u, a, f;
            r.blocks.show();
            r.blocksClone.show();
            if (n !== "*") {
                t = t.filter(n);
                e = r.blocks.not(".cbp-item-hidden").not(n).addClass("cbp-item-hidden")
            }
            t.removeClass("cbp-item-hidden");
            r.$obj.addClass("cbp-no-transition");
            r.blocks.find(".cbp-item-wrapper").removeClass("cbp-animation-slideLeft-out cbp-animation-slideLeft-in");
            r.blocksClone.find(".cbp-item-wrapper").removeClass("cbp-animation-slideLeft-out cbp-animation-slideLeft-in");
            r.$ul.css({
                opacity: 1
            });
            r.$ulClone.css({
                opacity: 1
            });
            if (r.ulHidden === "clone") {
                r.ulHidden = "first";
                u = r.blocks;
                a = r.blocksClone;
                s = r.blocksClone;
                r.$ul.removeClass("cbp-wrapper-front");
                r.$ulClone.addClass("cbp-wrapper-front")
            } else {
                r.ulHidden = "clone";
                u = r.blocksClone;
                a = r.blocks;
                s = r.blocks;
                r.$ul.addClass("cbp-wrapper-front");
                r.$ulClone.removeClass("cbp-wrapper-front")
            }
            s.css("opacity", 0);
            s.addClass("cbp-item-hidden");
            r.blocksAvailable = s.filter(n);
            r.blocksAvailable.css({
                opacity: 1
            });
            r.blocksAvailable.removeClass("cbp-item-hidden");
            r._layout();
            if (r.transition === "css") {
                u.find(".cbp-item-wrapper").addClass("cbp-animation-slideLeft-out");
                a.find(".cbp-item-wrapper").addClass("cbp-animation-slideLeft-in");
                f = u.find(".cbp-item-wrapper").last();
                if (f.length) {
                    f.one(r.animationEnd, function () {
                        r._filterFinish()
                    })
                } else {
                    r._filterFinish()
                }
            } else {
                u.find(".cbp-item-wrapper").animate({
                    left: "-100%"
                }, 400, function () {
                    r._filterFinish()
                });
                a.find(".cbp-item-wrapper").css("left", "100%");
                a.find(".cbp-item-wrapper").animate({
                    left: 0
                }, 400)
            }
            r._processStyle(r.transitionByFilter);
            r._resizeMainContainer("animate")
        },
        _slideDelayInit: function () {
            this._wrapperFilterInit()
        },
        _slideDelayFilter: function (e, t, n) {
            this._wrapperFilter(e, t, n, "slideDelay", true)
        },
        _3dflipInit: function () {
            this._wrapperFilterInit()
        },
        _3dflipFilter: function (e, t, n) {
            this._wrapperFilter(e, t, n, "3dflip", true)
        },
        _rotateSidesInit: function () {
            this._wrapperFilterInit()
        },
        _rotateSidesFilter: function (e, t, n) {
            this._wrapperFilter(e, t, n, "rotateSides", true)
        },
        _flipOutDelayInit: function () {
            this._wrapperFilterInit()
        },
        _flipOutDelayFilter: function (e, t, n) {
            this._wrapperFilter(e, t, n, "flipOutDelay", false)
        },
        _foldLeftInit: function () {
            this._wrapperFilterInit()
        },
        _foldLeftFilter: function (e, t, n) {
            this._wrapperFilter(e, t, n, "foldLeft", true)
        },
        _unfoldInit: function () {
            this._wrapperFilterInit()
        },
        _unfoldFilter: function (e, t, n) {
            this._wrapperFilter(e, t, n, "unfold", true)
        },
        _scaleDownInit: function () {
            this._wrapperFilterInit()
        },
        _scaleDownFilter: function (e, t, n) {
            this._wrapperFilter(e, t, n, "scaleDown", true)
        },
        _frontRowInit: function () {
            this._wrapperFilterInit()
        },
        _frontRowFilter: function (e, t, n) {
            this._wrapperFilter(e, t, n, "frontRow", true)
        },
        _rotateRoomInit: function () {
            this._wrapperFilterInit()
        },
        _rotateRoomFilter: function (e, t, n) {
            this._wrapperFilter(e, t, n, "rotateRoom", true)
        },
        _wrapperFilterInit: function () {
            var e = this;
            e._duplicateContent({});
            e.$ul.addClass("cbp-wrapper-front");
            e.$ulClone.css("opacity", 0);
            e.transitionByFilter = "css"
        },
        _wrapperFilter: function (t, n, r, i, s) {
            var o = this,
                u, a, f, l, c, h;
            o.blocks.show();
            o.blocksClone.show();
            if (r !== "*") {
                n = n.filter(r);
                t = o.blocks.not(".cbp-item-hidden").not(r).addClass("cbp-item-hidden")
            }
            n.removeClass("cbp-item-hidden");
            o.$obj.addClass("cbp-no-transition");
            o.blocks.find(".cbp-item-wrapper").removeClass("cbp-animation-" + i + "-out cbp-animation-" + i + "-in cbp-animation-" + i + "-fadeOut").css("style", "");
            o.blocksClone.find(".cbp-item-wrapper").removeClass("cbp-animation-" + i + "-out cbp-animation-" + i + "-in cbp-animation-" + i + "-fadeOut").css("style", "");
            o.$ul.css({
                opacity: 1
            });
            o.$ulClone.css({
                opacity: 1
            });
            if (o.ulHidden === "clone") {
                o.ulHidden = "first";
                l = o.blocks;
                c = o.blocksClone;
                a = o.blocksClone;
                o.$ul.removeClass("cbp-wrapper-front");
                o.$ulClone.addClass("cbp-wrapper-front")
            } else {
                o.ulHidden = "clone";
                l = o.blocksClone;
                c = o.blocks;
                a = o.blocks;
                o.$ul.addClass("cbp-wrapper-front");
                o.$ulClone.removeClass("cbp-wrapper-front")
            }
            l = o.blocksAvailable;
            a.css("opacity", 0);
            a.addClass("cbp-item-hidden");
            o.blocksAvailable = a.filter(r);
            o.blocksAvailable.css({
                opacity: 1
            });
            o.blocksAvailable.removeClass("cbp-item-hidden");
            c = o.blocksAvailable;
            o._layout();
            if (o.transition === "css") {
                var p = 0,
                    d = 0;
                c.each(function (t, n) {
                    e(n).find(".cbp-item-wrapper").addClass("cbp-animation-" + i + "-in").css("animation-delay", d / 20 + "s");
                    d++
                });
                l.each(function (t, n) {
                    if (d <= p && s) {
                        e(n).find(".cbp-item-wrapper").addClass("cbp-animation-" + i + "-fadeOut")
                    } else {
                        e(n).find(".cbp-item-wrapper").addClass("cbp-animation-" + i + "-out").css("animation-delay", p / 20 + "s")
                    }
                    p++
                });
                h = l.find(".cbp-item-wrapper").first();
                if (h.length) {
                    h.one(o.animationEnd, function () {
                        o._filterFinish();
                        if (o.browser === "ie10" || o.browser === "ie11") {
                            setTimeout(function () {
                                e(".cbp-item-wrapper").removeClass("cbp-animation-" + i + "-in")
                            }, 300)
                        }
                    })
                } else {
                    o._filterFinish();
                    if (o.browser === "ie10" || o.browser === "ie11") {
                        setTimeout(function () {
                            e(".cbp-item-wrapper").removeClass("cbp-animation-" + i + "-in")
                        }, 300)
                    }
                }
            } else {
                l.find(".cbp-item-wrapper").animate({
                    left: "-100%"
                }, 400, function () {
                    o._filterFinish()
                });
                c.find(".cbp-item-wrapper").css("left", "100%");
                c.find(".cbp-item-wrapper").animate({
                    left: 0
                }, 400)
            }
            o._processStyle(o.transitionByFilter);
            o._resizeMainContainer("animate")
        },
        _filterFinish: function () {
            var e = this;
            e.isAnimating = false;
            e._triggerEvent("filterFinish");
            e.$obj.trigger("filterComplete")
        },
        _registerEvent: function (e, t, n) {
            var r = this;
            if (!r.registeredEvents[e]) {
                r.registeredEvents[e] = [];
                r.registeredEvents.push(e)
            }
            r.registeredEvents[e].push({
                func: t,
                oneTime: n || false
            })
        },
        _triggerEvent: function (e) {
            var t = this;
            if (t.registeredEvents[e]) {
                for (var n = t.registeredEvents[e].length - 1; n >= 0; n--) {
                    t.registeredEvents[e][n].func.call(t);
                    if (t.registeredEvents[e][n].oneTime) {
                        t.registeredEvents[e].splice(n, 1)
                    }
                }
            }
        },
        init: function (t, n) {
            var r = e.data(this, "cubeportfolio");
            if (r) {
                throw new Error("cubeportfolio is already initialized. Please destroy it before initialize again!")
            }
            r = e.data(this, "cubeportfolio", Object.create(a));
            r._main(this, t, n)
        },
        destroy: function (n) {
            var r = e.data(this, "cubeportfolio");
            if (!r) {
                throw new Error("cubeportfolio is not initialized. Please initialize before calling destroy method!")
            }
            if (e.isFunction(n)) {
                r._registerEvent("destroyFinish", n, true)
            }
            e.removeData(this, "cubeportfolio");
            e.each(r.blocks, function (t, n) {
                e.removeData(this, "transformFn");
                e.removeData(this, "cbp-wxh")
            });
            r.$obj.removeClass("cbp cbp-loading cbp-ready cbp-no-transition");
            r.$ul.removeClass("cbp-wrapper-front cbp-wrapper-back cbp-wrapper no-trans").removeAttr("style");
            r.$obj.removeAttr("style");
            if (r.$ulClone) {
                r.$ulClone.remove()
            }
            if (r.browser) {
                r.$obj.removeClass("cbp-" + r.browser)
            }
            e(t).off("resize" + s);
            if (r.lightbox) {
                r.lightbox.destroy()
            }
            if (r.singlePage) {
                r.singlePage.destroy()
            }
            if (r.singlePageInline) {
                r.singlePageInline.destroy()
            }
            r.blocks.removeClass("cbp-item-hidden").removeAttr("style");
            r.blocks.find(".cbp-item-wrapper").children().unwrap();
            if (r.options.caption) {
                r._captionDestroy()
            }
            if (r.options.animationType) {
                if (r.options.animationType === "boxShadow") {
                    e(".cbp-animation-boxShadowMask").remove()
                }
                r.$obj.removeClass("cbp-animation-" + r.options.animationType)
            }
            r._triggerEvent("destroyFinish")
        },
        filter: function (t, n, r) {
            var i = r || e.data(this, "cubeportfolio"),
                s, o;
            if (!i) {
                throw new Error("cubeportfolio is not initialized. Please initialize before calling filter method!")
            }
            t = t === "*" || t === "" ? "*" : t;
            if (i.isAnimating || i.defaultFilter == t) {
                return
            }
            if (i.browser === "ie8" || i.browser === "ie9") {
                i.$obj.removeClass("cbp-no-transition cbp-appendItems-loading")
            } else {
                i.obj.classList.remove("cbp-no-transition");
                i.obj.classList.remove("cbp-appendItems-loading")
            }
            i.defaultFilter = t;
            i.isAnimating = true;
            if (e.isFunction(n)) {
                i._registerEvent("filterFinish", n, true)
            }
            s = i.blocks.filter(".cbp-item-hidden");
            o = [];
            if (i.singlePageInline && i.singlePageInline.isOpen) {
                i.singlePageInline.close("promise", {
                    callback: function () {
                        i["_" + i.options.animationType + "Filter"](o, s, t)
                    }
                })
            } else {
                i["_" + i.options.animationType + "Filter"](o, s, t)
            }
        },
        showCounter: function (t) {
            var n = e.data(this, "cubeportfolio");
            if (!n) {
                throw new Error("cubeportfolio is not initialized. Please initialize before calling showCounter method!")
            }
            n.elems = t;
            e.each(t, function (t, r) {
                var i = e(this),
                    s = i.data("filter"),
                    o = 0;
                s = s === "*" || s === "" ? "*" : s;
                o = n.blocks.filter(s).length;
                i.find(".cbp-filter-counter").text(o)
            })
        },
        appendItems: function (t, n) {
            var r = this,
                i = e.data(r, "cubeportfolio"),
                s, o, u, f;
            if (!i) {
                throw new Error("cubeportfolio is not initialized. Please initialize before calling appendItems method!")
            }
            if (i.singlePageInline && i.singlePageInline.isOpen) {
                i.singlePageInline.close("promise", {
                    callback: function () {
                        a._addItems.call(r, t, n)
                    }
                })
            } else {
                a._addItems.call(r, t, n)
            }
        },
        _addItems: function (t, n) {
            var r = e.data(this, "cubeportfolio"),
                i, s, o, u;
            if (e.isFunction(n)) {
                r._registerEvent("appendItemsFinish", n, true)
            }
            r.$obj.addClass("cbp-no-transition cbp-appendItems-loading");
            t = e(t).css("opacity", 0);
            t.filter(".cbp-item").wrapInner('<div class="cbp-item-wrapper"></div>');
            u = t.filter(r.defaultFilter);
            if (r.ulHidden) {
                if (r.ulHidden === "first") {
                    t.appendTo(r.$ulClone);
                    r.blocksClone = r.$ulClone.children();
                    s = r.blocksClone;
                    o = t.clone();
                    o.appendTo(r.$ul);
                    r.blocks = r.$ul.children()
                } else {
                    t.appendTo(r.$ul);
                    r.blocks = r.$ul.children();
                    s = r.blocks;
                    o = t.clone();
                    o.appendTo(r.$ulClone);
                    r.blocksClone = r.$ulClone.children()
                }
            } else {
                t.appendTo(r.$ul);
                r.blocks = r.$ul.children();
                s = r.blocks
            } if (r.options.caption) {
                r._captionDestroy();
                r._captionInit()
            }
            i = r.defaultFilter;
            r.blocksAvailable = s.filter(i);
            s.not(".cbp-item-hidden").not(i).addClass("cbp-item-hidden");
            if (r.options.gridAdjustment === "responsive") {
                r._responsiveLayout()
            }
            r._layout();
            r._processStyle(r.transitionByFilter);
            r._resizeMainContainer("animate");
            var f = t.filter(".cbp-item-hidden");
            switch (r.options.animationType) {
            case "flipOut":
                f.find(".cbp-item-wrapper").addClass("cbp-animation-flipOut-out");
                break;
            case "scaleSides":
                f.find(".cbp-item-wrapper").addClass("cbp-animation-scaleSides-out");
                break;
            case "flipBottom":
                f.find(".cbp-item-wrapper").addClass("cbp-animation-flipBottom-out");
                break
            }
            u.animate({
                opacity: 1
            }, 800, function () {
                switch (r.options.animationType) {
                case "bounceLeft":
                case "bounceTop":
                case "bounceBottom":
                    r.blocks.css("opacity", 1);
                    r.blocksClone.css("opacity", 1);
                    break;
                case "flipOut":
                case "scaleSides":
                case "flipBottom":
                    f.css("opacity", 1);
                    break
                }
            });
            if (r.elems) {
                a.showCounter.call(this, r.elems)
            }
            setTimeout(function () {
                r._triggerEvent("appendItemsFinish")
            }, 900)
        }
    };
    e.fn.cubeportfolio = function (e) {
        var t = arguments;
        return this.each(function () {
            if (a[e]) {
                return a[e].apply(this, Array.prototype.slice.call(t, 1))
            } else if (typeof e === "object" || !e) {
                return a.init.apply(this, t)
            } else {
                throw new Error("Method " + e + " does not exist on jQuery.cubeportfolio.js")
            }
        })
    };
    e.fn.cubeportfolio.options = {
        defaultFilter: "*",
        animationType: "fadeOut",
        gridAdjustment: "default",
        gapHorizontal: 10,
        gapVertical: 10,
        caption: "minimal",
        displayType: "default",
        displayTypeSpeed: 400,
        lightboxDelegate: ".cbp-lightbox",
        lightboxGallery: true,
        lightboxTitleSrc: "data-title",
        lightboxShowCounter: true,
        singlePageDelegate: ".cbp-singlePage",
        singlePageDeeplinking: true,
        singlePageStickyNavigation: true,
        singlePageShowCounter: true,
        singlePageCallback: function (e, t) {},
        singlePageInlineDelegate: ".cbp-singlePageInline",
        singlePageInlinePosition: "top",
        singlePageInlineInFocus: true,
        singlePageInlineCallback: function (e, t) {}
    }
})(jQuery, window, document)