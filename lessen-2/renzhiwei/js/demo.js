$(function(){   
    var $alpha = $('.js-alpha'),
        $prodMod = $('.js-prod-mod'),
        $prodName = $('.js-prod-name'),
        $names = $('.js-name');
    var namesArr = [];		// 储存每一个输入的产品名

    //点击产品标题输入框弹出模板弹窗；
    $prodName.on('click', function() {
        $alpha.show();
        $prodMod.show();
    });

    // tab切换
    $prodMod.find('ul li').each(function(i, ele) {
		var that = $(this);
		that.on('click', function() {
			that.closest('ul').find('li').removeClass('on');
    		that.addClass('on');
    		$prodMod.find('.js-tab').removeClass('on').eq(i).addClass('on');
    		getMsg($prodMod.find('.js-tab.on'));
		})
	})

	$prodMod.find('.js-tab').each(function() {
		var that = $(this);
		that.find('input').each(function(i, ele) {
			$(ele).on('keyup', function() {
				getMsg(that);
			}).on('blur', function() {
				validInput($(ele));
			})
		})
	})

	$('.js-submit-btn').on('click', function() {
		var $tab = $prodMod.find('.js-tab.on')
		var flag = true
		$tab.find('input').each(function() {
			flag = validInput($(this)) && flag;
		})
		if(flag) {
			var propsName = $tab.find('.js-name').text();
			$prodName.val(propsName);
			closePop();
		}
	})

	$('.js-cancel-btn').on('click',function(){
        $prodMod.find('.js-star').removeClass().addClass('star star-full js-star star-0');
        $prodMod.find('.js-score').text('0');
        $prodMod.find('input').val('');
        $prodMod.find('.form-error').hide();
        $prodMod.find('.js-name').text('');
        $prodMod.find('li').removeClass('on').eq(0).addClass('on');
        closePop();
    });

    $('.js-close-btn').on('click', function() {
        closePop();
    });

	/**
	 * @param  {[type]} tab 当前input父级类名为js-tab的元素
	 * 重置namesArr = []是因为产品标题是通过遍历input获取的
	 */
	function getMsg(tab) {
		namesArr = [];
		getNames(tab);
		getScore(tab);
	}

	/**
	 * 获取输入的产品名并填入标题中
	 * @param  {[type]} tab 当前input父级类名为js-tab的元素
	 */
	function getNames(tab) {
		tab.find('input').each(function(i, e) {
			var val = $.trim($(e).val());
			if(val) {
				namesArr.push(val)
			}
		})
		tab.find('.js-name').text(namesArr.join(','));
	}

	/**
	 * 获取tab分数并评分
	 * @param  {[type]} tab tab元素
	 */
	function getScore(tab) {
		var len = tab.hasClass('js-tab1') ? namesArr.join('').length : namesArr.length;
		len = len > 20 ? 20 : len;
		var score = len*5;
		var $parent = tab.parent();
		$parent.find('.js-star').removeClass().addClass('star star-full js-star star-'+Math.floor(len / 2));
		$parent.find('.js-score').text(score);
	}

	/**
	 * 验证输入
	 * @param  {[type]} ele 当前需要验证的元素
	 */
	function validInput(ele) {
		var $td = ele.closest('td');
		var $formError = $td.find('.form-error');
		var $inputs = $td.find('input');
		var flag = false;
		if ($td.hasClass('required')) {
			$inputs.each(function(i, ele) {
				if ($.trim($(ele).val())) {
					flag = true
				}
			})
			if(flag) {
				$formError.hide();
				return true
			} else {
				$formError.show();
				return false
			}
		} else {
			return true
		}
	}

    function closePop() {
        $alpha.hide();
        $prodMod.hide();
    }    
});