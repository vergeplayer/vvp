/**
 * player可调用方法api
 * Copyright 2015-2016 1VERGE Inc, player-api.js
 * MIT Licensed
 * @since 2015/9/24.
 * @modify 2016/3/7.
 * @author zhengzk
 **/
var playerApi = {
    methods: {
        events: [//事件相关方法
            'bind', //绑定事件
            'unbind',//解绑事件
            'one', //只执行一次的方法
            'trigger' //触发回掉方法
        ],
        native: [//原生video可调用方法
            //'play',
            //'pause',
            'load'
            //以下方法暂不支持
            //'addTextTrack'//添加新的文本轨道
        ],
        //expand: [//拓展的方法
        //    'attr',
        //    'plugin'
        //],
        specialNative: [//与回掉函数重名
            'play',
            'pause'
        ],
        callbacks: [//回掉函数名称
            'abort',
            'canPlay',
            'canPlayThrough',
            'durationChange',
            'emptied',
            //'ended',
            //'error',
            'loadedData',
            'loadedMetaData',
            'loadStart',
            //'pause'
            //'play'
            'playing',
            'progress',
            'rateChange',
            'readyStateChange',
            'seeked',
            //'seeking',
            'stalled',
            'suspend',
            'timeUpdate',
            'volumeChange',
            'waiting',
            'fullScreenChange', //全屏状态发生变化
            'fullWindowChange' //css方式全屏发生变化
        ]
    },
    attrs: {//属性
        //ReadOnly Property
        readonly: [
            'duration', //视频的长度
            //'ended', //是否已结束
            //'error', //视频错误状态 MediaError
            'currentSrc', //当前视频的 URL
            'buffered', //已缓冲部分 TimeRanges
            'played', //已播放部分 TimeRanges
            'readyState', //视频当前的就绪状态
            'seekable', //视频可寻址部分 TimeRanges
            //,'seeking',  //是否正在视频中进行查找
            'networkState', //网络状态
            'videoWidth',
            'videoHeight',
            'canPlayType'// video方法 特殊处理 能够播放指定的视频类型
            //以下属性暂不支持
            //'startDate', //当前时间偏移 Date
            //'textTracks', //文本轨道 TextTrackList
            //'videoTracks', //视频轨道 VideoTrackList
            //'audioTracks', //音频轨道对象 AudioTrackList
            //'controller', //视频当前媒体控制器 MediaController
        ],
        specialReadonly: [//特殊的只读属性 与回掉函数重名
            'ended',
            'error',
            'seeking'
        ],
        //ReadWrite Property
        readwrite: [
            'autoplay',
            'height',
            'width',
            'loop',
            //'src',
            //'currentTime',//当前播放位置
            'preload',
            'paused', //视频是否暂停
            'poster', //缩略图
            'muted', //是否关闭声音
            'volume',
            'controls',
            //以下属性暂不支持,
            'playbackRate' //视频播放的速度
            //,'defaultMuted' ,//默认是否静音
            //,'defaultPlaybackRate', //默认播放速度
            //,'crossOrigin', //视频的 CORS 设置
            //,'mediaGroup', //媒介组合的名称
        ],
        specialReadwrite: [
            'src', //视频播放源
            'currentTime',//当前播放位置
            'fullscreen' //全屏
        ]
    },
    /**
     *  视频元素支持的事件类型
     *  @private
     */
    callbacks: {
        abort: 'onAbort',//在退出时运行
        canplay: 'onCanPlay', //当缓冲已足够开始时执行
        canplaythrough: 'onCanPlayThrough', //可播放至结尾(缓冲到结尾)时执行
        durationchange: 'onDurationChange', //长度改变时运行
        emptied: 'onEmptied',//发生故障并且文件突然不可用时运行
        ended: 'onEnded',//已到达结尾时执行
        error: 'onError',//文件加载期间发生错误时运行
        loadeddata: 'onLoadedData',//数据已加载时运行
        loadedmetadata: 'onLoadedMetaData',//元数据（比如分辨率和时长）被加载时运行
        loadstart: 'onLoadStart',//开始加载且未实际加载任何数据前运行
        pause: 'onPause',//被用户或程序暂停时运行
        play: 'onPlay',//已就绪可以开始播放时运行
        playing: 'onPlaying',//已开始播放时运行
        progress: 'onProgress',//浏览器获取数据时运行
        ratechange: 'onRateChange',//回放速率改变时运行 如快进
        readystatechange: 'onReadyStateChange',//当就绪状态改变时运行
        seeked: 'onSeeked',//当 seeking 属性设置为 false（指示定位已结束）时运行
        seeking: 'onSeeking',//当 seeking 属性设置为 true（指示定位是活动的）时运行
        stalled: 'onStalled',//不论何种原因未能取回数据时运行
        suspend: 'onSuspend',//数据完全加载之前不论何种原因终止取回媒介数据时运行
        timeupdate: 'onTimeUpdate',//播放位置改变时（比如当用户快进到媒介中一个不同的位置时）运行
        volumechange: 'onVolumeChange',//当音量改变时（包括将音量设置为静音）时运行
        waiting: 'onWaiting', //当视频由于需要缓冲下一帧而停止
        fullwindowchange: 'onFullWindowChange',//css方式全屏发生变化
        fullscreenchange: 'onFullscreenChange'//全屏发生变化时
    }
};

module.exports = playerApi;
