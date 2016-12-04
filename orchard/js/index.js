$(function(){
	$('.head').load('head.html',function(){
		$.getScript('js/head.js')
	})
	
	$('.foot').load('foot.html',function(){
		$.getScript('js/foot.js')
	})
	
	
	//轮播图
	var banner = {
		bannerCon: $('.banner'),
		imgCon: $('.banner > ul'),
		imgs: $('.banner > ul > li'),
		disc: null,
		width: 0,
		index: 0,
		timer: null,
		init:function(){
			this.width = $('body').width();
			this.imgs.width(this.width);
			this.imgs.show();
			
			this.autoPlay();
			this.createDisc();
			this.disc = $('.disc-item');
			
			this.showDisc();
			this.cleartimer()
		},
		
		//生成小圆圈
		createDisc:function(){
			var content = "";
			this.imgs.each(function(k){
				content+= '<span class="disc-item"></span>'
			});
			$('.banner .discCon').html(content);
			$('.banner .discCon').children().eq(0).addClass('active');
		},
		
		//给小圆圈添加点击事件
		showDisc: function(){
			var that = this;
			$('.discCon').on('click','span',function(){
				$(this).addClass('active').siblings().removeClass('active');
				that.index = $(this).index();
				console.log(that.index)
				that.imgSwitch();
			});
		},
		
		//给整个banner添加触摸事件
		cleartimer: function(){
			var that =this;
			this.bannerCon.hover(
				function(){
					clearInterval(that.timer)
				},
				function(){
					that.autoPlay()
				}
			)
		},
		
		//自动运动轮播
		autoPlay: function(){
			var that = this;
			this.timer = setInterval(function(){
				that.index++;
				that.imgSwitch();
			},1400)
		},
		
		
		imgSwitch: function(){
			this.index %= this.imgs.length;
			this.disc.eq(this.index).addClass('active').siblings().removeClass('active');
			this.imgCon.stop(true).animate({
				'margin-left': -(this.width * this.index)
			},800);
		}
	}
	banner.init()
})