var publicObj = {
    $alpha: $('.js-alpha'),
    $prodMod: $('.js-prod-mod'),
    $prodName: $('.js-prod-name'),
    $tab: $('.js-tab'),
    index: 0,
    closePop: function () {
        publicObj.$alpha.hide();
        publicObj.$prodMod.hide();
    }
};

function Template($tab) {
    this.$tab = $tab;
    this.$inputs = $tab.find('input');
    this.nameArr = [];
}

Template.prototype = {
    constructor: Template,
    init: function () {
        var that = this;
        this.$inputs.on('keyup', function () {
            that.nameArr = [];

            that.generateProdNames();
            that.updateScore();
        }).on('blur', function () {
            that.updateProdNames(that.nameArr.join(','));
            that.validInputMsg($(this));
        });
    },
    updateScore: function () {
        var score = this.calculateScore();
        this.$tab.closest('.js-pop-bd').find('.js-star').removeClass().addClass('star star-full js-star star-' + Math.floor(score / 10));
        this.$tab.closest('.js-pop-bd').find('.js-score').text(score);
    },
    // 定义一个空方法供updateScore调用
    calculateScore: function () {
    },
    generateProdNames: function () {
        var that = this;
        this.$inputs.each(function (i, e) {
            var val = $.trim($(e).val());
            if (val) {
                that.nameArr.push(val)
            }
        });
    },
    updateProdNames: function (names) {
        this.$tab.find('.js-names').text(names);
    },
    validInputMsg: function (ele) {
        var $td = ele.closest('td');
        var $inputs = $td.find('input');
        var $formError = $td.find('.form-error');
        var vals = [];
        if ($td.hasClass('required')) {
            $inputs.each(function (i, e) {
                var val = $.trim($(e).val());
                if (!val) return;
                vals.push(val)
            });
            if (vals.length === 0) {
                $formError.show();
                return false
            } else {
                $formError.hide();
                return true
            }
        }
        return true
    }
};

function Template1($tab) {
    Template.call(this, $tab);
    this.init();
}

Template1.prototype = new Template(publicObj.$tab.eq(0));
Template1.prototype.constructor = Template1;
$.extend(Template1.prototype, {
    calculateScore: function () {
        var len = this.nameArr.join('').length;
        len = len > 20 ? 20 : len;
        return len * 5
    }
});

function Template2($tab) {
    Template.call(this, $tab);
    this.init();
}

Template2.prototype = new Template(publicObj.$tab.eq(1));
Template2.prototype.constructor = Template2;
$.extend(Template2.prototype, {
    calculateScore: function () {
        var len = this.nameArr.length;
        len = len > 20 ? 20 : len;
        return len * 10;
    }
});

function Template3($tab) {
    Template.call(this, $tab);
    this.$inputs = $tab.find('input[type="text"]');
    this.select = $tab.find('select');
    this.radio = $tab.find('[type="radio"]');
    this.inpNameArr = [];
    this.selectVal = [];
    this.radioVal = [];
    this.score = 0;
    this.init();
}

Template3.prototype = new Template(publicObj.$tab.eq(2));
Template3.prototype.constructor = Template3;
$.extend(Template3.prototype, {
    init: function () {
        var that = this;
        this.$inputs.on('keyup', function () {
            that.inpNameArr = [];
            that.$inputs.each(function (i, e) {
                var val = $.trim($(e).val());
                if (val) {
                    that.inpNameArr.push(val);
                }
            });

            that.generateProdNames();
            that.updateScore();
        }).on('blur', function () {
            that.updateProdNames(that.nameArr.join(','));
            that.validInputMsg($(this));

            if ($(this).hasClass('js-year')) {
                that.validYearMsg($(this))
            }
        });
        this.select.on('change', function (e) {
            that.selectVal = [];
            var value = e.target.value;
            if (value && value !== "选择季节") {
                that.selectVal.push(value)
            }
            that.generateProdNames();
            that.updateScore();
            that.updateProdNames(that.nameArr.join(','));
            that.validSelectMsg($(this));
        });
        this.radio.on('change', function (e) {
            that.radioVal = [];
            var value = e.target.value;
            that.radioVal.push(value);
            that.generateProdNames();
            that.updateScore();
            that.updateProdNames(that.nameArr.join(','));
            that.validRadioMsg($(this));
        })
    },
    generateProdNames: function () {
        var that = this;
        that.nameArr = [];
        if (that.inpNameArr.length > 0) {
            that.nameArr = that.nameArr.concat(that.inpNameArr);
        }
        if (that.selectVal.length > 0 && that.selectVal[0] !== "选择季节") {
            that.nameArr = that.nameArr.concat(that.selectVal);
        }
        that.nameArr = that.nameArr.concat(that.radioVal);
    },
    calculateScore: function () {
        var that = this;
        that.score = 0;

        var $brand = this.$tab.find('[name="brand"]'),
            $season = this.$tab.find('[name="season"]'),
            $sex = this.$tab.find('[name="sex"]:checked'),
            $year = this.$tab.find('[name="year"]'),
            $coreWord = this.$tab.find('[name="coreWord"]');
        var brandVal = $.trim($brand.val()),
            seasonVal = $season.val(),
            sexVal = $sex.val(),
            yearVal = $.trim($year.val()),
            coreWordVal = $.trim($coreWord.val());

        brandVal ? that.score = that.score + 15 : that.score;
        (seasonVal && seasonVal !== '选择季节') ? that.score = that.score + 15 : that.score;
        sexVal ? that.score = that.score + 15 : that.score;
        yearVal ? that.score = that.score + 15 : that.score;
        coreWordVal ? that.score = that.score + 20 : that.score;
        $('.js-score5').map(function () {
            if ($.trim($(this).val())) {
                that.score = that.score + 5
            }
        });
        return that.score;
    },
    validInputMsg: function (ele) {
        var $td = ele.closest('td');
        var $formError = $td.find('.form-error');
        var value = ele.val();
        if ($td.hasClass('required') && !ele.hasClass('js-year')) {
            if (!value) {
                $formError.show();
                return false
            } else {
                $formError.hide();
                return true
            }
        }
        return true
    },
    validSelectMsg: function (ele) {
        var $td = ele.closest('td');
        var $formError = $td.find('.form-error');

        if (this.selectVal.length === 0) {
            $formError.show();
            return false
        } else {
            $formError.hide();
            return true
        }
        return true
    },
    validRadioMsg: function (ele) {
        var $td = ele.closest('td');
        var $formError = $td.find('.form-error');

        if (this.radioVal.length === 0) {
            $formError.show();
            return false
        } else {
            $formError.hide();
            return true
        }
        return true
    },
    validYearMsg: function (ele) {
        var $td = ele.closest('td');
        var $formError = $td.find('.form-error');
        var value = ele.val();
        if (!value) {
            $formError.text('请填写年份');
            $formError.show();
            return false
        }
        if (isNaN(value)) {
            $formError.text('请输入数字');
            $formError.show();
            return false
        } else {
            $formError.hide();
            return true
        }
        return true
    }
});

function triggerTemplate(options) {
    this.template = [
        new Template1(publicObj.$tab.eq(0)),
        new Template2(publicObj.$tab.eq(1)),
        new Template3(publicObj.$tab.eq(2))
    ];

    this.options = $.extend({}, options);
    this.init();
}

$.extend(triggerTemplate.prototype, {
    init: function () {
        var _this = this;

        $('.js-submit-btn').on('click', function () {
            var $tab = publicObj.$prodMod.find('.js-tab.on');
            var flag = true;

            $tab.find('input[type="text"]').each(function () {
                if ($(this).closest('td').hasClass('required')) {
                    flag = _this.template[publicObj.index].validInputMsg($(this)) &&
                        flag;
                }
            });
            $tab.find('select').each(function () {
                flag = _this.template[publicObj.index].validSelectMsg($(this)) && flag;
            });
            $tab.find('[type="radio"]').each(function () {
                flag = _this.template[publicObj.index].validRadioMsg($(this)) && flag;
            });
            $tab.find('.js-year').each(function () {
                flag = _this.template[publicObj.index].validYearMsg($(this)) && flag;
            });
            if (flag) {
                var propsName = $tab.find('.js-names').text();
                publicObj.$prodName.val(propsName);
                publicObj.closePop();
            }
        });

        $('.js-cancel-btn').on('click', function () {
            publicObj.$prodMod.find('.js-star').removeClass().addClass('star star-full js-star star-0');
            publicObj.$prodMod.find('.js-score').text('0');
            publicObj.$prodMod.find('[type="text"]').val('');
            publicObj.$prodMod.find('select').val('');
            publicObj.$prodMod.find('.form-error').hide();
            publicObj.$prodMod.find('.js-names').text('');
            publicObj.$prodMod.find('[type="radio"]').removeAttr('checked');
            publicObj.closePop();
            publicObj.index = 0;

            _this.template[2].selectVal = [];
            _this.template[2].radioVal = [];
            _this.template[2].inpNameArr = [];
            _this.template.map(function(tem) {
                tem.nameArr = [];
            })
        });

        $('.js-close-btn').on('click', function () {
            publicObj.closePop();
        });

        publicObj.$prodMod.find('ul li').each(function (i) {
            var that = $(this);
            _this.chooseTab(that, i);
        });

        this.options.$triggerProdMode.on('click', function () {
            publicObj.$alpha.show();
            publicObj.$prodMod.show();
            publicObj.$prodMod.find('ul li').eq(0).trigger('click')
        });
    },
    // tab切换
    chooseTab: function (li, index) {
        var that = this;
        li.on('click', function () {
            li.closest('ul').find('li').removeClass('on');
            li.addClass('on');
            publicObj.$prodMod.find('.js-tab').removeClass('on').eq(index).addClass('on');
            that.template[index].updateScore(publicObj.$tab.eq(index));
            publicObj.index = index;
        })
    }
});
