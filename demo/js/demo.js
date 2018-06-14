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
		
	 })

	 //点击取消按钮清空弹窗内数据
	 $('.js-btnreset').click(function(){
		
	 	$('.js-alpha,.js-prod-mod').hide();
	 })
});