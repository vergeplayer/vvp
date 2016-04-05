/**
 * Dashboard
 * Copyright 2016, dashboard.js
 * MIT Licensed
 * @since 2016/1/17.
 * @modify 2016/4/5.
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
    var _show_ctl__timer;
    var clearTimer = function (timer) {
      if (_show_ctl__timer) {
        clearTimeout(_show_ctl__timer);
        delete _show_ctl__timer;
      }
    };

    //鼠标悬停时不hide
    //own.root.bind()
    own.bind('onControlsChange', function (event,flag) {
      //if (flag == !own.root.isHidden()) {
      //  return;
      //}
      //if(flag == own.root.hasClass('vvp-controls-hide')){
      //  return;
      //}
      if (flag) {
        own.root.removeClass('vvp-dashboard-hide');
        clearTimer();
        _show_ctl__timer = setTimeout(function () {
          if (!own.player.paused()) {
            //own.root.hide();
            //own.trigger('onControlsChange', [false]);
            player.controls(false);
          }
        }, 5000);
      } else {
        own.root.addClass('vvp-dashboard-hide');
        clearTimer();
      }
    });
  }
});

module.exports = Dashboard;
