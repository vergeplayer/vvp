/**
 * walk
 * Copyright 2016, index.js
 * MIT Licensed
 * @since 2016/2/29.
 * @modify 2016/2/29.
 * @author zhengzk
 **/
var fs = require('fs');
var path = require('path');
/**
 * 获取指定path下的文件列表
 * @param _path
 * @param callback
 * @returns {Array}
 */
function walk(_path,callback) {
  var  fileList = [];
  var dirList = fs.readdirSync(_path);
  dirList.forEach(function(item) {
    var item_path = path.join(_path,item);
    if (fs.statSync(item_path).isDirectory()) {
      fileList = fileList.concat(walk(item_path,callback));
    } else {
      if('function' == typeof callback){
        var ret = callback(item_path);
        if(ret){
          fileList.push(ret);
        }
      }else{
        fileList.push(item_path);
      }
    }
  });
  return fileList;
}

module.exports = walk;
