$(function(){	
	var pbObj = {
		titleArr:[[],[]],
		tabIndex:0,
		$mod : $('.js-alpha,.js-prod-mod')
	};

	var privateFn = {

		//初始化输入框校验
		initValid:function(namesArr){
			var unionArr = [];
			$.each(namesArr,function(i,n){
				if(n.union){
					unionArr.push('[name="'+n.name+'"]');
				}
				$(document).on('blur','[name="'+n.name+'"]',function(){
					var isEmpty= n.union? !privateFn.isNotEmpty($(unionArr.join(','))):this.value==='';
					var $formError = $(this).parents('td').find('.form-error');
					isEmpty?$formError.show():$formError.hide();
				});
			});
		},

		//初始化输入框事件
		initInput:function ($input){
			$.each($input,function(i,n){
				$(n).on('input propertychange',function(){
					privateFn.generateTitle(this.value,i);
					privateFn.grade();
				});
			});
		},
		
		/*
		 * 判断只要有一个值不为空则返回true
		 * @param $allObj 输入框对象
		 * @return Boolean
		 */
		isNotEmpty:function($allObj){
			var isNotEmpty = false; 
			for(var i=0;i<$allObj.length;i++){
				if($allObj[i].value !== ''){
					isNotEmpty = true;
					break;
				}
			}
			return isNotEmpty;
		},

		// 评分
		grade:function(){
			var score = 0;
			var len;
			if(pbObj.tabIndex === 1){
				$.each(pbObj.titleArr[pbObj.tabIndex],function(i,n){
					if(n&&n.length>0){
						score += 10;
					}
				});
			}else if(pbObj.tabIndex === 0){
				len = pbObj.titleArr[pbObj.tabIndex].join('').length;
				score = len * 5;
			}
			score=score>100?100:score;
			var starLevel = Math.floor(score/10);
			$('.js-score').text(score);
			$('#prodNameStar').removeClass().addClass('star star-full star-' + starLevel);
		},

		/*
		 * 生成标题
		 * @param value 输入框的值，index 当前索引
		 */
		generateTitle:function(value,index){
			pbObj.titleArr[pbObj.tabIndex][index]= value;
			$('.js-name').eq(pbObj.tabIndex).text(pbObj.titleArr[pbObj.tabIndex].join(' '));
		},

		// 清空弹框信息
		emptyModInfo: function(){
			$('.js-tab-info li').eq(0).trigger('click');
			pbObj.titleArr=[[],[]];
			$('.js-txt').val('');
			$('.js-score').text('0');
			$('#prodNameStar').removeClass().addClass('star star-full star-0');
			$('.js-name').text('');
			$('.form-error').hide();
		}
	};

	//初始化
	(function(pvFn){
		pvFn.initValid([
            {name:'prop1'},
            {name:'prop2'},
            {name:'area',union:true},
            {name:'brand',union:true},
            {name:'model',union:true},
            {name:'prop3'},
            {name:'word'}
		]);
		pvFn.initValid([
            {name:'tmp2-prop1'},
            {name:'tmp2-prop2'},
            {name:'tmp2-word'},
            {name:'tmp2-prop3'},
            {name:'tmp2-prop4'},
            {name:'tmp2-alias2'}
		]);
		pvFn.initInput($('.js-tab-node:eq(0) .js-txt'));
		pvFn.initInput($('.js-tab-node:eq(1) .js-txt'));
	})(privateFn);

	//事件处理
	(function(pbObj,pvFn){
		//点击产品标题输入框弹出模板弹窗；
		$('.js-prod-name').on('click',function(){
			pbObj.$mod.show();
		})

		$('.js-close').on('click',function(){
			pbObj.$mod.hide();
		})

		//提交按钮
		$('.js-btnsubmit').click(function(){
			$('.js-tab-node:eq('+pbObj.tabIndex+') .js-txt').trigger('blur');
			if($('.form-error:visible').length==0){
				$('.js-prod-name').val(pbObj.titleArr[pbObj.tabIndex].join(''));
				pbObj.$mod.hide();
			}
        });

		//tab切换
        $('.js-tab-info li').on('click',function(){
			var index = $(this).index();
			pbObj.tabIndex = index;
            $(this).addClass('on').siblings().removeClass('on');
			$('.js-tab-node').eq(index).addClass('on').siblings().removeClass('on');
			pvFn.grade();
        });

		//点击取消按钮清空弹窗内数据
		$('.js-btnreset').click(function(){
			pvFn.emptyModInfo();
			pbObj.$mod.hide();
		})
	})(pbObj,privateFn);

});