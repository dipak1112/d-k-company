/**
 * Bootstrap.js by @fat & @mdo
 * plugins: bootstrap-transition.js, bootstrap-tab.js, bootstrap-tooltip.js, bootstrap-popover.js, bootstrap-alert.js, bootstrap-button.js, bootstrap-collapse.js
 * Copyright 2012 Twitter, Inc.
 * http://www.apache.org/licenses/LICENSE-2.0.txt
 */
! function (a) {
    a(function () {
        a.support.transition = function () {
            var a = function () {
                var a = document.createElement("bootstrap"),
                    b = {
                        WebkitTransition: "webkitTransitionEnd",
                        MozTransition: "transitionend",
                        OTransition: "oTransitionEnd otransitionend",
                        transition: "transitionend"
                    },
                    c;
                for (c in b)
                    if (a.style[c] !== undefined) return b[c]
            }();
            return a && {
                end: a
            }
        }()
    })
}(window.jQuery), ! function (a) {
    var b = function (b) {
        this.element = a(b)
    };
    b.prototype = {
        constructor: b,
        show: function () {
            var b = this.element,
                c = b.closest("ul:not(.dropdown-menu)"),
                d = b.attr("data-target"),
                e, f, g;
            d || (d = b.attr("href"), d = d && d.replace(/.*(?=#[^\s]*$)/, ""));
            if (b.parent("li").hasClass("active")) return;
            e = c.find(".active a").last()[0], g = a.Event("show", {
                relatedTarget: e
            }), b.trigger(g);
            if (g.isDefaultPrevented()) return;
            f = a(d), this.activate(b.parent("li"), c), this.activate(f, f.parent(), function () {
                b.trigger({
                    type: "shown",
                    relatedTarget: e
                })
            })
        },
        activate: function (b, c, d) {
            function g() {
                e.removeClass("active").find("> .dropdown-menu > .active").removeClass("active"), b.addClass("active"), f ? (b[0].offsetWidth, b.addClass("in")) : b.removeClass("fade"), b.parent(".dropdown-menu") && b.closest("li.dropdown").addClass("active"), d && d()
            }
            var e = c.find("> .active"),
                f = d && a.support.transition && e.hasClass("fade");
            f ? e.one(a.support.transition.end, g) : g(), e.removeClass("in")
        }
    }, a.fn.tab = function (c) {
        return this.each(function () {
            var d = a(this),
                e = d.data("tab");
            e || d.data("tab", e = new b(this)), typeof c == "string" && e[c]()
        })
    }, a.fn.tab.Constructor = b, a(function () {
        a("body").on("click.tab.data-api", '[data-toggle="tab"], [data-toggle="pill"]', function (b) {
            b.preventDefault(), a(this).tab("show")
        })
    })
}(window.jQuery), ! function (a) {
    var b = function (a, b) {
        this.init("tooltip", a, b)
    };
    b.prototype = {
        constructor: b,
        init: function (b, c, d) {
            var e, f;
            this.type = b, this.$element = a(c), this.options = this.getOptions(d), this.enabled = !0, this.options.trigger == "click" ? this.$element.on("click." + this.type, this.options.selector, a.proxy(this.toggle, this)) : this.options.trigger != "manual" && (e = this.options.trigger == "hover" ? "mouseenter" : "focus", f = this.options.trigger == "hover" ? "mouseleave" : "blur", this.$element.on(e + "." + this.type, this.options.selector, a.proxy(this.enter, this)), this.$element.on(f + "." + this.type, this.options.selector, a.proxy(this.leave, this))), this.options.selector ? this._options = a.extend({}, this.options, {
                trigger: "manual",
                selector: ""
            }) : this.fixTitle()
        },
        getOptions: function (b) {
            return b = a.extend({}, a.fn[this.type].defaults, b, this.$element.data()), b.delay && typeof b.delay == "number" && (b.delay = {
                show: b.delay,
                hide: b.delay
            }), b
        },
        enter: function (b) {
            var c = a(b.currentTarget)[this.type](this._options).data(this.type);
            if (!c.options.delay || !c.options.delay.show) return c.show();
            clearTimeout(this.timeout), c.hoverState = "in", this.timeout = setTimeout(function () {
                c.hoverState == "in" && c.show()
            }, c.options.delay.show)
        },
        leave: function (b) {
            var c = a(b.currentTarget)[this.type](this._options).data(this.type);
            this.timeout && clearTimeout(this.timeout);
            if (!c.options.delay || !c.options.delay.hide) return c.hide();
            c.hoverState = "out", this.timeout = setTimeout(function () {
                c.hoverState == "out" && c.hide()
            }, c.options.delay.hide)
        },
        show: function () {
            var a, b, c, d, e, f, g;
            if (this.hasContent() && this.enabled) {
                a = this.tip(), this.setContent(), this.options.animation && a.addClass("fade"), f = typeof this.options.placement == "function" ? this.options.placement.call(this, a[0], this.$element[0]) : this.options.placement, b = /in/.test(f), a.remove().css({
                    top: 0,
                    left: 0,
                    display: "block"
                }).appendTo(b ? this.$element : document.body), c = this.getPosition(b), d = a[0].offsetWidth, e = a[0].offsetHeight;
                switch (b ? f.split(" ")[1] : f) {
                case "bottom":
                    g = {
                        top: c.top + c.height,
                        left: c.left + c.width / 2 - d / 2
                    };
                    break;
                case "top":
                    g = {
                        top: c.top - e,
                        left: c.left + c.width / 2 - d / 2
                    };
                    break;
                case "left":
                    g = {
                        top: c.top + c.height / 2 - e / 2,
                        left: c.left - d
                    };
                    break;
                case "right":
                    g = {
                        top: c.top + c.height / 2 - e / 2,
                        left: c.left + c.width
                    }
                }
                a.css(g).addClass(f).addClass("in")
            }
        },
        setContent: function () {
            var a = this.tip(),
                b = this.getTitle();
            a.find(".tooltip-inner")[this.options.html ? "html" : "text"](b), a.removeClass("fade in top bottom left right")
        },
        hide: function () {
            function d() {
                var b = setTimeout(function () {
                    c.off(a.support.transition.end).remove()
                }, 500);
                c.one(a.support.transition.end, function () {
                    clearTimeout(b), c.remove()
                })
            }
            var b = this,
                c = this.tip();
            return c.removeClass("in"), a.support.transition && this.$tip.hasClass("fade") ? d() : c.remove(), this
        },
        fixTitle: function () {
            var a = this.$element;
            (a.attr("title") || typeof a.attr("data-original-title") != "string") && a.attr("data-original-title", a.attr("title") || "").removeAttr("title")
        },
        hasContent: function () {
            return this.getTitle()
        },
        getPosition: function (b) {
            return a.extend({}, b ? {
                top: 0,
                left: 0
            } : this.$element.offset(), {
                width: this.$element[0].offsetWidth,
                height: this.$element[0].offsetHeight
            })
        },
        getTitle: function () {
            var a, b = this.$element,
                c = this.options;
            return a = b.attr("data-original-title") || (typeof c.title == "function" ? c.title.call(b[0]) : c.title), a
        },
        tip: function () {
            return this.$tip = this.$tip || a(this.options.template)
        },
        validate: function () {
            this.$element[0].parentNode || (this.hide(), this.$element = null, this.options = null)
        },
        enable: function () {
            this.enabled = !0
        },
        disable: function () {
            this.enabled = !1
        },
        toggleEnabled: function () {
            this.enabled = !this.enabled
        },
        toggle: function () {
            this[this.tip().hasClass("in") ? "hide" : "show"]()
        },
        destroy: function () {
            this.hide().$element.off("." + this.type).removeData(this.type)
        }
    }, a.fn.tooltip = function (c) {
        return this.each(function () {
            var d = a(this),
                e = d.data("tooltip"),
                f = typeof c == "object" && c;
            e || d.data("tooltip", e = new b(this, f)), typeof c == "string" && e[c]()
        })
    }, a.fn.tooltip.Constructor = b, a.fn.tooltip.defaults = {
        animation: !0,
        placement: "top",
        selector: !1,
        template: '<div class="tooltip"><div class="tooltip-arrow"></div><div class="tooltip-inner"></div></div>',
        trigger: "hover",
        title: "",
        delay: 0,
        html: !0
    }
}(window.jQuery), ! function (a) {
    var b = function (a, b) {
        this.init("popover", a, b)
    };
    b.prototype = a.extend({}, a.fn.tooltip.Constructor.prototype, {
        constructor: b,
        setContent: function () {
            var a = this.tip(),
                b = this.getTitle(),
                c = this.getContent();
            a.find(".popover-title")[this.options.html ? "html" : "text"](b), a.find(".popover-content > *")[this.options.html ? "html" : "text"](c), a.removeClass("fade top bottom left right in")
        },
        hasContent: function () {
            return this.getTitle() || this.getContent()
        },
        getContent: function () {
            var a, b = this.$element,
                c = this.options;
            return a = b.attr("data-content") || (typeof c.content == "function" ? c.content.call(b[0]) : c.content), a
        },
        tip: function () {
            return this.$tip || (this.$tip = a(this.options.template)), this.$tip
        },
        destroy: function () {
            this.hide().$element.off("." + this.type).removeData(this.type)
        }
    }), a.fn.popover = function (c) {
        return this.each(function () {
            var d = a(this),
                e = d.data("popover"),
                f = typeof c == "object" && c;
            e || d.data("popover", e = new b(this, f)), typeof c == "string" && e[c]()
        })
    }, a.fn.popover.Constructor = b, a.fn.popover.defaults = a.extend({}, a.fn.tooltip.defaults, {
        placement: "right",
        trigger: "click",
        content: "",
        template: '<div class="popover"><div class="arrow"></div><div class="popover-inner"><h3 class="popover-title"></h3><div class="popover-content"><p></p></div></div></div>'
    })
}(window.jQuery), ! function (a) {
    var b = '[data-dismiss="alert"]',
        c = function (c) {
            a(c).on("click", b, this.close)
        };
    c.prototype.close = function (b) {
        function f() {
            e.trigger("closed").remove()
        }
        var c = a(this),
            d = c.attr("data-target"),
            e;
        d || (d = c.attr("href"), d = d && d.replace(/.*(?=#[^\s]*$)/, "")), e = a(d), b && b.preventDefault(), e.length || (e = c.hasClass("alert") ? c : c.parent()), e.trigger(b = a.Event("close"));
        if (b.isDefaultPrevented()) return;
        e.removeClass("in"), a.support.transition && e.hasClass("fade") ? e.on(a.support.transition.end, f) : f()
    }, a.fn.alert = function (b) {
        return this.each(function () {
            var d = a(this),
                e = d.data("alert");
            e || d.data("alert", e = new c(this)), typeof b == "string" && e[b].call(d)
        })
    }, a.fn.alert.Constructor = c, a(function () {
        a("body").on("click.alert.data-api", b, c.prototype.close)
    })
}(window.jQuery), ! function (a) {
    var b = function (b, c) {
        this.$element = a(b), this.options = a.extend({}, a.fn.button.defaults, c)
    };
    b.prototype.setState = function (a) {
        var b = "disabled",
            c = this.$element,
            d = c.data(),
            e = c.is("input") ? "val" : "html";
        a += "Text", d.resetText || c.data("resetText", c[e]()), c[e](d[a] || this.options[a]), setTimeout(function () {
            a == "loadingText" ? c.addClass(b).attr(b, b) : c.removeClass(b).removeAttr(b)
        }, 0)
    }, b.prototype.toggle = function () {
        var a = this.$element.closest('[data-toggle="buttons-radio"]');
        a && a.find(".active").removeClass("active"), this.$element.toggleClass("active")
    }, a.fn.button = function (c) {
        return this.each(function () {
            var d = a(this),
                e = d.data("button"),
                f = typeof c == "object" && c;
            e || d.data("button", e = new b(this, f)), c == "toggle" ? e.toggle() : c && e.setState(c)
        })
    }, a.fn.button.defaults = {
        loadingText: "loading..."
    }, a.fn.button.Constructor = b, a(function () {
        a("body").on("click.button.data-api", "[data-toggle^=button]", function (b) {
            var c = a(b.target);
            c.hasClass("btn") || (c = c.closest(".btn")), c.button("toggle")
        })
    })
}(window.jQuery), ! function (a) {
    var b = function (b, c) {
        this.$element = a(b), this.options = a.extend({}, a.fn.collapse.defaults, c), this.options.parent && (this.$parent = a(this.options.parent)), this.options.toggle && this.toggle()
    };
    b.prototype = {
        constructor: b,
        dimension: function () {
            var a = this.$element.hasClass("width");
            return a ? "width" : "height"
        },
        show: function () {
            var b, c, d, e;
            if (this.transitioning) return;
            b = this.dimension(), c = a.camelCase(["scroll", b].join("-")), d = this.$parent && this.$parent.find("> .accordion-group > .in");
            if (d && d.length) {
                e = d.data("collapse");
                if (e && e.transitioning) return;
                d.collapse("hide"), e || d.data("collapse", null)
            }
            this.$element[b](0), this.transition("addClass", a.Event("show"), "shown"), a.support.transition && this.$element[b](this.$element[0][c])
        },
        hide: function () {
            var b;
            if (this.transitioning) return;
            b = this.dimension(), this.reset(this.$element[b]()), this.transition("removeClass", a.Event("hide"), "hidden"), this.$element[b](0)
        },
        reset: function (a) {
            var b = this.dimension();
            return this.$element.removeClass("collapse")[b](a || "auto")[0].offsetWidth, this.$element[a !== null ? "addClass" : "removeClass"]("collapse"), this
        },
        transition: function (b, c, d) {
            var e = this,
                f = function () {
                    c.type == "show" && e.reset(), e.transitioning = 0, e.$element.trigger(d)
                };
            this.$element.trigger(c);
            if (c.isDefaultPrevented()) return;
            this.transitioning = 1, this.$element[b]("in"), a.support.transition && this.$element.hasClass("collapse") ? this.$element.one(a.support.transition.end, f) : f()
        },
        toggle: function () {
            this[this.$element.hasClass("in") ? "hide" : "show"]()
        }
    }, a.fn.collapse = function (c) {
        return this.each(function () {
            var d = a(this),
                e = d.data("collapse"),
                f = typeof c == "object" && c;
            e || d.data("collapse", e = new b(this, f)), typeof c == "string" && e[c]()
        })
    }, a.fn.collapse.defaults = {
        toggle: !0
    }, a.fn.collapse.Constructor = b, a(function () {
        a("body").on("click.collapse.data-api", "[data-toggle=collapse]", function (b) {
            var c = a(this),
                d, e = c.attr("data-target") || b.preventDefault() || (d = c.attr("href")) && d.replace(/.*(?=#[^\s]+$)/, ""),
                f = a(e).data("collapse") ? "toggle" : c.data();
            c[a(e).hasClass("in") ? "addClass" : "removeClass"]("collapsed"), a(e).collapse(f)
        })
    })
}(window.jQuery)