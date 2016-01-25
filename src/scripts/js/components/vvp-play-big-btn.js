/**
 * VvpPlayBigBtn
 * Copyright 2016, vvp-play-big-btn.js
 * MIT Licensed
 * @since 2016/1/18.
 * @modify 2016/1/25.
 * @author zhengzk
 **/
vvp.component.VvpPlayBigBtn.expand({
    /**
     * implements
     * 处理事件
     * @param options
     * @private
     */
    _initEvent:function(options){
        var own = this;
        own.root.bind('click', function () {
            own.trigger('play');
        });

        own.bind(['onError','onPlay','onPlaying','onWaiting'],function(){
            own.root.hide();
        });

        own.bind('onPause', function () {
            own.root.show();
        });
    }
});