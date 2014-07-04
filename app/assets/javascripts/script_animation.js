/* 
     ______  __  __  ______  ______       _____   ______  ______  ______    
    /\  == \/\ \_\ \/\__  _\/\  ___\     /\  __-./\  ___\/\  == \/\__  _\   
    \ \  __<\ \____ \/_/\ \/\ \  __\     \ \ \/\ \ \  __\\ \  _-/\/_/\ \/   
     \ \_____\/\_____\ \ \_\ \ \_____\    \ \____-\ \_____\ \_\     \ \_\   
      \/_____/\/_____/  \/_/  \/_____/     \/____/ \/_____/\/_/      \/_/   

*/
jQuery.noConflict();
jQuery(document).ready(function(e) {
	jQuery("#process").parents(".container,.span12").css("width","100%");
   jQuery("#process ul li").hover(function(){
	   jQuery("#process ul li").removeClass("open");
	   jQuery(this).addClass("open");
	   jQuery(this).find(".animation").children().removeClass("reverse");
	   jQuery(this).find(".animation").children().addClass("play");
	},function(){
		
		if(jQuery(this).attr("id")!="part1"){
		   jQuery(this).find(".animation").children().addClass("reverse");
		   jQuery(this).find(".animation").children().removeClass("play");
		}
	});
	 jQuery("#technology .stacks").hover(function(){
			jQuery(this).toggleClass("open");
			jQuery(this).find("li:nth-child(1) .animation").children().addClass("play");
	 },function(){
		 	jQuery(this).toggleClass("open");
		    jQuery(this).find("li:nth-child(1) .animation").children().removeClass("play");
	 });
});