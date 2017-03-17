/**
 * 外部接口入口
 * Copyright 2015-2016 1VERGE Inc, vvp.js
 * MIT Licensed
 * @since 2015/9/24.
 * @modify 2016/4/5.
 * @author zhengzk
 **/

var vvp = verge,
    browser = verge.browser,
    //VideoPlayer = verge.VideoPlayer,
    Component = require('./component.js'),
    Player = require('./player.js');

vvp.extend({
  version: '@VERSION',
  Component:Component,
  Player:Player,
  utils:utils,
  vQ:vQ,
  /*
   * 播放器选择策略
   */
  dispatch: function() {
    if (browser.isSupportH5M3U8 ||browser.isSupportH5MP4) {
      //VideoPlayer 核心 无ui
      return Player; //带ui
    } else if (browser.isSupportFlash) { //使用flash播放器
      throw new Error('Please Use Flash Player');
    } else {
      throw new Error('The Device not support');
    }
  },
  plugin:function(name,init){
    var Player = vvp.dispatch();
    var extend = {};
    extend[name] = init;
    Player.expand(extend);
  }
});

module.exports = vvp;
