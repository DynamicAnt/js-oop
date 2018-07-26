function TitleTemplate(options){
    var settings = {
        allInputs: '.js-txt',
        validInputNames: []
    }
    this.options = $.extend(true, settings, options);
    this.titleArr = [];
}

$.extend(TitleTemplate.prototype,{

    init: function(){
        this._initValid();
        this._initInput();
    },

    _initValid:function(){
        this._initValidEvent();
    },

    _initValidEvent: function(unionArr){
        var _this = this,
            el = this.options.el,
            namesArr = this.options.validInputNames;
        $.each(namesArr,function(i,n){
            $(el).on('blur','[name="'+n.name+'"]',function(){
                var isError = false;
                var errorMsg = '';
                if(n.required){
                    isError = _this._isError(this,n,unionArr);
                    errorMsg = n.required;
                }
                _this._toggleError(this, isError, errorMsg);
            });
        });
    },

    _isError:function(obj){
        return !$(obj).val();
    },

    _toggleError: function(obj, isEmpty, errorMsg){
        var $formError = $(obj).parents('td').find('.form-error');
        isEmpty?$formError.text(errorMsg).show():$formError.hide();
    },

    //初始化输入框事件
    _initInput:function (){
        var _this = this,
            el = this.options.el,
            allInputs = this.options.allInputs;
        $.each($(el +' '+ allInputs),function(i,n){
            $(n).on('input propertychange change',function(){
                var value = _this._getVal(this);
                _this._generateTitle(value,i,el);
                _this.grade();
            });
        });
    },

    _getVal: function(obj){
        return $(obj).val();
    },

    // 评分
    grade:function(){
        var score = this._getScore();
        score=score>100?100:score;
        var starLevel = Math.floor(score/10);
        $('.js-score').text(score);
        $('#prodNameStar').removeClass().addClass('star star-full star-' + starLevel);
    },

    _getScore: function(){
        return 0;
    },

    /*
     * 生成标题
     * @param value 输入框的值，index 当前input的索引，el 当前模板的包裹对象
     */
    _generateTitle:function(value, index, el){
        this.titleArr[index]= value;
        $('.js-name',el).text(this.titleArr.join(' '));
    },

    getTitle: function(){
        return this.titleArr.join('');
    },

    // 清空弹框信息
    emptyInfo: function(){
        var el = this.options.el;
        this.titleArr.splice(0,this.titleArr.length);
        this._emptyInputs(el);
        $('.js-score').text('0');
        $('#prodNameStar').removeClass().addClass('star star-full star-0');
        $('.js-name',el).text('');
        $('.form-error',el).hide();
    },

    _emptyInputs: function(el){
        var allInputs = this.options.allInputs;
        $(allInputs,el).val('');
    }

}); 

/*-----------------模板一------------------*/
function TitleTemplate1(options){
    TitleTemplate.call(this,options);
}

TitleTemplate1.prototype = new TitleTemplate();

$.extend(TitleTemplate1.prototype,{
    constructor: TitleTemplate1,

    _initValid:function(){
        var namesArr = this.options.validInputNames;
        var unionArr = this._getUnionArr(namesArr);
        this._initValidEvent(unionArr);
    },

    _getUnionArr: function(namesArr){
        var unionArr = [];
        $.each(namesArr,function(i,n){
            if(n.union){
                unionArr.push('[name="'+n.name+'"]');
            }
        });
        return unionArr;
    },

    _isError:function(obj,nameObj,unionArr){
        var isError;
        if(nameObj.union){
            isError = !this._isNotUnionEmpty($(unionArr.join(','),this.options.el));
        }else{
            isError = !$(obj).val(); 
        }
        return isError;
    },

    /*
     * 判断只要有一个值不为空则返回true
     * @param $allObj 输入框对象
     * @return Boolean
     */
    _isNotUnionEmpty:function($allObj){
        var isNotEmpty = false; 
        for(var i=0;i<$allObj.length;i++){
            if($allObj[i].value !== ''){
                isNotEmpty = true;
                break;
            }
        }
        return isNotEmpty;
    },

    _getScore: function(){
        var len = this.titleArr.join('').length;
        return len * 5;
    },
    
});

/*-----------------模板二------------------*/
function TitleTemplate2(options){
    TitleTemplate.call(this,options);
}

TitleTemplate2.prototype = new TitleTemplate();

$.extend(TitleTemplate2.prototype,{
    constructor: TitleTemplate2,

    _getScore: function(){
        var score = 0;
        $.each(this.titleArr,function(i,n){
            if(n&&n.length>0){
                score += 10;
            }
        });
        return score;
    },
});

/*-----------------服装模板------------------*/
function TitleTemplateClothing (options){
    TitleTemplate.call(this,options);
}

TitleTemplateClothing.prototype = new TitleTemplate();

$.extend(TitleTemplateClothing.prototype,{
    constructor: TitleTemplateClothing,

    //初始化输入框事件
    _initInput:function (){
        var _this = this,
            el = this.options.el,
            allInputs = this.options.allInputs;
        $.each($(el +' '+ allInputs).closest('td'),function(i,n){
            $(allInputs,n).on('input propertychange change',function(){
                var value = _this._getVal(this);
                _this._generateTitle(value,i,el);
                _this.grade();
            });
        });
    },

    _initValidEvent: function(unionArr){
        var _this = this,
            el = this.options.el,
            namesArr = this.options.validInputNames;
        $.each(namesArr,function(i,n){
            $(el).on('blur','[name="'+n.name+'"]',function(){
                var isError = false;
                var errorMsg = '';
                if(n.required){
                    isError = _this._isError(this,n,unionArr);
                    errorMsg = n.required;
                }
                if(!isError && n.number){
                    isError = !_this._isNumber(this);
                    errorMsg = n.number;
                }
                _this._toggleError(this, isError, errorMsg);
            });
        });
    },

    _isNumber:function(obj){
        return /^\d+$/.test($(obj).val());
    },

    _isError:function(obj){
        var _isError;
        if(obj.type == 'checkbox' || obj.type == 'radio'){
            _isError = !$('[name="'+$(obj).attr('name')+'"]',this.options.el).filter(':checked').val();
        }else{
            _isError = !$(obj).val(); 
        }
        return _isError;
    },

    _getVal: function(obj){
        var value = $(obj).val();
        if(obj.type == 'checkbox' || obj.type == 'radio'){
            value = $(obj).filter(':checked').val();
        }
        return value;
    },

    _getScore: function(){
        var score = 0;
        $.each(this.titleArr,function(i,n){
            if(n&&n.length>0){
                switch(i){
                    case 0:
                    case 1:
                    case 2:
                    case 3:
                        score += 15;
                        break;
                    case 8:
                        score += 20;
                        break;
                    default:
                        score += 5;
                }
            }
        });
        return score;
    },

    _emptyInputs: function(el){
        var allInputs = this.options.allInputs;
        $(allInputs,el).each(function(i,n){
            if($(n).attr('type') == 'checkbox' || $(n).attr('type') == 'radio'){
                $(n).prop('checked',false);
            }else{
                $(n).val('');
            }
        })
    }
});

function ChooseTitle(options){
    var settings = {
        isTabShow:{
            0:true,
            1:true,
            2:true
        }
    }
    this.options = $.extend(true, settings, options);
    this.tp = [];
    this.tabIndex = 0;
    this.init();
}

$.extend(ChooseTitle.prototype,{
    init: function(){
        this._initShow();
        this._initTemplate();
        this._bindEvent();
    },

    _initShow(){
        var isTabShow = this.options.isTabShow;
        for(var tab in isTabShow){
            var $tabLi = $('.js-tab-info li').eq(tab);
            var $tabNode = $('.js-tab-node').eq(tab);
            if(isTabShow[tab]){
                $tabLi.show();
                $tabNode.show();
            }else{
                $tabLi.hide();
                $tabNode.hide();
            }
        }
        for(var tab in isTabShow){
            if(isTabShow[tab]){
                this.tabIndex = tab;
                break;
            }
        }

    },

    _initTemplate: function(){
        this.tp = [
            new TitleTemplate1({
				el:'.js-tab-node:eq(0)',
				allInputs:'.js-txt',
				validInputNames: [
					{name:'prop1', required:'请填写属性1'},
					{name:'prop2', required:'请填写属性2'},
					{name:'area', union:true, required:'地区、品牌、型号必需填一项'},
					{name:'brand',union:true, required:'地区、品牌、型号必需填一项'},
					{name:'model',union:true, required:'地区、品牌、型号必需填一项'},
                    {name:'word', required:'请填写核心词'},
                    {name:'prop3', required:'请填写属性3'}
				]
			}),
			new TitleTemplate2({
				el:'.js-tab-node:eq(1)',
				allInputs:'.js-txt',
				validInputNames: [
					{name:'tmp2-prop1', required:'请填写属性1'},
					{name:'tmp2-prop2', required:'请填写属性2'},
					{name:'tmp2-word', required:'请填写核心词'},
					{name:'tmp2-prop3', required:'请填写属性3'},
					{name:'tmp2-prop4', required:'请填写属性4'},
					{name:'tmp2-alias2', required:'请填写别名二'}
				]
			}),
			new TitleTemplateClothing({
				el:'.js-tab-node:eq(2)',
				allInputs:'.js-txt',
				validInputNames: [
					{name:'brand', required:'请填写品牌'},
					{name:'season', required:'请选择季节'},
					{name:'sex', required:'请选择男装或女装'},
					{name:'year', required:'请填写年份', number:'请填写数字'},
					{name:'tmp3-word', required:'请填写核心词'}
				]
			})
        ];

        for(var i=0;i<this.tp.length;i++){
            if(this.options.isTabShow[i]){
                this.tp[i].init();
            }
		}
    },

    _bindEvent: function(){
        var _this = this;
        var $mod = $('.js-alpha,.js-prod-mod');

        //点击产品标题输入框弹出模板弹窗；
		$('.js-prod-name').on('click',function(){
            $('.js-tab-info li').eq(_this.tabIndex).trigger('click');
			$mod.show();
		});

		$('.js-close').on('click',function(){
			$mod.hide();
		});

		//提交按钮
		$('.js-btnsubmit').click(function(){
			$('.js-tab-node:eq('+ _this.tabIndex +') .js-txt').trigger('blur');
			if($('.form-error:visible').length == 0){
				$('.js-prod-name').val(_this.tp[_this.tabIndex].getTitle());
				$mod.hide();
			}
        });

		//tab切换
        $('.js-tab-info li').on('click',function(){
			var index = $(this).index();
			_this.tabIndex = index;
            $(this).addClass('on').siblings().removeClass('on');
			$('.js-tab-node').eq(index).show().siblings().hide();
			_this.tp[_this.tabIndex].grade();
        });

		//点击取消按钮清空弹窗内数据
		$('.js-btnreset').click(function(){
            for(var i=0;i<_this.tp.length;i++){
                _this.tp[i].emptyInfo();
            }
			$mod.hide();
		})
    }
    
})