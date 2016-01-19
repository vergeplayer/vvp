/**
 * 外部接口入口
 * Copyright 2015, vvp.js
 * MIT Licensed
 * @since 2015/9/24.
 * @modify 2015/10/25.
 * @author zhengzk
 **/

// HTML5 Element Shim for IE8
if (typeof HTMLVideoElement === 'undefined') {
    document.createElement('video');
    document.createElement('audio');
    document.createElement('track');
}

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
        } else {
            var targets = vQ(selector);
            //if(targets.length == 0){
            //    return this;
            //}
            var Player = this.dispatch();
            targets.each(function(i, target) {
                own[i] = new Player(target, options);
                own.length++;
            });
            return this;
        }
    },
    /*
     * 播放器选择策略
     */
    dispatch: function() {
        if (vvp.browser.isSupportH5M3U8 || vvp.browser.isSupportH5MP4) {
            //vvp.VideoPlayer 核心 无ui
            return vvp.Player; //带ui
        } else if (this.isSupportFlash) { //使用flash播放器
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
    verge.extend.apply(this, arguments);
};

vvp.extend({
    version: '@VERSION'
});
//统一创建组件的命名空间
verge.routes('vvp.view');
verge.routes('vvp.component');

// Expose vvp to the global object
//window.vvp = window.vvp = vvp;
window['@NAME'.toUpperCase()] = window['@NAME'] = vvp;
