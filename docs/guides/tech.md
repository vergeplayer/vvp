视频播放相关 Playback Technology ("Tech")
============================
视频播放相关技术是浏览器提供的定义或者相关插件技术，用来对视频或者音频进行播放的技术。HTML5便是浏览器通过video标签和audio标签 然后提供一系列的接口来实现视频或者音频的播放。其他播放技术包括Flash、Silverlight、Quicktime等其他插件，同时这些技术也提供了大量的API使用户对其播放控制的交互操作。

本质上讲，我们使用的是HTML5规范定义的视频解码器的浏览器实现，然后在HTML中用Javascript来创建一些列的API来对vvp.js进行操作。

优酷对视频格式相关的文档请参看[]

API封装
-----------------------
以下只是列举了一些方法和事件完整的请看源码，或者API文档 [vvp.js](https://github.com/yuanliang/vvpjs/tree/master/src) 

方法
----------------
canPlayType
play
pause
currentTime
volume
duration
buffered
supportsFullScreen

事件
---------------
loadstart
play
pause
playing
ended
volumechange
durationchange
error

可选事件
--------------------------------------
timeupdate
progress
enterFullScreen
exitFullScreen

Adding Playback Technology
==================
首先要确定支持video对象

### Tag Method: ###
    <video data-setup='{"techOrder": ["html5", "flash", "other supported tech"]}'

### Object Method: ###
    vvp("videoID", {
      techOrder: ["html5", "flash", "other supported tech"]
    });

Flash Technology
==================
The Flash playback tech is a part of the default `techOrder`. You may notice undesirable playback behavior in browsers that are subject to using this playback tech, in particular when scrubbing and seeking within a video. This behavior is a result of Flash's progressive video playback.

Enabling Streaming Playback
--------------------------------
In order to force the Flash tech to choose streaming playback, you need to provide a valid streaming source **before other valid Flash video sources**. This is necessary because of the source selection algorithm, where playback tech chooses the first possible source object with a valid type. Valid streaming `type` values include `rtmp/mp4` and `rtmp/flv`. The streaming `src` value requires valid connection and stream strings, separated by an `&`. An example of supplying a streaming source through your HTML markup might look like:

    <source src="rtmp://your.streaming.provider.net/cfx/st/&mp4:path/to/video.mp4" type="rtmp/mp4">
    <source src="http://your.static.provider.net/path/to/video.mp4" type="video/mp4">
    <source src="http://your.static.provider.net/path/to/video.webm" type="video/webm">

You may optionally use the last `/` as the separator between connection and stream strings, for example:

    <source src="rtmp://your.streaming.provider.net/cfx/st/mp4:video.mp4" type="rtmp/mp4">

All four RTMP protocols are valid in the `src` (RTMP, RTMPT, RTMPE, and RTMPS).
