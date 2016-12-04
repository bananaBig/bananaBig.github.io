$(function(){
	$(window).scroll(function(){
		$('.return-top').click(function(){
			$('html,body').animate({
				scrollTop : 0
			})
		})
	})
})
