$(function(){   
    //点击产品标题输入框弹出模板弹窗；
    $('.js-prod-name').on('click',function(){
        $('.js-alpha,.js-prod-name-pop').show();
    })
    $('.js-close').on('click',function(){
        $('.js-alpha,.js-prod-name-pop').hide();
    })
    //提交按钮
    $('.js-btnsubmit').click(function(){
      if(flaTab == 'tab1'){
         if(flagValues['prop1']!='' && flagValues['words']!='' && flagValues['prop3']!='' && flagValues['prop2']!='' && (flagValues['area']!='' || flagValues['brand']!='' || flagValues['model']!='')){
             $('.js-alpha,.js-prod-name-pop').hide();
             $('.js-prod-name').val($('.prod-temp-result strong:eq(0)').text());
          }else{
             $('.check').blur(); 
          } 
      }else{
             var checkValues = $('.js-tab2');
             if(utilsFunc.isPass(checkValues)){   
                $('.js-alpha,.js-prod-name-pop').hide();
                $('.js-prod-name').val($('.prod-temp-result strong:eq(1)').text());
             }else{
                $('.check-tab2').blur();
             }
      }         
    })
    //切换tab1和tab2
    $('.js-tab-info li').on('click',function(){
        $('.tab-info li,.tab-node').removeClass('on');
        var showNodeClass = $(this).attr('name');
        $('.'+showNodeClass).addClass('on');
        $(this).addClass('on');
        if(showNodeClass == 'info-1st'){
            utilsFunc.checkPonter('check');
            flaTab = 'tab1';  
        }else{
            utilsFunc.checkPonter('check-tab2');
            flaTab = 'tab2';
        }       
    });
    //点击取消按钮清空弹窗内数据
    $('.js-btnreset').click(function(){ 
        utilsFunc.resetObj(flagValues);
        $('.js-alpha,.js-prod-name-pop').hide();
        $('.form-error').hide();
        $('.check').val('');
        $('.check-tab2').val('');
        utilsFunc.checkPonter();
        $('.js-tab-info li:first').click();    
    })
    var flaTab = 'tab1';
    var aryFlag = ['prop1','prop2','area','brand','model','words','prop3'];
    var flagValues = {
       'prop1':'',
       'prop2':'',
       'area':'',
       'brand':'',
       'model':'',
       'words':'',
       'prop3':'',
       'tmp2-prop1':'',
       'tmp2-prop2':'',
       'tmp2-word':'',
       'tmp2-area':'',
       'tmp2-brand':'',
       'tmp2-model':'',
       'tmp2-alias1':'',
       'tmp2-porp3':'',
       'tmp2-porp4':'',
       'tmp2-alias2':''
       };
   
    var utilsFunc = {
        //工具方法判断元素是不是在数组内       
        isInArray:function(arr,value){
            var index = $.inArray(value,arr);
            return index >= 0;
        },
        //重置对象
        resetObj:function(obj){
            for(var property in obj){
             obj[property] = '';
            }
        },
        //查看数组内的值是否都为空
        isPass:function($arry){
            var falgs = true;
            for(var i = 0;i<$arry.length;i++){
               if($arry[i].value == ''){
                falgs = false;
                break;
               }
            }
            return falgs;
        },
        //显示文字和计算分数
        checkPonter:function(className){
            var length=0;
            var title='';
            var conutPointer = 0;
            var finalPoint = 0;
            if(className == 'check'){
               for(var property in flagValues){
                   if(!utilsFunc.isInArray(aryFlag,property)){
                        continue;
                   }
               length = length+flagValues[property].length;
               title = title+flagValues[property];
              }
              finalPoint = (length*5)<=100?length*5:100;
            }else{
               for(var property in flagValues){
                  if(utilsFunc.isInArray(aryFlag,property)){
                        continue;
                  }
                  if(flagValues[property]!=null&&flagValues[property]!=''){
                         conutPointer=conutPointer+1;
                  }
                  title = title+flagValues[property];
               }
               finalPoint = conutPointer*10;  
            }       
            $('.prod-temp-result strong').html(title);                  
            $('.score em').html(finalPoint);
            $('#nameStar').attr('class',"star star-full star-"+parseInt(finalPoint/10));  
        },
        //绑定失焦方法
        bindFocusAndBlur:function(className){
            $("."+className).blur(function(){
              var _this = $(this);
              var $errorDiv = $('.form-error-'+_this.attr('name'));
              if(_this.attr('name')=='area'||_this.attr('name')=='brand'||_this.attr('name')=='model'){               
                if($('input[name="area"]').val()=='' && $('input[name="brand"]').val()=='' && $('input[name="model"]').val()==''){
                     $errorDiv.show();  
                }else{
                     $errorDiv.hide();                                                         
                }               
              }else{            
                if(_this.val() == null || _this.val() == ''){
                     $errorDiv.show();                                                         
                }else{
                     $errorDiv.hide(); 
                }      
              }
              flagValues[_this.attr('name')] = _this.val();
              utilsFunc.checkPonter(className);             
         });
        },
        //初始化事件
        init:function(){
           utilsFunc.bindFocusAndBlur('check');
           utilsFunc.bindFocusAndBlur('check-tab2');
        }
    };
    utilsFunc.init();
});