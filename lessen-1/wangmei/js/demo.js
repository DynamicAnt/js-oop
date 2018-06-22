$(function(){	

	//点击输入框显示弹出层/点击弹层小叉叉关闭弹窗
	$('.js-prod-name').on('click',function(){
		$('.js-alpha,.js-prod-name-pop').show();
	})

	$('.js-close').on('click',function(){
		$('.js-alpha,.js-prod-name-pop').hide();
	})

	//获取到各个元素字段 然后做失焦校验
	var prop1 = $('input[name=prop1]');
	var prop2 = $('input[name=prop2]');
	var area  = $('input[name=area]');
	var brand = $('input[name=brand]');
	var model = $('input[name=model]');
	var word  = $('input[name=word]');
	var prop3 = $('input[name=prop3]');
	var length= 0

	var eleValid = function($element){
		var error = $element.closest('td').find('.form-error');
		if($element.val() == ''){
			error.show();
			return false
		}else{
			error.hide();
			return true
		}
	}
	var eleArr = [prop1,prop2,prop3,word];
	for(i = 0;i<eleArr.length;i++){
		eleArr[i].blur(function(){
			eleValid($(this));
		})
	}

	var extraValid = function(){
		var error = $('.js-extra').find('.form-error');
		if(area.val() == '' && brand.val() == '' && model.val() == ''){
			error.show();
			return false
		}else{
			error.hide();
			return true
		}
	}

	var extraArr = [area,brand,model];
	for(i = 0; i < extraArr.length; i++){
		extraArr[i].blur(function(){
			extraValid();
		})
	}

	//实时显示标题 算出标题分数以及评分
	$('.js-prod-temp').find('input').on('input propertychange',function(){
		var prodName = prop1.val() + prop2.val() + area.val() + brand.val() + model.val() + word.val() + prop3.val();
		$('.js-name-value').text(prodName);
		length = prodName.length;
		var score = length * 5;
		score = score > 100?100:score;
		$('.js-score').find('em').text(score);
		$('#nameStar').attr('class','star star-full star-'+ Math.floor(score/10));
	})

	//点击提交按钮校验是否为空，不为空就把标题写进输入框
	$('.js-submit').on('click',function(){
		var rst = [];
		for(i = 0;i<eleArr.length;i++){
			rst[i] = eleValid(eleArr[i]);
		}
		var extraValidFlag = extraValid();
		var isValid = rst[0] && rst[1] && rst[2] && rst[3] && extraValidFlag; 

		if(isValid){
			var prodName = prop1.val() + prop2.val() + area.val() + brand.val() + model.val() + word.val() + prop3.val();
			$('.js-prod-name').val(prodName);
			$('.js-alpha,.js-prod-name-pop').hide();
		}
	})

	//点击取消按钮清除所有内容
	$('.js-reset').on('click',function(){
		$('.js-prod-temp').find('input').val('');
		$('.js-error').hide();
		$('.js-name-value').text('');
		$('.js-score').find('em').text('');
		$('#nameStar').attr('class','star star-full star-0');
		$('.js-alpha,.js-prod-name-pop').hide();
	})
	
})