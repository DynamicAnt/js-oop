$(function(){	
	var pbObj = {
		titleArr:[[],[],[]],
		tabIndex:0,
		$mod : $('.js-alpha,.js-prod-mod')
	};

	var privateFn = {

		//初始化输入框校验
		initValid:function(tab,namesArr){
			var unionArr = [];
			$.each(namesArr,function(i,n){
				if(n.union){
					unionArr.push('[name="'+n.name+'"]');
				}
				$(tab).on('blur','[name="'+n.name+'"]',function(){
					var isEmpty;
					if(n.union){
						isEmpty = !privateFn.isNotEmpty($(unionArr.join(',')));
					}else{
						if(this.type == 'checkbox' || this.type == 'radio'){
							isEmpty = !$('[name="'+$(this).attr('name')+'"]').filter(':checked').val();
						}else{
							isEmpty = !$(this).val(); 
						}
					}
					var $formError = $(this).parents('td').find('.form-error');
					isEmpty?$formError.show():$formError.hide();
				});
			});
		},

		//初始化输入框事件
		initInput:function ($input){
			$.each($input.closest('td'),function(i,n){
				$('.js-txt',n).on('input propertychange change',function(){
					var value = $(this).val();
					if(this.type == 'checkbox' || this.type == 'radio'){
						value = $(this).filter(':checked').val();
					}
					privateFn.generateTitle(value,i);
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
			if(pbObj.tabIndex === 0){
				len = pbObj.titleArr[0].join('').length;
				score = len * 5;
			}else if(pbObj.tabIndex === 1){
				$.each(pbObj.titleArr[1],function(i,n){
					if(n&&n.length>0){
						score += 10;
					}
				});
			}else if(pbObj.tabIndex === 2){
				$.each(pbObj.titleArr[2],function(i,n){
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
			pbObj.titleArr=[[],[],[]];
			$('.js-txt').each(function(i,n){
				if($(n).attr('type') == 'checkbox' || $(n).attr('type') == 'radio'){
					$(n).prop('checked',false);
				}else{
					$(n).val('');
				}
			})
			$('.js-score').text('0');
			$('#prodNameStar').removeClass().addClass('star star-full star-0');
			$('.js-name').text('');
			$('.form-error').hide();
		}
	};

	//初始化
	(function(pvFn){
		pvFn.initValid('.js-tab-node:eq(0)',[
            {name:'prop1'},
            {name:'prop2'},
            {name:'area',union:true},
            {name:'brand',union:true},
            {name:'model',union:true},
            {name:'prop3'},
            {name:'word'}
		]);
		pvFn.initValid('.js-tab-node:eq(1)',[
            {name:'tmp2-prop1'},
            {name:'tmp2-prop2'},
            {name:'tmp2-word'},
            {name:'tmp2-prop3'},
            {name:'tmp2-prop4'},
            {name:'tmp2-alias2'}
		]);
		pvFn.initValid('.js-tab-node:eq(2)',[
            {name:'brand'},
            {name:'season'},
            {name:'sex'},
            {name:'year'},
            {name:'tmp3-word'}
		]);

		pvFn.initInput($('.js-tab-node:eq(0) .js-txt'));
		pvFn.initInput($('.js-tab-node:eq(1) .js-txt'));
		pvFn.initInput($('.js-tab-node:eq(2) .js-txt'));
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