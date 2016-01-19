选项 Options
=======

设置选项
---------------

vvp.js嵌入到页面的是一个简单的video标签，您可以通过选项的设置来使应用可以满足你的业务初始需求。

首先可以使用video的属性来设置选项

```html
<video controls autoplay preload="auto" ...>
```

其次，您可以用'data-setup'属性来设置选项，属性的值时一个JSON格式[JSON](http://json.org/example.html)。

```html
<video data-setup='{ "controls": true, "autoplay": false, "preload": "auto" }'...>
```

最后，如果您不适用'data-setup'属性，你可以通过创建一个Javascript对象，并通过第二个参数传递给'vvp'一个JSON对象的方式来动态设置选项。

```js
vvp("example_video_1", { "controls": true, "autoplay": false, "preload": "auto" });
```


具体选项
------------------

> ### 注意某些video标签的属性 ###
> 一些HTML5的video标签属性的值只有true或者false的布尔值(boolean),您可以直接在video内添加或者不添加该属性就可以表示该属性的开启或者关闭，而不用显示的用＝来标注它具体的值，比如：

错误:
```html
<video controls="true" ...>
```

正确:
```html
<video controls ...>
```

> 如果您坚持书写XHTML格式的文档，那您可以对这些属性的值设置成河属性一样的名字例如：(controls="controls").


### controls ###
该属性的设置是让video提默认的视频的一些交互功能比如(播放、暂停、音量等）。如果该属性没有开启，那么唯一能够对视频交互的方式就是通过video的API。
```html
<video controls ...>
or
{ "controls": true }
```


### autoplay ###
如果autoplay的值时true, 那么当页面加载完后(如果用户没有其他的改变操作)视频将会自动开始播放。
'苹果的iOS设备并不支持' 苹果味了保护用户(通常担心流量问题)只有在用户主动触发的情况下才启动视频播放。
```html
<video autoplay ...>
or
{ "autoplay": true }
```


### preload ###
预加载属性定义了在视频播放前是否与加载一些视频数据。可选的参数有:auto、 metadata、 none.

'auto':  `video`标签 `ready`后马上开始加载视频数据(如果浏览器支持)一些移动设备(iPhone、iPad等位了保护用户带宽不会支持该属性)。

'metadata': 只加载一些视频信息数据，比如视频长度、视频大小。

'none': 不允许预加载视频，只有在用户主动触发的时候加载数据。
```html
<video preload ...>
or
{ "preload": "auto" }
```


### poster ###
海报属性设置一张视频图片放置在视频播放之前。当用户触发视频播放时自动消失。
```html
<video poster="myPoster.jpg" ...>
or
{ "poster": "myPoster.jpg" }
```


### loop ###
该属性可以让播放完毕后马上重播。可以在用视频来做背景循环的画面时使用。
```html
<video loop ...>
or
{ "loop": "true" }
```


### width ###
宽度属性设置视频的初始化宽度。
```html
<video width="640" ...>
or
{ "width": 640 }
```


### height ###
高度属性设置视频的初始化高度。
```html
<video height="480" ...>
or
{ "height": 480 }
```

组件选项
-----------------

你可以为单独的vvp.js当中的组建设置初始化的状态设置选项。如果你想为视频初始设置静音的状态 查找节点`controlBar`找到子节点`muteToggle` , 对应值设置成false:

```javascript
var player = vvp('video-id', {
  children: {
    controlBar: {
      children: {
        muteToggle: false
      }
    }
  }
});
```

看起来这种每次查找子节点的方式有点啰嗦，可有简写，功能上是完全一样的。

```javascript
var player = vvp('video-id', {
  controlBar: {
    muteToggle: false
  }
});
```

也可以直接在`data-setup` 属性中设置组件的初始化状态，如下：

```html
<video ... data-setup='{ "children": { "controlBar": { "children": { "muteToggle": false } } } }'></video>
```

组件的相关用法情参看文档 [components guide](components.md) 这里有详细的介绍。
只要记住所有的对象都包含或者不包含 `children` 节点。
