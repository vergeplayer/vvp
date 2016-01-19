销毁Player对象 Removing Players
================

有些时候，你想要在同一个页面销毁Player对象，vvp.js提供了方便的操作方式，只需要遵循以下规则:

调用 `.dispose()` 方法
-----------------

在页面代码中调用该方法来删除Player对象[`dispose()`](https://github.com/vvpjs/video.js/blob/stable/docs/api/vjs.Player.md#dispose) method:

```javascript```
var oldPlayer = document.getElementById('my-player');
vvp(oldPlayer).dispose(); 

```

该方法将会:

  1. 重置vvp.js的内部所有参数变量。
  2. 从原有的结点内删除该结点。

显示和隐藏Player
-------------------------

例如，如果你有一个模块包含了浏览器，你应该在模块出现的时候再动态的创建播放器对象，当模块需要隐藏时再销毁player对象。否则没有必要的资源将会占用浏览器资源。

为什么需要？
-------------------

vvp.js将会通过创建的DOM来监视其当中的属性和绑定在上面的⌚️，如果你想新建一个相同ID的视频对象，你就需要执行一下 dispose() 方法来销毁之前的Player对象。

会抛出下列异常
-------------------------

```
TypeError: this.el_.vvp_getProperty is not a function
"vvp:" "vvp.js: buffered unavailable on playback technology element." TypeError: this.el_.vvp_getProperty is not a function
Stack trace:
...
```

如果你在控制台遇到了类似上面的异常，你可能是忘了在需要销毁Player时执行一下 `dispose()` 。