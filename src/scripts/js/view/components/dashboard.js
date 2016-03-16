/**
 * Dashboard
 * Copyright 2016, dashboard.js
 * MIT Licensed
 * @since 2016/1/17.
 * @modify 2016/3/16.
 * @author zhengzk
 **/
//获取组件DOM结构
var Dashboard = require('jade2js?jade!jade/components/dashboard.jade');
//扩展组件为其添加事件交互等
Dashboard.expand({
  /**
   * implements
   * 处理事件
   * @param options
   * @private
   */
  _initEvent: function (options,player) {
    var own = this;
    var clearTimer = function (timer) {
      if (own._show_ctl__timer) {
        clearTimeout(own._show_ctl__timer);
        delete own._show_ctl__timer;
      }
    };

    var _dashboard_show = true;
    //鼠标悬停时不hide
    //own.root.bind()
    own.bind('onControlsChange', function (event,flag) {
      if (flag == !own.root.isHidden()) {
        return;
      }
      if (flag) {
        own.root.show();
        _dashboard_show = true;
        clearTimer();
        own._show_ctl__timer = setTimeout(function () {
          if (!own.player.paused()) {
            //own.root.hide();
            //player._dashboard_show = false;
            own.trigger('onControlsChange', [false]);
          }
        }, 5000);
      } else {
        own.root.hide();
        _dashboard_show = false;
        clearTimer();
      }
    });
  }
});

//vvp.Player.expand({
//    _dashboard_show:true,
//    controls:function(flag){
//        var own = this;
//        if(arguments.length > 0 && flag != this._dashboard_show){
//            own.trigger('onControlsChange',[!!flag]);
//        }
//        return this._dashboard_show;
//    }
//});

module.exports = Dashboard;
