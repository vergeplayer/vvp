/**
 * ObjectCreate
 * Copyright 2015-2016, utils.js
 * MIT Licensed
 * @since 2015/2/19.
 * @modify 2016/4/5.
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
 * 72 —> [01,12]
 * @param time
 * @returns {Array}
 */
function time2array(time){
  var rs = [], t;
  var arr = [60, 1];
  if (time >= 3600) {
    arr = [3600, 60, 1];
  }
  arr.forEach(function (p) {
    rs.push(pad(t = (time / p) | 0, 2));
    time -= t * p
  });
  return rs;
}
/**
 * 格式化时间 72 —> 00:01:12
 * @param s
 * @returns {string}
 */
function timeFormat (time) {
  var rs = time2array(time);
  return rs.join(':');
}
var uint = TEXT.uint;
var unitIndex = ['hh','mm','ss'];
/**
 * time2text 72 —> 1分12秒
 * @param time
 * @returns {string}
 */
function time2text(time){
  var ret = [];
  var arr = time2array(time);
  var inx = 2;
  for(var i = arr.length - 1 ; i >= 0 ; i --) {
    var num = parseInt(arr[i]);
    ret.unshift(num + uint[unitIndex[inx]]);
    inx--;
  }
  return ret.join('');
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
exports.time2text = time2text;
exports.guid = guid;
