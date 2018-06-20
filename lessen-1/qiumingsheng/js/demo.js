$(function(){	
	var prodNameLength = 0;
	var prodScore = 0;

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
			$('body').find('div[name="error.'+name+'"]').html(errors[name].message).show();
		}else{
			$('body').find('div[name="error.'+name+'"]').empty().hide();
		}
		return isValid;

	};

	var validation = {
		isPropValid: function(name){
			return validationAndShow(name,data[name]!=="");
		},
		isExtraValid: function(){
			return validationAndShow("extra",data.area!==""||data.brand!==""||data.model!=="");
		}
	};

	var isValid = function(){
		var flag = true;
		$('input[data-type=prop]').each(function(){
			flag = validation.isPropValid($(this).attr('name')) && flag;
		});
		var isExtraValid = validation.isExtraValid();
		return flag&&isExtraValid;
	}

	var generateName = function(){
		return data.prop1+data.prop2+data.area+data.brand+data.model+data.prop3+data.word;
	}

	var updateScore = function(){
		prodScore = prodNameLength>20?100:prodNameLength*5;
	}

	var updateScoreView = function(){
		$('.js-score').text(prodScore);
		$('#prodNameStar').attr('class','').addClass('star star-full star-'+Math.floor(prodScore/10));
	}

	var reset = function(){
		for(name in data){
			$('body').find('input[name="'+name+'"]').val('');
			$('.js-name').find('span[name="'+name+'"]').text('');
			data[name] = "";
		}
		$('body').find('.form-error').empty().hide();
		prodNameLength = 0;
		prodScore = 0;
		updateScoreView();
	}

	//为Input框绑定keyup和失焦事件
	for(var name in data){
		(function(name){
			$('input[name="'+name+'"]').keyup(function(){
				data[name] = $.trim($(this).val());
				$('.js-name').find('span[name="'+name+'"]').text(data[name]);
			});
			$('input[name="'+name+'"]').blur(function(){
				var type = $(this).data('type');
				var method = "is"+type.substring(0,1).toUpperCase()+type.substring(1)+"Valid";
				validation[method].call(this,name);
	
				var length = generateName().length;
				if(length!==prodNameLength){
					prodNameLength = length;
					updateScore();
					updateScoreView();
				}
			});
		})(name);
	}

	//点击产品标题输入框弹出模板弹窗；
	$('.js-prod-name').on('click',function(){
		$('.js-alpha,.js-prod-mod').show();
	})
	$('.js-close').on('click',function(){
		$('.js-alpha,.js-prod-mod').hide();
	})
	 //提交按钮
	 $('.js-btnsubmit').click(function(){
		if(isValid()){
			$('.js-prod-name').val(generateName());
		   	$('.js-alpha,.js-prod-mod').hide();
		}
	 })

	 //点击取消按钮清空弹窗内数据
	 $('.js-btnreset').click(function(){
		reset(); 
	 	$('.js-alpha,.js-prod-mod').hide();
	 })
});