/**
 * Progress
 * Copyright 2016, progress.js
 * MIT Licensed
 * @since 2016/1/18.
 * @modify 2016/4/6.
 * @author zhengzk
 **/
//获取组件DOM结构
var Progress = require('jade2js?jade!jade/components/dashboard/progress.jade');
//var rootNodeRE = /^(?:body|html)$/i;
//var utils = require('js/utils.js');

//扩展组件为其添加事件交互等
Progress.expand({
  /**
   * implements
   * 处理事件
   * @param options
   * @private
   */
  _initEvent: function (options, player) {
    var own = this;
    own.fixed = 100;
    var dur = 0;//总时间
    own._setDuration(dur);
    own.one('onDurationChange', function () {
      dur = player.duration();
      own._setDuration(dur);
    });
    var buf = 0;

    own.bind('onProgress', function () {
      var video = player.video;
      if (video.readyState === 4) {
        buf = video.buffered.end(0);//加载进度
        own._setBuffer(parseFloat(buf / dur).toFixed(5), buf);
      }
    });

    own.bind('onTimeUpdate', function () {
      var played = player.currentTime();//当前播放进度
      own._setPlayed(parseFloat(played / dur).toFixed(5), played);
    });

    own.ready();

    var rnode = own.root[0];
    own.root.bind('mousedown', function (e) {
      var left = utils.getClientLeft(rnode.offsetParent);
      var l = e.clientX + rnode.scrollLeft - left;//- (24 / 2);
      var al = rnode.clientWidth - 24;
      var per = parseFloat(l / al).toFixed(5);
      var time = parseFloat(dur * per).toFixed(3);
      player.currentTime(time, function () {
        //own._setPlayed(per);
      });
    });

    //handle Event
    var start = function () {
      own.resetFixed();
      player.pause();
    };

    var seekMove = function (e) {
      var left = utils.getClientLeft(rnode.offsetParent);
      var l = e.clientX - left - 24 / 2;
      var per = parseFloat(l / rnode.clientWidth).toFixed(5);
      own._setHandle(per);
      var time = parseFloat(parseFloat(dur * per).toFixed(5));
      player.currentTime(time);
    };
    own._initMouseEle(own.handle, seekMove, start);//pc

    var startX = 0;
    var startTime = 0;
    var seekTime;
    var touchMove = function (e) {
      var left = e.clientX - startX;//移动量
      var per = (left / rnode.offsetWidth);
      var movetime = +parseFloat(dur * per).toFixed(5);
      seekTime = startTime + movetime;
      seekTime = seekTime < 0 ? 0 : (seekTime > dur ? dur : seekTime);
      own._setHandle(seekTime / dur);
    };

    own._initTouchEvent(own.handle, touchMove, function (e) {
      startX = e.clientX;
      startTime = player.currentTime();
      start();
    }, function (e, callback) {
      player.currentTime(seekTime, callback);
      startX = 0;
      startTime = 0;
    });
  },
  /**
   * 设置Duration
   * @param dur
   * @private
   */
  _setDuration: function (dur) {
    this.root.attr({
      'aria-valuetext': TEXT.progress.duration.replace('%time%', utils.long2text(dur))
    });
  },
  /**
   * handle PC web
   * @param ele
   * @param cb_move
   * @private
   */
  _initMouseEle: function (ele, cb_move, cb_start, cb_end) {
    var win = document;
    if ('undefined' != typeof window.onmousedown) {
      win = window;
    }

    ele.bind('mousedown', function (e) {
      //console.log('mousedown', e);
      vQ.bind(win, 'mousemove', cb_move);
      setSelect(true);
      if (vQ.isFunction(cb_start)) {
        cb_start(e);
      }
    });

    vQ.bind(win, 'mouseup', function (e) {
      //console.log('mouseup', e);
      vQ.unbind(win, 'mousemove', cb_move);
      setSelect(false);
      if (vQ.isFunction(cb_end)) {
        cb_end(e);
      }
    });
  },
  /**
   * handle phone touch
   * @param ele
   * @param cb_move
   * @param cb_start
   * @param cb_end
   * @private
   */
  _initTouchEvent: function (ele, cb_move, cb_start, cb_end) {
    var touchstart = function (e) {
      if (e.targetTouches.length < 1) {
        return false;
      }
      var touch = e.targetTouches[0];
      if (vQ.isFunction(cb_start)) {
        cb_start(touch);
      }
      bind();
    };

    var touchmove = function (e) {
      if (e.targetTouches.length < 1) {
        return false;
      }
      var touch = e.targetTouches[0];

      e.preventDefault();
      e.stopPropagation();
      //var x = target.clientX - this.startX;
      if (vQ.isFunction(cb_move)) {
        cb_move(touch);
      }
    };

    var touchend = function (e) {
      if (e.changedTouches.length > 1) {
        return false;
      }
      e.preventDefault();
      e.stopPropagation();
      if (vQ.isFunction(cb_end)) {
        cb_end(e, unbind);
      } else {
        unbind();
      }
    };

    var bind = function () {
      ele.bind('touchmove', touchmove);
      ele.bind('touchend', touchend);
      ele.bind('touchcancel', touchend);
    };

    var unbind = function () {
      ele.unbind('touchmove', touchmove);
      ele.unbind('touchend', touchend);
      ele.unbind('touchcancel', touchend);
    };

    ele.bind('touchstart', touchstart);
  },
  /**
   * ready时执行
   */
  ready: function () {
    var own = this;

    var initFixed = function (event, flag) {
      console.log("onControlsChange");
      if (flag) {
        own.resetFixed();
        own.unbind('onControlsChange', initFixed);
      }
    };
    //第一次展现时计算
    own.bind('onControlsChange', initFixed);
    //尺寸发生变换时计算
    vQ.bind(window, 'resize', function () {
      own.resetFixed();
    });
  },
  /**
   * 重新计算fixed
   */
  resetFixed: function () {
    var own = this;
    var hp = own.handle.width() / own.root.width();
    if (!isNaN(hp)) {
      own.fixed = (1 - parseFloat(hp).toFixed(5)) * 100;
    }
  },
  /**
   * 设置播放进度
   * @param played
   * @param long
   * @private
   */
  _setPlayed: function (played, long) {
    var val = parseFloat(played * 100).toFixed(3);
    this.played.css("width", val + "%");
    this._setHandle(played, long);
    this.played.attr({
      'aria-label': TEXT.progress.played.replace('%time%', utils.long2text(long)),
      'aria-valuenow': val
    });
    this.root.attr({
      'aria-valuenow': val
    });
  },
  /**
   * 设置Handle位置
   * @param percent
   * @private
   */
  _setHandle: function (percent, time) {
    percent = percent > 1 ? 1 : (percent < 0 ? 0 : percent);
    this.handle.css("left", parseFloat(percent * this.fixed).toFixed(3) + "%");
  },
  /**
   * 设置缓冲进度
   * @param buffer
   * @param long
   * @private
   */
  _setBuffer: function (buffer, long) {
    var val = parseFloat(buffer * 100).toFixed(3);
    this.buffer.css("width", val + "%");
    this.buffer.attr({
      'aria-label': TEXT.progress.buffer.replace('%time%', utils.long2text(long)),
      'aria-valuenow': val
    });
  }
});

function setSelect(flag) {
  if (flag) {
    document.onselectstart = function () {
      return false;
    }
  } else {
    document.onselectstart = null;
  }
}
module.exports = Progress;
