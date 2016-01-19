/**
 * 获取DOM元素相互之间的操作处理
 * Copyright 2015, manipulation.js
 * MIT Licensed
 * @since 2015/9/2.
 * @modify 2015/9/6.
 * @author zhengzk
 **/

//clone detach
(function() {
    var
        rxhtmlTag = /<(?!area|br|col|embed|hr|img|input|link|meta|param)(([\w:-]+)[^>]*)\/>/gi,
        rnoInnerhtml = /<script|<style|<link/i;

    vQ.extend({
        htmlPrefilter: function (html) {
            return html.replace(rxhtmlTag, '<$1></$2>');
        }
    });

    vQ.fn.extend({
        /**
         * 移除节点
         * @returns {*}
         */
        remove: function () {
            this.each(function(inx,node){
                if (node.parentNode) {
                    node.parentNode.removeChild(node);
                }
            });
            return this;
        },
        /**
         * 追加子节点
         * @param ele
         * @returns {*}
         */
        append: function (ele) {
            var node = this[0];
            //结点类型判断
            if (node.nodeType === 1 || node.nodeType === 11 || node.nodeType === 9) {
                if(ele instanceof vQ){
                    ele.each(function(inx,ele){
                        node.appendChild(ele);
                    });
                } else if(ele.nodeType){
                    node.appendChild(ele);
                }
                // string array
            }
            return this;
        },
        /**
         * 插入到当前节点的第一个
         * @param ele
         * @returns {*}
         */
        prepend: function (ele) {
            var node = this[0];
            //(ele string ??)
            if (node.nodeType === 1 || node.nodeType === 11 || node.nodeType === 9) {
                node.insertBefore(ele, node.firstChild);
            }
            return this;
        },
        /**
         * 在当前节点之前插入
         * @param ele
         * @returns {*}
         */
        before: function (ele) {
            var node = this[0];
            //(ele string ??)
            if (node.parentNode) {
                node.parentNode.insertBefore(ele, node);
            }
            return this;
        },
        /**
         * 在当前节点之后插入
         * @param ele
         * @returns {*}
         */
        after: function (ele) {
            var node = this[0];
            //(ele string ??)
            if (node.parentNode) {
                node.parentNode.insertBefore(ele, node.nextSibling);
            }
            return this;
        },
        /**
         * 清空当前节点
         * @returns {*}
         */
        empty: function () {
            var elem,
                i = 0;

            for (; ( elem = this[i] ) != null; i++) {
                if (elem.nodeType === 1) {
                    // Remove any remaining nodes
                    elem.textContent = '';
                }
            }
            return this;
        },
        /**
         * 替换当前节点
         * @param ele
         * @returns {*}
         */
        replaceWith: function (ele) {
            var node = this[0];
            if (node.parentNode) {
                var parent = node.parentNode;
                if(ele instanceof vQ){
                    ele.each(function(inx,ele){
                        parent.replaceChild(ele, node);
                    });
                } else{
                    parent.replaceChild(ele, node);
                }
            }
            return this;
        },
        /**
         * 插入html片段
         * @param value
         * @returns {*}
         */
        html: function (value) {

            var elem = this[0] || {},
                i = 0,
                l = this.length;

            if (value === undefined && elem.nodeType === 1) {
                return elem.innerHTML;
            }
            if (typeof value === 'string' && !rnoInnerhtml.test(value)) {
                try {
                    value = vQ.htmlPrefilter(value);
                    for (; i < l; i++) {
                        elem = this[i] || {};

                        // Remove element nodes and prevent memory leaks
                        if (elem.nodeType === 1) {
                            elem.innerHTML = value;
                        }
                    }

                    elem = 0;

                    // If using innerHTML throws an exception, use the fallback method
                } catch (e) {
                }
            }
            return this[0].innerHTML;
        },
        /**
         * 插入text文本
         * @param value
         * @returns {*}
         */
        text: function (value) {
            var elem = this[0] || {},
                i = 0;
            if (arguments.length > 0) {
                for (; ( elem = this[i] ) != null; i++) {
                    if (elem.nodeType === 1 || elem.nodeType === 11 || elem.nodeType === 9) {
                        // Remove any remaining nodes
                        elem.textContent = value;
                    }
                }
            }

            var node = this[0];
            if ( node.nodeType === 1 || node.nodeType === 9 || node.nodeType === 11 ) {

                // Use textContent for elements
                return node.textContent;
            } else if ( node.nodeType === 3 || node.nodeType === 4 ) {
                return node.nodeValue;
            }
            return '';
        }
    });
}());

