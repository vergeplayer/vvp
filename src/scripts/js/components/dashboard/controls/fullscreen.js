/**
 * Created by zhengzk on 2016/1/12.
 */
//拓展全屏组件自身api
vvp.component.Fullscreen.expand({
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

//处理全屏组件与player相关部分分
vvp.Player.expand({
    /**
     * 初始化 fullscreen
     * @param fullscreen
     * @private
     */
    _initFullscreen: function (fullscreen) {
        var own = this;
        fullscreen.root.bind("click",function(){
            var _flag = own.fullscreen(!fullscreen.isFullscreen);
            //fullscreen.fullScreen(_flag);
        });
        //监听事件来处理状态 更准确
        own.bind('onFullscreenChange', function (flag) {
            fullscreen.fullscreen(flag);
        });
    }
});