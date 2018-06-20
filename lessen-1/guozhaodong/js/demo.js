$(function(){	
	var pbObj = {
		titleArr:[],
		$mod : $('.js-alpha,.js-prod-mod')
	};

	var privateFn = {
		/*
		 * 输入框校验
		 * @param obj 当前校验的输入框对象  isEmpty 是否为空
		 */
		validate:function(obj,isEmpty){
			var $formError = $(obj).parents('td').find('.form-error');
			if(isEmpty){
				$formError.show();
			}else{
				$formError.hide();
			}
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

		/*
		 * 评分
		 */
		grade:function(){
			var titleStr = pbObj.titleArr.join('');
			var len = titleStr.length;
			var score = len * 5;
			if(score>100){
				score = 100;
			}
			var starLevel = Math.floor(score/10);
			$('.js-score').text(score);
			$('#prodNameStar')[0].className = 'star star-full star-' + starLevel;
		},

		/*
		 * 生成标题
		 * @param value 输入框的值，index 当前索引
		 */
		generateTitle:function(value,index){
			pbObj.titleArr[index]= value;
			$('.js-name').text(pbObj.titleArr.join(' '));
		},

		/*
		 * 清空弹框信息
		 */
		emptyModInfo: function(){
			$('.js-txt').val('').trigger('blur');
			$('.form-error').hide();
		}
	};

	//初始化
	(function(pvFn){
		var namesArr = [{name:'prop1'},{name:'prop2'},{name:'area',union:true},{name:'brand',union:true},{name:'model',union:true},{name:'prop3'},{name:'word'}];
		var unionArr = [];
		$.each(namesArr,function(i,n){
			if(n.union){
				unionArr.push('[name="'+n.name+'"]');
			}
			$(document).on('blur','[name="'+n.name+'"]',function(){
				var isEmpty= n.union? !pvFn.isNotEmpty($(unionArr.join(','))):this.value==='';
				pvFn.validate(this,isEmpty);
				pvFn.generateTitle(this.value,i);
				pvFn.grade();
			});
		});
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
			$('.js-txt').trigger('blur');
			if($('.form-error:visible').length==0){
				$('.js-prod-name').val(pbObj.titleArr.join(''));
				pbObj.$mod.hide();
			}
		})

		//点击取消按钮清空弹窗内数据
		$('.js-btnreset').click(function(){
			pvFn.emptyModInfo();
			pbObj.$mod.hide();
		})
	})(pbObj,privateFn);

});