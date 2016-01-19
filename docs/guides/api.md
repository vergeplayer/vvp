API
===

vvp.js的API允许你通过Javascript进行控制交互。用HTML5、Flash或者其他任何浏览器支持的可供播放的技术都vvp.js都提供了一组API来对播放进行控制。

引用Player
----------------------
使用API当中的方法，你可以创建一个 player 对象，参数为视频元素DOM的ID，如果一个页面上有多个视频，请确保没个ID都是独一无二的。

## Example
```js
//Create a vvp player instance
var myPlayer = vvp('example_video_1');

//Create a vvp player instance with options
var myPlayer = vvp('example_video_1',{
    autoplay:false,
    poster:''
});
```

(如果player没有通过options属性来初始化，也可以用API来进行属性的赋值来初始化)

等待播放器ready
------------------------------
我们可以使用多种的初始化的方法来对视频对象进行初始化 (通常来说HTML5会比Flash加载更快)。 我们通过 player 的 'ready' 方法来触发使用 player 的一系列API。

## Example
```js
vvp("example_video_1").ready(function(){
  var myPlayer = this;

  // EXAMPLE: Start playing the video.
  myPlayer.play();

});
```

API 方法
-----------
构建好了播放器就可以通过API来对其进行操作控制，所有vvp.js的API都遵循HTML5的API [HTML5 media API](http://www.whatwg.org/specs/web-apps/current-work/multipage/the-video-element.html)

```js

// setting a property on a bare HTML5 video element
myVideoElement.currentTime = "120";

// setting a property on a vvp.js player
myPlayer.currentTime(120);

//getting a readonly property on bare HTML5 video element
myVideoElement.duration 

//getting a readonly property on a vvp.js player
myPlayer.duration();

```

更全面的文档情查看 [player API docs](../api/vvp.player.md).

