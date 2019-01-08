'use strict';

(function ($) {
    //inpMany
    $.fn.inpMany = function (setting) {
        this.each(function () {
            var _self = this;

            var _setting = setting ? setting : {};
            var _default = {
                placeholder: '���������(��ͬ���뻻������)',
                tips: ''
            };
            var _info = $.extend({}, _default, _setting);

            //insert html
            $(_self).html('\n                <div class="zg-inpMany">\n                    <input class="zg-form-control" placeholder="'+ _info.tips +'"><p class="uperDiv"></p>\n                    <i class="icon-development-tool"></i>\n                    <div class="inpArea">\n                        <textarea name="" rows="10" placeholder="' + _info.placeholder + '" class="inp-area"></textarea>\n                        <div class="btnBox">\n                            <a href="javascript:;" class="button button-primary btn-sure">\u786E\u5B9A</a>\n                            <a href="javascript:;" class="button button-default btn-cancel">\u53D6\u6D88</a>\n                        </div>\n                    </div>\n                </div>\n            ');

            var $view = $(_self).find('.zg-form-control'),
                $uperDiv = $(_self).find('.uperDiv'),
                $iconView = $(_self).find('.icon-development-tool'),
                $dialog = $(_self).find('.inpArea'),
                $btnSure = $(_self).find('.btn-sure'),
                $btnCancel = $(_self).find('.btn-cancel'),
                $textarea = $(_self).find('textarea');
            
            $view.on('click', toggleDialog);
            $uperDiv.on('click', toggleDialog);
            $iconView.on('click', toggleDialog);

            function toggleDialog() {
                if ($dialog.hasClass('active')) {
                    //hide
                    $dialog.removeClass('active');
                } else {
                    //show
                    $dialog.addClass('active');

                    var _val = $view.val().trim().split(',').join('\n');
                    $textarea.val(_val).focus();
                }
            }
            $btnSure.on('click', function () {
                var _val = $textarea.val().trim();
                $view.val(_val.split('\n').join(','));
                $dialog.removeClass('active');
            });
            $btnCancel.on('click', function () {
                $dialog.removeClass('active');
            });

            $dialog.on('mousedown', function (e) {
                e.stopPropagation();
            });
            $(document).on('mousedown', function (e) {
                if ($(e.target).closest($view).length || $(e.target).closest($iconView).length || e.type == "focusin") return;
                $dialog.removeClass('active');
            });
        });
    };
})(jQuery);
(function ($, win) {
    var _default = {
        parentEle: 'body', //loading�ĸ���
        bgCor: '#fff', //loading�ı���ɫ
        cor: '#000', //������ɫ
        picWidth: '80px', //ͼƬ���
        picType: 'man' //ͼƬ���� man/circle
    };

    var zgLoading = function zgLoading(setting) {
        var _setting = setting ? setting : {};
        var _setInfo = $.extend({}, _default, _setting);
        var _position = _setInfo.parentEle == 'body' ? 'fixed' : 'absolute';
        var $parent = $(_setInfo.parentEle);
        var $loading = $('<section class="pop-loading" style="position: ' + _position + ';background: ' + _setInfo.bgCor + '">');
        if (_setInfo.oWidth) {
            $loading.css('width', _setInfo.oWidth);
        }

        if (_setInfo.picType == 'man') {
            $loading.append('<div class="flexBox">\n                <div class="outBox">\n                    <div class="zg-loading" style="width: ' + _setInfo.picWidth + '">\n                        <svg viewBox="0 0 96 96" width="100%" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">\n                            <defs>\n                                <path d="M42,27.0093689 C42,26.4519098 42.4389518,25.9312385 42.9941492,25.8570005 C42.9941492,25.8570005 44.0105326,25.6433716 46.3164673,25.6433716 C48.622402,25.6433716 50.0048641,25.873262 50.0048641,25.873262 C50.5544625,25.9432575 51,26.4433532 51,27.0093689 L51,28.9906311 C51,29.5480902 50.5629888,30.0442052 49.9975069,30.0951348 C49.9975069,30.0951348 48.5812346,30.2677002 46.3869629,30.2677002 C44.1926912,30.2677002 42.9891844,30.101206 42.9891844,30.101206 C42.4428729,30.0453115 42,29.5566468 42,28.9906311 L42,27.0093689 Z" id="path-1"></path>\n                            </defs>\n                            <g id="Page-1" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd">\n                                <g id="Artboard-Copy-2">\n                                    <path d="M26.9322698,59.9316406 C26.9322698,59.9316406 17.0442134,69.9794922 17.0442134,76.8828125 C17.0442134,83.7861328 27.5689147,91.1230469 28.9938079,91.2919922 C30.4187012,91.4609375 57.2868951,91.2129309 68.5640559,91.2673628 C71.5200236,91.2816304 72.9692383,89.0141602 75.1279297,84.7861328 C77.2866211,80.5581055 80.6379029,73.8515625 78.5059365,69.9287109 C76.3739701,66.0058594 64.8076245,56 64.8076245,56 L26.9322698,59.9316406 Z" id="Path-9" stroke="#000000" stroke-width="2" fill="#658ADC"></path>\n                                    <path d="M42.2314453,66.1704102 C43.5029297,79.140625 39.802002,90.9458008 39.802002,90.9458008 L57.4990234,90.6655273 C57.4990234,90.6655273 53.8623047,75.4502153 57.4990234,63.9355469 C61.1357422,52.4208785 51.1826172,66.6992187 47.6049805,66.0673828 C44.0273438,65.4355469 40.9599609,53.2001953 42.2314453,66.1704102 Z" id="Path-8" stroke="#000000" stroke-width="1.4" fill="#6A96B8"></path>\n                                    <ellipse id="Oval" stroke="#000000" stroke-width="2" fill="#FAEAD0" cx="70.5" cy="42.7895508" rx="3.5" ry="5.78955078"></ellipse>\n                                    <ellipse id="Oval-Copy" stroke="#000000" stroke-width="2" fill="#FAEAD0" cx="25.5" cy="42.7895508" rx="3.5" ry="5.78955078"></ellipse>\n                                    <path d="M47.0966797,29.9189453 C47.0966797,29.9189453 69.3417969,32.7753906 69.9003906,35.6611328 C70.4489512,38.4950429 72.8674454,65.6352431 48.2910156,66.2539063 C23.7145859,66.8725694 23.5537109,37.5634766 25.3193359,33.7412109 C27.0849609,29.9189453 47.0966797,29.9189453 47.0966797,29.9189453 Z" id="Path-6" stroke="#000000" stroke-width="2" fill="#FAEAD0"></path>\n                                    <path d="M25.1978738,36.4380154 C26.2384011,37.1709255 35.1433655,32.2587891 47.0686584,32.3837891 C58.9939514,32.5087891 67.6679688,35.7788086 69.5361328,35.7788086 C71.0335969,35.7788086 74.026677,29.1209611 74.3043191,21.6972927 C74.5819611,14.2736244 74.3204825,10.1931537 70.635862,6.79592553 C66.9512416,3.39869734 55.4415261,5.3618435 55.4415261,5.3618435 C55.4415261,5.3618435 52.7503341,2.99076084 47.0686584,3.00002709 C41.3869828,3.00929334 38.635862,5.81350365 38.3760964,5.38967553 C38.1163308,4.9658474 30.8087136,3.27688256 26.2384011,5.74074975 C21.6680886,8.20461693 18.8863503,12.5825466 20.4278542,21.6972927 C21.9693581,30.8120388 24.1573464,35.7051052 25.1978738,36.4380154 Z" id="Path-2" stroke="#000000" stroke-width="2" fill="#658ADD"></path>\n                                    <path d="M22,28.3609525 C22,28.3609525 34.3556536,24.2027556 46.3012695,24.0074369 C58.2468854,23.8121183 72.8867188,27.5289213 72.8867188,27.5289213" id="Path-3" stroke="#000000"></path>\n                                    <path d="M38,5 L40.746582,24.3964844" id="Path-5" stroke="#000000"></path>\n                                    <path d="M53,5 L55.746582,24.3964844" id="Path-5-Copy" stroke="#000000" transform="translate(54.373291, 14.698242) scale(-1, 1) translate(-54.373291, -14.698242) "></path>\n                                    <g id="Rectangle">\n                                        <use fill="#2AF9FF" fill-rule="evenodd" xlink:href="#path-1"></use>\n                                        <path stroke="#000000" stroke-width="1" d="M42.5,27.0093689 C42.5,26.6960839 42.7598,26.3927865 43.0604167,26.3525896 C43.2060383,26.3233896 43.4507026,26.2860746 43.8395837,26.2477791 C44.5009858,26.1826469 45.3237603,26.1433716 46.3164673,26.1433716 C47.3098497,26.1433716 48.2025784,26.1857625 48.9802408,26.2562741 C49.4429794,26.2982311 49.7619847,26.3397395 49.9228451,26.366489 C50.2444955,26.4078195 50.5,26.6980013 50.5,27.0093689 L50.5,28.9906311 C50.5,29.29615 50.2536799,29.5700391 49.9526564,29.5971505 C49.7684633,29.6193447 49.4430512,29.6508573 48.9808385,29.6825918 C48.2064335,29.7357609 47.3351108,29.7677002 46.3869629,29.7677002 C45.4391649,29.7677002 44.6083984,29.7369281 43.9013117,29.6857573 C43.4809295,29.6553348 43.1975078,29.6252637 43.0577023,29.6059229 C42.7468453,29.5738015 42.5,29.2981388 42.5,28.9906311 L42.5,27.0093689 Z"></path>\n                                    </g>\n                                    <path d="M66,74 L71.3613281,78.9682617" id="Path-10" stroke="#000000" stroke-width="2"></path>\n                                    <path d="M68,77 L68,90.4079119" id="Path-11" stroke="#000000" stroke-width="2"></path>\n                                    <path d="M55,43.245923 C55,43.245923 56.1606445,39.9628919 58.1895752,40.0003176 C60.2185059,40.0377433 60.7277832,42.1353273 61.3201904,43.093091 C61.9125977,44.0508547 62.5541992,44.3270998 62.5541992,44.3270998" id="Path-12" stroke="#000000" stroke-width="1.2" stroke-linecap="round" stroke-linejoin="round"></path>\n                                    <path d="M36,43.245923 C36,43.245923 37.1606445,39.9628919 39.1895752,40.0003176 C41.2185059,40.0377433 41.7277832,42.1353273 42.3201904,43.093091 C42.9125977,44.0508547 43.5541992,44.3270998 43.5541992,44.3270998" id="Path-12-Copy" stroke="#000000" stroke-width="1.2" stroke-linecap="round" stroke-linejoin="round" transform="translate(39.777100, 42.163550) scale(-1, 1) translate(-39.777100, -42.163550) "></path>\n                                    <path d="M43.4111328,56.2167969 C43.4111328,56.2167969 51.203125,58.7260742 54.855957,56.2167969" id="Path-13" stroke="#000000" stroke-width="1.3" stroke-linecap="round" stroke-linejoin="round"></path>\n                                    <polyline id="Path-14" stroke="#000000" fill="#A1D2FC" points="41.8013916 78.5141602 56.402832 68 55.3763428 74.7027588 41 84.8546143 41.9311523 78.3330078"></polyline>\n                                    <path d="M43.0563457,63.4970622 C38.7989786,65.261358 50.6171975,72.6362305 48.5690207,75.1450195 C46.5208438,77.6538086 58.9657679,65.1500299 54.5311235,63.4970622 C50.0964792,61.8440945 48.5690207,58.903068 48.5690207,58.903068 C48.5690207,58.903068 47.3137127,61.7327664 43.0563457,63.4970622 Z" id="Path-7" fill="#000000"></path>\n                                    <path d="M30.8929063,73.0189189 C28.7541504,73.3659668 25.7592773,89.2346191 27.5280762,90.0925293 C29.296875,90.9504395 31.6948242,91.4191895 34.1643066,90.9504395 C36.6337891,90.4816895 40.5393907,76.8971993 38.305504,74.1602606 C36.0716173,71.423322 33.9685238,72.5198499 30.8929063,73.0189189 Z" id="Path-15" stroke="#000000" stroke-width="1.3" fill="#496095"></path>\n\n                                    <!-- \u6247\u5B50 start -->\n                                    <g>\n                                        <g id="Group" transform="translate(40.189036, 66.796743) rotate(32.000000) translate(-40.189036, -66.796743) translate(25.689036, 47.796743)" stroke="#000000" fill="#FFFFFF">\n                                            <path d="M8.66107991,7.25561611 C10.2744607,7.25561611 11.9361348,11.9046309 9.07145287,19.3187865 C6.2067709,26.732942 1.96825251,28.3110297 1.96825251,28.3110297 L2.3142344,26.8310328 C2.3142344,26.8310328 5.512885,21.0605063 6.44074461,16.715285 C7.36860422,12.3700638 7.0476991,7.25561611 8.66107991,7.25561611 Z" id="Path-4-Copy-7" transform="translate(6.298808, 17.783323) scale(-1, 1) rotate(7.000000) translate(-6.298808, -17.783323) "></path>\n                                            <path d="M11.3827607,3.20985028 C13.6963537,3.52375576 15.886641,8.32221279 13.0219591,17.3331747 C10.1572771,26.3441365 4.68993327,28.8000239 4.68993327,28.8000239 L5.03591516,27.0012762 C5.03591516,27.0012762 7.19952704,20.4032335 8.36117804,14.4865502 C9.52282905,8.56986676 9.06916762,2.89594479 11.3827607,3.20985028 Z" id="Path-4-Copy-6" transform="translate(9.537320, 15.998713) scale(-1, 1) rotate(1.000000) translate(-9.537320, -15.998713) "></path>\n                                            <path d="M14.0467908,0.967504057 C15.6601716,0.967504057 18.873904,6.4886878 16.1452051,15.7728504 C13.4165062,25.057013 11.7491433,28.5870304 11.7491433,28.5870304 L8.84520926,26.6933411 C8.84520926,26.6933411 10.6064658,18.5950267 11.7681168,12.6783433 C12.9297678,6.76165989 12.4334099,0.967504057 14.0467908,0.967504057 Z" id="Path-4-Copy-5" transform="translate(13.025226, 14.777267) scale(-1, 1) rotate(-1.000000) translate(-13.025226, -14.777267) "></path>\n                                            <path d="M16.8692522,0.437370496 C18.482633,0.437370496 21.7271237,5.56072805 18.8624417,14.5716899 C15.9977598,23.5826518 16.9814716,28.6337645 16.9814716,28.6337645 L14.6614757,27.5869028 C14.6614757,27.5869028 13.5198067,20.1188968 14.1231327,12.6996592 C14.7264587,5.28042156 15.2558714,0.437370496 16.8692522,0.437370496 Z" id="Path-4-Copy-4" transform="translate(16.974730, 14.535568) rotate(-8.000000) translate(-16.974730, -14.535568) "></path>\n                                            <path d="M20.0413606,1.29118429 C21.6547414,1.29118429 24.586134,6.70959718 21.721452,15.720559 C18.85677,24.7315209 17.7437131,28.9107107 17.7437131,28.9107107 L14.8397791,27.0170214 C14.8397791,27.0170214 16.6010356,18.9187069 17.7626866,13.0020235 C18.9243376,7.08534012 18.4279798,1.29118429 20.0413606,1.29118429 Z" id="Path-4-Copy-3" transform="translate(18.883369, 15.100947) rotate(-8.000000) translate(-18.883369, -15.100947) "></path>\n                                            <path d="M23.3434216,3.24997398 C24.9568024,3.24997398 27.847302,8.36233649 24.98262,17.3732984 C22.117938,26.3842602 16.6505942,28.8401476 16.6505942,28.8401476 L16.0554008,26.8462698 C16.0554008,26.8462698 19.5859815,21.2617413 21.0804224,14.6118417 C22.5748632,7.96194213 21.7300408,3.24997398 23.3434216,3.24997398 Z" id="Path-4-Copy-2" transform="translate(21.126308, 16.045061) rotate(-8.000000) translate(-21.126308, -16.045061) "></path>\n                                            <path d="M26.3753525,7.25561611 C27.9887333,7.25561611 29.6504075,11.9046309 26.7857255,19.3187865 C23.9210435,26.732942 19.6825251,28.3110297 19.6825251,28.3110297 L20.028507,26.8310328 C20.028507,26.8310328 23.2271576,21.0605063 24.1550172,16.715285 C25.0828768,12.3700638 24.7619717,7.25561611 26.3753525,7.25561611 Z" id="Path-4"></path>\n                                            <rect id="Rectangle-2-Copy" x="14.7618939" y="29.9294165" width="2.34920461" height="7.5774378" rx="1.17460231"></rect>\n                                            <path d="M9.84126257,27.4010838 C9.84126257,26.6066256 13.0945661,25.2993102 16.1066528,25.4001656 C19.1187395,25.501021 21.7266049,26.7762254 21.7266049,27.7990475 C21.7266049,28.8218696 18.8694944,31.1774832 15.7839337,31.0741676 C12.6983731,30.9708521 9.84126257,28.195542 9.84126257,27.4010838 Z" id="Path-4-Copy"></path>\n                                            \n                                        </g>\n                                        <animateTransform attributeName="transform" begin="0s" dur=".4s" type="rotate" values="-14 32 86;0 32 86;-14 32 86" repeatCount="indefinite"/>\n                                    </g>\n                                    <!-- \u6247\u5B50 end -->\n\n                                    <g>\n                                        <ellipse id="Oval-2" stroke="#000000" stroke-width="2" fill="#FAEAD0" cx="33" cy="82.5" rx="4.5" ry="3.9375"></ellipse>\n                                        <animateTransform attributeName="transform" begin="0s" dur=".4s" type="rotate" values="-14 32 86;0 32 86;-14 32 86" repeatCount="indefinite"/>\n                                    </g>\n                                    <path d="M56.0599365,52.2327881 C58.7723636,52.7529586 60.3286133,53.1850586 60.5356445,54.0908203 C60.7426758,54.996582 61.8110352,61.0107422 61.8110352,61.0107422 L59.1640625,54.4801025 L54.4936523,52.9321289 C54.4936523,52.9321289 53.3475094,51.7126176 56.0599365,52.2327881 Z" id="Path-17" fill="#000000"></path>\n                                </g>\n                            </g>\n                        </svg>\n                    </div>\n                    <p class="word" style="color: ' + _setInfo.cor + '">\u4E3B\u516C\u83AB\u6025\uFF0C\u6570\u636E\u52A0\u8F7D\u4E2D..</p>\n                </div>\n            </div>');
        } else if (_setInfo.picType == 'circle') {
            $loading.append('<div class="flexBox">\n                <div class="outBox">\n                    <div class="zg-loading" style="width: ' + _setInfo.picWidth + '">\n                        <svg class="lds-spinner" width="100%"  xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0 0 100 100" preserveAspectRatio="xMidYMid"><g transform="rotate(0 50 50)">\n                            <rect x="48" y="11" rx="9.6" ry="2.2" width="4" height="18" fill="#2D86E1">\n                                <animate attributeName="opacity" values="1;0" times="0;1" dur="0.8s" begin="-0.7333333333333334s" repeatCount="indefinite"></animate>\n                            </rect>\n                            </g><g transform="rotate(30 50 50)">\n                            <rect x="48" y="11" rx="9.6" ry="2.2" width="4" height="18" fill="#2D86E1">\n                                <animate attributeName="opacity" values="1;0" times="0;1" dur="0.8s" begin="-0.6666666666666666s" repeatCount="indefinite"></animate>\n                            </rect>\n                            </g><g transform="rotate(60 50 50)">\n                            <rect x="48" y="11" rx="9.6" ry="2.2" width="4" height="18" fill="#2D86E1">\n                                <animate attributeName="opacity" values="1;0" times="0;1" dur="0.8s" begin="-0.6s" repeatCount="indefinite"></animate>\n                            </rect>\n                            </g><g transform="rotate(90 50 50)">\n                            <rect x="48" y="11" rx="9.6" ry="2.2" width="4" height="18" fill="#2D86E1">\n                                <animate attributeName="opacity" values="1;0" times="0;1" dur="0.8s" begin="-0.5333333333333333s" repeatCount="indefinite"></animate>\n                            </rect>\n                            </g><g transform="rotate(120 50 50)">\n                            <rect x="48" y="11" rx="9.6" ry="2.2" width="4" height="18" fill="#2D86E1">\n                                <animate attributeName="opacity" values="1;0" times="0;1" dur="0.8s" begin="-0.46666666666666673s" repeatCount="indefinite"></animate>\n                            </rect>\n                            </g><g transform="rotate(150 50 50)">\n                            <rect x="48" y="11" rx="9.6" ry="2.2" width="4" height="18" fill="#2D86E1">\n                                <animate attributeName="opacity" values="1;0" times="0;1" dur="0.8s" begin="-0.4000000000000001s" repeatCount="indefinite"></animate>\n                            </rect>\n                            </g><g transform="rotate(180 50 50)">\n                            <rect x="48" y="11" rx="9.6" ry="2.2" width="4" height="18" fill="#2D86E1">\n                                <animate attributeName="opacity" values="1;0" times="0;1" dur="0.8s" begin="-0.3333333333333333s" repeatCount="indefinite"></animate>\n                            </rect>\n                            </g><g transform="rotate(210 50 50)">\n                            <rect x="48" y="11" rx="9.6" ry="2.2" width="4" height="18" fill="#2D86E1">\n                                <animate attributeName="opacity" values="1;0" times="0;1" dur="0.8s" begin="-0.26666666666666666s" repeatCount="indefinite"></animate>\n                            </rect>\n                            </g><g transform="rotate(240 50 50)">\n                            <rect x="48" y="11" rx="9.6" ry="2.2" width="4" height="18" fill="#2D86E1">\n                                <animate attributeName="opacity" values="1;0" times="0;1" dur="0.8s" begin="-0.20000000000000004s" repeatCount="indefinite"></animate>\n                            </rect>\n                            </g><g transform="rotate(270 50 50)">\n                            <rect x="48" y="11" rx="9.6" ry="2.2" width="4" height="18" fill="#2D86E1">\n                                <animate attributeName="opacity" values="1;0" times="0;1" dur="0.8s" begin="-0.13333333333333333s" repeatCount="indefinite"></animate>\n                            </rect>\n                            </g><g transform="rotate(300 50 50)">\n                            <rect x="48" y="11" rx="9.6" ry="2.2" width="4" height="18" fill="#2D86E1">\n                                <animate attributeName="opacity" values="1;0" times="0;1" dur="0.8s" begin="-0.06666666666666667s" repeatCount="indefinite"></animate>\n                            </rect>\n                            </g><g transform="rotate(330 50 50)">\n                            <rect x="48" y="11" rx="9.6" ry="2.2" width="4" height="18" fill="#2D86E1">\n                                <animate attributeName="opacity" values="1;0" times="0;1" dur="0.8s" begin="0s" repeatCount="indefinite"></animate>\n                            </rect>\n                            </g>\n                        </svg>\n                    </div>\n                </div>\n            </div>');
        }

        if (_setInfo.parentEle != 'body') {
            $parent.css('position', 'relative');
        }
        $parent.append($loading);

        return {
            show: function show() {
                $loading.show();
            },
            hide: function hide() {
                $loading.hide();
            }
        };
    };

    win.zgLoading = zgLoading;
})(jQuery, window);
(function () {
    var _tmplate = '\n    ^_______^\n    \u2502\u3000   \uFF0A \u2502\n    \u2502 \u2764 \u03B5 \u2764\u2502\n     \u252C\u2014\u25CB\u2014\u2014\u25CB\u2014\u252C \n     \u25CB\uFF3F\uFF3F\uFF3F\u25CB\n \u250F\u252F\u2513\u250F\u252F\u2513\u250F\u252F\u2513\n \u2520\u62DB\u2528\u2520\u8D22\u2528\u2520\u732B\u2528 \n \u2517\u2537\u251B\u2517\u2537\u251B\u2517\u2537\u251B\n \u524D\u7AEF\u6837\u5F0F\u3001\u7EC4\u4EF6\u8BF7\u8BBF\u95EE\uFF1Ahttp://uxcoolsit.cnsuning.com/zg-style/p-index/index.html#!/home\n    ';
    console.log(_tmplate);
})();
(function ($, win) {
    var isInit;
    var init = function init() {
        $('body').append('<section class="pop">\n                            <div class="flexBox"></div>\n                        </section>');

        isInit = true;
    };

    var showPop = function showPop() {
        $('.pop').show();
    };

    var hidePop = function hidePop() {
        $('.pop').hide();
    };

    /**
     * confirm
     */
    var confirm = function confirm(setting) {
        var _default = {
            title: '����',
            content: '����',
            sureBak: function sureBak() {
                hidePop();
            },
            oWidth: 'auto'
        };
        var _info = $.extend({}, _default, setting);

        if (!isInit) init();

        $('.pop').css('width', _info.oWidth);

        $('.pop > .flexBox').html('\n            <div class="confirm">\n                <h3 class="tit">\n                    <a href="javascript:;" class="btn-close"><i class="icon-cross"></i></a>\n                    <span>' + _info.title + '</span>\n                </h3>\n                <div class="content">' + _info.content + '</div>\n                <div class="btnBox">\n                    <a href="javascript:;" class="button btn-sure button-primary">\u786E\u5B9A</a>\n                    <a href="javascript:;" class="button btn-cancel button-default">\u53D6\u6D88</a>\n                </div>\n            </div>\n        ');

        //listen event
        $('.pop > .flexBox >.confirm .btn-close, .pop > .flexBox >.confirm .btn-cancel').on('click', function () {
            hidePop();
        });
        $('.pop > .flexBox >.confirm .btn-sure').on('click', function () {
            _info.sureBak();
            hidePop();
        });

        showPop();
    };

    /**
     * alert
     */
    var alert = function alert(setting) {
        var _default = {
            content: '��ʾ����',
            oWidth: 'auto'
        };
        var _info = $.extend({}, _default, setting);

        if (!isInit) init();

        $('.pop').css('width', _info.oWidth);

        $('.pop > .flexBox').html('\n            <div class="confirm">\n                <h3 class="tit">\n                    <a href="javascript:;" class="btn-close"><i class="icon-cross"></i></a>\n                    <span>\u63D0\u793A</span>\n                </h3>\n                <div class="content">' + _info.content + '</div>\n            </div>\n        ');

        //listen event
        $('.pop > .flexBox >.confirm .btn-close').on('click', function () {
            hidePop();
        });

        showPop();
    };

    /**
     * input confirm
     */
    var inpConfirm = function inpConfirm(setting) {
        var _default = {
            title: '����',
            placeholder: '������',
            value: '',
            oWidth: 'auto',
            sureBak: function sureBak() {
                hidePop();
            }
        };
        var _info = $.extend({}, _default, setting);

        if (!isInit) init();

        $('.pop').css('width', _info.oWidth);

        $('.pop > .flexBox').html('\n            <div class="confirm">\n                <h3 class="tit">\n                    <a href="javascript:;" class="btn-close"><i class="icon-cross"></i></a>\n                    <span>' + _info.title + '</span>\n                </h3>\n                <div class="content">\n                    <input type="text" class="zg-form-control" placeholder="' + _info.placeholder + '" value="' + _info.value + '"/>\n                    <p class="tips-error">\u9519\u8BEF\u4FE1\u606F\u63D0\u793A</p>\n                </div>\n                <div class="btnBox">\n                    <a href="javascript:;" class="button btn-sure button-primary">\u786E\u5B9A</a>\n                    <a href="javascript:;" class="button btn-cancel button-default">\u53D6\u6D88</a>\n                </div>\n            </div>\n        ');

        //listen event
        var tips_error = {
            show: function show(str) {
                var _word = str ? str : '������Ϣ';
                $('.pop > .flexBox >.confirm .tips-error').html(_word).show();
            },
            hide: function hide() {
                $('.pop > .flexBox >.confirm .tips-error').hide();
            }
        };
        $('.pop > .flexBox >.confirm .btn-close, .pop > .flexBox >.confirm .btn-cancel').on('click', function () {
            hidePop();
        });
        $('.pop > .flexBox >.confirm .btn-sure').on('click', function () {
            var _inp = $('.pop >.flexBox>.confirm .zg-form-control').val();
            _info.sureBak(_inp);
        });
        $('.pop >.flexBox>.confirm .zg-form-control').on('focus', tips_error.hide);

        showPop();

        inpConfirm.error = tips_error;
    };

    win.pop = {
        show: showPop,
        hide: hidePop,
        confirm: confirm,
        alert: alert,
        inpConfirm: inpConfirm
    };
})(jQuery, window);
(function ($) {
    //select-multiple
    $.fn.selectMultiple = function () {
        this.each(function () {
            var _self = this;

            if (!this.multiple) {
                alert('��Ҫ���ö�ѡ����multiple');
                return;
            }

            function setNoView() {
                $(_self).css({
                    'width': '1px',
                    'height': '1px',
                    'overflow': 'hidden',
                    'opacity': '0',
                    'padding': '0'
                }).parent().css('position', 'relative');
            }

            function initHTML() {
                var _str = '<article class="zg-select-multiple">\n                                <p class="zg-form-control"></p>\n                                <i class="icon-caret-down"></i>\n                                <div class="innerPop">\n                                    <ul>';
                $(_self).find('option').each(function (index, item) {
                    if (item.selected) {
                        _str += '<li>\n                                <label>\n                                    <input type="checkbox" name="' + item.value + '" checked="checked">\n                                    <span><i class="icon-check"></i>' + item.innerHTML + '</span>\n                                </label>\n                            </li>';
                    } else {
                        _str += '<li>\n                                <label>\n                                    <input type="checkbox" name="' + item.value + '">\n                                    <span><i class="icon-check"></i>' + item.innerHTML + '</span>\n                                </label>\n                            </li>';
                    }
                });
                _str += '</ul>\n                        <p class="checkAll">\n                            <label>\n                                <input type="checkbox" class="btn-checkAll">\n                                \u5168\u9009\n                            </label>\n                        </p>\n                        <div class="btnBox">\n                            <a href="javascript:;" class="button button-primary btn-sure">\u786E\u5B9A</a>\n                            <a href="javascript:;" class="button button-default btn-cancel">\u53D6\u6D88</a>\n                        </div>\n                    </div>\n                </article>';
                var $multiple = $(_self).parent().find('article.zg-select-multiple');
                if ($multiple.length > 0) {
                    $multiple.remove();
                }
                $(_self).parent().append(_str);
            }

            function initEvent() {
                var _parent = $(_self).parent();
                var $options = _parent.find('.innerPop >ul input[type=checkbox]');

                var $btnSure = _parent.find('.btn-sure');
                var $btnCancel = _parent.find('.btn-cancel');
                var $view = _parent.find('.zg-form-control');
                var $dialog = _parent.find('.innerPop');
                var $iconCaret = _parent.find('.icon-caret-down');
                var $btnCheckAll = _parent.find('.innerPop > .checkAll .btn-checkAll');

                $btnSure.on('click', function () {
                    setSelected();
                    preview();
                    $(_self).trigger('change');
                    $dialog.hide();
                });

                $btnCancel.on('click', function () {
                    $dialog.hide();
                });

                $btnCheckAll.on('change', function () {
                    var _checked = false;
                    if (this.checked) {
                        _checked = true;
                    }
                    $options.each(function (index, item) {
                        item.checked = _checked;
                    });
                });

                $options.on('click', function () {
                    var is_all = true;
                    $options.each(function (index, item) {
                        if (!item.checked) {
                            is_all = false;
                        };
                    });
                    $btnCheckAll[0].checked = is_all;
                });

                function toggleDialog() {
                    $dialog.toggle();
                    if ($dialog.is(':visible')) {
                        $dialog.find('>ul').scrollTop(0);
                        initView();
                    }
                }

                $view.on('click', toggleDialog);
                $iconCaret.on('click', toggleDialog);

                $dialog.on('mousedown', function (e) {
                    e.stopPropagation();
                });

                $(document).on('mousedown', function (e) {
                    if ($(e.target).closest($view).length || e.type == "focusin") return;
                    $dialog.hide();
                });
            }

            function initView() {
                var _num = 0;
                var $options = $(_self).find('option');
                var $btnCheckAll = $(_self).parent().find('.innerPop > .checkAll .btn-checkAll');

                $options.each(function (index, item) {
                    var $item = $(_self).parent().find('.innerPop >ul input');
                    var _target;
                    $item.each(function (innerIndex, innerItem) {
                        if (innerItem.name == item.value) {
                            _target = innerItem;
                        }
                    });
                    if (!_target) return;
                    if (item.selected) {
                        _target.checked = true;
                        _num++;
                    } else {
                        _target.checked = false;
                    }
                });

                if (_num == $options.length) {
                    $btnCheckAll[0].checked = true;
                }
            }

            function setSelected() {
                var _parent = $(_self).parent();
                var $options = _parent.find('.innerPop >ul input[type=checkbox]');

                $options.each(function (index, item) {
                    var $item = $(_self).find('option');
                    var _target;
                    $item.each(function (innerIndex, innerItem) {
                        if (innerItem.value == item.name) {
                            _target = innerItem;
                        }
                    });

                    if (!_target) return;
                    if (item.checked) {
                        _target.selected = true;
                    } else {
                        _target.selected = false;
                    }
                });
            }

            /**
             * ����Ԥ��
             */
            function preview() {
                var $view = $(_self).parent().find('.zg-select-multiple > .zg-form-control');
                var _num = 0;
                $(_self).find('option').each(function (index, item) {
                    if (item.selected) {
                        _num++;
                    }
                });

                var _word = '';
                if (_num == 0) {
                    _word = 'δѡ��';
                } else if (_num == $(_self).find('option').length) {
                    _word = 'ȫ��';
                } else {
                    _word = '��ѡ��' + _num + '��';
                }
                $view.html(_word);
            }

            //test
            setNoView();
            initHTML();
            initEvent();
            preview();
        });
    };
})(jQuery);
(function ($, win) {
    //��ʼ��������
    function createBox() {
        $('body').append('<section class="pop-tips">\n            <ul>\n            </ul>\n        </section>');
    }

    //�������Ƿ�Ϊ��
    function boxIsEmpty() {
        var _num = $('.pop-tips >ul >li').length;
        if (!_num) {
            $('.pop-tips').hide();
        }
    }

    //��鴫���Ƿ�����
    function checkSetting(setting) {
        var aPosition = ['center', 'top', 'bottom', 'leftTop', 'rightTop', 'leftBottom', 'rightBottom'];
        var aType = ['success', 'warning', 'danger'];

        if ($.inArray(setting.position, aPosition) == -1) {
            alert('position���δ��󣬿�ѡֵ��center/top/bottom/leftTop/rightTop/leftBottom/rightBottom');
            return false;
        }

        if ($.inArray(setting.type, aType) == -1) {
            alert('type���δ��󣬿�ѡֵ��success/warning/danger');
            return false;
        }

        return true;
    }

    var _default = {
        position: 'center',
        type: 'success',
        content: ''
    };

    var Tips = function Tips(setting) {
        var _self = this;
        var _info = $.extend({}, _default, setting);

        if (!checkSetting(_info)) return;

        if ($('.pop-tips').length == 0) createBox();

        var $tip = $('<li class="' + _info.type + '">' + _info.content + '</li>');
        $('.pop-tips > ul').append($tip).parent().attr('class', 'pop-tips ' + _info.position).show();

        //������������
        if (_info.oWidth) {
            switch (_info.position) {
                case 'center':
                    $('.pop-tips').css('left', parseInt(_info.oWidth) / 2);
                    break;
                case 'rightTop':
                    $('.pop-tips').css({ 'left': parseInt(_info.oWidth) - 300, 'right': 'auto' });
                    break;
                case 'rightBottom':
                    $('.pop-tips').css({ 'left': parseInt(_info.oWidth) - 300, 'right': 'auto' });
                    break;

                default:
                    $('.pop-tips').attr('style', '');
                    break;
            }
        } else {
            $('.pop-tips').attr('style', '');
        }

        _self.timer = setTimeout(function () {
            $tip.remove();
            boxIsEmpty();
        }, 2500);
        $tip.hover(function () {
            clearTimeout(_self.timer);
        }, function () {
            _self.timer = setTimeout(function () {
                $tip.remove();
                boxIsEmpty();
            }, 1000);
        });
    };

    win.zgTips = function (setting) {
        new Tips(setting);
    };
})(jQuery, window);