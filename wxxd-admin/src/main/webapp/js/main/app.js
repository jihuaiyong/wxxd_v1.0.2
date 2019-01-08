function aaa(msg)  {
  var _line = jQuery(".load");
  var _mshow = jQuery('#minute_show');
  var _sshow = jQuery('#second_show');
  var _stand = jQuery('#standing');
  var _run = jQuery('#running');
  var _wh = jQuery(window).width();
  var _iw = 110 / _wh * 100;
  var speed = (100 - _iw) / (msg.times * 50);
  _mshow.text("5min").show();
  _sshow.empty();
  _stand.hide();
  _run.show();
  if (!true) {
    //clearInterval(window.lionTimer)
    msg.times = 300;
    msg.num = 0;
    _stand.hide();
    _run.show();
    $(_line).removeAttr('style');
  } else {
    var that = this
   // clearInterval(window.lionTimer)
    window.lionTimer = setInterval(function () {
      msg.num++;
      _line.width(_iw + speed * msg.num + "%");
      if (msg.num % 50 == 0) {
        msg.times--;
        var _m = Math.floor(msg.times / 60);
        var _ms = msg.times - _m * 60;
        if (msg.times < 60) {
          _mshow.hide().text("1min");
          _sshow.text(_ms + 's');
          if (msg.times < 4) {
            _stand.show();
            _run.hide();
          }
          if (msg.times < 0) {
            //小狮子5min刷新操作
        	window.location.reload();  
            msg.times = 300;
            msg.num = 0;
            _stand.hide();
            _run.show();
            _line.removeAttr('style');
            _mshow.text("5min").show();
            _sshow.empty();
            //that.getCommonDataNew({commit, state})
          }
        } else {
          _mshow.show();
          _mshow.text(_m+1 + 'min');
        }
      }
    }, 20)
  }
}

function bbb() {
    var t = this
      , e = t.$createElement
      , a = t._self._c || e;
    return a("div", {
        staticClass: "runing-lion"
    }, [a("i", {
        staticClass: "running",
        attrs: {
            id: "running"
        }
    }), t._v(" "), a("i", {
        staticClass: "standing",
        staticStyle: {
            display: "none"
        },
        attrs: {
            id: "standing"
        }
    }), t._v(" "), a("span", [a("em", {
        attrs: {
            id: "minute_show"
        }
    }), a("em", {
        attrs: {
            id: "second_show"
        }
    }), t._v("后刷新")])])
}