/**
 * Poster
 * Copyright 2016, poster.js
 * MIT Licensed
 * @since 2016/1/18.
 * @modify 2016/3/3.
 * @author zhengzk
 **/
//获取组件DOM结构
var Poster = require('jade2js?jade!jade/components/poster.jade');
//扩展组件为其添加事件交互等
Poster.expand({
    /**
     * implements
     * 处理事件
     * @param options
     * @private
     */
    _initEvent:function(options){
        var own = this;
        own.one(['onPlay', 'onError'], function () {
            own.root.hide();
        });
    },
    /**
     * 设置poster image url
     */
    setSrc:function(){

    }
});

module.exports = Poster;
