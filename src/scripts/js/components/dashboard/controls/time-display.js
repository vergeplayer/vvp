/**
 * TimeDisplay
 * Copyright 2016, time-display.js
 * MIT Licensed
 * @since 2016/1/18.
 * @modify 2016/1/25.
 * @author zhengzk
 **/
vvp.component.TimeDisplay.expand({
    /**
     * implements
     * 处理事件
     * @param options
     * @private
     */
    _initEvent:function(options){
        var own = this;
        own.one('onDurationChange',function(){
            //this == player
            own.setTime(this.currentTime(),this.duration());
        });
        own.bind('onTimeUpdate',function(){
            own.setTime(this.currentTime());
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
                own.current.text(verge.long2time(curr)); //时间格式转换
            }
            if (arguments.length >= 2) {//传两个参数 curr,duration
                dur = parseInt(dur);
                if(!isNaN(dur)){
                    own.duration.text(verge.long2time(dur));//时间格式转换
                }
            }
        }
    }
});