/**
 * 带基础view的播放器
 * Copyright 2015, player.js
 * MIT Licensed
 * @class
 * @since 2015/9/2.
 * @modify 2016/01/25.
 * @author zhengzk
 **/
vvp.Player = vvp.VideoPlayer.extend({
    /**
     * Constructor
     * @param target
     * @param options
     */
    init: function (target, options) {
        //初始化参数
        options = vQ.merge({
            autoplay: false, /*将会传递至video*/
            loop: false, /*将会传递至video*/
            preload: false, /*将会传递至video*/
            //src:'',/*将会传递至video*/ 给src赋值'' # 之类的 src指向页面URL 不支持的格式 导致触发onError
            controls: true,//是否展现controls
            poster: '',
            type: 'live'//直播播放器(默认) //后续添加点播和切换
        }, options);

        var own = this;

        var cfg = {
            progress: true,
            time: true,
            quality: true
        };
        if (options.type == 'live') {
            cfg.progress = false;
            cfg.time = false;
            cfg.quality = false;
        }
        //创建必要节点
        this._createView();
        vQ(target).append(this.fragment);
        if(!this.video || !this.root){
            //模板中未指定video
            throw new  Error("Need Video and Root Target Node");
        }
        this._super(this.video,options);
        own.bind('onFullscreenChange',function(flag){
            if(flag){
                own.root.addClass('x-player-fullscreen');
            }else{
                own.root.removeClass('x-player-fullscreen');
            }
        });
        own.controls(true);
    },
    /**
     * 进入全屏状态 重写
     * @returns {vvp.Player}
     */
    requestFullscreen: function () {
        var own = this;
        var fsApi = verge.fullscreenAPI;
        this.isFullscreen = true;

        if (fsApi['requestFullscreen']) {
            // the browser supports going fullscreen at the element level so we can
            // take the controls fullscreen as well as the video

            // Trigger fullscreenchange event after change
            // We have to specifically add this each time, and remove
            // when canceling fullscreen. Otherwise if there's multiple
            // players on a page, they would all be reacting to the same fullscreen
            // events
            vQ.bind(document, fsApi['fullscreenchange'],function documentFullscreenChange(){
                own.isFullscreen = !!document[fsApi.fullscreenElement];
                // If cancelling fullscreen, remove event listener.
                if (own.isFullscreen === false) {
                    vQ.unbind(document, fsApi['fullscreenchange'], documentFullscreenChange);
                }

                own.trigger('onFullscreenChange',[own.isFullscreen]);
            });

            own.root[0][fsApi.requestFullscreen]();

        }else{
            this._super();
        }
    },
    /**
     * 退出全屏 重写
     * @returns {vvp.Player}
     */
    exitFullscreen: function () {
        var own = this;
        var fsApi = verge.fullscreenAPI;
        own.isFullscreen = false;

        // Check for browser element fullscreen support
        if (fsApi['exitFullscreen']) {
            document[fsApi.exitFullscreen]();
        } else {
            this._super();
        }
        return this;
    }
    //_createPrompt:function(){
    //    this.bind('onError',function(){
    //        root.show();
    //        text.text('播放出错,请稍后再试');
    //        own.one(['onPlay','onPlaying'], function () {
    //            root.hide();
    //        });
    //    });
    //
    //    root.append(text);
    //    this.root.append(root);
    //}
});
