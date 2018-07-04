$(function(){	

	utilFunc = {
		validationAndShow: function($panel,name,isValid,errors){
			if(isValid){
				this.$panel.find('div[name="error.'+name+'"]').empty().hide();
			}else{
				this.$panel.find('div[name="error.'+name+'"]').html(this.errors[name]).show();
			}
			return isValid;

		},
		generateName:function(data){
			var prodName = "";
			for(var prop in data){
				prodName = prodName + data[prop];
			}
			return prodName;
		},
		updateScoreView: function(prodScore){
			$('.js-score').text(prodScore);
			$('#prodNameStar').attr('class','').addClass('star star-full star-'+Math.floor(prodScore/10));
		},
		reset: function($panel,data){
			for(var name in data){
				$panel.find('input[name="'+name+'"]').val('');
				$panel.find('.js-name').find('span[name="'+name+'"]').text('');
				data[name] = "";
			}
			$panel.find('.form-error').empty().hide();
			this.updateScoreView(0);
			return data;
		},
		updateField: function($panel,data,field,value){
			data[field] = value;
			$panel.find('.js-name').find('span[name="'+field+'"]').text(value);
			return data;
		}
	}

	var template1 = function($panel){
		var prodNameLength = 0;
		var prodScore = 0;
		var data = {};
		var errors = {
			prop1: "请填写属性1",
			prop2: "请填写属性2",
			prop3: "请填写属性3",
			word: "请填写核心词",
			extra: "地区、品牌、型号至少填写一项"
		};
		var _this = this;

		this.isPropValid =  function(name){
			return utilFunc.validationAndShow($panel,name,data[name]!=="",errors);
		};
		this.isExtraValid = function(){
			return utilFunc.validationAndShow($panel,"extra",data.area!==""||data.brand!==""||data.model!=="",errors);;
		};

		this.isValid = function(){
			var flag = true;
			$('input[data-type=prop]').each(function(){
				flag = _this.isPropValid($(this).attr('name')) && flag;
			});
			var isExtraValidFlag = _this.isExtraValid();
			return flag&&isExtraValidFlag;
		}

		var updateScore = function(){
			prodScore = prodNameLength>20?100:prodNameLength*5;
		}

		this.reset = function(){
			data = utilFunc.reset($panel,data);
			prodNameLength = 0;
			prodScore = 0;
		}
		this.getProdScore = function(){
			return prodScore;
		}
		this.getData = function(){
			return data;
		}

		//为Input框绑定keyup和失焦事件
		$panel.find('input').each(function(){
			var name = $(this).attr('name');
			data[name] = '';
			$(this).keyup(function(){
				data = utilFunc.updateField($panel,data,name,$.trim($(this).val()));
			});

			$(this).blur(function(){
				var type = $(this).data('type');
				var method = "is"+type.substring(0,1).toUpperCase()+type.substring(1)+"Valid";
				_this[method].call(_this,name);
	
				var length = utilFunc.generateName(data).length;
				if(length!==prodNameLength){
					prodNameLength = length;
					updateScore();
					utilFunc.updateScoreView(prodScore);
				}
			});
		});
	}

	var template2 = function($panel){
		var prodScore = 0;
		var data = {};
		var errors = {
			prop1: "请填写属性1",
			prop2: "请填写属性2",
			prop3: "请填写属性3",
			prop4: "请填写属性4",
			word:  "请填写核心词",
			alias2: "请填写别名2",
		};
		var _this = this;

		var isInputValid = function(name){
			return utilFunc.validationAndShow($panel,name,data[name]!=="",errors);
		};

		this.isValid = function(){
			var flag = true;
			for(var prop in errors){
				flag = isInputValid(prop)&&flag ;
			}
			return flag;
		}

		var updateScore = function(){
			var i=0;
			for(var prop in data){
				if(data[prop]!==""){
					i++;
				}
			}
			prodScore = i * 10;
		}

		this.reset = function(){
			var data = utilFunc.reset($panel,data);
			prodScore = 0;
		}

		this.getProdScore = function(){
			return prodScore;
		}
		this.getData = function(){
			return data;
		}

		//为Input框绑定keyup和失焦事件
		$panel.find('input').each(function(){
			var name = $(this).attr('name');
			data[name] = '';
			$(this).keyup(function(){
				data = utilFunc.updateField($panel,data,name,$.trim($(this).val()));
			});
			$(this).blur(function(){
				isInputValid(name);
				updateScore();
				utilFunc.updateScoreView(prodScore);
			});
		});
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
			utilFunc.updateScoreView(template.getProdScore());
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
			var prodName  = utilFunc.generateName(template.getData());
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