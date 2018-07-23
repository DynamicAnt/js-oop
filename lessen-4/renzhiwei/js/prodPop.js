(function () {
    function Template(formEles, $tab) {
        this.$tab = $tab;
        this.formEles = formEles || [];
        this.nameArr = [];
        this.score = 0;
        this.init();
    }

    $.extend(Template.prototype, {
        init: function () {
            var _this = this;
            _this.formEles.map(function (data) {
                var $el = $("[name='" + data.name + "']");
                $el.on('keyup', function () {
                    _this.actionsFun($el, data);
                }).on('blur', function () {
                    _this.isValid($el, data);
                });
                if ($el.attr('type') !== 'text') {
                    $el.on('change', function () {
                        _this.actionsFun($el, data);
                        _this.isValid($el, data);
                    })
                }
            });
        },
        actionsFun: function ($el, data) {
            this.updateFormElesVal($el, data);
            this.updateProdNames();
            this.fillScore();
            this.fillProdsName();
        },
        updateFormElesVal: function (el, obj) {
            obj.value = $.trim(el.val());
        },
        updateProdNames: function () {
            var _this = this;
            _this.nameArr = [];
            this.formEles.map(function (obj) {
                var value = obj.value;
                if (value) {
                    _this.nameArr.push(value);
                }
            });
        },
        fillProdsName: function () {
            this.$tab.find('.js-prod-names').text(this.nameArr.join(','));
        },
        fillScore: function () {
            this.calculateScore();
            $('#score').text(this.score);
            $('#nameStar').removeClass().addClass('star star-full js-star star-' + Math.floor(this.score / 10));
        },
        isValid: function (el, data) {
            var _this = this;
            var name = el.attr('name');
            var value = $.trim(data.value);
            var isRequired = data.required;
            if (isRequired && value) {
                data.isValid = true;
                el.siblings('.form-error').hide();
            } else if (isRequired && !value) {
                data.isValid = false;
                el.siblings('.form-error').show();
            }
            if (name === 'tmp1-area') {
                _this.validArea(el, data);
            }
            if (name === 'tmp3-season') {
                _this.validSeason(el, data);
            }
            if (name === 'temp3-year') {
                _this.validYear(el, data);
            }
        }
    });

    function Template1() {
        this.tmpArr = [];      //  缓存模版一地区，品牌，型号值
        this.$tab = $('.js-tab-node').eq(0);
        this.formEles = [
            {
                name: 'tmp1-prop1',
                value: '',
                required: true,
                isValid: false
            },
            {
                name: 'tmp1-prop2',
                value: '',
                required: true,
                isValid: false
            },
            {
                name: 'tmp1-area',
                value: '',
                isValid: false
            },
            {
                name: 'tmp1-word',
                value: '',
                required: true,
                isValid: false
            },
            {
                name: 'tmp1-prop3',
                value: '',
                required: true,
                isValid: false
            }
        ];
        Template.call(this, this.formEles, this.$tab);
    }
    Template1.prototype = new Template();
    $.extend(Template1.prototype, {
        calculateScore: function () {
            var len = this.nameArr.join('').length;
            this.score = this.score > 100 ? this.score : len * 5;
        },
        validArea: function (el, data) {
            var _this = this;
            el.map(function (i, e) {
                var value = $.trim($(e).val());
                if (value) {
                    _this.tmpArr.push(value);
                }
            });
            var len = _this.tmpArr.length;
            if (len > 0) {
                data.isValid = true;
                el.closest('td').find('.form-error').hide();
            } else {
                data.isValid = false;
                el.closest('td').find('.form-error').show();
            }
            this.tmpArr = [];
        },
        updateFormElesVal: function (el, obj) {
            var name = el.attr('name');
            var _this = this;
            if (name === 'tmp1-area') {
                el.map(function (i, e) {
                    var value = $.trim($(e).val());
                    if (value) {
                        _this.tmpArr.push(value);
                    }
                });
                obj.value = _this.tmpArr.join(',');
            } else {
                obj.value = $.trim(el.val());
            }
        }
    });

    function Template2() {
        this.$tab = $('.js-tab-node').eq(1);
        this.formEles = [
            {
                name: 'tmp2-prop1',
                value: '',
                required: true,
                isValid: false
            },
            {
                name: 'tmp2-prop2',
                value: '',
                required: true,
                isValid: false
            },
            {
                name: 'tmp2-word',
                value: '',
                required: true,
                isValid: false
            },
            {
                name: 'tmp2-area',
                value: '',
                isValid: true
            },
            {
                name: 'tmp2-brand',
                value: '',
                isValid: true
            },
            {
                name: 'tmp2-model',
                value: '',
                isValid: true
            },
            {
                name: 'tmp2-alias1',
                value: '',
                isValid: true
            },
            {
                name: 'tmp2-prop3',
                value: '',
                required: true,
                isValid: false
            },
            {
                name: 'tmp2-prop4',
                value: '',
                required: true,
                isValid: false
            },
            {
                name: 'tmp2-alias2',
                value: '',
                required: true,
                isValid: false
            }
        ];
        Template.call(this, this.formEles, this.$tab);
    }
    Template2.prototype = new Template();
    $.extend(Template2.prototype, {
        calculateScore: function () {
            var len = this.nameArr.length;
            this.score = this.score > 100 ? this.score : len * 10;
        }
    });

    function Template3() {
        this.$tab = $('.js-tab-node').eq(2);
        this.formEles = [
            {
                name: 'tmp3-brand',
                value: '',
                score: 15,
                required: true,
                isValid: false
            },
            {
                name: 'tmp3-season',
                value: '',
                score: 15,
                required: true,
                isValid: false
            },
            {
                name: 'temp3-sex',
                value: '',
                score: 15,
                required: true,
                isValid: false
            },
            {
                name: 'temp3-year',
                value: '',
                score: 15,
                required: true,
                isValid: false
            },
            {
                name: 'temp3-prop1',
                value: '',
                score: 5,
                isValid: true
            },
            {
                name: 'temp3-prop2',
                value: '',
                score: 5,
                isValid: true
            },
            {
                name: 'temp3-prop3',
                value: '',
                score: 5,
                isValid: true
            },
            {
                name: 'temp3-prop4',
                value: '',
                score: 5,
                isValid: true
            },
            {
                name: 'temp3-word',
                value: '',
                score: 20,
                required: true,
                isValid: false
            }
        ];
        this.tmpArr = [];
        Template.call(this, this.formEles, this.$tab);
    }

    Template3.prototype = new Template();
    $.extend(Template3.prototype, {
        calculateScore: function () {
            var _this = this;
            _this.score = 0;
            _this.formEles.map(function (obj) {
                if (obj.value) {
                    _this.score = _this.score + obj.score;
                }
            })
        },
        updateFormElesVal: function (el, obj) {
            var name = el.attr('name');
            var _this = this;
            var value = $.trim(el.val());
            if (name === 'temp3-sex') {
                el.map(function (i, e) {
                    if ($(e).is(':checked')) {
                        var _val = $.trim($(e).val());
                        if (_val) {
                            _this.tmpArr.push(_val);
                        }
                    }
                });
                obj.value = _this.tmpArr.join('');
                _this.tmpArr = [];
            } else if (name === 'tmp3-season' && value === '选择季节') {
                obj.value = '';
            } else {
                obj.value = value;
            }
        },
        validSeason: function (el, data) {
            var value = $.trim(el.val());
            if (value === '选择季节') {
                data.isValid = false;
                el.siblings('.form-error').show();
            } else {
                data.isValid = true;
                el.siblings('.form-error').hide();
            }
        },
        validYear: function (el, data) {
            var value = $.trim(el.val());
            if (!value) {
                data.isValid = false;
                el.siblings('.form-error').text('请填写年份').show();
            } else if (isNaN(value)) {
                data.isValid = false;
                el.siblings('.form-error').text('请输入数字').show();
            } else {
                data.isValid = true;
                el.siblings('.form-error').hide();
            }
        }
    });

    function TriggerProdPop(options) {
        var settings = {
            trigger_btn: '#triggerPopBtn',
            submit_btn: '.js_submit',
            cancel_btn: '.js_cancel',
            close_btn: '.js-close',
            pop_container: '#prodNamePop',
            alpha: '#alpha'
        };

        options = $.extend(true, settings, options);
        this.init(options);
    }

    $.extend(TriggerProdPop.prototype, {
        init: function (options) {
            this.initEles();
            this.initEvents(options);
        },
        initEles: function () {
            this.templates = [
                new Template1(),
                new Template2(),
                new Template3()
            ]
        },
        initEvents: function (options) {
            var _this = this;

            $(options.trigger_btn).on('click', function () {
                _this.showPop(options);
            });

            $(options.submit_btn).on('click', function () {
                _this.handleSubmit(options);
            });

            $(options.cancel_btn).on('click', function () {
                _this.handleCancel(options);
            });

            $(options.close_btn).on('click', function () {
                _this.closePop(options);
            });

            $('.js-lists li').on('click', function () {
                var index = $(this).data('index');
                _this.chooseTab(index);
                _this.templates[index].calculateScore();
                _this.templates[index].fillScore();
            });
        },
        handleSubmit: function (options) {
            var _this = this;
            var isValidFlag = true;
            var index = $('.js-lists li.on').data('index');
            var temp = _this.templates[index];
            temp.formEles.map(function (data) {
                var $el = $("[name='" + data.name + "']");
                temp.isValid($el, data);
                if (data.isValid === false) {
                    isValidFlag = false;
                }
            });

            if (isValidFlag) {
                _this.closePop(options);
                _this.fillTriInptName(options);
            }
        },
        handleCancel: function (options) {
            $('[type="text"]').val('');
            $('select').val('');
            $('[type="radio"]').removeAttr('checked');
            $('.js-star').removeClass().addClass('star star-full js-star star-0');
            $('#score').text(0);
            $('.js-prod-names').text('');
            $('.form-error').hide();

            var _this = this;
            _this.templates.map(function (temp) {
                temp.nameArr = [];
                temp.score = 0;
                temp.formEles.map(function (data) {
                    data.value = '';
                    if(data.required || data.name === 'tmp1-area') {
                        data.isValid = false;
                    }
                })
            });

            _this.closePop(options);
        },
        showPop: function (options) {
            $(options.pop_container).show();
            $(options.alpha).show();
        },
        closePop: function (options) {
            $(options.pop_container).hide();
            $(options.alpha).hide();
        },
        chooseTab: function (i) {
            $('.js-lists li').removeClass('on').eq(i).addClass('on');
            $('.js-tab-node').removeClass('on').eq(i).addClass('on')
        },
        fillTriInptName: function (options) {
            var prodNames = $('.js-tab-node.on').find('.js-prod-names').text();
            $(options.trigger_btn).val(prodNames);
        }
    });

    window.TriggerProdPop = TriggerProdPop;
})();

