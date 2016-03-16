/**
 * VvpPlayBigBtn
 * Copyright 2016, vvp-play-big-btn.js
 * MIT Licensed
 * @since 2016/1/18.
 * @modify 2016/3/3.
 * @author zhengzk
 **/
//获取组件DOM结构
var VvpPlayBigBtn = require('jade2js?jade!jade/components/vvp-play-big-btn.jade');
//扩展组件为其添加事件交互等
VvpPlayBigBtn.expand({
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
module.exports = VvpPlayBigBtn;
