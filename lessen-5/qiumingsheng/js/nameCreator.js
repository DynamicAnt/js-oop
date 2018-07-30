var Template = function(){
    this.prodScore = 0;
    this.data = {}
}
$.extend(Template.prototype,{
    updateScoreView : function(){
        $('.js-score').text(this.prodScore);
        $('#prodNameStar').attr('class','').addClass('star star-full star-'+Math.floor(this.prodScore/10));
    },
    isValid : function(){
        var flag = true;
        for(var prop in this.errors){
            flag = this.isInputValid(prop)&&flag ;
        }
        return flag;
    },
    resetView : function(){
        this.$panel.find('input[type="text"]').val('');
        this.$panel.find('.js-name span').text('');
        this.$panel.find('.form-error').text('').hide();
        this.prodScore = 0;
        this.updateScoreView();
    },
    resetData : function(){
        for(var name in this.data){
            this.data[name] = "";
        }
    },
    reset : function(){
        this.resetView();
        this.resetData();
    },
    validationAndShow : function(name,isValid,msg){
        if(!isValid){
            var errorMsg = msg||this.errors[name];
            this.$panel.find('div[name="error.'+name+'"]').html(errorMsg).show();
        }else{
            this.$panel.find('div[name="error.'+name+'"]').empty().hide();
        }
        return isValid;
    },
    generateName : function(name,isValid){
        var prodName='';
        for(var name in this.data){
            prodName+=this.data[name];
        }
        return prodName;
    },
    updateData : function(name,value){
        this.data[name] = value;
        this.$panel.find('.js-name').find('span[name="'+name+'"]').text(value);
    }
})



var Template1 = function($panel){
    Template.call(this);
    this.$panel = $panel;
    this.prodNameLength = 0;
    this.init();
}
Template1.prototype = new Template();

$.extend(Template1.prototype,{
    errors:{
        prop1: "请填写属性1",
        prop2: "请填写属性2",
        prop3: "请填写属性3",
        word: "请填写核心词",
        extra: "地区、品牌、型号至少填写一项"
    },
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
    Template.call(this);
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
    Template.call(this);
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
    reset: function(){
        $('#season').find('option').eq(0).attr('selected',true);
        $('input[name="sex"]').each(function(){
            $(this).attr('checked',false);
        });
        Template.prototype.reset.call(this);
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

TemplateFactory = (function(){
    var $panelList = $('.js-node').children();
    var LIBS = {
        template1:{
            clazz:Template1,
            identity:"js-template1-panel",
            name:"模板一",
            desc:"common template 1"
        },
        template2:{
            clazz:Template2,
            identity:"js-template2-panel",
            name:"模板二",
            desc:"common template 2"
        },
        template3:{
            clazz:Template3,
            identity:"js-template3-panel",
            name:"模板三",
            desc:"clothing template"
        },
    }
    return {
        creator:function(name){
            var Temp = LIBS[name].clazz;
            var $li = '<li><span>'+LIBS[name].name+'</span></li>';
            var $panel = $('.'+LIBS[name].identity);
            $('.js-tab').append($li);
            $('.js-node').append($panel);
            return new Temp($panel);
        }
    }
})();

function NameCreator(options){
    this.options = $.extend({},options);
    this.templates = this.options.templates|| ['template1','template2','template3'];
    this.templateArr = [];
    this.init();
}

$.extend(NameCreator.prototype, {

    init: function(){
        this.loadTempalate();
        this.initElement();
        this.initEvent();
    },
    loadTempalate: function(){
        var _this = this;
        this.templates.forEach(function(name){
            _this.templateArr.push(TemplateFactory.creator(name));
        });
        this.currentTemplate = this.templateArr[0];
    },
    initElement: function(){
        this.$panelList = $('.js-node').children('div');
        $('.js-tab').children('li').eq(0).addClass('on');
        $('.js-node').children('div').eq(0).addClass('on');
    },
    chooseTab: function(i){
        var $tab = $('.js-tab li').eq(i);
        $tab.addClass('on');
        $tab.siblings().removeClass('on');

        var $panel = this.$panelList.eq(i);
        $panel.addClass('on');
        $panel.siblings().removeClass('on');
    },
    initEvent: function(){
        var _this = this;
        $('.js-tab li').each(function(i){
            $(this).on('click',function(){
                if($(this).hasClass('on')){
                    return;
                }
                var tabIndex = $(this).index();
                _this.chooseTab(tabIndex);
                _this.currentTemplate = _this.templateArr[i];
                _this.currentTemplate.updateScoreView();
            });
        });    
        // }).eq(0).trigger('click');
        //点击产品标题输入框弹出模板弹窗；
        this.options.$inputElement.on('click',function(){
            $('.js-alpha,.js-prod-name-pop').show();
        })
        $('.js-close').on('click',function(){
            $('.js-alpha,.js-prod-name-pop').hide();
        })
        //提交按钮
        $('.js-btnsubmit').click(function(){
            if(_this.currentTemplate.isValid()){
                var prodName  = _this.currentTemplate.generateName();
                _this.options.$inputElement.val(prodName);
                $('.js-alpha,.js-prod-name-pop').hide();
            }
        })

        //点击取消按钮清空弹窗内数据
        $('.js-btnreset').click(function(){
            for(var i = 0;i<_this.templateArr.length;i++){
                _this.templateArr[i].reset(); 
            }
            $('.js-tab li').eq(0).trigger('click');

            $('.js-alpha,.js-prod-name-pop').hide();
        })
    }
});

function CompanyNameCreator(options){
    return new NameCreator($.extend({
        templates:['template1','template2']
    },options));
}
function ClothingNameCreator(options){
    return new NameCreator($.extend({
        templates:['template3']
    },options));
}