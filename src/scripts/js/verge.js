/**
 * 基础公共方法
 * Copyright 2015, video-player.js
 * MIT Licensed
 * @since 2015/9/12.
 * @modify 2015/10/25.
 * @author zhengzk
 **/
/**
 * verge 公用方法
 * Q：verge为什么与vQ合并or对vQ进行扩展？
 *   保持vQ的职责单一  vQ用法接口等与jQuery保持一致
 * @type {{routes: Function, isDOMElement: Function, create: Function, getClientLeft: Function}}
 */
var verge = {
    /**
     * 根据path创建路径
     * @param path string
     * @returns {Object}
     */
    routes: function(path) {
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
    /**
     * 是否是DOM元素
     * @param ele
     * @returns {*|boolean}
     */
    isDOMElement: function(ele) {
        return ele && ele.nodeType === 1;
    },
    /**
     * 创建一个DOM元素并转换为vQ对象
     * @param tagName
     * @param attrs
     */
    create: function(tagName, attrs) {
        tagName = tagName || 'div';
        var ele = document.createElement(tagName);
        var ret = vQ(ele);
        if (attrs) {
            ret.attr(attrs);
        }
        //ret.attr(attrs);
        return ret;
    },
    /***
     * 获取元素在页面中的clientLeft
     * @param ele
     * @returns {options.offsetLeft|*}
     */
    getClientLeft: function(ele) { //有bug? 后续修复
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
     * 把style属性转换成object
     * @param style
     * @returns {*}
     */
    mapStyle: function(style) {
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
    mixin: function(source, target) {
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
    mixinAttributes: function(target, blocks) {
        for (var i = 0; i < blocks.length; i++) {
            verge.mixin(blocks[i], target);
        }
        return target;
    },
    /**
     * 转换时长 将82的时间转换成00:01:22
     * @param long
     * @param len
     * @returns {string}
     */
    long2time:function(long,len){
        var p = long || 0;
        p = parseInt(p);
        var r = [];
        while(p > 0) {
            r.unshift(p % 60);
            p = Math.floor(p / 60);
        }
        len = len || 2;
        while(r.length < len){
            r.unshift(0);
        }
        for( var k=0 ; k < r.length; k++ ){
            r[k] = (r[k] >= 10 ? r[k] : '0' + r[k]);
        }
        return r.join(':');
    },
    /**
     * 将00:01:22的时间转换成 82
     * @param str
     * @returns {number}
     */
    time2long:function(str){
        var arr = str.split(':');
        var r = 0;
        var len = arr.length;
        for( var k = len - 1 ; k >= 0 ; k -- ){
            var t = parseInt(arr[k]);
            if(!isNaN(t)){
                var w = len - k - 1;
                for(var i = 0 ; i < w ; i++ ){
                    t *= 60;
                }
                r += t;
            }
        }
        return r;
    }
};

/***
 * 拓展
 * @type {extend}
 */
verge.extend = function() {
    vQ.extend.apply(this, arguments);
};
