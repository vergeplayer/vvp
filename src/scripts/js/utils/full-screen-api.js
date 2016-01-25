/**
 * 全屏事件api
 * Copyright 2015, full-screen-api.js
 * MIT Licensed
 * @since 2015/9/2.
 * @modify 2015/9/30.
 * @author zhengzk
 * 参照video.js实现:https://github.com/videojs/video.js/blob/master/src/js/fullscreen-api.js
 **/
(function () {

    var apiMap = [
        // Spec: https://dvcs.w3.org/hg/fullscreen/raw-file/tip/Overview.html
        [
            'requestFullscreen',
            'exitFullscreen',
            'fullscreenElement',
            'fullscreenEnabled',
            'fullscreenchange',
            'fullscreenerror'
        ],
        // WebKit
        [
            'webkitRequestFullscreen',
            'webkitExitFullscreen',
            'webkitFullscreenElement',
            'webkitFullscreenEnabled',
            'webkitfullscreenchange',
            'webkitfullscreenerror'
        ],
        // Old WebKit (Safari 5.1)
        [
            'webkitRequestFullScreen',
            'webkitCancelFullScreen',
            'webkitCurrentFullScreenElement',
            'webkitCancelFullScreen',
            'webkitfullscreenchange',
            'webkitfullscreenerror'
        ],
        // Mozilla
        [
            'mozRequestFullScreen',
            'mozCancelFullScreen',
            'mozFullScreenElement',
            'mozFullScreenEnabled',
            'mozfullscreenchange',
            'mozfullscreenerror'
        ],
        // Microsoft
        [
            'msRequestFullscreen',
            'msExitFullscreen',
            'msFullscreenElement',
            'msFullscreenEnabled',
            'MSFullscreenChange',
            'MSFullscreenError'
        ]
    ];

    var specApi = apiMap[0];
    var browserApi;

    //确定使用的方法/determine the supported set of functions
    for (var i = 0; i < apiMap.length; i++) {
        // check for exitFullscreen function
        if (apiMap[i][1] in document) {
            browserApi = apiMap[i];
            break;
        }
    }
    var fsApi = {};

   //根据确定的方法映射使用的方法名称/map the browser API names to the spec API names
    if (browserApi) {
        for (var j = 0; j < browserApi.length; j++) {
            fsApi[specApi[j]] = browserApi[j];
        }
    }
    //添加到verge对象上去
    verge.extend({
        fullscreenAPI:fsApi
    });
}());