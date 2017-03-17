/**
 * 播放按钮组件 / the PlayBtn Component
 * Copyright 2016, play-btn.js
 * MIT Licensed
 * @since 2016/1/12.
 * @modify 2016/4/5.
 * @author zhengzk
 **/
//获取组件DOM结构
var PlayBtn = require('jade2js?jade!jade/components/dashboard/controls/play-btn.jade');
//扩展组件为其添加事件交互等
PlayBtn.expand({
  /**
   * overwrite implements
   * 处理事件
   * @param options
   * @private
   */
  _initEvent: function (options, player) {
    var own = this;
    own.btn.bind('click', function () {
      if (!own.isPlaying) {
        player.play();
      } else {
        player.pause();
      }
    });

    own.bind(['onPlay', 'onPlaying'], function () {
      own.play(!player.paused());
    });
    own.bind(['onEnded', 'onError', 'onPause'], function () {
      own.play(false);
    });
  },
  isPlaying: false,
  /**
   * 设置播放状态
   * flag = true 播放 flag = false 暂停  不传flag 播放与暂停互换
   * @param flag
   * @returns {boolean|*}
   */
  play: function (flag) {
    if (arguments.length > 0) {
      this.isPlaying = flag || false;
    } else {
      this.isPlaying = !this.isPlaying;
    }
    this._setStyle(this.isPlaying);
    return this.isPlaying;
  },
  /**
   * 处理播放按钮展现样式
   * @param isPlaying
   * @private
   */
  _setStyle: function (isPlaying) {
    var status, title;
    if (isPlaying) {//播放状态 显示为暂停按钮
      status = 'pause';
      this.bg.hide();
      this.icon.removeClass('vvp-ico-play').addClass('vvp-ico-pause');
    } else {//暂停状态  显示为播放按钮
      status = 'play';
      this.bg.show();
      this.icon.removeClass('vvp-ico-pause').addClass('vvp-ico-play');
    }
    title = TEXT.status[status];
    this.btn.attr({
      'role': status,
      'title': title,
      'aria-label': title
    });
  }
});
module.exports = PlayBtn;
