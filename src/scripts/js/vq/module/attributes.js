/**
 * 获取DOM元素属性相关操作
 * Copyright 2015, attributes.js
 * MIT Licensed
 * @since 2015/9/24.
 * @modify 2015/9/28.
 * @author zhengzk
 **/
(function () {
//attr  val width  height
    /**
     * 设置Element的属性
     * @param el
     * @param attributes
     */
    function setAttributes(el, attributes) {
        Object.getOwnPropertyNames(attributes).forEach(function (attrName) {
            var attrValue = attributes[attrName];

            if (attrValue === null || typeof (attrValue) === 'undefined' || attrValue === false) {
                el.removeAttribute(attrName);
            } else {
                el.setAttribute(attrName, (attrValue === true ? '' : attrValue));
            }
        });
    }

    /**
     * 获取Element的属性
     * @param tag {Element}
     * @returns {{}}
     */
    function getElAttributes(tag,attr) {
        var obj, knownBooleans, attrs, attrName, attrVal;

        obj = {};

        // known boolean attributes
        // we can check for matching boolean properties, but older browsers
        // won't know about HTML5 boolean attributes that we still read from
        knownBooleans = ',' + 'autoplay,controls,loop,muted,default' + ',';

        if (tag && tag.attributes && tag.attributes.length > 0) {
            attrs = tag.attributes;

            for (var i = attrs.length - 1; i >= 0; i--) {
                attrName = attrs[i].name;
                attrVal = attrs[i].value;

                // check for known booleans
                // the matching element property will return a value for typeof
                if (typeof tag[attrName] === 'boolean' || knownBooleans.indexOf(',' + attrName + ',') !== -1) {
                    // the value of an included boolean attribute is typically an empty
                    // string ('') which would equal false if we just check for a false value.
                    // we also don't want support bad code like autoplay='false'
                    attrVal = (attrVal !== null) ? true : false;
                }

                if(attr && attrName == attr){
                    return attrVal;
                }

                obj[attrName] = attrVal;
            }
        }
        if(attr && typeof attr == 'string'){
            return tag[attr];
        }
        return obj;
    }

    vQ.extend({
        /**
         * 设置or获取属性
         * @param element
         * @param params
         * @returns {{}}
         */
        attr:function(element, params) {
            var attrs;
            if ('object' == typeof params) {
                attrs = params;
            }
            if ('string' == typeof params) {
                if (arguments.length > 2) {
                    attrs = {};
                    attrs[params] = arguments[2];
                }else{
                    return getElAttributes(element,params);
                }
            }
            if (attrs) {
                setAttributes(element, attrs);
            }
        },
        /**
         * 是否包含某个子元素
         * @param root
         * @param el
         * @returns {*}
         */
        //root中是否包含el节点
        contains: function (root, el) {
            if (root.compareDocumentPosition)
                return root === el || !!(root.compareDocumentPosition(el) & 16);
            if (root.contains && el.nodeType === 1) {
                return root.contains(el) && root !== el;
            }
            while ((el = el.parentNode)) {
                if (el === root) return true;
            }
            return false;
        }
    });

    vQ.fn.extend({
        /**
         * 设置or获取属性
         * @param element
         * @param params
         * @returns {{}}
         */
        attr: function (params) {

            var attrs;
            if ('object' == typeof params) {
                attrs = params;
            }
            if ('string' == typeof params) {
                if (arguments.length > 1) {
                    attrs = {};
                    attrs[params] = arguments[1];
                }else{
                    return getElAttributes(this[0],params);
                }
            }
            if (attrs) {
                this.each(function (inx, ele) {
                    setAttributes(ele, attrs);
                });
            }
        },
        /**
         * 是否包含某个子元素
         * @param root
         * @param el
         * @returns {*}
         */
        contains: function (el) {
            this.forEach(function (inx, ele) {
                var flag = vQ.contains(ele, el);
                if (flag) {
                    return true;
                }
            });
            return false;
        }
    });
}());