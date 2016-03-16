/**
 * Progress
 * Copyright 2016, progress.js
 * MIT Licensed
 * @since 2016/1/18.
 * @modify 2016/3/16.
 * @author zhengzk
 **/
//获取组件DOM结构
var Progress = require('jade2js?jade!jade/components/dashboard/progress.jade');
//扩展组件为其添加事件交互等
Progress.expand({
    /**
     * implements
     * 处理事件
     * @param options
     * @private
     */
    _initEvent:function(options,player){
        var own = this;
        var dur = 0;//总时间
        own.one('onDurationChange',function(){
            dur = player.duration();
        });
        var buf = 0;

        own.bind('onProgress',function(){
            var video = player.video;
            if(video.readyState  === 4){
                buf = video.buffered.end(0);//加载进度
                own._setBuffer(parseFloat(buf/dur).toFixed(2));
            }
        });

        own.bind('onTimeUpdate',function(){
            var played = player.currentTime();//当前播放进度
            own._setPlayed(parseFloat(played/dur).toFixed(2));
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
module.exports = Progress;
