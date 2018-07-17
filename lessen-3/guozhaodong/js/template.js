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
                var isEmpty = _this._isEmpty(this,n,unionArr);
                _this._toggleError(isEmpty,this);
            });
        });
    },

    _isEmpty:function(obj){
        return !$(obj).val();
    },

    _toggleError: function(isEmpty,obj){
        var $formError = $(obj).parents('td').find('.form-error');
        isEmpty?$formError.show():$formError.hide();
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

    _isEmpty:function(obj,nameObj,unionArr){
        var isEmpty;
        if(nameObj.union){
            isEmpty = !this._isNotUnionEmpty($(unionArr.join(','),this.options.el));
        }else{
            isEmpty = !$(obj).val(); 
        }
        return isEmpty;
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

    _isEmpty:function(obj){
        var isEmpty;
        if(obj.type == 'checkbox' || obj.type == 'radio'){
            isEmpty = !$('[name="'+$(obj).attr('name')+'"]',this.options.el).filter(':checked').val();
        }else{
            isEmpty = !$(obj).val(); 
        }
        return isEmpty;
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