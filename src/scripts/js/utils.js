/**
 * ObjectCreate
 * Copyright 2015-2016, utils.js
 * MIT Licensed
 * @since 2015/2/19.
 * @modify 2016/3/2.
 * @author zhengzk
 **/
var slice =  [].slice;
var hasOwnProp = Object.prototype.hasOwnProperty;

/**
 *  补0 pad(1,2) ——> "01"
 * @param num
 * @param n
 * @returns {Array.<T>}
 */
function pad(num, n) {
  return (Array(n).join(0) + num).slice(-n)
}

/**
 * 格式化时间 72 —> 00:01:12
 * @param s
 * @returns {string}
 */
function timeFormat (s) {
  var rs = [], t
  [3600, 60, 1].forEach(function (p) {
    rs.push(pad(t = (s / p) | 0, 2))
    s -= t * p
  });
  return rs.join(':');
}

var guid_prefix = new Date().getTime().toString(16).substring(4,10);
var guid_inx = 0;
/**
 * 随机索引
 * @returns {string}
 */
function guid(){
  return guid_prefix + "_" + guid_inx ++;
}

exports.slice = slice;
exports.hasOwnProp = hasOwnProp;
exports.timeFormat = timeFormat;
exports.guid = guid;
