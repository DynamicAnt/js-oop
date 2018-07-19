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
    Template.prototype.validationShow = function (name, isValid, msg) {
       var $error = this.$panel.find("div[name="+name+"]");
        if(!isValid && msg){
            $error.html(msg).show();
        } else {
            $error.hide();
        }
        return isValid;
    }
    Template.prototype.isNumber = function(value) {
        return /^[0-9]*$/.test(value);
    }
    Template.prototype.isRequired = function(value) {
        return value!=="";
    }
    Template.prototype.reset = function () {
        this.$panel.find("[type='text']").val('').trigger('blur');
        this.$panel.find("option").eq(0).attr("selected",true);
        this.$panel.find("[type='radio']").attr("checked", false);
        this.$panel.find('.form-error').hide();
        this.$panel.find('.js-name').text('');
        this.prodScore = 0;
    }
    Template.prototype.isValid = function () {
        var flag = true;
        for(var name in this.errors){
            flag = this.isInputValid(name) && flag;
        }
        return flag;
    }

   function Template1($panel) {
       this.$panel = $panel;
       this.prodNameLength = 0;
       this.data = [];
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
    Template1.prototype.isInputValid = function(name) {
        var message = this.$panel.find("div[name="+name+"]").closest('td').find('.js-save-info').val();
        var errorMsg = this.errors[name];
        return this.validationShow(name, message !== '',errorMsg);
    }
    Template1.prototype.updateScore =  function(){
        this.prodScore = this.prodNameLength>20?100:this.prodNameLength*5;
    }
   Template1.prototype.init = function () {
       var _self = this;
       this.$panel.find("[type='text']").each(function () {
            $(this).blur(function () {
                var name = $(this).closest('td').find('.form-error').attr('name');
                _self.getInputInfo($(this));
                _self.updateField(_self.$panel);
                _self.generateName(_self.$panel,_self.data);
                _self.isInputValid(name);
                _self.prodNameLength = _self.data.join('').length;
                _self.updateScore();
                _self.updateScoreView();
            })
       })
   }

   // Template1 end
   function Template2($panel) {
       this.$panel = $panel;
       this.data = [];
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
    Template2.prototype.isInputValid = function(name) {
        var message = this.$panel.find("div[name="+name+"]").closest('td').find('.js-save-info').val();
        var errorMsg = this.errors[name];
        return this.validationShow(name, message !== '',errorMsg);
    }
    Template2.prototype.init = function () {
        var _self = this;
        this.$panel.find("[type='text']").each(function () {
            $(this).blur(function () {
                var name = $(this).closest('td').find('.form-error').attr('name');
                _self.getInputInfo($(this));
                _self.updateField(_self.$panel);
                _self.generateName(_self.$panel,_self.data);
                _self.isInputValid(name);
                _self.updateScore();
                _self.updateScoreView();
            })
        })
    }
    // Template2 end

    function Template3($panel) {
        this.$panel = $panel;
        this.data = [];
        this.init();
    }
    var F3 = function () {}
    F3.prototype = Template.prototype;
    Template3.prototype = new F3();
    Template3.prototype.constructor = Template3;

    Template3.prototype.errors = {
        brand: "请填写品牌",
        time: "请填写季节",
        year: {
            required: '请选择年份',
            number: '请填写数字'
        },
        sex: "请选择性别",
        word:  "请填写核心词"
    }
    Template3.prototype.isInputValid = function(name) {
        var message = this.$panel.find("div[name="+name+"]").closest('td').find('.js-save-info').val();
        var errorMsg = this.errors[name];
        if (typeof errorMsg === 'string'){
            return this.validationShow(name, message !== '',errorMsg);
        } else {
            var flag = true;
            var msg = '';
            for(var prop in errorMsg){
                var method = "is"+prop.substring(0,1).toUpperCase()+prop.substring(1);
                flag = this[method].call(this,message);
                if(!flag){
                    msg = errorMsg[prop];
                    break;
                }
            }
            return this.validationShow(name, flag, msg);
        }
    }
    Template3.prototype.init = function () {
        var _self = this;
        this.$panel.find("[type='text']").each(function () {
            $(this).blur(function () {
                _self.getInputInfo($(this));
                _self.updateView(_self, $(this));
            })
        })
        this.$panel.find("input[name='sex']").click(function () {
            _self.getRadioInfo($(this));
            _self.updateView(_self, $(this));
        })
        this.$panel.find(".js-sel").change(function () {
            _self.getSelectInfo($(this));
            _self.updateView(_self, $(this));
        })
    }

    Template3.prototype.updateView = function($self, $this) {
        var name = $this.closest('td').find('.form-error').attr('name');
        $self.updateField($self.$panel);
        $self.generateName($self.$panel,$self.data);
        $self.isInputValid(name);
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
        this.prodScore = m * 15 + n * 5 + t * 20;
    }
    // Template3 end

    var template1 = new Template1($('.js-node').children().eq(0));
    var template2 = new Template2($('.js-node').children().eq(1));
    var template3 = new Template3($('.js-node').children().eq(2));

    var templateArr = [template1,template2, template3];
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
        if(template.isValid()){
            console.log(template.data);
            $('.js-prod-name').val(template.data.join(''));
            $('.js-alpha,.js-prod-name-pop').hide();
        }
    })
    //点击取消按钮
    $('.js-btn-reset').click(function(){
        for(var i = 0;i<templateArr.length;i++){
            templateArr[i].reset();
        }
        chooseTab(0);
        $('.js-tab li').eq(0).trigger('click');
        $('.js-alpha,.js-prod-name-pop').hide();
    })
})