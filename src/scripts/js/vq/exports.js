/**
 * export 包含对模块化的支持
 * Copyright 2015, umd.js
 * MIT Licensed
 * @since 2015/9/2.
 * @modify 2015/9/24.
 * @author zhengzk
 **/
//amd 方式引用支持
if (typeof define === 'function' && define['amd']) {
    define('@NAME', [], function(){ return vQ; });

// checking that module is an object too because of umdjs/umd#35
} else if (typeof exports === 'object' && typeof module === 'object') {
    module['@NAME'] = vQ;
}

if(typeof exports === 'object'){
    // Expose vQ to the exports object
    var _vQ = exports['@NAME'];

    vQ.extend({
        /**
         * 释放并返回vQ 解决命名冲突
         * @param flag
         * @returns {Function}
         */
        noConflict: function () {
            if (exports['@NAME'] == _vQ) {
                exports['@NAME'] = _vQ;
            }
            return vQ;
        }
    });
    exports['@NAME'] = vQ;
}else{
    return vQ;
}
