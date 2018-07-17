$(function(){	
	var pbObj = {
		tp: [],
		defaultTabIndex: 0,
		tabIndex: 0,
		$mod : $('.js-alpha,.js-prod-mod')
	};

	//初始化
	(function(pbObj){
		pbObj.tp = [
			new TitleTemplate1({
				el:'.js-tab-node:eq(0)',
				allInputs:'.js-txt',
				validInputNames: [
					{name:'prop1'},
					{name:'prop2'},
					{name:'area',union:true},
					{name:'brand',union:true},
					{name:'model',union:true},
					{name:'prop3'},
					{name:'word'}
				]
			}),
			new TitleTemplate2({
				el:'.js-tab-node:eq(1)',
				allInputs:'.js-txt',
				validInputNames: [
					{name:'tmp2-prop1'},
					{name:'tmp2-prop2'},
					{name:'tmp2-word'},
					{name:'tmp2-prop3'},
					{name:'tmp2-prop4'},
					{name:'tmp2-alias2'}
				]
			}),
			new TitleTemplateClothing({
				el:'.js-tab-node:eq(2)',
				allInputs:'.js-txt',
				validInputNames: [
					{name:'brand'},
					{name:'season'},
					{name:'sex'},
					{name:'year'},
					{name:'tmp3-word'}
				]
			})
		];

		for(var i=0;i<pbObj.tp.length;i++){
			pbObj.tp[i].init();
		}
	
	})(pbObj);

	//事件处理
	(function(pbObj){
		//点击产品标题输入框弹出模板弹窗；
		$('.js-prod-name').on('click',function(){
			$('.js-tab-info li').eq(pbObj.defaultTabIndex).trigger('click');
			pbObj.$mod.show();
		});

		$('.js-close').on('click',function(){
			pbObj.$mod.hide();
		});

		//提交按钮
		$('.js-btnsubmit').click(function(){
			$('.js-tab-node:eq('+ pbObj.tabIndex +') .js-txt').trigger('blur');
			if($('.form-error:visible').length == 0){
				$('.js-prod-name').val(pbObj.tp[pbObj.tabIndex].getTitle());
				pbObj.$mod.hide();
			}
        });

		//tab切换
        $('.js-tab-info li').on('click',function(){
			var index = $(this).index();
			pbObj.tabIndex = index;
            $(this).addClass('on').siblings().removeClass('on');
			$('.js-tab-node').eq(index).addClass('on').siblings().removeClass('on');
			pbObj.tp[pbObj.tabIndex].grade();
        });

		//点击取消按钮清空弹窗内数据
		$('.js-btnreset').click(function(){
			$('.js-tab-info li').eq(pbObj.defaultTabIndex).trigger('click');
			pbObj.tp[0].emptyInfo();
			pbObj.tp[1].emptyInfo();
			pbObj.tp[2].emptyInfo();
			pbObj.$mod.hide();
		})
	})(pbObj);

});