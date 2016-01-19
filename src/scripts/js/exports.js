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
    //define('vvp', [], function(){ return vvp; });
    define('@NAME', [], function(){ return vvp; });

// checking that module is an object too because of umdjs/umd#35
} else if (typeof exports === 'object' && typeof module === 'object') {
    //module['vvp'] = vvp;
    module['@NAME'] = vvp;
}

if(exports){
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
    exports['@NAME'.toUpperCase()] = exports['@NAME'] = vvp;
}else{
    return vvp;
}
