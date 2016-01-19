/**
 * Created by zhengzk on 2016/1/18.
 */
//拓展组件自身api
vvp.component.TimeDisplay.expand({
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

//处理组件与player相关部分
vvp.Player.expand({
    /***
     * 初始化 TimeDisplay
     * @param timeDisplay
     * @private
     */
    _initTimeDisplay:function(timeDisplay){
        var own = this;
        own.one('onDurationChange',function(){
            timeDisplay.setTime(own.currentTime(),own.duration());
        });
        own.bind('onTimeUpdate',function(){
            timeDisplay.setTime(own.currentTime());
        });
    }
});