$(function(){	
	var $alpha = $('.js-alpha'),
        $prodMod = $('.js-prod-mod'),
        $prodName = $('.js-prod-name'),
        $prodNameStar = $('#prodNameStar'),
        $score = $('.js-score'),
        $names = $('.js-name');
    var arr = [];

	//点击产品标题输入框弹出模板弹窗；
    $prodName.on('click',function(){
        $alpha.show();
        $prodMod.show();
	});

    $prodMod.on('keyup', 'input', function(){
        arr = [];
        fillMsg(this);
        validMsg(this);
    });

    function fillMsg(ele) {
        getVal(ele);
        getScore(ele);
    }

    /**
     * 填写产品标题
     * @param ele
     */
    function getVal(ele) {
        var $inputs = $(ele).closest('tbody').find('input');
        $inputs.each(function(i, ele) {
            var val = $(ele).val();
            if(!val) {
                return
            }
            arr.push(val);
        });
        $names.text(arr.join(', '));
    }

    /**
     * 评分
     * @param ele
     */
    function getScore(ele) {
        var len = arr.join('').length;
        len = len > 20 ? 20 : len;
        var score = len*5;
        var num = Math.floor(len / 2);
        $prodNameStar.removeClass().addClass('star star-full star-'+num);
        $score.text(score);
    }

    /**
     * 校验信息
     * @param ele
     */
    function validMsg(ele) {
        var $td = $(ele).closest('td')
        var $inputs = $td.find('input');
        var $formError = $td.find('.form-error');
        var vals = [];
        $inputs.each(function(i, e) {
            var val = $(e).val();
            if(!val) {
                return
            }
            vals.push(val)
        });
        if(vals.length === 0) {
            $formError.show();
            return false
        } else {
            $formError.hide();
            return true
        }
    }

	 $('.js-submit-btn').click(function(){
	     var flag = true;
	     $('tbody').find('input').each(function (i, ele) {
            flag = validMsg(ele) && flag;
         });
         if(flag) {
             var text = $names.text();
             $prodName.val(text);
             closePop();
         }
	 });

    $('.js-cancel-btn').on('click',function(){
        $prodNameStar.removeClass().addClass('star star-full star-0');
        $score.text('0');
        $names.text('生成的产品标题');
        $('table').find('input').val('');
        $('.form-error').hide();
        closePop();
    });

    $('.js-close-btn').on('click', function() {
        closePop();
    });

    function closePop() {
        $alpha.hide();
        $prodMod.hide();
    }
});