$(function(){
   function Template() {}
   Template.prototype.prodScore = 0;
   Template.prototype.data = [];
   Template.prototype.updateScoreView = function () {
       $('.js-score').text(this.prodScore);
       $('#nameStar').removeClass().addClass('star star-full star-'+Math.floor(this.prodScore/10));
   }
   Template.prototype.getInputInfo = function ($this) {
       var flag = $this.closest('td').hasClass('js-extra');
       var $message = $this.closest('td').find('.js-save-info');
       var $txt = $this.closest('td').find("[type='text']");
       var str = '';
       if(flag){
           for(var i = 0; i < $txt.length; i++){
               str += $txt.eq(i).val();
           }
       }else {
           str = $this.val();
       }
       $message.val(str);
   }
   Template.prototype.getRadioInfo = function($this){
       $this.closest('td').find('.js-save-info').val($this.val())
   }
   Template.prototype.getSelectInfo = function($this){
       var optionVal = $this.find('option:selected').val();
       $this.closest('td').find('.js-save-info').val(optionVal)
   }
    Template.prototype.updateField = function ($this) {
       for(var i=0; i< $this.find('.js-save-info').length; i++){
           this.data[i] = $this.find('.js-save-info').eq(i).val();
       }
    }
    Template.prototype.generateName = function ($this, data) {
        $this.find('.js-name').text(data.join(''));
    }
    Template.prototype.validationShow = function ($this) {
        var messageInfo =  $.trim($this.closest('td').find('.js-save-info').val());
        var name = $this.closest('td').find('.form-error').attr('name');
        if (messageInfo !== ''){
            $this.closest('td').find('.form-error').hide();
        } else {
            $this.closest('td').find('.form-error').html(this.errors[name]).show();
        }
    }
    Template.prototype.isDate = function($this) {
        var reg = /^[0-9]*$/;
        if (!reg.test($this.val())) {
            $this.closest('td').find('.form-error').html('请填写日期').show();
        }
    }
    Template.prototype.reset = function () {
        this.$panel.find("[type='text']").val('').trigger('blur');
        this.$panel.find("js-sel option").eq(0).attr("selected",true);
        this.$panel.find("[type='radio']").attr("checked", false);
        this.$panel.find('.form-error').hide();
        this.$panel.find('.js-name').text('');
        this.prodScore = 0;
    }
    Template.prototype.submit = function () {
        var isChoose = false;
        this.$panel.find("[type='text']").trigger('blur');
        if(this.$panel.find("option").eq(0).attr("selected")){
            this.$panel.find("option").closest('td').find('.form-error').html(this.errors[name]).show();
        }
        for(var i = 0; i <this.$panel.find("[type='radio']").length; i++){
            if(this.$panel.find("[type='radio']").eq(i).attr("checked")){
                isChoose = true;
            }
        }
        if (isChoose === false){
            this.$panel.find("[type='radio']").closest('td').find('.form-error').html(this.errors[name]).show();
        }
    }

   function Template1($panel) {
       this.$panel = $panel;
       this.prodNameLength = 0;
       this.init();
   }
   var F1 = function () {}
   F1.prototype = Template.prototype;
   Template1.prototype = new F1();
   Template1.prototype.constructor = Template1;

   Template1.prototype.errors = {
       prop1: "请填写属性1",
       prop2: "请填写属性2",
       prop3: "请填写属性3",
       word: "请填写核心词",
       extra: "地区、品牌、型号至少填写一项"
   }
   Template1.prototype.init = function () {
       var _self = this;
       this.$panel.find("[type='text']").each(function () {
            $(this).blur(function () {
                _self.getInputInfo($(this));
                _self.updateField(_self.$panel);
                _self.generateName(_self.$panel,_self.data);
                _self.validationShow($(this));
                _self.prodNameLength = _self.data.join('').length;
                _self.updateScore();
                _self.updateScoreView();
            })
       })
   }

   Template1.prototype.updateScore =  function(){
        this.prodScore = this.prodNameLength>20?100:this.prodNameLength*5;
   }
   // Template1 end
   function Template2($panel) {
       this.$panel = $panel;
       this.init();
   }
    var F2 = function () {}
    F2.prototype = Template.prototype;
    Template2.prototype = new F2();
    Template2.prototype.constructor = Template2;

    Template2.prototype.errors = {
        prop1: "请填写属性1",
        prop2: "请填写属性2",
        prop3: "请填写属性3",
        prop4: "请填写属性4",
        word:  "请填写核心词",
        alias2: "请填写别名2"
    }
    Template2.prototype.updateScore = function () {
        var i = 0;
        for(var text in this.data){
            if(this.data[text]!==""){
                i++;
            }
        }
        this.prodScore = i * 10;
    }
    Template2.prototype.init = function () {
        var _self = this;
        this.$panel.find("[type='text']").each(function () {
            $(this).blur(function () {
                _self.getInputInfo($(this));
                _self.updateField(_self.$panel);
                _self.generateName(_self.$panel,_self.data);
                _self.validationShow($(this));
                _self.updateScore();
                _self.updateScoreView();
            })
        })
    }
    // Template2 end

    function Template3($panel) {
        this.$panel = $panel;
        this.init();
    }
    var F3 = function () {}
    F3.prototype = Template.prototype;
    Template3.prototype = new F3();
    Template3.prototype.constructor = Template3;

    Template3.prototype.errors = {
        brand: "请填写品牌",
        time: "请填写季节",
        year: "请填写年份",
        sex: "请选择性别",
        word:  "请填写核心词"
    }
    Template3.prototype.init = function () {
        var _self = this;
        this.$panel.find("[type='text']").each(function () {
            $(this).blur(function () {
                _self.getInputInfo($(this));
                _self.updateView(_self, $(this));
            })
        })
        this.$panel.find("[type='radio']").each(function () {
            $(this).click(function () {
                _self.getRadioInfo($(this));
                _self.updateView(_self, $(this));
            })
        })
        this.$panel.find(".js-sel").each(function () {
            $(this).change(function () {
                _self.getSelectInfo($(this));
                _self.updateView(_self, $(this));
            })
        })
    }

    Template3.prototype.updateView = function($self, $this) {
        $self.updateField($self.$panel);
        $self.generateName($self.$panel,$self.data);
        $self.validationShow($this);
        if($this.attr('prop')==='year'){
            $self.isDate($this);
        }
        $self.updateScore();
        $self.updateScoreView();
    }

    Template3.prototype.updateScore = function () {
        var m=0,n=0,t=0
        for(var i = 0; i < 4; i ++){
          this.data[i]!=="" && m++;
        }
        for(var i = 4; i < 8; i++){
           this.data[i]!=="" && n++;

        }
        this.data[8]!=='' && t++;
        this.prodScore = m * 15 + n * 10 + t * 20;
    }
    // Template3 end

   var template1 = new Template1($('.js-node').children().eq(0));
   var template2 = new Template2($('.js-node').children().eq(1));
   var template3 = new Template3($('.js-node').children().eq(2));

    var templateArr = [template1,template2,template3];
    var template = template1;

    var chooseTab = function(i){
        $tab = $('.js-tab li').eq(i);
        $tab.addClass('on');
        $tab.siblings().removeClass('on');

        var $node = $('.js-node').children().eq(i);
        $node.addClass('on');
        $node.siblings().removeClass('on');
    }

    //点击产品标题输入框弹出模板弹窗；
    $('.js-prod-name').on('click',function(){
        $('.js-alpha,.js-prod-name-pop').show();
    })
    $('.js-close').on('click',function(){
        $('.js-alpha,.js-prod-name-pop').hide();
    })

    $('.js-tab li').each(function(i){
        $(this).on('click',function(){
            chooseTab(i);
            template = templateArr[i];
            template.updateScoreView();
        });
    });

    //提交按钮
    $('.js-btn-submit').click(function(){
        template.submit();
        if(template.$panel.find('.form-error:visible').length === 0){
            $('.js-prod-name').val(template.data.join(''));
            $('.js-alpha,.js-prod-name-pop').hide();
        }
    })
    //点击取消按钮清空弹窗内数据
    $('.js-btn-reset').click(function(){
        for(var i = 0;i<templateArr.length;i++){
            templateArr[i].reset();
        }
        chooseTab(0);
        $('.js-tab li').eq(0).trigger('click');

        $('.js-alpha,.js-prod-name-pop').hide();
    })
})