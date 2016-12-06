$(function(){
	$('.head').load('login-head.html',function(){
		$.getScript('js/head.js')
	})
	
	$('.foot').load('foot.html',function(){
		$.getScript('js/foot.js')
	})
	
	
	var login = {
		phone: $('.phone'),
		paw: $('.password'),
		checkpaw: $('.checkPaw'),
		vertifyU: $('.vertify-user'),
		vertify: $('.vertify'),
		renovation: $('.renovation'),
		sendV: $('.send-vertify'),
		submit: $('.login-right .submit'),
		
		regP: /^1[3579]\d{9}$/,
		regPaw: /^\w{6,20}$/,
		init: function(){
			this.blur();
			this.createV();
			this.vClick();
			this.sendC();
			this.focus();
		},
		/*失焦事件*/
		blur: function(){
			var that = this;
			this.phone.blur(function(){
				if( that.phone.val() == '' || !that.regP.test( that.phone.val() )){
					that.phone.addClass('hasError').next().addClass('error');
					return;
				}else{
					that.phone.next().show();
				};
			});
			
			this.paw.blur(function(){
				if( that.paw.val() == '' || !that.regPaw.test( that.paw.val() )){
					that.paw.addClass('hasError').next().addClass('error');
					return;
				}else{
					that.paw.next().show();
				};
			});
				
			this.checkpaw.blur(function(){
				if( that.checkpaw.val() == '' || (that.checkpaw.val() != that.paw.val()) ){
					that.checkpaw.addClass('hasError').next().addClass('error');
					return;
				}else{
					that.checkpaw.next().show();
				};
			});	
			
			this.vertifyU.blur(function(){
				if( that.vertifyU.val() == '' || ( that.vertifyU.val() != that.vertify.html()) ){
					that.vertifyU.addClass('hasError').next().addClass('error');
					return;
				}else{
					that.vertifyU.next().show();
				};
			});
			
			
			
			this.submit.click(function(){
				if( $( '.phone,.password,.checkPaw,.vertify-user' ).hasClass('hasError') 
					||
					$( '.phone,.password,.checkPaw,.vertify-user' ).val().length == 0
				){
					alert( '信息错误')
				}else{
					console.log( $( '.phone' || '.password' || '.checkPaw' || '.vertify-user' ).val().length == 0 )
					console.log( $( '.phone,.password,.checkPaw,.vertify-user' ).hasClass('hasError') )
					$.cookie( "user",that.phone.val(),{expires:10,path: '/'});
					$.cookie( "password",that.paw.val(),{expires:10,path: '/'});
					console.log( $.cookie('user') );
					console.log( $.cookie('password') );
				}
			})
		},
		
		/*获焦时候删除错误class*/
		focus: function(){
			$( '.phone,.password,.checkPaw,.vertify-user' ).on('focus',function(){
				$(this).removeClass('hasError').next().removeClass('error');
			})
		},
		
		/*生成验证码*/
		createV: function(){
			var str = '';
			for(var i=0; i<26; i++){
				str += String.fromCharCode(97+i);
			}
			var strUpper = str.toUpperCase();
			var vStr = str + strUpper

			var v = '';
			for(var i=0; i<4; i++){
				// 0 - 61
				var index = parseInt( Math.random()*52 );
				v += vStr[index];
			}
			this.vertify.html( v );
		},
		
		/*刷新验证码*/
		vClick: function(){
			var that = this;
			this.renovation.click( function(){
				that.createV();
			})
		},
		
		/*点击解除禁用*/
		sendC: function(){
			this.sendV.click(function(){
				$(this).prev().removeAttr('disabled');
			})
		}
	}
	
	
	login.init();
})
