/**
 * ProgressMini
 * Copyright 2016, progress-mini.js
 * MIT Licensed
 * @since 2016/1/18.
 * @modify 2016/3/3.
 * @author zhengzk
 **/
//获取组件DOM结构
var ProgressMini = require('jade2js?jade!jade/components/dashboard/progress-mini.jade');
//扩展组件为其添加事件交互等
ProgressMini.expand({
    /**
     * implements
     * 处理事件
     * @param options
     * @private
     */
    _initEvent:function(options){

    }
});

module.exports = ProgressMini;
