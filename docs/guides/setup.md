设置 Setup
=====

vvp.js具有非常简单方便的特点。您只需一两步就可以把它添加到您的应用程序中。

第一步: 引用vvp.js 的Javascript 和 CSS文件到你的一面的头部。
------------------------------------------------------------------------------

你可以把它部署到你自己的服务器或者使用优酷的CDN版本。推荐将Javascript文件放到body标签结束前。 (&lt;/body>) 而不是head中 (&lt;head>), vvp.js使用了最新的HTML5标签('HTML5 Shiv')如果要在较老的页面浏览器中使用比如 IE8- 就需要使用一些第三方的Javascript脚本来使之支持相关标签。（但我们推荐在PC端浏览器当中使用FLash播放器进行播放）。

> 注意: 如果您使用了一些HTML5 shiv 第三方应用 比如[Modernizr](http://modernizr.com/) 您可以吧vvp.js放置到任何地方，当然您要确保Modernizr里面包含对video标签的支持。

> 如果您没有使用像Modernizr这样的HTML5支持脚本仍然想添加vvp.js到您的页面当中，您就需要在body标签结束前自己写一些脚本来让页面支持一些HTML5的标签比如：在head标签里面添加一下文档:

> ```html
<script type="text/javascript">
  document.createElement('video');document.createElement('audio');document.createElement('track');
</script>
```

### Youku CDN Version ###
```html
<link href="/vvp.youku.net/1.00/vvp.css" rel="stylesheet">
<script src="/vvp.youku.net/1.00/vvp.js"></script>
```


## 通过包管理器安装的方法(暂未开通）

### NPM
```
$ npm install --save-dev vvp
```

### Bower
```
$ bower install --save vvp.js
```


### 自部署. ###
也可以部署到自己的项目服务器上，需要注意的是你需要让vvp.js能访问到swf文件以及字体图标文件。

```html
<link href="//example.com/path/to/vvp.css" rel="stylesheet">
<script src="//example.com/path/to/vvp.min.js"></script>
<script>
  //设置默认值
  vvp.options.flash.swf = "http://example.com/path/to/video-js.swf"
</script>
```


第二步: 添加HTML5的video标签到你的程序页面
--------------------------------------------
通过vvp.js你可以使用HTML5的video标签来嵌入视频。vvp.js将读取标签，使它在所有浏览器兼容的运行，不仅仅是在支持HTML5的浏览器。在video标签上可添加默认的属性如下：

> 注意:  `data-setup` 属性，如果您按照下一节的描述在初始化的javascript脚本中设置了，这里可以省略。

  1. 'data-setup' 属性来设置vvp.js加载时的预处理，该属性可以是一个JSON格式(参考 [设置](options.md)). 也有其他方法可以初始化vvp.js，但这种方式最方便快捷。

  2. 'id' 属性: 设置在在同一页面独有的视频元素上。

  3. 'class' 属性包含两部分 :
    - `vvp-js` vvp.js将一些通用的方法(如全屏、字幕）等播放程序复用的功能绑定在该class上。
    - `vvp-default-skin` vvp.js将默认的皮肤绑定在这个class上，您也可以开发自己的皮肤文件来修改、删除、和替换这个class。
   
另外其他用来设置的属性和标签也可以根据需要添加(如'preload'、'width/height'、'controls'等HTML5中video标签支持的属性。但vvp.js不会为某些属性或者包含在video标签中的标签额外添加功能。另:添加source会使youku的分段视频功能失效。*
```html
<video id="example_video_1" class="vvp-js vvp-default-skin"
  controls preload="auto" width="640" height="264"
  poster="http://vvp-js.youku.com/oceans-clip.png"
  data-setup='{"example_option":true}'>
 <source src="http://vvp-js.youku.com/oceans-clip.mp4" type='video/mp4' />
 <source src="http://vvp-js.youku.com/oceans-clip.webm" type='video/webm' />
 <source src="http://vvp-js.youku.com/oceans-clip.ogv" type='video/ogg' />
 <p class="vvp-no-js">To view this video please enable JavaScript, and consider upgrading to a web browser that <a href="http://vvpjs.com/html5-video-support/" target="_blank">supports HTML5 video</a></p>
</video>
```

在一般情况下都使用默认的皮肤，但如果有按钮和字体变大的需求vvp.js也提供了一些默认提供的方案，可以在class当中添加这些默认的方案。参考(方案)。你可以添加 `vvp-big-play-centered` class 例如:

```html
<video id="example_video_1" class="video-js vjs-default-skin vjs-big-play-centered"
  controls preload="auto" width="640" height="264"
  poster="http://vvp-js.youku.com/oceans-clip.png"
  data-setup='{"example_option":true}'>
  ...
</video>
```

除了以上方法，也可以采用Javascript脚本动态添加HTML的方式来设置初始化vvp.js
---------------------------------------------
如果你的页面初始时不需要加载多余的HTML元素，您就需要把一些DOM元素动态的异步加载到页面当中(ajax、appendChild等），这时候就用Javascript脚本动态的向页面添加DOM来解决。需要手动创建一个video的对象然后为该对象构建默认的属性和加载方式以替换'data-setup'的方式。

```js
vvpjs("example_video_1", {}, function(){
  // Player (this) is initialized and ready.
});
```

`vvpjs` 方法

第一个参数为你所要添加的DOM元素的id。

第二个参数是一个可选项，类似'data-setup'，是一个JSON对象来进行初始化的参数设定。

第三个参数是一个回调函数，当初始化完毕设定完成后'ready'回调'callback'执行。

如果第一个参数不是DOM元素节点，你也可以按一下方式传入(但不推荐)。

```js
vvp(document.getElementById('example_video_1'), {}, function() {
  // This is functionally the same as the previous example.
});
```

```js
vvpjs(document.getElementsByClassName('awesome_video_class')[0], {}, function() {
  // You can grab an element by class if you'd like, just make sure
  // if it's an array that you pick one (here we chose the first).
});
```
