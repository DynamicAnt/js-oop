$(function(){	
	//点击输入框弹出/关闭产品标题模板
	$('.js-prod-name').on('click',function(){
		$('.js-alpha,.js-prod-name-pop').show();
	})

	$('.js-close').on('click',function(){
		$('.js-alpha,.js-prod-name-pop').hide();
	})

	var length = 0	
	var temp1Prop1 = $('input[name=prop1]');
	var temp1Prop2 = $('input[name=prop2]');
	var temp1Area  = $('input[name=area]');
	var temp1Brand = $('input[name=brand]');
	var temp1Model = $('input[name=model]');
	var temp1Word  = $('input[name=word]');
	var temp1Prop3 = $('input[name=prop3]');

	var temp2Prop1 = $('input[name=temp2-prop1]');
	var temp2Prop2 = $('input[name=temp2-prop2]');
	var temp2Prop3 = $('input[name=temp2-prop3]');
	var temp2Prop4 = $('input[name=temp2-prop4]');
	var temp2Area  = $('input[name=temp2-area]');
	var temp2Brand = $('input[name=temp2-brand]');
	var temp2Model = $('input[name=temp2-model]');
	var temp2Word  = $('input[name=temp2-word]');
	var temp2Alias1= $('input[name=temp2-alias1]');
	var temp2Alias2= $('input[name=temp2-alias2]');

	//校验输入框是否为空
	var eleValid = function($element){
		var error = $element.closest('td').find('.js-error');
		if($element.val() == ''){
			error.show();
			return false
		}else{
			error.hide();
			return true
		}
	}

	//模板1失焦
	var temp1EleArr = [temp1Prop1,temp1Prop2,temp1Prop3,temp1Word];
	for(i = 0;i < temp1EleArr.length; i++){
		temp1EleArr[i].blur(function(){
			eleValid($(this));
		})
	}

	//模板2失焦
	var temp2EleArr = [temp2Prop1,temp2Prop2,temp2Word,temp2Prop3,temp2Prop4,temp2Alias2];
	for(i = 0; i < temp2EleArr.length; i++){
		temp2EleArr[i].blur(function(){
			eleValid($(this));
		})
	}

	//模板1地区、品牌、模型三选一必填校验
	var extraValid = function(){
		var error = $('.js-extra').find('.js-error');
		if(temp1Area.val() == '' && temp1Brand.val() == '' && temp1Model.val() == ''){
			error.show();
			return false
		}else{
			error.hide();
			return true
		}
	}
	var extraArr = [temp1Area,temp1Brand,temp1Model];
	for(i = 0; i < extraArr.length; i++){
		extraArr[i].blur(function(){
			extraValid();
		})
	}

	//模板1计算评分方法
	var getScore1 = function(){
		var score1 = 0; 
		score1 = length * 5;
		score1 = score1 > 100?100:score1;
		return score1;
	}

	//模板2计算评分方法 
	var scroeArr = [temp2Prop1,temp2Prop2,temp2Word,temp2Area,temp2Brand,temp2Model,temp2Alias1,temp2Prop3,temp2Prop4,temp2Alias2]
	var getScore2 = function(){
		var score2 = 0;
		for(i = 0;i<scroeArr.length;i++){
			if(scroeArr[i].val() !== ''){
				score2 += 10
			}
		}
		return score2;
	}

	//模板1 实时显示标题以及评分
	$('.js-prod-temp1').find('input').on('input propertychange',function(){
		var prodName = temp1Prop1.val() + temp1Prop2.val() + temp1Area.val() + temp1Brand.val() + temp1Model.val() + temp1Word.val() + temp1Prop3.val();
		
		$('.js-temp1-result').text(prodName);
		length = prodName.length;
		var score1 = getScore1();		
		$('.js-score').find('em').text(score1);
		$('#nameStar').attr('class','star star-full star-'+ Math.floor(score1/10));
	})

	//模板2 实时显示标题以及评分
	$('.js-prod-temp2').find('input').on('input propertychange',function(){
		var prodName = '';
		for(i = 0;i<scroeArr.length;i++){
			prodName +=scroeArr[i].val();
		}
		var score2 = getScore2();
		$('.js-temp2-result').text(prodName);
		$('.js-score').find('em').text(score2);
		$('#nameStar').attr('class','star star-full star-'+ Math.floor(score2/10));
	})
	

	
	//******************************** 模板3 stat ********************************//
	var data = {};
	var prodScore = 0;

	//返回每个字段是否有值
	var isPropValid = function(name){
		return validationAndShow(name,data[name]!=="");
	}

	//判断每个字段的错误信息显示与隐藏
	var validationAndShow = function(name,isValid){
		var $td = $(':input[name='+name+']').closest('td');
		if(!isValid){
			$td.find('.js-error').show();
		}else{
			$td.find('.js-error').hide();
		}
		return isValid;
	};

	//判断字段是否有值点击提交按钮时使用的
	var isValids = function(){
		var flag = true;
		$('.js-required').each(function(){
			flag = isPropValid($(this).attr('name')) && flag;
		});
		return flag;
	}

	//返回字段中的值，生成产品标题
	var generateName = function(){
		return data.temp3brand+data.temp3season+data.temp3gender+data.temp3years+data.temp3prop1+data.temp3prop2+data.temp3prop3+data.temp3prop4+data.temp3word; 
	}

	//计算分数
	var updateScore = function(){
		var i = 0;
		var n = 0;
		var prodScore1 = 0;
		var prodScore2 = 0;
		var prodScore3 = 0;

		for(var prop in data){
			if((data[prop]!=='') && (prop == 'temp3brand' || prop == 'temp3season' || prop == 'temp3gender' || prop == 'temp3years')){
				i++;
				prodScore1 = i * 15;
			}
			if((data[prop]!=='') && (prop == 'temp3prop1' || prop == 'temp3prop2' || prop == 'temp3prop3' || prop == 'temp3prop4')){
				n++
				prodScore2 = n * 5;
			}
			if((data[prop]!=='') && (prop == 'temp3word')) {
				prodScore3 = 20;
			}
		}
		prodScore = prodScore1 + prodScore2 + prodScore3;
	}

	//星星的数量
	var updateScoreView = function(){
		var level;
		$('.js-score em').text(prodScore);
		level = Math.floor(prodScore/10)
		$('#nameStar').attr('class','').addClass('star star-full star-'+level);
	}

	//input keyup 校验
	var $panel = $('.js-prod-temp3');
	$panel.find(':input,select').each(function(){
		var name = $(this).attr('name');
		data[name] = '';
		
		$(this).blur(function(){
			if( name == 'temp3years' && $(this).val() !=='' && /\D/.test($(this).val()) ){
				$(this).closest('td').find('.js-error-years').text('请输入数字').show();
				return
			}else{
				$(this).closest('td').find('.js-error-years').text('请填写年份').hide();
			}
			
			isPropValid(name);
			updateScore();
			updateScoreView();
		});

		$(this).on('keyup change',function(){
			data[name] = $.trim($(this).val());
			if( name == 'temp3years' && $(this).val() !=='' && /\D/.test($(this).val()) ){
				return
			}

			$('.js-temp3-result').find('span[name="'+name+'"]').text(data[name]);
		})
	});

	//****************************** 模板3 end *************************************//


	//点击提交按钮进行校验
	$('.js-submit').on('click',function(){
		if(tabMenu.eq(0).hasClass('on')){
			var rst = [];
			for(i = 0; i < temp1EleArr.length; i++){
				rst[i] = eleValid(temp1EleArr[i]);
			}
			var extraValidFlag = extraValid();
			var isValid = rst[0] && rst[1] && rst[2] && rst[3] && extraValidFlag; 
			if(isValid){
				var prodName = temp1Prop1.val() + temp1Prop2.val() + temp1Area.val() + temp1Brand.val() + temp1Model.val() + temp1Word.val() + temp1Prop3.val();
				$('.js-prod-name').val(prodName);
				$('.js-alpha,.js-prod-name-pop').hide();
			}
		}else if(tabMenu.eq(1).hasClass('on')){
			var rst = [];
			for(i = 0; i < temp2EleArr.length; i++){
				rst[i] = eleValid(temp2EleArr[i]);
			}
			var isValid = rst[0] && rst[1] && rst[2] && rst[3] && rst[4] && rst[5]; 
			if(isValid){
				var prodName = temp2Prop1.val() + temp2Prop2.val() + temp2Word.val() + temp2Area.val() + temp2Brand.val() + temp2Model.val() + temp2Alias1.val() + temp2Prop3.val() + temp2Prop4.val() + temp2Alias2.val();
				$('.js-prod-name').val(prodName);
				$('.js-alpha,.js-prod-name-pop').hide();
			}
		}else{
			if(isValids()){
				var prodName  = generateName();
				$('.js-prod-name').val(prodName);
			   	$('.js-alpha,.js-prod-name-pop').hide();
			}
		}
	});

	//点击取消按钮清除所有内容
	$('.js-reset').on('click',function(){
		$('.js-tab-node').find('input').val('');
		$('.js-tab-node').find('.js-error').hide();
		$('.js-temp1-result').text('');
		$('.js-temp2-result').text('');
		length = 0;
		$('.js-score').find('em').text('0');
		$('#nameStar').attr('class','star star-full star-0');
		$('.js-alpha,.js-prod-name-pop').hide();

		//模板3的重置  清除span标签内生成的标题、星星和评分 ；
		for(name in data){
			$panel.find(':input[name="'+name+'"]').val('');
			$panel.find('.js-temp3-result').find('span[name="'+name+'"]').text('');
			data[name] = "";
		}

		$('input:radio[name=temp3gender]').attr('checked',false);
		$('#man').attr('value','男');
		$('#women').attr('value','女');
			
		prodScore = 0;
		updateScoreView();
		//end 

		if(tabMenu.eq(1)){
			tabMenu.eq(0).addClass('on').siblings().removeClass('on');
			tabNode.eq(0).addClass('on').siblings().removeClass('on');
		}
	});

	//tab 切换
	var tabMenu = $('.js-tab-menu li');
	var tabNode = $('.js-tab-node');
	tabMenu.each(function(i){
		$(this).on('click',function(){
			$(this).addClass('on').siblings().removeClass('on');
			tabNode.eq(i).addClass('on').siblings().removeClass('on');
			
			if(i == 0 ){
				var score1 = getScore1();
				$('.js-score').find('em').text(score1);
				$('#nameStar').attr('class','star star-full star-'+ Math.floor(score1/10));
			}else if(i == 1){
				var score2 = getScore2();
				$('.js-score').find('em').text(score2);
				$('#nameStar').attr('class','star star-full star-'+ Math.floor(score2/10));
			}else{
				updateScoreView();
			}
		});
	});





})

