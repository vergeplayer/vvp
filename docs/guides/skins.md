皮肤 Skins
=====

默认的皮肤是基于Sass来开发的，同时也提供一个格式良好的CSS文件，以供修改开发适合自己的皮肤。

## 图标 Icons

图标字体包含（播放、暂停、加载)等通用的功能。就像使用其他字体一样可以对其进行颜色的设置，通过CSS3也可以实现字体的渐变、阴影、立体等其他任何你想要的效果。

所有的图标变量定义在 [SASS](https://github.com/ykvjs/video.js/blob/master/src/css/video-js.less#L87-L99) 文件中。

![available icons](https://i.cloudup.com/wb51GGDDnJ.png)

## 自定义 Customization

当你想创建一个全新的皮肤的时候，您可以重写，或者复写默认皮肤的样式：

```css
.ykv-default-skin .ykv-play-progress { background: #900; }
```

在video标签中删除'ykv-default-skin' class 然后添加您自己开发的css

```html
<video class="ykv-js my-custom-skin" ...>
```
