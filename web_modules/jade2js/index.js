/**
 * webpack jade2script loader
 * Copyright 2016, index.js
 * MIT Licensed
 * @since 2016/2/24.
 * @modify 2016/3/16.
 * @author zhengzk
 **/

var jade2script = require("jade2script");
var loaderUtils = require("loader-utils");
var path = require('path');
var utils = require("./utils.js");
var walk = require("./walk.js");

var jade_root = path.resolve('./src/templates/jade/');//process.cwd();
var view_root = path.resolve('./src/scripts/js/view/');//process.cwd();

var list = walk(view_root, function (item_path) {
  //排除非js文件
  if (".js" != path.extname(item_path)) {
    return;
  }
  return item_path;
});

/**
 * require('jade/*.jade') ===> require('view/*.js');
 * @param filepath
 * @returns {*}
 */
function getComponent(absPath) {
  var ret = absPath;
  var relPath = path.relative(jade_root, absPath);
  for (var i = 0; i < list.length; i++) {
    var item = list[i];
    var jsRelPath = path.relative(view_root, item);
    if (jsRelPath.replace('.js', '') == relPath.replace('.jade', '')) {
      ret = item;
      break;
    }
  }
  return ret;
}

module.exports = function (source) {
  //jade2script
  var own = this;
  own.cacheable();
  //获取当前jade文件目录
  var dirname = path.dirname(this.resourcePath);
  //获取当前jade文件名称
  var filename = path.basename(this.resourcePath, ".jade");
  //获取参数
  var query = loaderUtils.parseQuery(this.query);
  //异步
  //var callback = this.async();
  //asyncFun(function(){
  //  callback(null, header + "\n" + source);
  //});
  var _options = {
    name: utils.parseName(filename),
    key:"vvp_id",
    utils:"verge",
    routes:false,
    translate: function (data, name) {
      if (query.component == false) {
        //return "var verge = require(" +
        //  loaderUtils.stringifyRequest(this, "js/verge.js") +
        //  ");\n" +
         return "module.exports = " + data + ";";
      }
      return "var Component = require(" +
        loaderUtils.stringifyRequest(this, "js/component.js") +
        ");\n" +
        //"var verge = require(" +
        //loaderUtils.stringifyRequest(this, "js/verge.js") +
        //");\n" +
        "var " + name + " = Component.extend({\n" +
        "\t name:'" + name +"',\n"+
        "\t _createView:" +
        data +
        "});\n" +
        "module.exports = " + name + ";";
    },
    processModule: function (node, varName) {
      //依赖的jade文件 统一后缀都带有.jade
      var mod_name = utils.parseName(path.basename(node.file.path, ".jade"));
      var mod_filename = path.basename(node.file.path, ".jade") + ".jade";
      //依赖的jade文件的相对路径
      var mod_dirname = path.dirname(node.file.path);
      //重新拼接filepath
      var mod_filePath = path.join(mod_dirname, mod_filename);
      //获取绝对路径
      var mod_absPath = path.resolve(dirname, mod_filePath);
      var loaderStr = "jade2js!";
      //var _reqPath = mod_absPath;
      //if (true != query.jade) {
        var _reqPath = getComponent(mod_absPath);
        if (path.extname(_reqPath) == ".js") {
          loaderStr = "";
        }
      //}
      return "var " + varName + " = require(" +
        loaderUtils.stringifyRequest(this, loaderStr + _reqPath) + ").create(options['" + mod_name +"'],arguments[1]);\n" + //"+(query.component ? "this.player" :"this")
        "this.childs.push(" + varName + ");\n"+ varName + ".parent = this;\n";

      //test
      //own.addDependency(absPath);
      //own.addContextDependency(_path);
      //own.loadModule('jade2js!' + absPath,function(error,modSource){
      //  console.log(modSource);
      //});
    }
  };
  return jade2script.compile(source, _options);
};
