/**
 * exports
 * Copyright 2015-2016, index.js
 * MIT Licensed
 * @since 2015/9/2.
 * @modify 2016/3/4.
 * @author zhengzk
 **/

var vvp = require('./vvp.js');

require('./component.js');
require('./vvp-player.js');

//ready相关
var readyList = [];
vvp.extend({
  isReady: false,
  readyWait: 1,
  /**
   * 当前文档加载完成后执行相关方法
   * @param arg
   */
  ready: function (arg) {
    if (vQ.isFunction(arg)) {
      if (!vvp.isReady) {
        readyList.push(arg);
      } else {
        arg.apply(document, [vvp]);
      }
    } else {
      if (arg === true ? --vvp.readyWait : vvp.isReady) {
        return;
      }
      vvp.isReady = true;

      if (arg !== true && --vvp.readyWait > 0) {
        return;
      }

      vQ.each(readyList, function (inx, func) {
        func.apply(document, [vvp]);
      });

    }
  }
});


if (typeof exports === 'object' && typeof module !== 'object'){
    // Expose vQ to the exports object
    var _vvp = exports['@NAME'];

    vvp.extend({
        /**
         * 释放并返回vvp 解决命名冲突
         * @param flag
         * @returns {Function}
         */
        noConflict: function () {
            if (exports['@NAME'] == vvp) {
                exports['@NAME'] = _vvp;
            }
            return vvp;
        }
    });

    //Expose vvp to the global object
    //exports['@NAME'.toUpperCase()] = exports['@NAME'] = vvp;
//}else{
    //return vvp;
}

vQ.ready(vvp.ready);
module.exports = vvp;
