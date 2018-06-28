$(function(){	

    var Template = function(){
    }
    $.extend(Template.prototype,{
        prodScore: 0,
        data:{}
    })
    Template.prototype.updateScoreView = function(){
        $('.js-score').text(this.prodScore);
		$('#prodNameStar').attr('class','').addClass('star star-full star-'+Math.floor(this.prodScore/10));
    }
	Template.prototype.isValid = function(){
        var flag = true;
        for(var prop in this.errors){
            flag = this.isInputValid(prop)&&flag ;
        }
        return flag;
    }
    Template.prototype.resetView = function(){
        this.$panel.find('input').val('');
        this.$panel.find('.js-name span').text('');
        this.$panel.find('.form-error').text('').hide();
        this.prodScore = 0;
        this.updateScoreView();
    }
    Template.prototype.resetData = function(){
        for(var name in this.data){
            this.data[name] = "";
        }
    }
    Template.prototype.reset = function(){
        this.resetView();
        this.resetData();
    }
    Template.prototype.validationAndShow = function(name,isValid){
        if(isValid){
            this.$panel.find('div[name="error.'+name+'"]').empty().hide();
        }else{
            this.$panel.find('div[name="error.'+name+'"]').html(this.errors[name]).show();
        }
        return isValid;
    };
    Template.prototype.generateName = function(name){
        var prodName='';
        for(var name in this.data){
            prodName+=this.data[name];
        }
        return prodName;
    };
    Template.prototype.updateField = function(field,value){
        this.data[field] = value;
        this.$panel.find('.js-name').find('span[name="'+field+'"]').text(value);
    };

    var Template1 = function($panel){
        this.$panel = $panel;
        this.init();
    }
    Template1.prototype = new Template();

    $.extend(Template1.prototype,{
        prodNameLength:0,
        errors:{
            prop1: "请填写属性1",
			prop2: "请填写属性2",
			prop3: "请填写属性3",
			word: "请填写核心词",
			extra: "地区、品牌、型号至少填写一项"
        },
        isExtra:function(name){
            return name==='area'||name==='brand'||name==="model"||name==="name";
        },
		isInputValid:function(name){
            return this.isExtra(name)?this.isExtraValid():this.isPropValid(name);
        },
        isPropValid:function(name){
            return this.validationAndShow(name,this.data[name]!=="");
        },
        isExtraValid: function(){
            return this.validationAndShow("extra",this.data.area!==""||this.data.brand!==""||this.data.model!=="");;
        },
		updateScore: function(){
			this.prodScore = this.prodNameLength>20?100:this.prodNameLength*5;
        },
        init: function(){
            var _this = this;
            this.$panel.find('input').each(function(){
                var name = $(this).attr('name');
                _this.data[name] = '';
                $(this).keyup(function(){
                    var value = $.trim($(this).val());
                    _this.updateField(name,value);
                });
    
                $(this).blur(function(){
                    isInputValid(name);
                    _this.prodNameLength = _this.generateName().length;
                    _this.updateScore();
                    _this.updateScoreView();
                });
            });
        }
    });

    var Template2 = function($panel){
        this.$panel = $panel;
        this.init();
    }
    Template2.prototype = new Template();

    $.extend(Template2.prototype,{
        errors: {
			prop1: "请填写属性1",
			prop2: "请填写属性2",
			prop3: "请填写属性3",
			prop4: "请填写属性4",
			word:  "请填写核心词",
			alias2: "请填写别名2",
		},
        isInputValid:function(name){
            return this.validationAndShow(name,this.data[name]!=="");
        },
		updateScore: function(){
			var i=0;
			for(var prop in this.data){
				if(this.data[prop]!==""){
					i++;
				}
			}
			this.prodScore = i * 10;
        },
        init: function(){
            var _this = this;
            this.$panel.find('input').each(function(){
                var name = $(this).attr('name');
                _this.data[name] = '';
                $(this).keyup(function(){
                    var value = $.trim($(this).val());
                    _this.updateField(name,value);
                });

                $(this).blur(function(){
                    _this.isInputValid(name);
                    _this.updateScore();
                    _this.updateScoreView();
                });
            });
        }
    });

    var template1 = new Template1($('.js-node').children().eq(0));
    var template2 = new Template2($('.js-node').children().eq(1));
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
})