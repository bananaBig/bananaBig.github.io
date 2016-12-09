$(function(){
	$('.head').load('head.html',function(){
		$.getScript('js/head.js')
	})
	
	$('.foot').load('foot.html',function(){
		$.getScript('js/foot.js')
	})
	
	var detail = {
		 small: $('.small'),
		 big: $('.big'),
		
		init: function(){
			this.sHover();
			
			this.main = $('.detail');
			this.small = this.main.find('.small');
			this.subtract = this.main.find('.subtract');
			this.add = this.main.find('.add');
			this.amountInput = this.main.find('.num-input');
			this.data = {};
			
			this.initData()
		},
		
		initData: function(){
			var that = this;
			var gid = this.main.data('gid');
			$.getJSON( 'js/data.json',function( result ){
				that.data = result[gid];
				
				that.pdData();
				that.decrease();
				that.increase();
				that.input();
				that.addCart();
			})
		},
		
		pdData: function(){
			var nameStr = '<h3>'+this.data['goods-name']+'</h3>';
			$('.p-name').prepend( nameStr );
			var price = '<span class="goods-price">'+this.data['goods-price']+'</span>';
			$('.price').append( price );
			var current = '<span class="current">'+this.data['goods-standard']+'</span>';
			$('.norms').append( current );
			
		},
		/*减少*/
		decrease: function(){
			var  that = this;
			this.subtract.click(function(){
				var amount = parseInt( that.amountInput.val() );
				if( amount <= 1 ){
					return;
				}
				amount--;
				that.amountInput.val( amount );
			})
		},
		
		increase: function(){
			var  that = this;
			this.add.click(function(){
				var amount = parseInt( that.amountInput.val() );
				if( amount >= that.data.stock ){
					return;
				}
				amount++;
				that.amountInput.val( amount );
			})
		},
		
		input: function(){
			var  that = this;
			this.amountInput.on('input',function(){
				var amount = that.amountInput.val();
				var stock = that.data.stock;
				
				if( amount == ""){
					return;
				};
				
				
				if( isNaN(amount) || amount == 0 ){
					that.amountInput.val ( 1 )
					return;
				}
				
				amount = parseInt(amount);
				
				if( amount >= stock){
					that.amountInput.val ( stock )
					return;
				}
				
				that.amountInput.val ( amount )
			});
			
			this.amountInput.blur(function(){
				var amount = that.amountInput.val();
				if( amount == ""){
					that.amountInput.val ( 1 )
				}
			});
		},
		
		addCart: function(){
			var that = this;
			$('.addCart').click(function(){
				var gid = that.main.data('gid');
				var amount = parseInt(that.amountInput.val());
				
				var cart = $.cookie('orchard')|| '{}';
				cart = JSON.parse( cart);
				
				if( !cart[gid]){
					cart[gid] = {
						'goods-id': gid,
						'num': amount
					}
				}else{
					cart[gid].num+= amount;
				}
				
				$.cookie( 'orchard' , JSON.stringify( cart ), {expires:365,path: '/'})
				
				alert('添加成功');
				console.log( JSON.parse( $.cookie( 'orchard') ))
			})
		},
		
		sHover: function(){
			var that = this;
			that.small.find('li').hover(
				function(){
					$(this).addClass('cur').siblings().removeClass('cur');
					$(this).find('span').show().parent().siblings().find('span').hide();
					 that.big.find('li').eq( $(this).index() ).show().siblings().hide();
				}
			)
		}
		
	}
	
	detail.init();
})
