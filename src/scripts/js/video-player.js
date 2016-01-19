/**
 * 播放器 基础类(video事件包装)
 * Copyright 2015, video-player.js
 * MIT Licensed
 * @since 2015/9/10.
 * @modify 2015/10/25.
 * @author zhengzk
 **/

vvp.VideoPlayer = vvp.CoreObject.extend({
    /**
     * init构造VideoPlayer对象时会执行该方法
     * @param video
     * @param options
     */
    init: function (video,options) {
        var own = this;
        own.video = video;
        options = vQ.merge({
            isWeixin:vvp.browser.isWeixin
        },options);
        own._initOptions(options);
        own.bindEvents();
    },
    /**
     * 处理options 设置默认值等
     * @param options
     * @private
     */
    _initOptions:function(options){
        //不用merge处理 避免多余属性污染
        var op = {
            autoplay: options.autoplay || false, /*将会传递至video*/
            loop: options.loop || false, /*将会传递至video*/
            muted: options.muted || false, /*将会传递至video*/
            preload: options.preload || false,/*将会传递至video*/
            controls:options.controls || false
        };
        this.options = vQ.merge(options,op);

        if (options.src) {
            op.src = options.src;
        }

        if(options.isWeixin){
            op['webkit-playsinline'] = '';
        }

        if(options.attr){//这样attr中属性会对之前属性进行覆盖
            vQ.each(options.attr,function(key,val){
                op[key] = val;
            });
        }

        this.attr(op);
        // Load plugins
        if (options.plugins) {
            //var plugins = options.plugins;

            vQ.each(options.plugins,function(name,param){
                if(vQ.isFunction(this[name])){
                    this[name](param);
                }else{
                    log.error('Unable to find plugin:', name);
                }
            },this);
        }
    },
    /**
     * 设置or获取当前时间方法
     * 重新实现：增加跳转后执行callback & 容错处理
     * @param time
     * @param callback
     * @returns {*|vvp.VideoPlayer.video.currentTime}
     */
    currentTime: function (time, callback) {
        var own = this;
        if (arguments.length > 0) {
            var _switchTimer;
            var  clearTimer = function(){
                if (_switchTimer) {
                    clearTimeout(_switchTimer);
                    _switchTimer = undefined;
                }
            };

            var timefun = function () {
                own.video.currentTime = time;
                if (vQ.isFunction(callback)) {
                    callback();
                }

                clearTimer();
                own.video.play();
            };


            var seeks = this.video.seekable;
            //var seekTime = seeks.end(0);
            if (seeks.length == 1 && time < seeks.end(0)) {//已加载完成
                //debug.log('seek ct = ' + time + ',end = ' + seeks.end(0));
                try {
                    timefun();
                } catch (e) {
                    own.one('onCanPlay',function(){
                        timefun();
                    });
                }

            } else {//间隔一定时间后 重新调用当前方法
                clearTimer();
                var _seek = arguments.callee;
                _switchTimer = setTimeout(function () {
                    _seek.apply(own, arguments);
                }, 100);
            }
        }
        return this.video.currentTime;
    },
    /**
     * 设置视频播源
     * @param src
     * @returns {*}
     */
    src: function (src) {
        if (arguments.length > 0) {
            var prepaused = !this.options.autoplay;
            if(this.video.src){
                prepaused = this.video.paused;
            }
            if (!this.video.paused) {
                this.video.pause();
            }
            this.video.src = src;
            this.video.load();

            if (!prepaused) {
                var own = this;
                this.one('canplay',function(){
                    own.play();
                });
                this.play();
            }
        }
        return this.video.src;
    },
    /**
     * 全屏入口
     * @param flag
     * @returns {boolean|*|vvp.Player.isFullscreen}
     */
    fullscreen:function(flag){
        if(arguments.length > 0 && flag != this.isFullscreen){
            var own = this;
            if(flag){
                if(vvp.browser.isIPAD){//PAD 走css全屏
                    own._enterFullWindow();
                    own.trigger('onFullscreenChange', [own.isFullWindow]);
                }else{
                    this.requestFullscreen();
                }
            }else{
                if(vvp.browser.isIPAD) {
                    own._exitFullWindow();
                    own.trigger('onFullscreenChange', [own.isFullWindow]);
                }else{
                    this.exitFullscreen();
                }
            }
        }
        return this.isFullscreen;
    },
    /**
     * 进入全屏状态
     * @returns {vvp.Player}
     */
    requestFullscreen: function () {
        var own = this;
        this.isFullscreen = true;

        if (vvp.browser.supportsFullScreen) {
            // we can't take the video.js controls fullscreen but we can go fullscreen
            // with native controls
            own._enterFullscreen();
        } else {
            // fullscreen isn't supported so we'll just stretch the video element to
            // fill the viewport
            own._enterFullWindow();
            own.trigger('onFullscreenChange', [own.isFullscreen]);
            //this.trigger('fullscreenchange');
        }

        return this;
    },
    /**
     * webkit 方式进入全屏
     * @private
     */
    _enterFullscreen: function () {
        var own = this;
        var video = this.video;

        if ('webkitDisplayingFullscreen' in video) {
            vQ.one(video,'webkitbeginfullscreen', function () {
                own.isFullscreen = true;

                vQ.one(video,'webkitendfullscreen', function () {
                    own.isFullscreen = false;
                    own.trigger('onFullscreenChange', [own.isFullscreen]);
                });
                own.trigger('onFullscreenChange', [own.isFullscreen]);
            });
        }

        if (video.paused && video.networkState <= video.HAVE_METADATA) {
            // attempt to prime the video element for programmatic access
            // this isn't necessary on the desktop but shouldn't hurt
            video.play();

            // playing and pausing synchronously during the transition to fullscreen
            // can get iOS ~6.1 devices into a play/pause loop
            this.setTimeout(function () {
                video.pause();
                video.webkitEnterFullscreen();
            }, 0);
        } else {
            video.webkitEnterFullscreen();
        }
    },
    /**
     * css方式进入全屏
     * @private
     */
    _enterFullWindow:function(){ //无ui时css的处理还需优化
        var own = this;
        own.isFullWindow = true;

        // Storing original doc overflow value to return to when fullscreen is off
        own.docOrigOverflow = document.documentElement.style.overflow;

        // Add listener for esc key to exit fullscreen
        vQ.bind(document, 'keydown',own._fullWindowOnEscKey,own);

        // Hide any scroll bars
        document.documentElement.style.overflow = 'hidden';

        // Apply fullscreen styles
        vQ.addClass(document.body, 'vvp-full-window');

        own.trigger('onFullWindowChange',[own.isFullWindow]);
    },
    _fullWindowOnEscKey:function(event){
        if (event.keyCode === 27) {
            if (this.isFullscreen === true) {
                this.exitFullscreen();
            } else {
                this._exitFullWindow();
            }
        }
    },
    /**
     * 退出全屏
     * @returns {vvp.Player}
     */
    exitFullscreen: function () {
        var own = this;
        var fsApi = verge.fullscreenAPI;
        own.isFullscreen = false;

        if (vvp.browser.supportsFullscreen) {
            own.video.webkitExitFullscreen();
        } else {
            this._exitFullWindow();
            own.trigger('onFullscreenChange', [own.isFullscreen]);
        }

        return this;
    },
    /**
     * css方式退出全屏
     * @private
     */
    _exitFullWindow:function(){
        this.isFullWindow = false;
        vQ.unbind(document, 'keydown', this._fullWindowOnEscKey);

        // Unhide scroll bars.
        document.documentElement.style.overflow = this.docOrigOverflow;

        // Remove fullscreen styles
        vQ.removeClass(document.body, 'vvp-full-window');

        // Resize the box, controller, and poster to original sizes
        // this.positionAll();
        this.trigger('onFullWindowChange',[this.isFullWindow]);
    },
    /**
     * 移除已绑定的各种响应事件
     * @private
     */
    removeEvent: function () {
        var own = this;
        //遍历事件类型及函数，开始绑定
        vQ.each(verge.callbacks, function (event, fun) {
            var _fun = own[fun].eventTarget;
            vQ.unbind(own.video, event, _fun);
        });
    },
    /**
     * 绑定视频的各种回掉响应事件
     * @private
     */
    bindEvents: function () {
        var own = this;
        //遍历事件类型及函数，开始绑定
        vQ.each(verge.callbacks, function (event, fun) {
            var _fun = function () {
                var ret = own[fun].apply(own, arguments);//apply的方式 能确保当前对象是Player
                if(typeof ret == 'undefined' || ret){
                    own.trigger(fun, arguments); //外部传入回掉事件 不更改当前对象
                }
            };
            vQ.bind(own.video, event, _fun);
            own[fun].eventTarget = _fun;// eventTarget解除事件绑定时用
        });
    },
    /**
     * 获取or设置属性值
     * @returns attrValue or undefined
     */
    attr:function(arg){
        var readonlyAttrs = verge.attrs.readonly.concat(verge.attrs.specialReadonly);
        var readwriteAttrs = verge.attrs.readwrite.concat(verge.attrs.specialReadwrite);
        var own = this;
            if(vQ.isPlainObject(arg)){
                //批量给属性赋值
                var _arg = {};
                vQ.each(arg,function(attr,val){
                    var flag = false;

                    //用string的 indexof 替代？
                    for(var i = 0,len1 = readonlyAttrs.length ; i < len1; i++){
                        //排除只读属性
                        if(attr.toLowerCase() == readonlyAttrs[i].toLowerCase()){
                            flag = true;
                            break;
                        }
                    }
                    //非只读属性
                    if(!flag){
                        for(var j = 0,len2 = readwriteAttrs.length ; j < len2; j ++){
                            if(attr.toLowerCase() == readwriteAttrs[j].toLowerCase()){
                                flag = true;
                                own[readwriteAttrs[j]].apply(own,slice.call(arguments,1));//apply方式 确保多个参数
                                break;
                            }
                        }
                    }

                    if(!flag){//自定义的属性
                        _arg[attr] = val;
                    }
                });
                vQ.attr(this.video,_arg);
            }else if(typeof arg == 'string'){
                //获取属性值 or 给该属性值赋值
                var attrs = readonlyAttrs.concat(readwriteAttrs);
                for(var i = 0,len = attrs.length ; i < len; i++){
                    if(arg.toLowerCase() == attrs[i].toLowerCase()){
                        //不用过滤是否可写 属性方法中已判断
                        return own[attrs[i]].apply(own,slice.call(arguments,1));//apply方式 确保多个参数
                        //return this[attrs[i]](arguments[1]);
                    }
                }
                return vQ.attr.apply(vQ,[this.video].concat(slice.call(arguments)));
            }
    },
    /**
     * 为player 注册插件
     */
    plugin:function(name,init){
        this.expand({
            name:init
        });
        return this;
    }
});


//为VideoPlayer 拓展api方法
vvp.VideoPlayer.expand(function(){
    var extend = {},
        methods = verge.methods,
        callbacks = verge.callbacks,
        attrs = verge.attrs,
        events = new verge.EventManager();//统一管理回掉 定义成局部 避免player绑定过多对象及变量污染
    //bind unbind one 事件处理
    vQ.each(methods.events,function(inx,fun){
        extend[fun] = function() {
            var own = this;
            var args = slice.call(arguments);
            var funs = [];
            if(vQ.isArray(args[0])){
                vQ.each(args[0],function(inx,_fun){
                    if('on'.indexOf(_fun) < 0){
                        _fun = callbacks[_fun.toLowerCase()] || _fun;
                    }
                    funs.push(_fun);
                });
            }else if('string' == typeof args[0]){//参数不合法
                if('on'.indexOf(args[0]) < 0){
                    args[0] = callbacks[args[0].toLowerCase()] || args[0];
                }
                funs.push(args[0]);
            }else{
                return ;
            }

            args[0] = funs;
            events[fun].apply(events, args);
            return own;
        };
    });

    //play load pause video原生方法
    vQ.each(methods.native.concat(methods.specialNative),function(inx,fun){
        extend[fun] = function() {
            var own = this;
            own.video[fun].apply(own.video, arguments);
            return own;
        };
    });

    //duration 等只读属性 转换为方法
    vQ.each(attrs.readonly.concat(attrs.specialReadonly),function(inx,attr){
        extend[attr] = function() {
            var ret = vQ.attr(this.video,attr);
            if(vQ.isFunction(ret)){
              return ret.apply(this.video,arguments);
            }
            return ret;
        };
    });

    //autoplay 等设置&读取属性
    vQ.each(attrs.readwrite,function(inx,attr){
        extend[attr] = function(val) {
            if (arguments.length > 0) {
                return vQ.attr(this.video,attr,val);
            }
            return vQ.attr(this.video,attr);
        };
    });

    //定义默认回掉函数 onPlay等
    vQ.each(methods.callbacks.concat(methods.specialNative).concat(attrs.specialReadonly),function(inx,fun){
        var _fun = verge.callbacks[fun.toLowerCase()] || fun;
        extend[_fun] = function() {
            log(_fun,arguments);
        };
    });

    return extend;
}());