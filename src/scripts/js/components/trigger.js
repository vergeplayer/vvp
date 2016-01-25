/**
 * Trigger
 * Copyright 2016, trigger.js
 * MIT Licensed
 * @since 2016/1/17.
 * @modify 2016/1/25.
 * @author zhengzk
 **/
vvp.component.Trigger.expand({
    /**
     * implements
     * 处理事件
     * @param options
     * @private
     */
    _initEvent: function (options) {
        var own = this;
        own.one('onPlay',function(){
            var player = this;
            own.root.bind('click', function () {
                player.controls(!player.controls());//toggle
            });

            own.bind(['onPlay','onPlaying'], function () {
                own.root.show();
            });

            own.bind('onPause', function () {
                own.root.hide();
            });
        });
    }
});
