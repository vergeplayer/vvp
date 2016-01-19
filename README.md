
![Verge Video Player logo](https://avatars2.githubusercontent.com/u/15995058?v=3&s=200)

# vvp - Verge Video Player

> vvp 是基于HTML5的通用播放器解决方案。我们未必是最好的，但我们一定是最认真的，和持最开放的心态的。
> 欢迎加入我们 你将参与到亿级用户产品的播放体验中来：）

## 开发者指南

从github上把项目的代码拷贝到本地

```bash
git clone git@github.com:vergeplayer/vvp.git
```

确保本地环境安装了node 、 npm  可以执行一下命令查看node 和 npm的版本(vvp需要node 4.0以上，npm 2.1以上）

```bash
node -v
4.2.4

npm -v
2.1.4
```

执行 npm install 安装所需要的依赖

```bash
npm install
```

执行gulp 任务

```bash
gulp
```


## 使用者指南


从 dist 目录里把合并后的 vvp.min.css、 vvp.min.js添加至HTML页面当中,并部署文件。
`<head>`:

```html
<link href="http://yourdomian.com/css/vvp.min.css" rel="stylesheet">
<script src="http://yourdomian.com/js/vvp.min.js"></script>
```

然后您可以在页面任何地方添加 `<video>` 标签，需要在标签增加一个 `data-setup`属性，属性的值是一个JSON格式的对象。包含所有Video的初始参数设置。
并添加一个必要的`class="vvp vvp-skin"` 属性。

```html
<video id="VVP" class="vvp vvp-skin" controls
 preload="auto" width="640" height="264" poster="vvp-poster.jpg"
 data-setup='{}'>
  <source src="verge.mp4" type='video/mp4'>
  <source src="verge.webm" type='video/webm'>
  <p class="vvp-no-js">
    请确保您的浏览器开启了Javascript，如需要请升级您的浏览器。<a href="http://.com/html5-video-support/" target="_blank">支持 HTML5 video标签</a>
  </p>
</video>
```

如果您不在初始设置中添加 `data-setup` 也可以在初始化视频对象时再吧设置项当作对象参数传入。

```javascript
var player = vvp('VVP', { /* Options */ }, function() {
  console.log('完成！');

  this.play(); // if you don't trust autoplay for some reason

  // How about an event listener?
  this.bind('ended', function() {
    console.log('搞定！');
  });
});
```

查看文档[documentation](docs/index.md) 可以了解更全面的信息. 也可以查看API文档
[player API docs](docs/api/vvp.Player.md)

## 开源贡献
vvp 的代码是公开开源的 [contributing guide](CONTRIBUTING.md).

## 声明

vvp is licensed under the MIT. [View the license file](LICENSE)

Copyright 2015 1VERGE, Inc
