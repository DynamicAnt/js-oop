$(function(){
	//点击产品标题输入框弹出模板弹窗；
	$('.js-prod-name').on('click',function(){
		$('.js-alpha,.js-prod-mod').show();
	})
	$('.js-close').on('click',function(){
		$('.js-alpha,.js-prod-mod').hide();
	})
	 //提交按钮
	 $('.js-btnsubmit').click(function(){
         $("input[type='text']").trigger('blur');
	 })

	 //点击取消按钮清空弹窗内数据
	 $('.js-btnreset').click(function(){
	 	 $('.js-txt').val('');
         $('#prodNameStar').attr('class', 'star star-full star-0');
         $('.js-name').text('生成的产品标题');
         $('.js-score').text('0');
		 $('.js-alpha,.js-prod-mod').hide();
		 $('.form-error').hide();
	 })
	// 去除空格
    function Trim(str) {
		var result;
		result = str.replace(/(^\s+)|(\s+$)/g,"");
		result = result.replace(/\s/g,"");
		return result;
	}
	
	// 判空
	function  Empty(str) {
		var is_empty;
        is_empty = str.length > 0 ? true: false;
        return is_empty;
    }

	$('.js-tb-strip').on('change', '.js-txt', function () {
		var $title = Trim($("input[name='prop1']").val()) + Trim($("input[name='prop2']").val())+ Trim($("input[name='area']").val()) + Trim($("input[name='brand']").val())+ Trim($("input[name='model']").val()) + Trim($("input[name='prop3']").val()) + Trim($("input[name='word']").val());
		var $title_score = $title.length > 20 ? 100 : $title.length * 5;
		var $star_level = $title.length > 20 ? 10 : Math.floor($title.length/2);
		$('.js-name').text($title);
		$('#prodNameStar').attr('class', function () {
			return 'star star-full star-'+  $star_level
        })
		$('.js-score').text($title_score);
	})

	$("input[name='prop1']").blur(function () {
        Empty(Trim($(this).val())) ? $(this).closest('td').find('.form-error').hide() : $(this).closest('td').find('.form-error').text('请输入属性1').show();
    })

    $("input[name='prop2']").blur(function () {
        Empty(Trim($(this).val())) ? $(this).closest('td').find('.form-error').hide() : $(this).closest('td').find('.form-error').text('请输入属性2').show();
	})

    $("input[name='word']").blur(function () {
        Empty(Trim($(this).val())) ? $(this).closest('td').find('.form-error').hide() : $(this).closest('td').find('.form-error').text('请输入核心词').show();

    })

	$("input[name='prop3']").blur(function () {
        Empty(Trim($(this).val())) ? $(this).closest('td').find('.form-error').hide() : $(this).closest('td').find('.form-error').text('请输入属性3').show();
    })

	$(".td-eare input[type='text']").each(function () {
		$(this).blur(function () {
            Empty(Trim($("input[name='area']").val()) + Trim($("input[name='brand']").val())+ Trim($("input[name='model']").val())) ? $(this).closest('td').find('.form-error').hide() : $(this).closest('td').find('.form-error').text('地区、品牌、规格至少填写一项').show()
        })
    })
});