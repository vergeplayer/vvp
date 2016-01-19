/**
 * 内部实现的简版jQuery
 * Copyright 2015, vQ.js
 * MIT Licensed
 * @since 2015/8/24.
 * @author zhengzk
 * @modify 2015/10/29.
 */
var vQ = function (selector, context) {
    return new vQ.fn.init(selector, context);
};

//dom.fn上绑定的方法与每个对象
//dom上直接绑定的方法为单列
vQ.fn = vQ.prototype = {
    constructor: vQ,
    length: 0,
    init: function (selector, context) {

        // "" , null , undefined , false
        if (!selector) {
            return this;
        }

        //string
        if ('string' == typeof selector) {//字符串选择器
            context = context instanceof vQ ? context[0] : context;
            var nodeList = (context || document).querySelectorAll(selector);
            this.length = nodeList.length;
            for (var i = 0; i < this.length; i += 1) {
                this[i] = nodeList[i];
            }
            //DOMElement
        } else if (vQ.isArray(selector)) {//数组
            this.length = selector.length;
            for (var j = 0; j < selector.length; j += 1) {
                this[j] = selector[j];
            }
        } else if (vQ.isFunction(selector)) {//function
            //ready func
            vQ.ready(selector);

        } else if (selector.nodeType) {//DOM元素
            this[0] = selector;
            this.length = 1;
            return this;
        } else if (selector instanceof vQ) {
            return selector;
        }
        return this;
    },
    /**
     * 遍历
     * @param callback
     * @returns {*}
     */
    each: function (callback) {
        var i = 0, length = this.length;
        for (; i < length; i += 1) {
            callback.call(this[i], i, this[i]);
        }
        return this;
    },
    /**
     * 转换成数组
     * @returns {Array.<T>}
     */
    toArray: function () {
        return slice.call(this);
    },
    /**
     * 获取某一个
     * @param num
     * @returns {*}
     */
    get: function (num) {
        return num != null ?

            // Return just the one element from the set
            ( num < 0 ? this[num + this.length] : this[num] ) :

            // Return all the elements in a clean array
            slice.call(this);
    },
    /**
     * eq
     * @param i
     * @returns {null}
     */
    eq: function (i) {
        var len = this.length,
            j = +i + ( i < 0 ? len : 0 );
        if (j >= 0 && j < len) {
            return vQ(this[j]);
        }
        return null;
    },
    /**
     * 根据callback 筛选
     * @param callback
     * @param invert
     * @returns {Array}
     */
    grep: function (callback, invert) {
        var callbackInverse,
            matches = [],
            i = 0,
            length = this.length,
            callbackExpect = !invert;

        // Go through the array, only saving the items
        // that pass the validator function
        for (; i < length; i++) {
            callbackInverse = !callback(this[i], i);
            if (callbackInverse !== callbackExpect) {
                matches.push(this[i]);
            }
        }

        return matches;
    }
};
vQ.fn.init.prototype = vQ.fn;

vQ.extend = vQ.fn.extend = function () {
    var options, name, src, copy, copyIsArray, clone,
        target = arguments[0] || {},
        i = 1,
        length = arguments.length,
        deep = false;

    // Handle a deep copy situation
    if (typeof target === 'boolean') {
        deep = target;

        // Skip the boolean and the target
        target = arguments[i] || {};
        i++;
    }

    // Handle case when target is a string or something (possible in deep copy)
    if (typeof target !== 'object' && !vQ.isFunction(target)) {
        target = {};
    }

    // Extend jQuery itself if only one argument is passed
    if (i === length) {
        target = this;
        i--;
    }

    for (; i < length; i++) {

        // Only deal with non-null/undefined values
        if (( options = arguments[i] ) != null) {

            // Extend the base object
            for (name in options) {
                src = target[name];
                copy = options[name];

                // Prevent never-ending loop
                if (target === copy) {
                    continue;
                }

                // Recurse if we're merging plain objects or arrays
                if (deep && copy && ( vQ.isPlainObject(copy) ||
                    ( copyIsArray = vQ.isArray(copy) ) )) {

                    if (copyIsArray) {
                        copyIsArray = false;
                        clone = src && vQ.isArray(src) ? src : [];

                    } else {
                        clone = src && vQ.isPlainObject(src) ? src : {};
                    }

                    // Never move original objects, clone them
                    target[name] = vQ.extend(deep, clone, copy);

                    // Don't bring in undefined values
                } else if (copy !== undefined) {
                    target[name] = copy;
                }
            }
        }
    }

    // Return the modified object
    return target;
};

vQ.extend({
    version: '@VERSION',
    /**
     * 判断是否是Object
     * @param obj
     * @returns {boolean}
     */
    isPlainObject: function (obj) {
        return !!obj
            && typeof obj === 'object'
            && obj.toString() === '[object Object]'
            && obj.constructor === Object;
    },
    /**
     * 判断是否是空节点
     * @param obj
     * @returns {boolean}
     */
    isEmptyObject: function (obj) {
        var t;
        for(t in obj){
            return true;
        }
        return false;
    },
    /**
     * 判断arr是否是Array
     * @param arr Array
     * @returns {boolean}
     */
    isArray: function (arr) {
        return Object.prototype.toString.call(arr) === '[object Array]';
    },
    /**
     * 判断fn是否是Function
     * @param fn Function
     * @returns {boolean}
     */
    isFunction: function (fn) {
        return '[object Function]' === Object.prototype.toString.call(fn);
    },
    /**
     * 获取元素节点名称
     * @param elem
     * @param name
     * @returns {Function|string|boolean}
     */
    nodeName: function (elem, name) {
        return elem.nodeName && elem.nodeName.toLowerCase() === name.toLowerCase();
    },
    /**
     * 遍利节点
     * @param obj
     * @param fn
     * @param context
     */
    each: function (obj, fn, context) {
        for (var key in obj) {
            if (hasOwnProp.call(obj, key)) {
                //inx,element
                fn.call(context || this, key, obj[key]);
            }
        }
    },
    /**
     * 清楚字符串空格
     * @param text
     * @returns {string}
     */
    trim: function (text) {
        var reg = /(^\s*)|(\s*$)/g;
        return text == null ?
            '' :
            ( text + '' ).replace(reg, '');
    },
    /**
     * 空function
     */
    noop: function () {},
    /**
     *
     * @param first {Object}
     * @param second {Object}
     * @returns {*}
     */
    merge: function (first, second) {
        if (!second) {
            return first;
        }
        for (var key in second) {
            if (hasOwnProp.call(second, key)) {
                first[key] = second[key];
            }
        }
        return first;
    }
});