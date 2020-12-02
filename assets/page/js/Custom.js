$(document).ready(function () {
	
	$(".entry-hide").hide();
	
	
	$.each($(".imgmargin"),function (e,element)
	 {       
		$(element).parent('a').attr("data-magnify","gallery");
	        $(element).parent('a').attr("data-caption", $(element).parent('a').attr("title"));
	        $(element).parent('a').attr("href", $(element).attr("src").replace("thumb/", ''));
		$(element).parent('a').removeClass( "fancybox-buttons");
		
	});
	
		
	
 if ($(window).width() < 767) {
	 	$('.navbarfull2').removeAttr("style");
 }
    var url = location.href;
    $('.main-menu li').find('a[href="' + url + '"]').parents('li').addClass('active');


    $.each($('.main-menu li ').find('a[href="' + url + '"]').parents('li').find('ul'), function (e, element) {
        $(element).addClass('show');
    });

    var heightview = "";

    if ($(window).width() > 767) {

        $(window).on("load resize scroll", function (e) {
           heightadd();
       });
        $.each($('.main-menu li a').parents('li'), function (e, element) {
            $(element).click(function () {

                heightview = $(this).children('ul').height();

                heightadd();

            });

        });

    }


	 var t=0;
	 
    function heightadd() {
        var mainmenu = $('.navbarfull1').height();      
        var navbarHeigh = $('#main-menu').height();
        var wrapperHeigh = $('#collapsibleNavbar').height();
		var newheight = $('.bd-content').height();
        var heightadd = wrapperHeigh + heightview;
   
        if (heightadd > navbarHeigh) {
            $('#main-menu').css("min-height", heightadd + "px");
			if(t !=0)
			{
				
			$('.navbarfull2').css("min-height", newheight + 32 +  "px");
			}
			t++;
        }
        if (navbarHeigh > heightadd) {
            $('#main-menu').css("min-height", heightadd + "px");
		
			if(t !=0)
			{
				
			$('.navbarfull2').css("min-height", newheight + 32 +  "px");
			}
		t++;
        }
    }
    
        $(".bd-content").css("min-height", screen.height);
		
		
	 var parth = location.hash.toLowerCase();
	 if(parth != "" &&  parth.indexOf('settings')>-1){
console.log("first");
		   $(parth).find(".collapsed").removeClass("collapsed");
		   var id= parth.replace("h","");
		   $(id).addClass("show");
		
	 }
	else
	{  
		console.log("secode");
		parth= parth+"h";
	    $(parth).find("h5 .faq-question").click();
	}
	 
});




   
