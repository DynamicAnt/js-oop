//最上封装的对象
function Start(options){
   //方便添加扩展
   this.options = $.extend({},options);
   this.inputElement = this.options.inputElement;
   var inputElement = this.options.inputElement;
   var type = parseInt(this.options.moduleNum,10);
   switch(type){
      case 1: 
      var template01 = new Moudle({
        className:'check',
        inputElement:inputElement,
        moduleNum:type
      });
      case 2:
      var template02 = new Moudle({
        className:'check-tab2',
        inputElement:inputElement,
        moduleNum:type
      });
      if(type==2){
        var template01 = new Moudle({
        className:'check',
        inputElement:inputElement,
        moduleNum:type
        });
        $('.js-tab-info li:eq(2)').hide();
        break;
      }
      case 3: 
      var template03 = new Moudle({
        className:'check-tab3',
        inputElement:inputElement,
        moduleNum:type
      });
      if(type==3){
        $('.js-tab-info li:eq(0)').hide();
        $('.js-tab-info li:eq(1)').hide(); 
        $('.js-tab-info li:eq(2)').css('margin-left','0px');
        $('.js-tab-info li:eq(2)').click();
      }
      break;
   } 
   //初始化input点击弹出事件
   $('.'+this.inputElement).on('click',function(){
        $('.js-alpha,.js-prod-name-pop').show();
   })   
}

function MoudleSuper(){
	this.flagValues={
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
       'tmp2-alias2':'',
       'table3-brand-15':'',
       'table3-season-15':'春',
       'table3-sex-15':'男装',
       'table3-years-15':'',
       'table3-prop1-5':'',
       'table3-prop2-5':'',
       'table3-prop3-5':'',
       'table3-prop4-5':'',
       'table3-words-20':''
	};
	this.flaTab = 'tab1';
	this.aryFlag = ['prop1','prop2','area','brand','model','words','prop3'];
	this.table3TitleFlag = ['table3-brand-15','table3-season-15','table3-sex-15','table3-years-15','table3-prop1-5','table3-prop2-5','table3-prop3-5','table3-prop4-5','table3-words-20'];
	this.isInArray=function(arr,value){
          var index = $.inArray(value,arr);
          return index >= 0;
    };
    this.resetObj = function(obj){
          for(var property in obj){
             if(property=='table3-season-15'){
             	 obj[property] = '春'
             }else if(property=='table3-sex-15'){
                 obj[property] = '男装'
             }else{
             	 obj[property] = '';
             }  	           
            }
    };
    this.isPass = function($arry){
          var falgs = true;
          for(var i = 0;i<$arry.length;i++){
               if($arry[i].value == ''){
                falgs = false;
                break;
               }
          }
          return falgs;
    };
    this.isNumber = function(val){
        	var regPos = /^\d+(\.\d+)?$/; //非负浮点数
            var regNeg = /^(-(([0-9]+\.[0-9]*[1-9][0-9]*)|([0-9]*[1-9][0-9]*\.[0-9]+)|([0-9]*[1-9][0-9]*)))$/; //负浮点数
            if(regPos.test(val) || regNeg.test(val)) {
                  return true;
            }else{
                  return false;
            }
    }
}

function Moudle(options){
	this.options = $.extend({},options);
	this.bindClass = this.options.className;
  this.inputElement = this.options.inputElement;
  this.moduleNum = this.options.moduleNum;
  this.init(this.bindClass);
}
//子类继承父类
Moudle.prototype = new MoudleSuper();

$.extend(Moudle.prototype,{
	init:function(className){
    this.bindFocusAndBlur(className);   
    var _this = this;
    //初始提交事件  
    $('.js-btnsubmit').click(function(){
      if(_this.flaTab == 'tab1'){
         if(_this.flagValues['prop1']!='' && _this.flagValues['words']!='' && _this.flagValues['prop3']!='' && _this.flagValues['prop2']!='' && (_this.flagValues['area']!='' || _this.flagValues['brand']!='' || _this.flagValues['model']!='')){
             $('.js-alpha,.js-prod-name-pop').hide();
             $('.'+_this.inputElement).val($('.prod-temp-result strong:eq(0)').text());
          }else{
             $('.check').blur(); 
          } 
      }else if(_this.flaTab == 'tab3'){
      	  var checkValues = $('.js-tab3');
      	  if(_this.isPass(checkValues)){   
                $('.js-alpha,.js-prod-name-pop').hide();
                $('.'+_this.inputElement).val($('.prod-temp-result strong:eq(1)').text());
             }else{
                $('.check-tab3').blur();
             }
      }else{
             var checkValues = $('.js-tab2');
             if(_this.isPass(checkValues)){   
                $('.js-alpha,.js-prod-name-pop').hide();
                $('.'+_this.inputElement).val($('.prod-temp-result strong:eq(1)').text());
             }else{
                $('.check-tab2').blur();
             }
      }
    })
    //初始化清空事件
    $('.js-btnreset').click(function(){ 
        _this.resetObj(_this.flagValues);
        $('.js-alpha,.js-prod-name-pop').hide();
        $('.form-error').hide();
        $('.check').val('');
        $('.check-tab2').val('');
        $('.check-tab3').val('');
        $('.prod-temp-result strong').html('');
        $(':radio').attr('checked',false);
        $(':radio:eq(0)').attr('checked',true);
        if(_this.moduleNum == 3){
          $('.js-tab-info li:eq(2)').click();
        }else{
          $('.js-tab-info li:first').click();
        }    
    })
    //初始化单选按钮事件
    $(":radio").click(function(){
         _this.flagValues['table3-sex-15'] = $(this).val();
         _this.checkPonter('check-tab3');
    });
    //初始化左右切换事件
    $('.js-tab-info li').on('click',function(){
        $('.tab-info li,.tab-node').removeClass('on');
        var showNodeClass = $(this).attr('name');
        $('.'+showNodeClass).addClass('on');
        $(this).addClass('on');
        if(showNodeClass == 'info-1st'){
            _this.checkPonter('check');
            _this.flaTab = 'tab1';  
        }else if(showNodeClass == 'info-3st'){
            _this.checkPonter('check-tab3');
            _this.flaTab = 'tab3';
        }else{
            _this.checkPonter('check-tab2');
            _this.flaTab = 'tab2';
        }       
    });
    //初始化关闭事件
    $('.js-close').on('click',function(){
        $('.js-alpha,.js-prod-name-pop').hide();
    })

	},
	bindFocusAndBlur:function(className){
	     var __this = this;
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
                	 if(_this.attr('name')=='table3-years-15'){
                	 	  if(!__this.isNumber(_this.val())){
                               $errorDiv.html('请输入数字！');
                               $errorDiv.show();
                	 	  }else{
                	 	  	   $errorDiv.html('请填写年份');
                	 	  	   $errorDiv.hide();
                	 	  }
                	 }else{
                	 	$errorDiv.hide();
                	 }                     
                }      
              }
              __this.flagValues[_this.attr('name')] = _this.val();
              __this.checkPonter(className);           
         });
	},
	checkPonter:function(className){
		        var length=0;
            var title='';
            var conutPointer = 0;
            var finalPoint = 0;
            if(className == 'check'){
               for(var property in this.flagValues){
                   if(!this.isInArray(this.aryFlag,property)){
                        continue;
                   }
               length = length+this.flagValues[property].length;
               title = title+this.flagValues[property];
              }
              finalPoint = (length*5)<=100?length*5:100;
            }else if(className == 'check-tab3'){
               for(var property in this.flagValues){
               	  if(!this.isInArray(this.table3TitleFlag,property)){
                        continue;
                   }
                   title = title+this.flagValues[property];
                   if(this.flagValues[property] != ''){
                       finalPoint = finalPoint + parseInt(property.split('-')[2],10); 
                   }                  
               }
            }else{
               for(var property in this.flagValues){
                  if(this.isInArray(this.aryFlag,property)||this.isInArray(this.table3TitleFlag,property)){
                        continue;
                  }
                  if(this.flagValues[property]!=null&&this.flagValues[property]!=''){
                         conutPointer=conutPointer+1;
                  }
                  title = title+this.flagValues[property];
               }
               finalPoint = conutPointer*10;  
            }       
            $('.prod-temp-result strong').html(title);                  
            $('.score em').html(finalPoint);
            $('#nameStar').attr('class',"star star-full star-"+parseInt(finalPoint/10));
	}
});

 
    
    