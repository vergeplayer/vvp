/**
 * utils
 * Copyright 2016 1VERGE Inc, utils
 * MIT Licensed
 * @since 2016/2/19.
 * @modify 2016/4/11.
 * @author zhengzk
 **/
/**
 *  补0 pad(1,2) ——> "01"
 * @param num
 * @param n
 * @returns {Array.<T>}
 */
function pad(num, n) {
  return (Array(n).join(0) + num).slice(-n)
}

var uint = TEXT.uint;
var unitIndex = ['hh', 'mm', 'ss'];

var utils = {
  /**
   * 是否是DOM元素
   * @param ele
   * @returns {*|boolean}
   */
  isDOMElement: function (ele) {
    return ele && ele.nodeType === 1;
  },
  /**
   * 是否是Video元素
   * @param ele
   * @returns {*|boolean}
   */
  isVideoElement: function (ele) {
    return utils.isDOMElement(ele) && ele.nodeName.toLowerCase() == 'video';
  },
  /**
   * 根据path创建路径
   * @param path string
   * @returns {Object}
   */
  routes: function (path) {
    var arr = path.split('.');
    var length = arr.length;
    if (length <= 0) return;

    var i = 1;
    var ns = arr[0];
    do {
      eval('if(typeof(' + ns + ') == "undefined") ' + ns +
        ' = new Object();');
      ns += '.' + arr[i++];
    } while (length >= i);
    return eval(ns);
  },
  /***
   * 获取元素在页面中的clientLeft
   * @param ele
   * @returns {options.offsetLeft|*}
   */
  getClientLeft: function (ele) { //有bug? 后续修复
    if (null == ele) {
      return;
    }
    var left = ele.offsetLeft;
    var parentNode = ele.offsetParent;
    while (true) {
      if (null == parentNode) {
        break;
      }
      left = left + parentNode.offsetLeft - parentNode.scrollLeft;
      if (parentNode == document.body) {
        break;
      }
      parentNode = parentNode.offsetParent;
    }
    return left;
  },
  /**
   * 创建一个DOM元素并转换为vQ对象
   * @param tagName
   * @param attrs
   */
  create: function (tagName, attrs) {
    tagName = tagName || 'div';
    var ele = document.createElement(tagName);
    var ret = vQ(ele);
    if (attrs) {
      ret.attr(attrs);
    }
    //ret.attr(attrs);
    return ret;
  },
  /**
   * 把style属性转换成object
   * @param style
   * @returns {*}
   */
  mapStyle: function (style) {
    //if (typeof style == "object") return style;
    //var defs = (style + "").split(";");
    //style = {};
    //for (var def in defs) {
    //    def = defs[def].split(":");
    //    style[def[0]] = def[1];
    //}
    return style;
  },
  /**
   * mixin
   * @param source
   * @param target
   */
  mixin: function (source, target) {
    for (var key in source) {
      target[key] = source[key];
    }
  },
  /**
   * mixinAttributes
   * @param target
   * @param blocks
   * @returns {*}
   */
  mixinAttributes: function (target, blocks) {
    for (var i = 0; i < blocks.length; i++) {
      utils.mixin(blocks[i], target);
    }
    return target;
  },
  //slice:[].slice,
  hasOwnProp: Object.prototype.hasOwnProperty,
  /**
   * 72 —> [01,12]
   * @param time
   * @returns {Array}
   */
  long2array: function (time) {
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
  },
  /**
   * 格式化时间 72 —> 00:01:12
   * @param long
   * @returns {string}
   */
  long2time: function (long) {
    var rs = utils.long2array(long);
    return rs.join(':');
  },
  /**
   * long2text 72 —> 1分12秒
   * @param long
   * @returns {string}
   */
  long2text: function (long) {
    var ret = [];
    var arr = utils.long2array(long);
    var inx = 2;
    for (var i = arr.length - 1; i >= 0; i--) {
      var num = parseInt(arr[i]);
      ret.unshift(num + uint[unitIndex[inx]]);
      inx--;
    }
    return ret.join('');
  },
  /**
   * 将00:01:22的时间转换成 82
   * @param str
   * @returns {number}
   */
  time2long: function (str) {
    var arr = str.split(':');
    var r = 0;
    var len = arr.length;
    for (var k = len - 1; k >= 0; k--) {
      var t = parseInt(arr[k]);
      if (!isNaN(t)) {
        var w = len - k - 1;
        for (var i = 0; i < w; i++) {
          t *= 60;
        }
        r += t;
      }
    }
    return r;
  },
  /**
   * time2text 1:12 —> 1分12秒
   * @param time
   * @returns {string}
   */
  time2text: function (time) {
    var ret = [];
    var arr = time.split(':');
    var inx = arr.length - 1;
    inx = inx > 2 ? 2 : (inx < 0 ? 0 : inx);
    for (var i = arr.length - 1; i >= 0; i--) {
      var num = parseInt(arr[i]);
      ret.unshift(num + uint[unitIndex[inx]]);
      inx--;
    }
    return ret.join('');
  }
};

module.exports = utils;
