/**
 * TimeDisplay
 * Copyright 2016, time-display.js
 * MIT Licensed
 * @since 2016/1/18.
 * @modify 2016/3/16.
 * @author zhengzk
 **/
//获取组件DOM结构
var TimeDisplay = require('jade2js?jade!jade/components/dashboard/controls/time-display.jade');
//var utils = require('js/utils.js');
//扩展组件为其添加事件交互等
TimeDisplay.expand({
    /**
     * implements
     * 处理事件
     * @param options
     * @private
     */
    _initEvent:function(options,player){
        var own = this;
        own.one('onDurationChange',function(){
            //this == player
            own.setTime(player.currentTime(),player.duration());
        });
        own.bind('onTimeUpdate',function(){
            own.setTime(player.currentTime());
        });
    },
    /**
     * 设置时间面板
     * @param curr
     * @param dur
     */
    setTime:function(curr,dur){
        var own = this;
        if(arguments.length >= 1) {//传1个参数 curr
            curr = parseInt(curr);
            if (!isNaN(curr)) {
                own.current.text(utils.long2time(curr)); //时间格式转换
            }
            if (arguments.length >= 2) {//传两个参数 curr,duration
                dur = parseInt(dur);
                if(!isNaN(dur)){
                    own.duration.text(utils.long2time(dur));//时间格式转换
                }
            }
        }
    }
});

module.exports = TimeDisplay;
