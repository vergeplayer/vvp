/**
 * Trigger
 * Copyright 2016, trigger.js
 * MIT Licensed
 * @since 2016/1/17.
 * @modify 2016/3/16.
 * @author zhengzk
 **/

//获取组件DOM结构
var Trigger = require('jade2js?jade!jade/components/trigger.jade');
//扩展组件为其添加事件交互等
Trigger.expand({
    /**
     * implements
     * 处理事件
     * @param options
     * @private
     */
    _initEvent: function (options,player) {
        var own = this;
        own.one('onPlay',function(){
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

module.exports = Trigger;
