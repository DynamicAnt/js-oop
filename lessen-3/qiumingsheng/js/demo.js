
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
    Template.prototype.validationAndShow = function(name,isValid,msg){
        if(!isValid){
            var errorMsg = msg||this.errors[name];
            this.$panel.find('div[name="error.'+name+'"]').html(errorMsg).show();
        }else{
            this.$panel.find('div[name="error.'+name+'"]').empty().hide();
        }
        return isValid;
    };
    Template.prototype.generateName = function(name,isValid){
        var prodName='';
        for(var name in this.data){
            prodName+=this.data[name];
        }
        return prodName;
    };
    Template.prototype.updateData = function(name,value){
        this.data[name] = value;
        this.$panel.find('.js-name').find('span[name="'+name+'"]').text(value);
    }

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
        data:{},
        isInputValid:function(name){
            return name==='extra'?this.isExtraValid():this.isPropValid(name);
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
                    _this.updateData(name,$.trim($(this).val()));
                });
    
                $(this).blur(function(){
                    var type = $(this).data('type');
                    var method = "is"+type.substring(0,1).toUpperCase()+type.substring(1)+"Valid";
                    _this[method].call(_this,name);
        
                    var length = _this.generateName().length;
                    if(length!==_this.prodNameLength){
                        _this.prodNameLength = length;
                        _this.updateScore();
                        _this.updateScoreView();
                    }
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
        data:{},
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
                    _this.updateData(name,$.trim($(this).val()));
                });
                $(this).blur(function(){
                    _this.isInputValid(name);
                    _this.updateScore();
                    _this.updateScoreView();
                });
            });
        }
        
    });

    var Template3 = function($panel){
        this.$panel = $panel;
        this.init();
    }

    Template3.prototype = new Template();

    $.extend(Template3.prototype,{
        errors: {
			brand: "请填写品牌",
			season: "请选择季节",
			sex: "请选择性别",
			year: {
                required:'请填写年份',
                number:"请填写数字"
            },
			word:  "请填写核心词"
        },
        data:{},
        isRequired:function(value){
            return value!=="";
        },
        isNumber:function(value){
            return /\d+/.test(value)
        },
        isInputValid:function(name){
            var rst = this.errors[name];
            if(typeof rst === 'string'){
                return this.validationAndShow(name,this.data[name]!=="");
            }else{
                var flag = true;
                var msg = '';
                for(var type in rst){
                    var method = "is"+type.substring(0,1).toUpperCase()+type.substring(1);
                    flag = this[method].call(this,this.data[name]);
                    if(!flag){
                        msg = rst[type];
                        break;
                    }
                }
                return this.validationAndShow(name,flag,msg);;
            }
        },
		updateScore: function(){
            var score = 0;
			for(var prop in this.data){
				if($.inArray(prop, ['brand','season','sex','year'])!==-1&&this.data[prop]!==""){
					score += 15;
				}else if($.inArray(prop, ['prop1','prop2','prop3','prop4'])!==-1&&this.data[prop]!==""){
                    score += 5;
                }else if(this.data[prop]!==""){
                    score += 20;
                }
			}
			this.prodScore = score;
        },
        updateModelView:function(name,value){
            this.updateData(name,value);
            this.isInputValid(name);
            this.updateScore();
            this.updateScoreView();
        },
        init: function(){
            var _this = this;
            this.$panel.find('.js-param').each(function(){
                var name = $(this).attr('name');
                _this.data[name] = '';
                if($(this).attr('type')==="text"){
                    $(this).keyup(function(){
                        _this.updateData(name,$.trim($(this).val()));
                    });
                    $(this).blur(function(){
                        if(name.indexOf('prop')===-1){
                            _this.isInputValid(name);
                        }
                        _this.updateScore();
                        _this.updateScoreView();
                    });
                }
            });
            $('#season').change(function(){
                _this.updateModelView('season',$.trim($(this).val()));
            })
            $('input[name="sex"]').on('click',function(){
                _this.updateModelView('sex',$.trim($(this).val()));
            });
        }
        
    });

    var template1 = new Template1($('.js-node').children().eq(0));
    var template2 = new Template2($('.js-node').children().eq(1));
    var template3 = new Template3($('.js-node').children().eq(2));
	var templateArr = [template1,template2,template3];
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