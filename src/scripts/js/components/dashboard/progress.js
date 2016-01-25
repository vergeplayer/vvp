/**
 * Progress
 * Copyright 2016, progress.js
 * MIT Licensed
 * @since 2016/1/18.
 * @modify 2016/1/25.
 * @author zhengzk
 **/
vvp.component.Progress.expand({
    /**
     * implements
     * 处理事件
     * @param options
     * @private
     */
    _initEvent:function(options){
        var own = this;
        var dur = 0;//总时间
        own.one('onDurationChange',function(){
            dur = this.duration();
        });
        var buf = 0;

        own.bind('onProgress',function(){
            var video = this.video;
            if(video.readyState  === 4){
                buf = video.buffered.end(0);//加载进度
                own._setBuffer(buf/dur);
            }
        });

        own.bind('onTimeUpdate',function(){
            var played = this.currentTime();//当前播放进度
            own._setPlayed(played/dur);
        });
    },
    /**
     * 设置播放进度
     * @param played
     * @private
     */
    _setPlayed:function(played){
        this.played.css("width",played * 100 + "%");
        this.handle.css("left",played * 100 + "%");//需优化处理
    },
    /**
     * 设置缓冲进度
     * @param buffer
     * @private
     */
    _setBuffer:function(buffer){
        this.buffer.css("width",buffer * 100 + "%");
    }
});