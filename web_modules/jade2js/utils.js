/**
 * 工具方法
 * Copyright 2016, utils.js
 * MIT Licensed
 * @since 2016/2/29.
 * @modify 2016/2/29.
 * @author zhengzk
 **/

/**
 * upperCase
 * @param str
 * @returns {string|*|void|XML}
 */
function upperCase(str){
  return str.replace(/(\w)/,function(v){
    return v.toUpperCase()
  });
}
/***
 * parseName
 * @param nameSpace
 * @returns {string}
 */
function parseName(name){
  var nameArr = (name || "").split("-");
  var ret = "";
  if(nameArr.length > 0){
    for(var i = 0, l = nameArr.length ; i < l ; i ++){
      ret += upperCase(nameArr[i]);
    }
  }
  return ret;
}

//exports
exports.upperCase = upperCase;
exports.parseName = parseName;
