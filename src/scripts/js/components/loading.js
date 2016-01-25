/**
 * Loading
 * Copyright 2016, loading.js
 * MIT Licensed
 * @since 2016/1/17.
 * @modify 2016/1/25.
 * @author zhengzk
 **/
vvp.component.Loading.expand({
    /**
     * implements
     * 处理事件
     * @param options
     * @private
     */
    _initEvent:function(options){
        var own = this;
        own.bind(['onPlay','onPlaying','onError','onPause'], function () {
            own.root.hide();
        });

        own.bind('onWaiting', function () {
            own.root.show();
        });
    }
});