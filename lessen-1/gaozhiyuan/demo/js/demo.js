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
       if(flagValues['prop1']!='' && flagValues['words']!='' && flagValues['prop3']!='' && flagValues['prop2']!='' && (flagValues['area']!='' || flagValues['brand']!='' || flagValues['model']!='')){
             $('.js-alpha,.js-prod-mod').hide();
             $('.js-prod-name').val(flagValues['prop1']+flagValues['prop2']+flagValues['area']+flagValues['brand']+flagValues['model']+flagValues['words']+flagValues['prop3']);
       }else{
             $('.check').blur(); 
       }         
    })
    //点击取消按钮清空弹窗内数据
    $('.js-btnreset').click(function(){ 
        $('.js-alpha,.js-prod-mod').hide();
        $('.form-error').hide();
        $('.check').val('');
        $('.js-name').empty();
        flagValues = flagValuesForRestart;
    })

    var names = {'prop1':'属性1',
                 'prop2':'属性2',
                 'area':'地区、品牌和型号',
                 'brand':'地区、品牌和型号',
                 'model':'地区、品牌和型号',
                 'words':'核心词',
                 'prop3':'属性3'};

    var flagValues = {'prop1':'','prop2':'','area':'','brand':'','model':'','words':'','prop3':''};

    var flagValuesForRestart = {'prop1':'','prop2':'','area':'','brand':'','model':'','words':'','prop3':''};

    function bindFocusAndBlur(className){         
        $("."+className).blur(function(){
        var _this = $(this);
        if(_this.attr('name')=='area'||_this.attr('name')=='brand'||_this.attr('name')=='model'){
                var tips =names[_this.attr('name')]+'至少填写一项';
                if($('input[name="area"]').val()=='' && $('input[name="brand"]').val()=='' && $('input[name="model"]').val()==''){
                     _this.parent().parent().find("div").html(tips).show();
                     flagValues[_this.attr('name')] = '';                     
                     checkPonter();
                }else{
                     _this.parent().parent().find("div").hide();
                     flagValues[_this.attr('name')] = _this.val();                   
                     checkPonter();
                }
        }else{
                var tips ='请填写'+names[_this.attr('name')];
                if(_this.val() == null || _this.val() == ''){
                     _this.parent().find("div").html(tips).show();
                     flagValues[_this.attr('name')] = '';                     
                     checkPonter();
                }else{
                     _this.parent().find("div").hide();
                     flagValues[_this.attr('name')] = _this.val();                   
                     checkPonter();                  
                }      
            };             
       }); 
    }
    function checkPonter(){
        
        $('.js-name').html(flagValues['prop1']+flagValues['prop2']+flagValues['area']+flagValues['brand']+flagValues['model']+flagValues['words']+flagValues['prop3']);
        var allPointer = flagValues['prop1'].length+flagValues['prop2'].length+flagValues['area'].length+flagValues['brand'].length+flagValues['model'].length+flagValues['words'].length+flagValues['prop3'].length;
        $('.js-score').html((allPointer*5)<=100?allPointer*5:100);
        $('#prodNameStar').removeClass($('#prodNameStar').attr('class').split(' ')[2]).addClass("star-"+parseInt(((allPointer*5)<=100?allPointer*5:100)/10));
    };
    bindFocusAndBlur('check');
});