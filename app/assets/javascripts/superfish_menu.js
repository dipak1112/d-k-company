/**
 * hoverIntent r6 // 2011.02.26 // jQuery 1.5.1+
 * <http://cherne.net/brian/resources/jquery.hoverIntent.html>
 *
 * @param  f  onMouseOver function || An object with configuration options
 * @param  g  onMouseOut function  || Nothing (use configuration options object)
 * @author    Brian Cherne brian(at)cherne(dot)net

(function(a){a.fn.hoverIntent=function(b,c){var d={sensitivity:7,interval:100,timeout:0};d=a.extend(d,c?{over:b,out:c}:b);var e,f,g,h;var i=function(a){e=a.pageX;f=a.pageY};var j=function(b,c){c.hoverIntent_t=clearTimeout(c.hoverIntent_t);if(Math.abs(g-e)+Math.abs(h-f)<d.sensitivity){a(c).unbind("mousemove",i);c.hoverIntent_s=1;return d.over.apply(c,[b])}else{g=e;h=f;c.hoverIntent_t=setTimeout(function(){j(b,c)},d.interval)}};var k=function(a,b){b.hoverIntent_t=clearTimeout(b.hoverIntent_t);b.hoverIntent_s=0;return d.out.apply(b,[a])};var l=function(b){var c=jQuery.extend({},b);var e=this;if(e.hoverIntent_t){e.hoverIntent_t=clearTimeout(e.hoverIntent_t)}if(b.type=="mouseenter"){g=c.pageX;h=c.pageY;a(e).bind("mousemove",i);if(e.hoverIntent_s!=1){e.hoverIntent_t=setTimeout(function(){j(c,e)},d.interval)}}else{a(e).unbind("mousemove",i);if(e.hoverIntent_s==1){e.hoverIntent_t=setTimeout(function(){k(c,e)},d.timeout)}}};return this.bind("mouseenter",l).bind("mouseleave",l)}})(jQuery);
 */
/*
 * Superfish v1.4.8 - jQuery menu widget
 * Copyright (c) 2008 Joel Birch
 *
 * Dual licensed under the MIT and GPL licenses:
 * 	http://www.opensource.org/licenses/mit-license.php
 * 	http://www.gnu.org/licenses/gpl.html
 *
 * CHANGELOG: http://users.tpg.com.au/j_birch/plugins/superfish/changelog.txt
 */

/*
 * Superfish v1.4.8 - jQuery menu widget
 * Copyright (c) 2008 Joel Birch
 *
 * Dual licensed under the MIT and GPL licenses:
 *  http://www.opensource.org/licenses/mit-license.php
 *  http://www.gnu.org/licenses/gpl.html
 *
 * CHANGELOG: http://users.tpg.com.au/j_birch/plugins/superfish/changelog.txt
 */
 
;(function($){
	$.fn.superfish = function(op){

		var sf = $.fn.superfish,
			c = sf.c,
			$arrow = $('<span class="'+c.arrowClass+'"> &#187;</span>'),
			over = function(){
				var $$ = $(this), menu = getMenu($$);
				clearTimeout(menu.sfTimer);
				$$.showSuperfishUl().siblings().hideSuperfishUl();
			},
			out = function(){
				var $$ = $(this), menu = getMenu($$), o = sf.op;
				clearTimeout(menu.sfTimer);
				menu.sfTimer=setTimeout(function(){
					o.retainPath=($.inArray($$[0],o.$path)>-1);
					$$.hideSuperfishUl();
					if (o.$path.length && $$.parents('li.'+o.hoverClass).length<1){
						o.onIdle.call(this);
						over.call(o.$path);
					}
				},o.delay);	
			},
			getMenu = function($menu){
				var menu = $menu.parents('ul.'+c.menuClass+':first')[0];
				sf.op = sf.o[menu.serial];
				return menu;
			},
			addArrow = function($a){ $a.addClass(c.anchorClass).append($arrow.clone()); };
			
		return this.addClass(c.menuClass).each(function() {
			var s = this.serial = sf.o.length;
			var o = $.extend({},sf.defaults,op);
			o.$path = $('li.'+o.pathClass,this).slice(0,o.pathLevels).each(function(){
				$(this).addClass(o.hoverClass+' '+c.bcClass)
					.filter('li:has(ul)').removeClass(o.pathClass);
			});
			sf.o[s] = sf.op = o;
			
			$('li:has(ul)',this)[($.fn.hoverIntent && !o.disableHI) ? 'hoverIntent' : 'hover'](over,out).each(function() {
				if (o.autoArrows) {
					addArrow( $('>a:first-child',this) );
				}
			})
			.not('.'+c.bcClass)
				.hideSuperfishUl();
			
			var $a = $('a',this);
			$a.each(function(i){
				var $li = $a.eq(i).parents('li');
				$a.eq(i).focus(function(){over.call($li);}).blur(function(){out.call($li);});
			});
			o.onInit.call(this);
			
		});
	};

	var sf = $.fn.superfish;
	sf.o = [];
	sf.op = {};

	sf.c = {
		bcClass     : 'sf-breadcrumb',
		menuClass   : 'sf-js-enabled',
		anchorClass : 'sf-with-ul',
		arrowClass  : 'sf-sub-indicator'
	};
	sf.defaults = {
		hoverClass	: 'sfHover',
		pathClass	: 'overideThisToUse',
		pathLevels	: 1,
		delay		: 800,
		animation	: {opacity:'show'},
		speed		: 'normal',
		autoArrows	: true,
		disableHI	: false,		// true disables hoverIntent detection
		onInit		: function(){}, // callback functions
		onBeforeShow: function(){},
		onShow		: function(){},
		onHide		: function(){},
		onIdle		: function(){}
	};
	$.fn.extend({
		hideSuperfishUl : function(){
			var o = sf.op,
				not = (o.retainPath===true) ? o.$path : '';
			o.retainPath = false;
			var $ul = $('li.'+o.hoverClass,this).add(this).not(not).removeClass(o.hoverClass)
					.find('>ul').hide().css('visibility','hidden');
			o.onHide.call($ul);
			return this;
		},
		showSuperfishUl : function(){
			var o = sf.op,
				$ul = this.addClass(o.hoverClass)
					.find('>ul:hidden').css('visibility','visible');
			o.onBeforeShow.call($ul);
			$ul.animate(o.animation,o.speed,function(){ o.onShow.call($ul); });
			
			//ADDED FOR REVERSE MENU IF WIDER THAN BROWSER WINDOW.
			// David Cooper, 9/23/11
			var ww = $(window).width();
			var subUL = this.children("ul").first();
			if ( subUL.length > 0 ) {
				var locUL = this.children("ul").first().offset().left + subUL.width();
				if (locUL > ww) { 
					var par = subUL.parent().parent();
					if(par.hasClass("sf-menu")){ //1st sub-menu level
						subUL.css('left', "-"+(locUL-ww)+"px");
					}else{ //2nd sub-menu level
						subUL.addClass('reversed').css('left', "-"+(subUL.width()+15)+"px"); 
					}
				}
			}
			
            return this;
        }
    });
 
})(jQuery);

/*
 * Supersubs v0.2b - jQuery plugin
 * Copyright (c) 2008 Joel Birch
 *
 * Dual licensed under the MIT and GPL licenses:
 *  http://www.opensource.org/licenses/mit-license.php
 *  http://www.gnu.org/licenses/gpl.html
 *
 *
 * This plugin automatically adjusts submenu widths of suckerfish-style menus to that of
 * their longest list item children. If you use this, please expect bugs and report them
 * to the jQuery Google Group with the word 'Superfish' in the subject line.
 *
 */
;(function(a){a.fn.supersubs=function(b){var c=a.extend({},a.fn.supersubs.defaults,b);return this.each(function(){var b=a(this);var d=a.meta?a.extend({},c,b.data()):c;var e=a('<li id="menu-fontsize">&#8212;</li>').css({padding:0,position:"absolute",top:"-999em",width:"auto"}).appendTo(b).width();a("#menu-fontsize").remove();$ULs=b.find("ul");$ULs.each(function(b){var c=$ULs.eq(b);var f=c.children();var g=f.children("a");var h=f.css("white-space","nowrap").css("float");var i=c.add(f).add(g).css({"float":"none",width:"auto"}).end().end()[0].clientWidth/e;i+=d.extraWidth;if(i>d.maxWidth){i=d.maxWidth}else if(i<d.minWidth){i=d.minWidth}i+="em";c.css("width",i);f.css({"float":h,width:"100%","white-space":"normal"}).each(function(){var b=a(">ul",this);var c=b.css("left")!==undefined?"left":"right";b.css(c,i)})})})};a.fn.supersubs.defaults={minWidth:9,maxWidth:25,extraWidth:0}})(jQuery);

/*
 * https://github.com/mattkersley/Responsive-Menu
 */
(function(a){var b=0;a.fn.mobileMenu=function(c){function e(a){return a.is("ul, ol")}function f(){return a(window).width()<d.switchWidth}function g(c){if(c.attr("id")){return a("#mobileMenu_"+c.attr("id")).length>0}else{b++;c.attr("id","mm"+b);return a("#mobileMenu_mm"+b).length>0}}function h(a){if(a.val()!==null){document.location.href=a.val()}}function j(b){b.css("display","none");a("#mobileMenu_"+b.attr("id")).show()}function k(b){b.css("display","");a("#mobileMenu_"+b.attr("id")).hide()}function l(b){if(e(b)){var c='<select id="mobileMenu_'+b.attr("id")+'" class="mobileMenu">';c+='<option value="">'+d.topOptionText+"</option>";b.find("li").each(function(){var b="";var e=a(this).parents("ul, ol").length;for(i=1;i<e;i++){b+=d.indentString}var f=a(this).find("a:first-child").attr("href");var g=b+a(this).clone().children("ul, ol").remove().end().text();c+='<option value="'+f+'">'+g+"</option>"});c+="</select>";b.parent().append(c);a("#mobileMenu_"+b.attr("id")).change(function(){h(a(this))});j(b)}else{alert("mobileMenu will only work with UL or OL elements!")}}function m(a){if(f()&&!g(a)){l(a)}else if(f()&&g(a)){j(a)}else if(!f()&&g(a)){k(a)}}var d={switchWidth:768,topOptionText:"Select a page",indentString:"   "};return this.each(function(){if(c){a.extend(d,c)}var b=a(this);a(window).resize(function(){m(b)});m(b)})}})(jQuery);