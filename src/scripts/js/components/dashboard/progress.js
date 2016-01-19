/**
 * Created by zhengzk on 2016/1/18.
 */
//拓展组件自身api
vvp.component.Progress.expand({
    setPlayed:function(played){
        this.played.css("width",played * 100 + "%");
        this.handle.css("left",played * 100 + "%");//需优化处理
    },
    setBuffer:function(buffer){
        this.buffer.css("width",buffer * 100 + "%");
    }
});

//处理组件与player相关部分
vvp.Player.expand({
    /**
     * 初始化progress
     * @param progress
     * @private
     */
    _initProgress:function(progress){
        var own = this;
        var dur = own.duration();//总时间
        own.one('onDurationChange',function(){
            dur = own.duration();
        });

        own.bind('onProgress',function(){
            var buf = own.video.buffered.end(0);//加载进度
            progress.setBuffer(buf/dur);
        });

        own.bind('onTimeUpdate',function(){
            var played = own.currentTime();//当前播放进度
            progress.setPlayed(played/dur);
        });
    }
});