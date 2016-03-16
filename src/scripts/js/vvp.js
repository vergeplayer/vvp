/**
 * 外部接口入口
 * Copyright 2015-2016, vvp.js
 * MIT Licensed
 * @since 2015/9/24.
 * @modify 20160/3/4.
 * @author zhengzk
 **/
// HTML5 Element Shim for IE8
if (typeof HTMLVideoElement === 'undefined') {
  document.createElement('video');
  document.createElement('audio');
  document.createElement('track');
}

//var global = require("global");
var browser = require('./base/browser.js'),
    CoreObject  = require('./base/core-object.js'),
    VideoPlayer = require('./video-player.js'),
    Player = require('./player.js'),
    utils = require('./utils.js');

var players = {};

var vvp = function(selector, options) {
    return new vvp.fn.init(selector, options);
};

vvp.fn = {
    constructor: vvp,
    length: 0,
    init: function(selector, options) {
        var own = this;
        if (vQ.isFunction(selector)) {
            //ready 时执行
            own.ready(selector);
            if(options){
              log.warn('the selector is not String or Dom Element,Options will not be applied.')
            }

        } else {
            var targets = vQ(selector);
            var Player = this.dispatch();
            targets.each(function(i, element) {
                if(element.nodeName){
                  var player;
                  if(element.playerId){
                    player = players[element.playerId];
                    player.options(options);
                  }else{
                    var playerId = utils.guid();
                    element.playerId = playerId;
                    player = new Player(element, options);
                    players[playerId] = player;
                  }
                  own[i] = player;
                  own.length++;
                }
            });
        }
        return this;
    },
    /*
     * 播放器选择策略
     */
    dispatch: function() {
        if (browser.isSupportH5M3U8 ||browser.isSupportH5MP4) {
            //vvp.VideoPlayer 核心 无ui
            return vvp.Player; //带ui
        } else if (browser.isSupportFlash) { //使用flash播放器
            throw new Error('Please Use Flash Player');
        } else {
            throw new Error('The Device not support');
        }
    },
    /**
     * 遍历
     * @param fn
     * @returns {vvp.fn}
     */
    each: function(fn) {
        var i = 0,
            length = this.length;
        for (; i < length; i += 1) {
            fn.call(this[i], i, this[i]);
        }
        return this;
    }
};
vvp.fn.init.prototype = vvp.fn;

vvp.extend = vvp.fn.extend = function() {
    vQ.extend.apply(this, arguments);
};

vvp.extend({
    version: '@VERSION',
    browser:browser,
    CoreObject:CoreObject,
    VideoPlayer:VideoPlayer,
    Player:Player
});

// Expose vvp to the global object
//window.vvp = window.vvp = vvp;
global['@NAME'.toUpperCase()] = global['@NAME'] = vvp;
module.exports = vvp;
