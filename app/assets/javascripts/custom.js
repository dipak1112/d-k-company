/*jslint browser: true*/
/*global $, jQuery, Modernizr, google, _gat*/
/*jshint strict: true */


/*************** COLORS TO BE ERASED WHEN INSTALLING THE THEME ***********/

$(document).ready(function() {   
    "use strict";
    var $colorsHTML ='<style>.styleSwitcher {background:#fff; border:1px solid #777; position:fixed; top:200px; width:155px;left:-157px;z-index:9999}' +
    '.switcher.dark{background:#555;}' +
    '.styleSwitcher ul li{display:inline-block;}' +
    '.styleSwitcher ul {display:block; padding:10px; margin:0}' +
    '.styleSwitcher ul li a {display:block; text-indent:-3000px; overflow:hidden; border:1px solid #555; width:20px; height:20px; margin:0 5px 5px 0;}' +
    '.styleSwitcher h1 {padding:15px 0 5px 10px;font-size:14px; text-transform:uppercase; color:#555;border:none; margin:0; text-align:left;}' +
    '.styleSwitcher h1:after {content:none;}' +
    '.styleSwitcher #showHideSwitcher{width:50px; height:50px; position:absolute; right:-51px; background:#fff; top:-1px; font-size:24px; border:1px solid #777; border-left:none; text-align:center; line-height:50px; color:#555;}' +
    '</style>' +
    '<div class="styleSwitcher">' +
    '<a href="#" id="showHideSwitcher"><i class="icon-cog"></i></a>' +
    '<h1>style switcher</h1><ul class="switcher">' +
    '<li><a href="css/orange.css" style="background:#F86D18">Orange</a></li>' +
    '<li><a href="css/yellow.css" style="background:#FFCC00">Yellow</a></li>' +
    '<li><a href="css/sea-green.css" style="background:#3CB6B6">Sea green</a></li>' +
    '<li><a href="css/green.css" style="background:#A4C618">Green</a></li>' +
    '<li><a href="css/blue.css" style="background:#136597">Dark blue</a></li>' +
    '<li><a href="css/light.css" style="background:#44BCDD">Light blue</a></li>' +
    '<li><a href="css/pink.css" style="background:#F897F5">Pink</a></li>' +
    '<li><a href="css/coffee.css" style="background:#A38757">Coffee</a></li>' +
    '<li><a href="css/red.css" style="background:#E44832">Red</a></li>' +
    '<li><a href="css/purple.css" style="background:#C44AD0">Purple</a></li>' +
    '</ul>' +
    '<ul class="switcher dark">' +
    '<li><a href="css/dark-orange.css" style="background:#F86D18">Dark Orange</a></li>' +
    '<li><a href="css/dark-yellow.css" style="background:#FFCC00">Dark Yellow</a></li>' +
    '<li><a href="css/dark-sea-green.css" style="background:#3CB6B6">Dark Sea green</a></li>' +
    '<li><a href="css/dark-green.css" style="background:#A4C618">Dark Green</a></li>' +
    '<li><a href="css/dark-blue.css" style="background:#136597">Dark Dark blue</a></li>' +
    '<li><a href="css/dark-light.css" style="background:#44BCDD">Dark Light blue</a></li>' +
    '<li><a href="css/dark-pink.css" style="background:#F897F5">Dark Pink</a></li>' +
    '<li><a href="css/dark-coffee.css" style="background:#A38757">Dark Coffee</a></li>' +
    '<li><a href="css/dark-red.css" style="background:#E44832">Dark Red</a></li>' +
    '<li><a href="css/dark-purple.css" style="background:#C44AD0">Dark Black &amp; white</a></li>' +			
    '</ul>' +
    '</div>'; 

    $("body").append($colorsHTML);  

    var s = document.createElement("script");
    s.type = "text/javascript";
    s.src = "/assets/jquery.cookie.js";
    $("body").append(s);  



    if($.cookie("css")) {
        $("#colors").attr("href",$.cookie("css"));
    }
    $(".switcher li a").click(function() { 

        $("#colors").attr("href",$(this).attr("href"));
        $.cookie("css",$(this).attr("href"));
        return false;
    });

    $('#showHideSwitcher').click(function(e) { 
       if($('.styleSwitcher').css('left') === '-157px'){
           $('.styleSwitcher').animate(
            {'left':0},
            300, 'easeOutQuart',function() {
                // stuff to do after animation is complete
            });

       }else{
           $('.styleSwitcher').animate(
            {'left':-157},
            300, 'easeInQuart',function() {
                // stuff to do after animation is complete
            });
       }
       e.preventDefault();
   });
});

/*************** COLORS TO BE ERASED WHEN INSTALLING THE THEME ***********/

/*************** GOOGLE ANALYTICS ***********/
/*************** REPLACE WITH YOUR OWN UA NUMBER ***********/
window.onload = function () { "use strict"; gaSSDSLoad(""); }; //load after page onload
/*************** REPLACE WITH YOUR OWN UA NUMBER ***********/


/*
|--------------------------------------------------------------------------
| DOCUMENT READY
|--------------------------------------------------------------------------
*/  

$(document).ready(function() {
    "use strict";
	if( $("ul#og-grid").length){
		Grid.init();
	};

	 /*
    |--------------------------------------------------------------------------
    |  form placeholder for IE
    |--------------------------------------------------------------------------
    */
    if(!Modernizr.input.placeholder){

        $('[placeholder]').focus(function() {
            var input = $(this);
            if (input.val() == input.attr('placeholder')) {
                input.val('');
                input.removeClass('placeholder');
            }
        }).blur(function() {
            var input = $(this);
            if (input.val() == '' || input.val() == input.attr('placeholder')) {
                input.addClass('placeholder');
                input.val(input.attr('placeholder'));
            }
        }).blur();
        $('[placeholder]').parents('form').submit(function() {
            $(this).find('[placeholder]').each(function() {
                var input = $(this);
                if (input.val() == input.attr('placeholder')) {
                    input.val('');
                }
            })
        });

    }			
    /*
    |--------------------------------------------------------------------------
    | PRETTY PHOTOS
    |--------------------------------------------------------------------------
    */

    if( $("a.prettyPhoto").length){
        $("a.prettyPhoto").prettyPhoto({
            animation_speed:'fast',
            slideshow:10000, 
            hideflash: true
        });
    }


    if( $("a.prettyPhotoGallery").length){
        
        $("a.prettyPhotoGallery").click(function (e) {

            console.log($(this).data("rel"));
            var images = $(this).data("rel");
            images = images.split(',');


            var api_images =[]; 


            $.each(images, function( index, value ) {
                api_images.push(value);
            });

            //api_titles = [$(this).data("title")];
            //api_descriptions = [$(this).data("title")];
            $.prettyPhoto.open(api_images); 

        

            e.preventDefault();
        });

    } 
    
    
    /*
    |--------------------------------------------------------------------------
    | TOOLTIP
    |--------------------------------------------------------------------------
    */

    $('.tips').tooltip({placement:'top'});

    
    
    /*
    |--------------------------------------------------------------------------
    | COLLAPSE
    |--------------------------------------------------------------------------
    */

    $('.accordion').on('show hide', function(e){
        $('.accordion-toggle').removeClass('active');
        $(e.target).siblings('.accordion-heading').find('.accordion-toggle').addClass('active');
        $(e.target).siblings('.accordion-heading').find('.accordion-toggle i').toggleClass('icon-plus icon-minus', 200);
        
    });

    /*
    |--------------------------------------------------------------------------
    | CONTACT
    |--------------------------------------------------------------------------
    */   
    $('.slideContact').click(function(e){

        if ( $(window).width() >= 800){

            $('#contact').slideToggle('normal', 'easeInQuad',function(){

                $('#contactinfoWrapper').css('margin-left', 0);
                $('#mapSlideWrapper').css('margin-left', 3000);
                $('#contactinfoWrapper').fadeToggle();
                

            });
            $('#closeContact').fadeToggle(); 
            return false;
            
        }else{

            return true;
            
        }
        e.preventDefault();
    });
    
    
    $('#closeContact').click(function(e){


        $('#contactinfoWrapper').fadeOut('normal', 'easeInQuad',function(){
            $('#contactinfoWrapper').css('margin-left', 0);
            $('#mapSlideWrapper').css('margin-left', 3000);
        });
        
        $('#contact').slideUp('normal', 'easeOutQuad');

        $(this).fadeOut();

        e.preventDefault();
        
    });
    



    
    
    /* MAP */
    $('#mapTrigger').click(function(e){


        $('#mapSlideWrapper').css('display', 'block');
        initialize('mapWrapper');
        
        $('#contactinfoWrapper, #contactinfoWrapperPage').animate({
            marginLeft:'-2000px' 
        }, 400, function() {}); 
        
        
        $('#mapSlideWrapper').animate({
            marginLeft:'25px' 
        }, 400, function() {});  
        
        appendBootstrap();

        e.preventDefault();
    });
    
    
    $('#mapTriggerLoader').click(function(e){


        $('#mapSlide').css('display', 'block');

        $('#contactSlide').animate({
            marginLeft:'-2000px' 
        }, 400, function() {}); 
        
        
        $('#mapSlide').animate({
            marginLeft:'0' 
        }, 400, function() {
            $('#contactSlide').css('display', 'none');
        });  

        
        appendBootstrap();
        
        e.preventDefault();
    });
    
    
    $('#mapReturn').click(function(e){
        //$('#mapWrapper').css('margin-bottom', '3em');
        
        $('#contactSlide').css('display', 'block');
        $('#mapSlide').animate({
            marginLeft:'3000px' 
        }, 400, function() {});       
        

        $('#contactSlide').animate({
            marginLeft:'0' 
        }, 400, function() {
            $('#mapSlide').css('display', 'none');
        }); 

        e.preventDefault();
    }); 



    /*
    |--------------------------------------------------------------------------
    | FLEXSLIDER
    |--------------------------------------------------------------------------
    */ 
    if($('.flexFullScreen').length){

        $('.flexFullScreen').flexslider({
            animation: "slide",
            controlNav: true,
            directionNav: true,
            slideshow: true,
            touch: true,
            prevText: '<i class="icon-left-open"></i>',           
            nextText: '<i class="icon-right-open"></i>',   
            start: function(slider){
                setTimeout("animateTxt("+slider.currentSlide+", 'in')", 100);  
            },
            before: function(slider){
                setTimeout("animateTxt("+slider.currentSlide+")", 100);  
            },
            after: function(slider){
                setTimeout("animateTxt("+slider.currentSlide+", 'in')", 100);  
            } 
        });

    }


    if($('.flexScreenSlider').length){

        $('.flexScreenSlider').flexslider({
            animation: "slide",
            controlNav:false,
            touch: true, 
            slideshow: true,
            prevText: '<i class="icon-left-open"></i>',           
            nextText: '<i class="icon-right-open"></i>'  
        });    
    }


    if($('.flexPortfolio').length){

        $('.flexPortfolio').flexslider({
            animation: "slide",
            controlNav:false,
            touch: true,
            slideshow: true,
            prevText: '<i class="icon-left-open"></i>',           
            nextText: '<i class="icon-right-open"></i>'  
        });    
    }


    if($('.flexProject').length){

        $('.flexProject').flexslider({
            animation: "slide",
            controlNav:true,
            touch: true,
            slideshow: true,
            prevText: '<i class="icon-left-open"></i>',           
            nextText: '<i class="icon-right-open"></i>'  
        });    
    }
	
	 if($('.flexApp').length){

        $('.flexApp').flexslider({
            animation: "slide",
            controlNav:false,
            touch: true,	
            prevText: '<i class="icon-left-open"></i>',           
            nextText: '<i class="icon-right-open"></i>'  
        });    
    }



    /*
    |--------------------------------------------------------------------------
    | MAIN ROLLOVER EFFECTS
    |--------------------------------------------------------------------------
    */     

    if($('.imgHover').length){

        $('.imgHover article').hover(
            function () {

                var $this=$(this);

                var fromTop = ($('.imgWrapper', $this).height()/2 - $('.iconLinks', $this).height()/2);
                $('.iconLinks', $this).css('margin-top',fromTop);

                $('.media-hover', $this).height($('.imgWrapper', $this).height());   

                $('.mask', this).css('height', $('.imgWrapper', this).height());
                $('.mask', this).css('width', $('.imgWrapper', this).width());
                $('.mask', this).stop(true, false).fadeIn('fast', function() {}).end();

                if(Modernizr.csstransitions) {
                    $('.iconLinks a').addClass('animated');
                    $('.iconLinks', $this).css('display', 'block');

                    $('.iconLinks a:first-child', $this).removeClass('flipOutX'); 
                    $('.iconLinks a:first-child', $this).addClass('bounceInDown'); 

                    $('.iconLinks a:gt(0)', $this).removeClass('flipOutX'); 
                    $('.iconLinks a:gt(0)', $this).addClass('bounceInUp'); 
                }else{

                    $('.iconLinks', $this).stop(true, false).fadeIn('fast');
                }

                $this.find('.boxInfo > h3').addClass('hoverState', 300);
                $('.newBadge', this).addClass('animated swing');

            },function () {
                var $this=$(this);
                $('.mask', $this).stop(true, false).fadeOut('fast', function() {
                    if(Modernizr.csstransitions) {
                        $('.iconLinks a:first-child', $this).removeClass('bounceInDown'); 
                        $('.iconLinks a:first-child', $this).addClass('flipOutX'); 
                        $('.iconLinks a:gt(0)', $this).removeClass('bounceInUp'); 
                        $('.iconLinks a:gt(0)', $this).addClass('flipOutX'); 
                    }else{
                        $('.iconLinks', $this).stop(true, false).fadeOut('fast');
                    }
                    $this.find('.boxInfo>h3').removeClass('hoverState',300);			  
                }).end(); 
                $('.newBadge', this).removeClass('animated swing');
            });
    }



    /*
    |--------------------------------------------------------------------------
    | ROLLOVER BTN
    |--------------------------------------------------------------------------
    */ 

    $('.socialIcon').hover(
        function () {
            $(this).stop(true, true).addClass('socialHoverClass', 300);
        },
        function () {
            $(this).removeClass('socialHoverClass', 300);
        });





    $('.tabs li, .accordion h2').hover(
        function () {
            $(this).stop(true, true).addClass('speBtnHover', 300);
        },
        function () {
            $(this).stop(true, true).removeClass('speBtnHover', 100);
        });



    /*
    |--------------------------------------------------------------------------
    | ALERT
    |--------------------------------------------------------------------------
    */ 
    $('.alert').delegate('button', 'click', function() {
        $(this).parent().fadeOut('fast');
    });
    
    
    /*
    |--------------------------------------------------------------------------
    | CLIENT
    |--------------------------------------------------------------------------
    */   
    
    if($('.colorHover').length){
        var array =[];
        $('.colorHover').hover(

            function () {

                array[0] = $(this).attr('src');
                $(this).attr('src', $(this).attr('src').replace('-off', ''));

            }, 

            function () {

                $(this).attr('src', array[0]);

            });
    }



    /*
    |--------------------------------------------------------------------------
    | Rollover boxIcon
    |--------------------------------------------------------------------------
    */ 
    if($('.boxIcon').length){

        $('.boxIcon').hover(function() {
            var $this = $(this);

            $this.css('opacity', '1');   
            //$this.find('.boxContent>p').stop(true, false).css('opacity', 0);
            $this.addClass('hover');
            $('.boxContent>p').css('bottom', '-50px');
            $this.find('.boxContent>p').stop(true, false).css('display', 'block');

            $this.find('.iconWrapper i').addClass('triggeredHover');    

            $this.find('.boxContent>p').stop(true, false).animate({
                'margin-top': '0px'},
                300, function() {
            // stuff to do after animation is complete
        });


        }, function() {
            var $this = $(this);
            $this.removeClass('hover');

            $this.find('.boxContent>p').stop(true, false).css('display', 'none');
            $this.find('.boxContent>p').css('margin-top', '250px');
            $this.find('.iconWrapper i').removeClass('triggeredHover'); 


        });   
    }   






    $('#quoteTrigger').click(function (e) {

        //$("#quoteWrapper").scrollTop(0);

        if(!$('#quoteFormWrapper').is(':visible')){
            $('html, body').animate({scrollTop: $("#quoteWrapper").offset().top}, 300);
        }

        var $this = $(this);


        $('#quoteFormWrapper').slideToggle('fast', function() {

            $this.text($('#quoteFormWrapper').is(':visible') ? "Close form" : "I have a project");

        });


        e.preventDefault();
    });



/*
|--------------------------------------------------------------------------
| SHARRRE
|--------------------------------------------------------------------------
*/
if($('#shareme').length){
  
    $('#shareme').sharrre({

    share: {
        googlePlus: true,
        facebook: true,
        twitter: true,
        linkedin: true
    },

    buttons: {
        googlePlus: {size: 'tall', annotation:'bubble'},
        facebook: {layout: 'box_count'},
        twitter: {count: 'vertical'},
        linkedin: {counter: 'top'}
    },

    enableHover: false,
    enableCounter: false,
    enableTracking: true,
      //url:'document.location.href'
  });
} 



/*
|--------------------------------------------------------------------------
| ROLL OVER PreviewTrigger
|--------------------------------------------------------------------------
*/
if($('.previewTrigger').length){

    $('.mask').css('height', $('.previewTrigger').height());
    $('.mask').css('width', $('.previewTrigger').width());
    // $('.mask', this).css('top', $('.previewTrigger', this).width());
    // $('.mask', this).css('left', $('.previewTrigger', this).width());

    $('.previewTrigger').hover(function() {

        var $this = $(this);

        $this.children('.mask').fadeIn('fast');

        if(Modernizr.csstransitions) {
            $('.iconWrapper', $this).addClass('animated');
            $('.iconWrapper', $this).css('display', 'block');
            $('.iconWrapper', $this).removeClass('flipOutX'); 
            $('.iconWrapper', $this).addClass('bounceInDown'); 
        }else{
            $('.iconWrapper', $this).stop(true, false).fadeIn('fast');
        }

    }, function() {

        var $this = $(this); 

        $this.children('.mask').fadeOut('fast');

        if(Modernizr.csstransitions) {
            $('.iconWrapper', $this).removeClass('bounceInDown'); 
            $('.iconWrapper', $this).addClass('flipOutX');
            $('.iconWrapper', $this).css('display', 'none');
            $('.iconWrapper', $this).removeClass('animated');
        }else{
            $('.iconWrapper', $this).stop(true, false).fadeOut('fast');
        }

    });
}

//END DOCUMENT READY   
});



/*
|--------------------------------------------------------------------------
| EVENTS TRIGGER AFTER ALL IMAGES ARE LOADED
|--------------------------------------------------------------------------
*/
$(window).load(function() {

    "use strict";
    /*
    |--------------------------------------------------------------------------
    | PRELOADER
    |--------------------------------------------------------------------------
    */ 
    $('#status').fadeOut(); // will first fade out the loading animation
    $('#preloader').delay(350).fadeOut('slow'); // will fade out the white DIV that covers the website.
    $('body').delay(350).css({'overflow':'visible'});

    /*
    |--------------------------------------------------------------------------
    | ISOTOPE USAGE FILTERING
    |--------------------------------------------------------------------------
    */ 
    if($('.isotopeWrapper').length){

        var $container = $('.isotopeWrapper');
        var $resize = $('.isotopeWrapper').attr('id');
        // initialize isotope
        
        $container.isotope({
            itemSelector: '.isotopeItem',
            resizable: false, // disable normal resizing
            masonry: {
                columnWidth: $container.width() / $resize
            }


            
        });
        var rightHeight = $('#works').height();
        $('#filter a').click(function(){


            $('#works').height(rightHeight);
            $('#filter a').removeClass('current');


            $(this).addClass('current');
            var selector = $(this).attr('data-filter');
            $container.isotope({
                filter: selector,
                animationOptions: {
                    duration: 1000,
                    easing: 'easeOutQuart',
                    queue: false
                }
            });
            return false;
        });
        
        
        $(window).smartresize(function(){
            $container.isotope({
                // update columnWidth to a percentage of container width
                masonry: {
                    columnWidth: $container.width() / $resize
                }
            });
        });
        

}  


/**PROCESS ICONS**/
$('.iconBoxV3 a').hover(function() {

    if(Modernizr.csstransitions) {

        $(this).stop(false, true).toggleClass( 'hover', 150);
        $('i', this).css('-webkit-transform', 'rotateZ(360deg)');
        $('i', this).css('-moz-transform', 'rotateZ(360deg)');
        $('i', this).css('-o-transform', 'rotateZ(360deg)');
        $('i', this).css('transform', 'rotateZ(360deg)'); 

    }else{

       $(this).stop(false, true).toggleClass( 'hover', 150);

   }  

}, function() {

    if(Modernizr.csstransitions) {
        $(this).stop(false, true).toggleClass( 'hover', 150);
        $('i', this).css('-webkit-transform', 'rotateZ(0deg)');
        $('i', this).css('-moz-transform', 'rotateZ(0deg)');
        $('i', this).css('-o-transform', 'rotateZ(0deg)');
        $('i', this).css('transform', 'rotateZ(0deg)'); 

    }else{

        $(this).stop(false, true).toggleClass( 'hover', 150);
    }  
    
});



    if($('.scrollMenu').length){



     $(window).scroll(function () {

            if($(window).width() > 1024){

                if($(window).scrollTop() > 0){
                    $('#mainHeader').addClass('fixedHeader');
                    $('body').css('margin-top', $('#mainHeader').outerHeight(true));

                }else{
                    $('#mainHeader').removeClass('fixedHeader');
                    $('body').css('margin-top', 0);

                }
            }
        });
     
        var $offset ='';
        if($(window).width() > 1024  ){

            $offset = $('.fixedHeader').outerHeight(true)/2 + 20;

        }else{
           
                $offset = 0;
        }
        if($('.localscroll').length){    
            $('.localscroll').localScroll({
                lazy: true,
                lock: true,
                hash: false,
                offset: {
                    top:  -($offset)
                }
            });
        }

        var isMobile = false;

        if(Modernizr.mq('only all and (max-width: 1024px)') ) {
            isMobile = true;
        }

        
        if (isMobile === false && ($('#paralaxSlice1').length  ||isMobile === false &&  $('#paralaxSlice2').length  ||isMobile === false &&  $('#paralaxSlice4').length  || isMobile === false &&  $('#paralaxSlice5').length  || isMobile === false &&  $('#paralaxSlice6').length  || isMobile === false &&  $('#paralaxSlice7').length || isMobile === false &&  $('#paralaxSlice8').length || isMobile === false &&  $('#paralaxSlice9').length || isMobile === false &&  $('#paralaxSlice10').length || isMobile === false &&  $('#paralaxSlice11').length || isMobile === false &&  $('#paralaxSlice12').length ))
        {


            $(window).stellar({
                horizontalScrolling: false,
                responsive:true/*,
                scrollProperty: 'scroll',
                parallaxElements: false,
                horizontalScrolling: false,
                horizontalOffset: 0,
                verticalOffset: 0*/
            });

        }

  

    }


//END WINDOW LOAD
});


/*
|--------------------------------------------------------------------------
| FUNCTIONS
|--------------------------------------------------------------------------
*/

/* CONTACT FROM */

jQuery(function() {
    "use strict";
    if( jQuery("#contactfrm").length ){

      jQuery("#contactfrm").validate({
        // debug: true,
        errorPlacement: function(error, element) {
            error.insertBefore( element );
        },
        submitHandler: function(form) {
            jQuery(form).ajaxSubmit({
              target: ".result"
          });
        },
        onkeyup: false,
        onclick: false,
        rules: {
            name: {
                required: true,
                minlength: 3
            },
            email: {
                required: true,
                email: true
            },
            phone: {
                required: true,
                minlength: 10,
                digits:true
            },
            comment: {
                required: true,
                minlength: 10,
                maxlength: 350
            }
        }
    });
  }

  if( jQuery("#projectQuote").length){

      jQuery("#projectQuote").validate({
        // debug: true,
        errorPlacement: function(error, element) {
            error.insertBefore(element);
        },
        submitHandler: function(form) {
            jQuery(form).ajaxSubmit({
              target: ".quoteResult"
          });
        },
        onkeyup: false,

        
        rules: {
            name: {
                required: true,
                minlength: 3
            },
            email: {
                required: true,
                email: true
            },
            company: {
                required: true,
                minlength: 2
            },
            quoteType:{
                required: true
            },
            comment: {
                required: true,
                minlength: 10,
                maxlength: 350
            }

        }
    });



  }

});

/* CONTACT FROM */

/* FLEXSLIDER INNER INFO CUSTOM ANIMATION */
function animateTxt(curSlide, action){
    "use strict";
    if(action === 'in'){
        var i = 0;
        var animaDelay = 0;

        $('.slideN'+curSlide+':not([class*=clone])>.caption').css('display', 'block');

        $('.slideN'+curSlide+':not([class*=clone])>.caption>div').each(function( ) {
            if(Modernizr.csstransitions) { 

                $(this).css('-webkit-animation-delay', animaDelay+'s');
                $(this).css('-moz-animation-delay', animaDelay+'s');
                $(this).css('-0-animation-delay', animaDelay+'s');
                $(this).css('-ms-animation-delay', animaDelay+'s');
                $(this).css('animation-delay-delay', animaDelay+'s');

                $(this).show().addClass('animated').addClass($(this).attr('data-animation'));


                // $(this).show('slow', function() {
                //     $(this).addClass('animated').addClass($(this).attr('data-animation'));
                // });


            }else{
                var timing;
                $('.slideN'+curSlide+':not([class*=clone])>.caption>div').hide();
                if (i === 0){timing = 0;}else if(i === 1){timing = 300;} else{ timing = 300 * i;}
                $(this).delay(timing).fadeIn('fast');
            }
            i++;
            animaDelay = animaDelay+0.2;


        });

    }else{
        var j = 0;
        $('.slideN'+curSlide+':not([class*=clone])>.caption').css('display', 'none');

        $('.slideN'+curSlide+':not([class*=clone])>.caption>div').each(function( ) {
         if(Modernizr.csstransitions) { 

             $(this).removeClass($(this).attr('data-animation')).removeClass('animated').hide();

         }else{
            $(this).hide();
        }
        j++;
    });
    }

}



/* MAIN MENU (submenu slide and setting up of a select box on small screen)*/
(function() {
    "use strict";
    var $mainMenu = $('#mainMenu').children('ul');

    $mainMenu.on('mouseenter', 'li', function() {


        var $this = $(this),
        $subMenu = $this.children('ul');


        if( $subMenu.length ){$this.addClass('hover').stop();}
        else {
            if($this.parent().is($(':gt(1)', $mainMenu))){
                $this.stop(false, true).hide().fadeIn('slow');
            }else{
                $this.stop(false, true);
            }
        }


        if($this.parent().is($(':gt(1)', $mainMenu))){

            $subMenu.css('display', 'block');
            $subMenu.stop(false, true).animate({
                left:150, 
                opacity:1
            }, 250,'easeInOutQuad');
            
        }else{

            $subMenu.stop(false, true).slideDown(200,'easeInOutQuad'); 
            
        }


    }).on('mouseleave', 'li', function() {


        var $nthis = $(this),
        $subMenu = $nthis.children('ul');

        if($nthis.parent().is($(':gt(1)', $mainMenu))){

            //$nthis.children('ul').stop(false, true).css('left', 130).css('opacity', 0).css('display', 'none');

            $nthis.children('ul').stop(false, true).animate({
                left:130, 
                opacity:0
            }, 250,'easeInOutQuad', function() {
                $nthis.children('ul').css('display', 'none');
            });

        }else{

            $nthis.removeClass('hover').removeClass('Shover').children('ul').stop(false, true).hide();
        }
        
        
        
        if( $subMenu.length ){$nthis.removeClass('hover');}
        else{$nthis.removeClass('Shover');}
        
        
    });

	if ($('#resMainMenu').length){
		 responsiveNav("#resMainMenu", {jsClass: "jsNav"});
	
	}else{
    
    // ul to select
    var optionsList = '<option value="" selected>Navigate...</option>';
    $mainMenu.find('li').each(function() {
        var $this   = $(this),
        $anchor = $this.children('a'),
        depth   = $this.parents('ul').length - 1,
        indent  = '';

        if( depth ) {
            while( depth > 0 ) {
                indent += ' - ';
                depth--;
            }
        }

        optionsList += '<option value="' + $anchor.attr('href') + '">' + indent + ' ' + $anchor.text() + '</option>';
    }).end().after('<select class="responsive-nav">' + optionsList + '</select>');

    $('.responsive-nav').on('change', function() {
        window.location = $(this).val();
    });
	}

})();


/*
|--------------------------------------------------------------------------
| GOOGLE MAP
|--------------------------------------------------------------------------
*/

function appendBootstrap() {
    "use strict";
    var script = document.createElement("script");
    script.type = "text/javascript";
    script.src = "http://maps.google.com/maps/api/js?sensor=false&callback=initialize";
    document.body.appendChild(script);
}    




function initialize(id) {
    "use strict";
    var image = 'images/icon-map.png';

    var overlayTitle = 'Agencies';

    var locations = [
        //point number 1
        ['Madison Square Garden', '4 Pennsylvania Plaza, New York, NY'],

        //point number 2
        ['Best town ever', 'Santa Cruz', 36.986021, -122.02216399999998],

        //point number 3 
        ['Located in the Midwestern United States', 'Kansas'],

        //point number 4
        ['I\'ll definitly be there one day', 'Chicago', 41.8781136, -87.62979819999998] 
    ];

/*** DON'T CHANGE ANYTHING PASSED THIS LINE ***/
id = (id === undefined) ? 'mapWrapper' : id;

var map = new google.maps.Map(document.getElementById(id), {
    mapTypeId: google.maps.MapTypeId.ROADMAP,
    scrollwheel: false,
    zoomControl: true,
    zoomControlOptions: {
        style: google.maps.ZoomControlStyle.LARGE,
        position: google.maps.ControlPosition.LEFT_CENTER
    },
    streetViewControl:true,
    scaleControl:false,
    zoom: 14

});

var myLatlng;
var marker, i;
var bounds = new google.maps.LatLngBounds();
var infowindow = new google.maps.InfoWindow({ content: "loading..." });

for (i = 0; i < locations.length; i++) { 


    if(locations[i][2] !== undefined && locations[i][3] !== undefined){
        var content = '<div class="infoWindow">'+locations[i][0]+'<br>'+locations[i][1]+'</div>';
        (function(content) {
            myLatlng = new google.maps.LatLng(locations[i][2], locations[i][3]);

            marker = new google.maps.Marker({
                position: myLatlng,
                icon:image,  
                title: overlayTitle,
                map: map
            });

            google.maps.event.addListener(marker, 'click', (function() {
                return function() {
                    infowindow.setContent(content);
                    infowindow.open(map, this);
                };

            })(this, i));

            if(locations.length > 1){
                bounds.extend(myLatlng);
                map.fitBounds(bounds);
            }else{
                map.setCenter(myLatlng);
            }

        })(content);
    }else{

        var geocoder   = new google.maps.Geocoder();
        var info   = locations[i][0];
        var addr   = locations[i][1];
        var latLng = locations[i][1];

        (function(info, addr) {

            geocoder.geocode( {

                'address': latLng

            }, function(results) {

                myLatlng = results[0].geometry.location;

                marker = new google.maps.Marker({
                    position: myLatlng,
                    icon:image,  
                    title: overlayTitle,
                    map: map
                });
                var $content = '<div class="infoWindow">'+info+'<br>'+addr+'</div>';
                google.maps.event.addListener(marker, 'click', (function() {
                    return function() {
                        infowindow.setContent($content);
                        infowindow.open(map, this);
                    };
                })(this, i));

                if(locations.length > 1){
                    bounds.extend(myLatlng);
                    map.fitBounds(bounds);
                }else{
                    map.setCenter(myLatlng);
                }
            });
        })(info, addr);

    }
}
}







/* ANALYTICS */
function gaSSDSLoad (acct) {
  "use strict";  
  var gaJsHost = (("https:" === document.location.protocol) ? "https://ssl." : "http://www."),
  pageTracker,
  s;
  s = document.createElement('script');
  s.src = gaJsHost + 'google-analytics.com/ga.js';
  s.type = 'text/javascript';
  s.onloadDone = false;
  function init () {
    pageTracker = _gat._getTracker(acct);
    pageTracker._trackPageview();
}
s.onload = function () {
    s.onloadDone = true;
    init();
};
s.onreadystatechange = function() {
    if (('loaded' === s.readyState || 'complete' === s.readyState) && !s.onloadDone) {
      s.onloadDone = true;
      init();
  }
};
document.getElementsByTagName('head')[0].appendChild(s);
}




jQuery(function($){
    "use strict";
    if($('#home').length){

        $('#home').height($(window).height());

        $.supersized({

                    // Functionality
                    slideshow               :   1,          // Slideshow on/off
                    autoplay                :   1,          // Slideshow starts playing automatically
                    start_slide             :   1,          // Start slide (0 is random)
                    stop_loop               :   0,          // Pauses slideshow on last slide
                    random                  :   0,          // Randomize slide order (Ignores start slide)
                    slide_interval          :   12000,      // Length between transitions
                    transition              :   6,          // 0-None, 1-Fade, 2-Slide Top, 3-Slide Right, 4-Slide Bottom, 5-Slide Left, 6-Carousel Right, 7-Carousel Left
                    transition_speed        :   1000,       // Speed of transition
                    new_window              :   1,          // Image links open in new window/tab
                    pause_hover             :   0,          // Pause slideshow on hover
                    keyboard_nav            :   1,          // Keyboard navigation on/off
                    performance             :   1,          // 0-Normal, 1-Hybrid speed/quality, 2-Optimizes image quality, 3-Optimizes transition speed // (Only works for Firefox/IE, not Webkit)
                    image_protect           :   1,          // Disables image dragging and right click with Javascript

                    // Size & Position                         
                    min_width               :   0,          // Min width allowed (in pixels)
                    min_height              :   0,          // Min height allowed (in pixels)
                    vertical_center         :   1,          // Vertically center background
                    horizontal_center       :   1,          // Horizontally center background
                    fit_always              :   0,          // Image will never exceed browser width or height (Ignores min. dimensions)
                    fit_portrait            :   1,          // Portrait images will not exceed browser height
                    fit_landscape           :   0,          // Landscape images will not exceed browser width

                    // Components                           
                    slide_links             :   'blank',    // Individual links for each slide (Options: false, 'num', 'name', 'blank')
                    thumb_links             :   0,          // Individual thumb links for each slide
                    thumbnail_navigation    :   0,          // Thumbnail navigation
                    slides                  :   [           // Slideshow Images
                    {image : '/assets/super/supersized-1.jpg', title : '<h1 class="bigTitle">Sun is shining<br /> <small>the weather is sweet</small></h1><a href="#news" class="btn sliderBtn" >Read more</a>', thumb : '', url : ''},

                    {image : '/assets/super/supersized-2.jpg', title : '<h1 class="bigTitle">Moon is rising<br /> <small>the night is bitter</small></h1><a href="#works" class="btn sliderBtn" >Check our work</a>', thumb : '', url : ''},
					 
					{image : '/assets/super/supersized-3.jpg', title : '<h1 class="bigTitle">Groove is in the heart<br /> <small>ahaaanhaan</small></h1><a href="#works" class="btn sliderBtn" >More info</a>', thumb : '', url : ''}
                    ],

                    // Theme Options               
                    progress_bar            :   0,          // Timer for each slide                         
                    mouse_scrub             :   0
                    
                });
}
});





