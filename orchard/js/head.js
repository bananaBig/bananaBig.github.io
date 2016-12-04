$(function(){
	$('.p-common-region,.p-common-regionCon').hover(
		function(){
			$('.p-common-regionCon').toggle()
		}
	);
	
	$('.p-common-topsubnav').eq(0).hover(
		function(){
			$(this).css({
				background:'#fff'
			});
			$(this).find('.p-common-noticelist').show();
		},
		function(){
			$(this).css({
				background:'#eee'
			});
			$(this).find('.p-common-noticelist').hide();
		}
	);
	
	
	$('.p-common-topsubnav').eq(1).hover(
		function(){
			$(this).css({
				background:'#fff'
			});
			$(this).find('.p-common-topcode').show();
		},
		function(){
			$(this).css({
				background:'#eee'
			});
			$(this).find('.p-common-topcode').hide();
		}
	);
	
})
