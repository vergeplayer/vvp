/**
 * The Fullscreen Component
 * Copyright 2016, fullscreen.js
 * MIT Licensed
 * @since 2016/1/12.
 * @modify 2016/3/16.
 * @author zhengzk
 **/
//获取组件DOM结构
var Fullscreen = require('jade2js?jade!jade/components/dashboard/controls/fullscreen.jade');
//拓展全屏组件自身api
Fullscreen.expand({
    /**
     * overwrite implements
     * 处理事件
     * @param options
     * @private
     */
    _initEvent: function (options,player) {
        var own = this;
        own.root.bind("click",function(){
            var _flag = player.fullscreen(!own.isFullscreen);
        });
        //监听事件来处理状态 更准确
        own.bind('onFullscreenChange', function (event,flag) {
          own.fullscreen(flag);
        });
    },
    isFullscreen: false,
    /**
     * 设置全屏状态
     * flag = true 全屏 flag = false 非全屏
     * @param flag
     * @returns {boolean|*}
     */
    fullscreen: function (flag) {
        if (arguments.length > 0) {
            this.isFullscreen = flag || false;
            this._setStyle(this.isFullscreen);
            //}else{
            //    isFullscreen = !isFullscreen;
        }
        return this.isFullscreen;
    },
    /**
     * 处理按钮展现样式
     * @param isFullscreen
     * @private
     */
    _setStyle: function (isFullscreen) {
        if (isFullscreen) {
            this.icon.removeClass('vvp-ico-fullscreen').addClass('vvp-ico-exitfullscreen');
        } else {
            this.icon.removeClass('vvp-ico-exitfullscreen').addClass('vvp-ico-fullscreen');
        }
    }
});
module.exports = Fullscreen;
