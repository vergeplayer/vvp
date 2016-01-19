插件 Plugins
=======
If you've built something cool with Video.js, you can easily share it with the rest of the world by creating a plugin. Although, you can roll your own, you can also use [generator-ykvjs-plugin](https://github.com/dmlap/generator-ykvjs-plugin), a [Yeoman](http://yeoman.io) generator that provides scaffolding for video.js plugins including:
* [Grunt](http://gruntjs.com) for build management
* [npm](https://www.npmjs.org) for dependency management
* [QUnit](http://qunitjs.com) for testing

第一步: 通过Javascript创建插件函数
-----------------------------
 通过Javascript创建一个函数方法，可以通过传递的参数options来进行相关配置。

    function examplePlugin(options) {
      this.on('play', function(e) {
        console.log('playback has started!');
      });
    };

你可以利用vvp.js当中的API来创建插件 [vvp.js API](api.md)

第二步: 注册插件
-------------------------------
一旦创建了插件，就需要向vvp.js里注册该插件才可以使用。

    vvp.plugin('examplePlugin', examplePlugin);

请确保每个注册的插件的名称的唯一性。

第三步: 使用插件
----------------------
有两种方式来初始化插件，定义创建，和动态创建。

    vvp('vidId', {
      plugins: {
        examplePlugin: {
          exampleOption: true
        }
      }
    });

也可以动态的创建通过Javascript

    var video = vvp('cool-vid');
    video.plugin({ exampleOption: true });

第四步: 添加插件到wiki文档
----------------------
然后添加该插件到wiki[vvp.js wiki](https://github.com/vvpjs/vvp.js/wiki/Plugins)方便查看和使用。
