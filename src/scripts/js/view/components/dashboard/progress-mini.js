/**
 * ProgressMini
 * Copyright 2016, progress-mini.js
 * MIT Licensed
 * @since 2016/1/18.
 * @modify 2016/4/5.
 * @author zhengzk
 **/
//获取组件DOM结构
var ProgressMini = require('jade2js?jade!jade/components/dashboard/progress-mini.jade');
//var utils = require('js/utils.js');

//扩展组件为其添加事件交互等
ProgressMini.expand({
  /**
   * implements
   * 处理事件
   * @param options
   * @param player
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
        own._setBuffer(parseFloat(buf / dur).toFixed(5),buf);
      }
    });

    own.bind('onTimeUpdate', function () {
      var played = player.currentTime();//当前播放进度
      own._setPlayed(parseFloat(played / dur).toFixed(5),played);
    });
  },
  /**
   * 设置Duration
   * @param dur
   * @private
   */
  _setDuration:function(dur){
    this.root.attr({
      'aria-valuetext':TEXT.progress.duration.replace('%time%',utils.long2text(dur))
    });
  },
  /**
   * 设置播放进度
   * @param played
   * @param long
   * @private
     */
  _setPlayed: function (played,long) {
    var val = parseFloat(played * 100).toFixed(3);
    this.played.css("width", val + "%");
    this.played.attr({
      'aria-label':TEXT.progress.played.replace('%time%',utils.long2text(long)),
      'aria-valuenow':val
    });
    this.root.attr({
      'aria-valuenow':val
    });
  },
  /**
   * 设置缓冲进度
   * @param buffer
   * @param long
   * @private
   */
  _setBuffer: function (buffer,long) {
    var val = parseFloat(buffer * 100).toFixed(3);
    this.buffer.css("width", buffer * 100 + "%");
    this.buffer.attr({
      'aria-label':TEXT.progress.buffer.replace('%time%',utils.long2text(long)),
      'aria-valuenow':val
    });
  }
});

module.exports = ProgressMini;
