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

		init: function(){
			var that =this
			$(document).ready(function() {
			    if ( $.cookie("rmbUser") == "true" ) {
			        $("#blankCheckbox").attr("checked", true);
			        that.phone.val($.cookie("user"));
			        that.paw.val($.cookie("password"));
			    }
			});
			
			this.click();
			this.createV();
			this.vClick();
			this.focus();
			this.blur();
		},
		/*提交信息*/
		click: function(){
			var that = this;
			this.submit.click(function(){
				if(  ( that.phone.val() == '' || that.phone.val() != $.cookie( "user" ) )
						||
					 ( that.paw.val() == '' || that.paw.val() != $.cookie( "password" ) )
				){
					that.phone.addClass('hasError').next().addClass('error');
					that.paw.addClass('hasError').next().addClass('error');
					alert('信息不正确');
					that.submit.attr('href','javescript:;')
					return;
				}else{
					that.phone.next().show();
					that.paw.next().show();
					that.submit.attr('href','index.html')
				};
				
				/*$('.yanZ').show();
				
				if( that.vertifyU.val() != that.vertify.html() ){
					that.vertifyU.addClass('hasError').next().addClass('error');
					alert('验证码不正确')
					return;
				}else{
					that.vertifyU.next().show();
				};*/
			
				
				if( $('#blankCheckbox').prop( 'checked' ) ){
					$.cookie( "rmbUser",true,{expires:10,path: '/'}) 
					$.cookie( "user",that.phone.val(),{expires:10,path: '/'});
					$.cookie( "password",that.paw.val(),{expires:10,path: '/'});
				}else{
					$.cookie( "rmbUser",false,{expires:-1,path: '/'}) 
					$.cookie( "user",{expires:-1,path: '/'});
					$.cookie( "password",{expires:-1,path: '/'});
				}
				
				alert( '登录成功' );
			})
		},
		
		/*获焦时候删除错误class*/
		focus: function(){
			$( '.phone,.password' ).on('focus',function(){
				$(this).removeClass('hasError').next().removeClass('error');
			})
		},
		
		
		/*失焦事件*/
		blur: function(){
			var  that =this;
			$( '.phone,.password' ).on('blur',function(){
				
				if( that.phone.val() == '' || that.phone.val() != $.cookie( "user" ) ){
					that.phone.addClass('hasError').next().addClass('error');
				}else{
					that.phone.next().show();
				};
				
				if( that.paw.val() == '' || that.paw.val() != $.cookie( "password" ) ){
					that.paw.addClass('hasError').next().addClass('error');
				}else{
					that.paw.next().show();
				};
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
		}
	}
	
	
	login.init();
})





				



				






				

