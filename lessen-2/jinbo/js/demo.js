$(function(){
    var defaultChoose = 0;
    var score_module = [0, 0]
    var star_level = [0, 0]
    var title_arr = [[], []];

    // 去重
    var toTrim = function (str) {
        var result;
        result = $.trim(str).replace(/\s/g,"");
        return result;
    }

    var validate = function(name,isValid){
        if(isValid){
            if(name === 'extra'){
                $('.js-eare').find('.form-error').show()
            } else {
                $("[name="+ name +"]").closest('td').find('.form-error').show();
            }
        }else{
            if(name === 'extra'){
                $('.js-eare').find('.form-error').hide();
            } else {
                $("[name="+ name +"]").closest('td').find('.form-error').hide();
            }
        }
        return isValid;
    };

    // 模块评分
    var moduleGrade = function (value, index, i) {
        title_arr[i][index] = value;
        var title_str = title_arr[i].join('');
        if (i === 0){
            score_module[i] = title_str.length > 20 ? 100 : title_str.length * 5;
            star_level[i] = title_str.length > 20 ? 10 : Math.floor(title_str.length/2);
        } else {
            for(var m=0,n=0;m<title_arr[i].length;m++){
                title_arr[i][m] && n++;
                score_module[i] = n>10 ? 100 : n*10;
                star_level[i] = n>10 ? 10 : n;
            }
        }
        $(".js-title:eq("+ i +")").text(title_str);
        $('#nameStar')[0].className = 'star star-full star-' + star_level[i];
        $('.js-score').text(score_module[i]);
    }

    //点击产品标题输入框弹出模板弹窗；
    $('.js-prod-name').on('click',function(){
        $('.js-alpha,.js-prod-name-pop').show();
    })
    $('.js-close').on('click',function(){
        $('.js-alpha,.js-prod-name-pop').hide();
    })

    // tab切换操作
    $(document).on("click", ".js-tab-li", function () {
        var index = Number($(this).data('index'));
        $('.js-tab-li').removeClass('on').eq(index).addClass('on');
        $('.js-tab-node').removeClass('on').eq(index).addClass('on');
        index === 0 ? $(".js-score").text(score_module[0]) : $(".js-score").text(score_module[1]);
        index === 0 ? $('#nameStar').removeClass().addClass('star star-full star-' + star_level[0]) : $('#nameStar').removeClass().addClass('star star-full star-' + star_level[1]);
        defaultChoose = index;
    })

    for(var i = 0; i < $(".js-tab-node:eq(0) input").length; i++) {
        (function (index) {
            $(".js-tab-node:eq(0)").find("input:eq("+ index +")").blur(function () {
                var isEmpty;
                if($(this).data('type') === 'extra'){
                    var eareString = toTrim($("[name='area']").val() + $("[name='brand']").val() + $("[name='model']").val());
                    isEmpty = (eareString === '');
                    validate('extra', isEmpty);
                } else {
                    isEmpty = ($(this).val() === '');
                    validate($(this).data('type'), isEmpty);
                }
                moduleGrade(toTrim($(this).val()), index, 0);
            })
        })(i)
    }

    for(var i = 0; i < $(".js-tab-node:eq(1) input").length; i++) {
        (function (index) {
            $(".js-tab-node:eq(1)").find("input:eq("+ index +")").blur(function () {
                var isEmpty;
                isEmpty = (toTrim($(this).val()) === '');
                $(this).data('type') && validate($(this).data('type'), isEmpty);
                moduleGrade(toTrim($(this).val()), index, 1);
            })
        })(i)
    }

    //点击取消按钮清空弹窗内数据
    $('.js-btn-reset').click(function(){
        $('.js-txt').val('').trigger('blur');
        $('.form-error').hide();
        $('.js-alpha,.js-prod-name-pop').hide();
        $('.js-tab-li').removeClass('on').eq(0).addClass('on');
        $('.js-tab-node').removeClass('on').eq(0).addClass('on');
        defaultChoose = 0;
    })

    // 点击确认操作
    $('.js-btn-submit').click(function(){
        $(".tab-node:eq("+ defaultChoose +")").find("[type='text']").trigger('blur');
        if($(".tab-node:eq("+ defaultChoose +")").find('.form-error:visible').length==0){
            defaultChoose == 0 ? $('.js-prod-name').val(title_arr[0].join('')): $('.js-prod-name').val(title_arr[1].join(''));
            $('.js-alpha,.js-prod-name-pop').hide();
        }
    })
})