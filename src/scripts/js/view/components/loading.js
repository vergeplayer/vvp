/**
 * Loading
 * Copyright 2016, loading.js
 * MIT Licensed
 * @since 2016/1/17.
 * @modify 2016/3/15.
 * @author zhengzk
 **/
//获取组件DOM结构
var Loading = require('jade2js?jade!jade/components/loading.jade');
//扩展组件为其添加事件交互等
Loading.expand({
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

module.exports = Loading;
