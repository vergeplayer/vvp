/**
 * The Fullscreen Component
 * Copyright 2016, play-btn.js
 * MIT Licensed
 * @since 2016/1/12.
 * @modify 2016/1/25.
 * @author zhengzk
 **/

//拓展全屏组件自身api
vvp.component.Fullscreen.expand({
    /**
     * overwrite implements
     * 处理事件
     * @param options
     * @private
     */
    _initEvent: function (options) {
        var own = this;
        var player = options.player;
        own.root.bind("click",function(){
            var _flag = player.fullscreen(!own.isFullscreen);
        });
        //监听事件来处理状态 更准确
        own.bind('onFullscreenChange', function (flag) {
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