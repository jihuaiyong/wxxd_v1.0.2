'use strict';

var myApp = angular.module('myApp', []);

myApp.directive('selectMonthSingle', function ($timeout, $rootScope) {
    /**
     * 按月选择日期
     */
    return {
        restrict: 'AE',
        scope: true,
        templateUrl: '../src/directive/date-month-single.html',
        link: function link(scope, ele, attr) {
            // console.log(attr)
            var _date = new Date();
            var _now = _date.getFullYear() + '年' + (_date.getMonth() + 1) + '月';

            var data = {
                oInit: attr.init || _now,
                oMin: attr.min || '1970年12月',
                oMax: attr.max || '2117年9月'
            };

            scope.pop_open = attr.opens || 'right';

            //页面显示
            scope.dataShow = {
                now: data.oInit,
                year: {},
                months: []

                //更改datashow
            };function initShow(oYear, oSelected) {
                var _min = {
                    year: data.oMin.split(/年|月/)[0],
                    month: data.oMin.split(/年|月/)[1]
                };
                var _max = {
                    year: data.oMax.split(/年|月/)[0],
                    month: data.oMax.split(/年|月/)[1]
                };
                var _selected = {
                    year: oSelected.split(/年|月/)[0],
                    month: oSelected.split(/年|月/)[1]
                };

                var _date = {
                    now: oSelected,
                    year: {
                        value: oYear,
                        canPrev: oYear > _min.year,
                        canNext: oYear < _max.year
                    },
                    months: []
                };
                for (var i = 1; i <= 12; i++) {
                    _date.months.push({
                        checked: oYear == _selected.year && i == _selected.month,
                        value: i + '月',
                        disabled: oYear < _min.year || oYear > _max.year || oYear == _min.year && i < _min.month || oYear == _max.year && i > _max.month,
                        time: oYear + '年' + i + '月'
                    });
                }
                scope.dataShow = angular.copy(_date);
            }
            initShow(scope.dataShow.now.split(/年|月/)[0], scope.dataShow.now);

            //按钮
            scope.btn = {
                prev: function prev() {
                    var _year = scope.dataShow.year.value - 1;
                    initShow(_year, scope.dataShow.now);
                },
                next: function next() {
                    var _year = scope.dataShow.year.value - 0 + 1;
                    initShow(_year, scope.dataShow.now);
                },
                select: function select(time) {
                    scope.dataShow.now = time;
                    scope.pop.hide();
                }

                //pop
            };scope.pop = {
                isShow: false,
                show: function show() {
                    this.isShow = true;
                    $rootScope.$broadcast('closeOther', scope);
                    initShow(scope.dataShow.now.split(/年|月/)[0], scope.dataShow.now);
                },
                hide: function hide() {
                    this.isShow = false;
                }
            };

            document.addEventListener('click', function () {
                scope.pop.hide();
                scope.$apply();
            });
            scope.$on('closeOther', function (e, val) {
                if (val == scope) return;
                scope.pop.hide();
            });
        }
    };
}).directive('selectMonthMultiple', function ($timeout, $rootScope, $http) {
    return {
        restrict: 'AE',
        replace: true,
        scope: true,
        templateUrl: '../src/directive/select-month-multiple.html',
        link: function link(scope, ele, attr) {
            var _date = new Date();
            var _now = _date.getFullYear() + '年' + (_date.getMonth() + 1) + '月';

            var _default = {
                init: attr.init || _now + ' - ' + _now, //初始日期
                min: attr.min || '1970年12月', //最小日期
                max: attr.max || '2117年9月', //最大日期
                limit: attr.limit || '', //可选日期范围
                opens: attr.opens || 'right' //弹出框打开位置
            };

            //日期展示
            scope.oDate = {
                selected: {
                    start: splitDate(_default.init)[0],
                    end: splitDate(_default.init)[1]
                },
                cache: {
                    start: splitDate(_default.init)[0],
                    end: splitDate(_default.init)[1]
                },
                prev: {
                    year: '2017',
                    months: [{ name: '1月', value: '201701', fullName: '2017年01月', isDisabled: false, isStart: false, isEnd: false, isDuring: false, isLimit: false }]
                },
                next: {
                    year: '2018',
                    months: [{ name: '1月', value: '201801', fullName: '2018年01月', isDisabled: false, isStart: false, isEnd: false, isDuring: false, isLimit: false }]
                }

                //弹出框
            };scope.pop = {
                opens: _default.opens,
                isShow: false,
                show: function show() {
                    this.isShow = true;
                    scope.oDate.cache = angular.copy(scope.oDate.selected);
                    var _year_next = scope.oDate.cache.end.split('年')[0];
                    scope.oDate.prev.year = _year_next - 1;
                    scope.oDate.next.year = _year_next;
                    scope.oDate.prev.months = createMonth(scope.oDate.prev.year);
                    scope.oDate.next.months = createMonth(scope.oDate.next.year);
                    scope.btnEvent.disabledSure = false;
                },
                hide: function hide() {
                    this.isShow = false;
                }

                //按钮事件
            };scope.btnEvent = {
                sure: function sure() {
                    scope.oDate.selected = angular.copy(scope.oDate.cache);
                    scope.pop.hide();
                },
                disabledSure: false,
                cancel: function cancel() {
                    scope.pop.hide();
                },
                prevBtn: function prevBtn() {
                    scope.oDate.next.year--;
                    scope.oDate.prev.year--;
                    scope.oDate.next.months = createMonth(scope.oDate.next.year);
                    scope.oDate.prev.months = createMonth(scope.oDate.prev.year);
                    if (this.justStart) {
                        _default.limit && isLimit(toValue(scope.oDate.cache.start), _default.limit);
                    }
                },
                nextBtn: function nextBtn() {
                    scope.oDate.next.year++;
                    scope.oDate.prev.year++;
                    scope.oDate.next.months = createMonth(scope.oDate.next.year);
                    scope.oDate.prev.months = createMonth(scope.oDate.prev.year);
                    if (this.justStart) {
                        _default.limit && isLimit(toValue(scope.oDate.cache.start), _default.limit);
                    }
                },
                prevDisabled: function prevDisabled() {
                    return scope.oDate.prev.year <= _default.min.split('年')[0].trim();
                },
                nextDisabled: function nextDisabled() {
                    return scope.oDate.next.year >= _default.max.split('年')[0].trim();
                },
                justStart: false,
                monthItem: {
                    click: function click(item) {
                        var _start = scope.oDate.cache.start;
                        var _end = scope.oDate.cache.end;

                        scope.btnEvent.justStart = false;
                        if (_start && _end) {
                            clearClass();
                            item.isStart = true;
                            scope.oDate.cache.start = item.fullName;
                            scope.oDate.cache.end = '';
                            _default.limit && isLimit(item.value, _default.limit);

                            scope.btnEvent.justStart = true;
                            scope.btnEvent.disabledSure = true;
                        } else if (_start && !_end) {
                            if (item.value < toValue(_start)) {
                                clearClass();
                                item.isStart = true;
                                scope.oDate.cache.start = item.fullName;
                                _default.limit && isLimit(item.value, _default.limit);
                                scope.btnEvent.disabledSure = true;
                            } else {
                                item.isEnd = true;
                                scope.oDate.cache.end = item.fullName;
                                removeNoLimit();
                                scope.btnEvent.disabledSure = false;
                            }
                        }
                    },
                    mouseover: function mouseover(item) {
                        var _start = scope.oDate.cache.start;
                        var _end = scope.oDate.cache.end;

                        if (_start && !_end) addDuring(toValue(_start), item.value);
                    }
                }

                //function 
                //2017年3月 => 201703
            };function toValue(value) {
                var _year = value.split(/年|月/)[0];
                var _month = value.split(/年|月/)[1];
                _month = parseInt(_month);
                _month = _month < 10 ? '0' + _month : _month;
                return _year + _month;
            }

            //create months
            function createMonth(year) {
                var _months = [];
                var _min = toValue(_default.min);
                var _max = toValue(_default.max);
                var _start = toValue(scope.oDate.cache.start);
                var _end = scope.oDate.cache.end ? toValue(scope.oDate.cache.end) : '';

                for (var i = 1; i <= 12; i++) {
                    var _value = '' + year + (i < 10 ? '0' + i : i);
                    _months.push({
                        name: i + '月',
                        value: _value,
                        fullName: year + '年' + (i < 10 ? '0' + i : i) + '月',
                        isDisabled: !(_value >= _min && _value <= _max),
                        isStart: _value == _start,
                        isEnd: _value == _end,
                        isDuring: _value > _start && _end && _value < _end,
                        isLimit: false
                    });
                }

                return _months;
            }

            //split Date '2017年12月 - 2018年2月' => ['2017年12月', '2018年2月']
            function splitDate(fullDate) {
                var _aDate = fullDate.split('-');
                _aDate.forEach(function (item, index) {
                    _aDate[index] = item.trim();
                });

                return _aDate;
            }

            //clear class 
            function clearClass() {
                scope.oDate.prev.months.forEach(function (item, index) {
                    item.isDuring = false;
                    item.isStart = false;
                    item.isEnd = false;
                    item.isLimit = false;
                });
                scope.oDate.next.months.forEach(function (item, index) {
                    item.isDuring = false;
                    item.isStart = false;
                    item.isEnd = false;
                    item.isLimit = false;
                });
            }

            //add hover class
            function addDuring(min, max) {
                scope.oDate.prev.months.forEach(function (item, index) {
                    item.isDuring = item.value > min && item.value <= max;
                });
                scope.oDate.next.months.forEach(function (item, index) {
                    item.isDuring = item.value > min && item.value <= max;
                });
            }

            //check is limit
            function isLimit(start, limit) {
                var _year = start.substring(0, 4);
                var _month = start.substring(4);
                var _sum = parseInt(_month) + parseInt(limit);

                var _year_max = void 0;
                var _month_max = void 0;
                if (_sum % 12 == 0) {
                    _year_max = (parseInt(_year) + Math.floor(_sum / 12) - 1).toString();
                    _month_max = 12;
                } else {
                    _year_max = (parseInt(_year) + Math.floor(_sum / 12)).toString();
                    _month_max = _sum % 12 < 10 ? '0' + _sum % 12 : _sum % 12;
                }

                var _max = _year_max + _month_max;

                scope.oDate.prev.months.forEach(function (item, index) {
                    item.isLimit = item.value >= _max;
                });
                scope.oDate.next.months.forEach(function (item, index) {
                    item.isLimit = item.value >= _max;
                });
            }
            //remove noLimit class
            function removeNoLimit() {
                scope.oDate.prev.months.forEach(function (item, index) {
                    item.isLimit = false;
                });
                scope.oDate.next.months.forEach(function (item, index) {
                    item.isLimit = false;
                });
            }

            $(document).on('mousedown', function (e) {
                if ($(e.target).closest($(ele)).length || e.type == "focusin") return;
                scope.pop.hide();
                scope.$apply();
            });
        }
    };
}).directive('selectMultipleAjax', function ($timeout, $rootScope, $http) {
    return {
        restrict: 'AE',
        replace: true,
        scope: true,
        templateUrl: '../src/directive/select-multiple-ajax.html',
        link: function link(scope, ele, attr) {
            //数据
            scope.data = {
                aOptions: [], //候选项
                aSelected: [], //已选项
                aBak: [] //缓存已选项


                //弹出框
            };scope.pop = {
                isShow: false,
                show: function show() {
                    this.isShow = true;
                    $rootScope.$broadcast('closeOther', scope);
                    scope.data.aBak = angular.copy(scope.data.aSelected);
                    scope.search.init();
                },
                hide: function hide() {
                    this.isShow = false;
                },
                opens: attr.opens || 'right',
                widthH: attr.width || '450'

                //按钮组
            };scope.btn = {
                sure: function sure() {
                    scope.data.aBak = angular.copy(scope.data.aSelected);
                    scope.word_preview = surePreview();

                    //save data 保存数据，这个跟外面有数据交互
                    // scope.$parent.data[attr.bind] = angular.copy(scope.data.aSelected)

                    scope.pop.hide();
                },
                cancel: function cancel() {
                    scope.data.aSelected = angular.copy(scope.data.aBak);
                    scope.pop.hide();
                }

                //候选项点击
            };scope.optionChange = function (item) {
                if (item.checked) {
                    scope.data.aSelected.push(angular.copy(item));
                } else {
                    scope.data.aSelected.forEach(function (item_selected, index_selected) {
                        if (item_selected.value == item.value) {
                            scope.data.aSelected.splice(scope.data.aSelected.indexOf(item_selected), 1);
                        }
                    });
                }
            };

            //已选删除
            scope.dele = function (item) {
                scope.data.aSelected.splice(scope.data.aSelected.indexOf(item), 1);
                scope.data.aOptions.forEach(function (item_option, index_option) {
                    if (item_option.value == item.value) {
                        item_option.checked = false;
                    }
                });
            };

            //搜索
            scope.word_search = '';
            scope.search = {
                str: '',
                timer: null,
                loading: false,
                change: function change() {
                    var _self = this;
                    clearTimeout(_self.timer);
                    _self.timer = setTimeout(function () {
                        _self.loading = true;
                        var _url = attr.url + '?word=' + _self.str;
                        $http({
                            method: 'GET',
                            url: _url
                        }).then(function (res) {
                            _self.loading = false;
                            scope.data.aOptions = res.data.data;
                            ele.find('.spareTires').scrollTop(0);
                        }, function () {
                            _self.loading = false;
                            zgTips({
                                type: 'danger',
                                position: 'center',
                                content: '发送请求失败'
                            });
                            console.error(err);
                        });
                    }, 500);
                },
                init: function init() {
                    this.str = '';
                    this.loading = true;
                    this.change();
                }

                //清空
            };scope.clear = function () {
                scope.data.aSelected.length = 0;
                scope.data.aOptions.forEach(function (item, index) {
                    item.checked = false;
                });
            };

            //对比候选项和已选项，使他们对应起来
            function compare() {
                // console.log('compare')
                scope.data.aOptions.forEach(function (item, index) {
                    scope.data.aSelected.forEach(function (item_selected, index_selected) {
                        if (item.value == item_selected.value) {
                            item.checked = true;
                        }
                    });
                });
            }
            scope.$watch('data.aOptions', compare);

            //预览文字处理函数
            function surePreview() {
                var _num = scope.data.aSelected.length;
                var _name = attr.names;
                if (_num) {
                    return '已选择' + _num + '个' + _name;
                } else {
                    return '全部' + _name;
                }
            }
            scope.word_preview = surePreview();

            //关闭其他弹出框
            scope.$on('closeOther', function (e, params) {
                if (params == scope) return;
                scope.btn.cancel();
            });

            document.addEventListener('click', function () {
                if (scope.pop.isShow) {
                    scope.btn.cancel();
                    scope.$apply();
                }
            });

            //从外部清空数据
            scope.$on('clearData', function (e, aVal) {
                var _identify = attr.identify || '';
                aVal.forEach(function (item, index) {
                    if (item == _identify) {
                        scope.data.aSelected.length = 0;
                        scope.data.aBak.length = 0;
                        scope.word_preview = surePreview();
                    }
                });
            });
        }
    };
}).directive('selectLargeArea', function ($timeout, $rootScope) {
    return {
        restrict: 'AE',
        scope: true,
        templateUrl: '../src/directive/large-area.html',
        link: function link(scope, ele, attr) {
            // scope.checked_area = scope.$parent.data[attr.bind];
            scope.checked_area = 'all';
            scope.tab = {
                value: 'bcdfg',
                change: function change(val) {
                    this.value = val;
                }
            };
            scope.word_preview = '全部';
            scope.pop = {
                isShow: false,
                opens: attr.opens || 'right',
                focusFn: function focusFn() {
                    this.isShow = true;
                    $rootScope.$broadcast('closeOther', scope);
                },
                blurFn: function blurFn() {
                    this.isShow = false;
                },
                choise: function choise(value, name) {
                    scope.word_preview = name;
                    // scope.$parent.data[attr.bind] = value;
                    this.isShow = false;
                }
            };
            document.addEventListener('click', function () {
                scope.pop.blurFn();
                scope.$apply();
            });
            scope.$on('closeOther', function (e, val) {
                if (val == scope) return;
                scope.pop.blurFn();
            });
        }
    };
});