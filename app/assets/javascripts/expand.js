// JavaScript Document

;(function($) {




$.fn.toggler = function(options) {
    var o = $.extend({}, $.fn.toggler.defaults, options);
    
    var $this = $(this);
    $this.wrapInner('<a style="display:block" href="#" title="Expand/Collapse" />');
    if (o.initShow) {$(o.initShow).addClass('shown');}
    $this.next(o.cllpsEl + ':not(.shown)').hide();
    return this.each(function() {
      var container;
      (o.container) ? container = o.container : container = 'html';
      if ($this.next('div.shown').length) { $this.closest(container).find('.shown').show().prev().find('a').addClass('open'); }
      $(this).click(function() {
        $(this).find('a').toggleClass('open').end().next(o.cllpsEl)[o.method](o.speed);
        return false;
    });
});};
$.fn.toggler.defaults = {
     cllpsEl : 'div.collapse',
     method : 'slideToggle',
     speed : 'slow',
     container : '', //the common container of all groups with collapsible content (optional)
     initShow : '.shown' //the initially expanded sections (optional)
};
 

})(jQuery);