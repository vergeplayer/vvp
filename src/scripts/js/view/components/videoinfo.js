/**
 * Videoinfo
 * Copyright 2016, videoinfo.js
 * MIT Licensed
 * @since 2016/1/25.
 * @modify 2016/3/16.
 * @author zhengzk
 **/
//获取组件DOM结构
var Videoinfo = require('jade2js?jade!jade/components/videoinfo.jade');
//扩展组件为其添加事件交互等
Videoinfo.expand({
    /**
     *
     * @param options
     * @private
     */
    _initEvent:function(options,player){
        var own = this;
        //own.bind('onControlsChange',function(flag){
        //    !flag ? own.root.hide() : own.root.show();
        //});
    }
});
module.exports = Videoinfo;
