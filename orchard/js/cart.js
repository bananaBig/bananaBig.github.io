$(function(){
	$('.head').load('cart-head.html',function(){
		$.getScript('js/head.js')
	})
	
	$('.foot').load('foot.html',function(){
		$.getScript('js/foot.js')
	})

	
	var Cart = {
		cart: {},
		data: {},
		pay: {},
		goods: $('.cart-goods'),
		stock: 0,
		init: function(){
			this.readCookie();
			
			
			var that = this;
			$.getJSON('js/data.json',function(data){
				delete that.cart['num'];
				for(var key in that.cart){
					(function(k){
						var ul = $('<ul class="cart-goods-item clear"></ul>');
						ul.load('goodsInfo.html',function(){
							var gid = that.cart[k]['goods-id']
							ul.attr('data-gid',gid);
							that.stock = data[gid]['stock'];
							ul.find('.cart-imgs  img ').html( data[gid]['color']);
							ul.find('.cart-name  a').html( data[gid]['goods-name']);
							ul.find('.cart-standard  p').html( data[gid]['goods-standard']);
							ul.find('.cart-price  p').html( data[gid]['goods-price'].toFixed(2) );
							ul.find('.amount-input').val(  that.cart[k]['num'] );
							var total = that.cart[k]['num'] * data[gid]['goods-price']
							ul.find('.cart-sale  p').html(  total.toFixed(2) );
							that.goods.append( ul );
						})
					})(key)
				};
			});
			
			this.increase();
			this.decrease();
			this.input();
			this.delete();
		},
		
		increase:function(){
			var that = this;
			this.goods.on( 'click','.inC',function(){
				var amount = parseInt( $(this).prev().val() );
				if( amount >= that.stock){
					return;
				};
				amount++;
				$(this).prev().val( amount )
				that.handleCookie( $(this).prev() )
			})
		},
		
		decrease:function(){
			var that = this;
			this.goods.on( 'click','.deC',function(){
				var amount = parseInt( $(this).next().val() );
				if( amount <= 1){
					return;
				};
				amount--;
				$(this).next().val( amount )
				that.handleCookie( $(this).next() )
			})
		},
		
		input:function(){
			var that = this;
			this.goods.on( 'input','.amount-input',function(){
				var amount = parseInt( $(this).val() );
				console.log( amount)
				
				if( amount >= that.stock){
					$(this).val( that.stock )
					return;
				};
				
				if( isNaN(amount) || amount == 0){
					$(this).val( 1 )
					return;
				};
				$(this).val( amount )
				that.handleCookie( $(this) );
			})
		},
		
		handleCookie: function( input ){
			var goodsItem = $('.cart-goods-item');
			var gid = goodsItem.data('gid')
			var price = parseFloat(  goodsItem.find('.cart-price > p').html()  );
			var total = goodsItem.find('.cart-sale');
			var totalMoney = ( parseInt( input.val() ) * price ).toFixed(2)
			total.html( totalMoney );
			
			this.cart[gid]['num']= parseInt( input.val() );
			
			this.setCookie();
			
			this.pay[gid] = totalMoney;
			console.log( this.pay)
			this.handlePay();
		},
		
		handlePay: function(){
			var goodsNum = $('.goods-num');
			var goodsMoney = $('.goods-money > em');
			
			var totalNum = 0;
			var totalMoney = 0;
			for( var key in this.pay){
				totalNum++;
				totalMoney += parseFloat(this.pay[key])
			}
			goodsNum.html( totalNum );
			goodsMoney.html( totalMoney );
		},
		
		delete: function(){
			var that = this;
			that.goods.on('click','.delete',function(){
				if( confirm( '确定删除此商品吗？' )){
					$(this).parents('.cart-goods-item').remove();
					var gid = $(this).parents('.cart-goods-item').data('gid');
					console.log( that.cart[gid])
					delete that.cart[gid];
					that.setCookie();
				}
			})
		},
		
		readCookie: function(){
			this.cart = $.cookie('orchard') || {};
			this.cart = JSON.parse( this.cart );
			console.log( this.cart)
		},
		
		setCookie: function(){
			$.cookie( 'orchard',JSON.stringify( this.cart ),{expires:365,path:'/'});
		}
	}
	
	Cart.init();
	
})
