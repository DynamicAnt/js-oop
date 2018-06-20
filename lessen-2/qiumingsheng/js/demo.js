$(function(){	

	var template1 = function($panel){
		var prodNameLength = 0;
		var prodScore = 0;
		var _this = this;

		var data = {
			prop1:"",
			prop2:"",
			prop3:"",
			area:"",
			brand:"",
			model:"",
			word:""
		};

		var errors = {
			prop1:{
				message:"请填写属性1"
			},
			prop2:{
				message:"请填写属性2"
			},
			prop3:{
				message:"请填写属性3"
			},
			word:{
				message:"请填写核心词"
			},
			extra:{
				message:"地区、品牌、型号至少填写一项"
			}
		};

		var validationAndShow = function(name,isValid){
			if(!isValid){
				$panel.find('div[name="error.'+name+'"]').html(errors[name].message).show();
			}else{
				$panel.find('div[name="error.'+name+'"]').empty().hide();
			}
			return isValid;

		};

		var validation = {
			isPropValid: function(name){
				return validationAndShow(name,data[name]!=="");
			},
			isExtraValid: function(){
				return validationAndShow("extra",data.area!==""||data.brand!==""||data.model!=="");;
			},
			isWordValid: function(){
				return validationAndShow("word",data.word!=="");
			}
		};

		this.isValid = function(){
			var isProp1Valid = validation.isPropValid('prop1');
			var isProp2Valid = validation.isPropValid('prop2');
			var isProp3Valid = validation.isPropValid('prop3');
			var isPropValid = isProp1Valid&&isProp2Valid&&isProp3Valid;
			var isExtraValid = validation.isExtraValid();
			var isWordValid = validation.isWordValid();
			return isPropValid&&isExtraValid&&isWordValid;
		}
		this.generateName = function(){
			return data.prop1+data.prop2+data.area+data.brand+data.model+data.prop3+data.word;
		}

		var updateScore = function(){
			prodScore = prodNameLength>20?100:prodNameLength*5;
		}

		this.updateScoreView = function(){
			$('.js-score').text(prodScore);
			$('#prodNameStar').attr('class','').addClass('star star-full star-'+Math.floor(prodScore/10));
		}

		this.reset = function(){
			for(var name in data){
				$panel.find('input[name="'+name+'"]').val('');
				$panel.find('.js-name').find('span[name="'+name+'"]').text('');
				data[name] = "";
			}
			$panel.find('.form-error').empty().hide();
			prodNameLength = 0;
			prodScore = 0;
			_this.updateScoreView();
		}

		//为Input框绑定keyup和失焦事件
		for(var name in data){
			(function(name){
				$panel.find('input[name="'+name+'"]').keyup(function(){
					data[name] = $.trim($(this).val());
					$panel.find('.js-name').find('span[name="'+name+'"]').text(data[name]);
				});
				$panel.find('input[name="'+name+'"]').blur(function(){
					var type = $(this).data('type');
					var method = "is"+type.substring(0,1).toUpperCase()+type.substring(1)+"Valid";
					validation[method].call(this,name);
		
					var length = _this.generateName().length;
					if(length!==prodNameLength){
						prodNameLength = length;
						updateScore();
						_this.updateScoreView();
					}
				});
			})(name);
		}
	}

	var template2 = function($panel){
		var prodScore = 0;
		var _this = this;

		var data = {
			prop1:"",
			prop2:"",
			prop3:"",
			prop4:"",
			area:"",
			brand:"",
			model:"",
			word:"",
			alias1:"",
			alias2:""
		};

		var errors = {
			prop1:{
				message:"请填写属性1"
			},
			prop2:{
				message:"请填写属性2"
			},
			prop3:{
				message:"请填写属性3"
			},
			prop4:{
				message:"请填写属性4"
			},
			word:{
				message:"请填写核心词"
			},
			alias1:{
				message:"请填写别名1"
			},
			alias2:{
				message:"请填写别名2"
			},
		};

		var validationAndShow = function(name,isValid){
			if(!isValid){
				$panel.find('div[name="error.'+name+'"]').html(errors[name].message).show();
			}else{
				$panel.find('div[name="error.'+name+'"]').empty().hide();
			}
			return isValid;

		};

		var isInputValid = function(name){
			return validationAndShow(name,data[name]!=="");
		};

		this.isValid = function(){
			var flag = true;
			for(var prop in errors){
				flag = isInputValid(prop)&&flag ;
			}
			return flag;
		}
		this.generateName = function(){
			return data.prop1+data.prop2+data.word+data.area+data.brand+data.model+data.alias1+data.prop3+data.prop4+data.alias2;
		}

		var updateScore = function(){
			var i=0;
			for(var prop in data){
				if(data[prop]!==""){
					i++;
				}
			}
			prodScore = i*10;
		}

		this.updateScoreView = function(){
			$('.js-score').text(prodScore);
			$('#prodNameStar').attr('class','').addClass('star star-full star-'+Math.floor(prodScore/10));
		}

		this.reset = function(){
			for(name in data){
				$panel.find('input[name="'+name+'"]').val('');
				$panel.find('.js-name').find('span[name="'+name+'"]').text('');
				data[name] = "";
			}
			$panel.find('.form-error').empty().hide();
			prodScore = 0;
			_this.updateScoreView();
		}

		//为Input框绑定keyup和失焦事件
		for(var name in data){
			(function(name){
				$panel.find('input[name="'+name+'"]').keyup(function(){
					data[name] = $.trim($(this).val());
					$panel.find('.js-name').find('span[name="'+name+'"]').text(data[name]);
				});
				$panel.find('input[name="'+name+'"]').blur(function(){
					isInputValid(name);
					updateScore();
					_this.updateScoreView();
				});
			})(name);
		}
	}

	var template1 = new template1($('.js-node').children().eq(0));
	var template2 = new template2($('.js-node').children().eq(1));
	var templateArr = [template1,template2];
	var template = template1;

	var chooseTab = function(i){
		$tab = $('.js-tab li').eq(i);
		$tab.addClass('on');
		$tab.siblings().removeClass('on');

		var $node = $('.js-node').children().eq(i);
		$node.addClass('on');
		$node.siblings().removeClass('on');

	}

	$('.js-tab li').each(function(i){
		$(this).on('click',function(){
			chooseTab(i);
			template = templateArr[i];
			template.updateScoreView();
		});
	});
	//点击产品标题输入框弹出模板弹窗；
	$('.js-prod-name').on('click',function(){
		$('.js-alpha,.js-prod-name-pop').show();
	})
	$('.js-close').on('click',function(){
		$('.js-alpha,.js-prod-name-pop').hide();
	})
	 //提交按钮
	 $('.js-btnsubmit').click(function(){
		if(template.isValid()){
			var prodName  = template.generateName();
			$('.js-prod-name').val(prodName);
		   	$('.js-alpha,.js-prod-name-pop').hide();
		}
	 })

	 //点击取消按钮清空弹窗内数据
	 $('.js-btnreset').click(function(){
		 for(var i = 0;i<templateArr.length;i++){
			templateArr[i].reset(); 
		 }
		 chooseTab(0);

	 	$('.js-alpha,.js-prod-name-pop').hide();
	 })
});