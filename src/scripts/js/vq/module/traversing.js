/**
 * 获取DOM元素相互之间的关系处理
 * Copyright 2015, traversing.js
 * MIT Licensed
 * @since 2015/9/2.
 * @modify 2015/9/6.
 * @author zhengzk
 **/

(function () {
    /**
     * 获取同胞节点
     * @param n
     * @param elem
     * @returns {Array}
     */
    var siblings = function (n, elem) {
        var matched = [];

        for (; n; n = n.nextSibling) {
            if (n.nodeType === 1 && n !== elem) {
                matched.push(n);
            }
        }

        return matched;
    };

    var indexOf = [].indexOf;

    function sibling(cur, dir) {
        while (( cur = cur[dir] ) && cur.nodeType !== 1) {
        }
        return cur;
    }

    vQ.fn.extend({
        // Determine the position of an element within the set
        /**
         * 下标
         * @returns {*}
         */
        index: function () {
            var elem = this[0];
            // No argument, return index in parent
            if (!elem) {
                return ( this[0] && this[0].parentNode ) ? this.first().prevAll().length : -1;
            }

            // Index in selector
            if (typeof elem === 'string') {
                return indexOf.call(vQ(elem), this[0]);
            }

            // Locate the position of the desired element
            return indexOf.call(this,

                // If it receives a jQuery object, the first element is used
                elem.jquery ? elem[0] : elem
            );
        },
        /**
         * 获取父节点
         * @returns {domLvl1.parentNode|*|Function|module.parentNode|Node|parentNode}
         */
        parent: function () {
            var elem = this[0];
            var parent = elem.parentNode;
            return parent && parent.nodeType !== 11 ? parent : null;
        },
        /**
         * 获取下一个相邻节点
         * @returns {*}
         */
        next: function () {
            var elem = this[0];
            return sibling(elem, 'nextSibling');
        },
        /**
         * 获取前一个相邻节点
         * @returns {*}
         */
        prev: function () {
            var elem = this[0];
            return sibling(elem, 'previousSibling');
        },
        /**
         * 获取同胞节点
         * @returns {Array}
         */
        siblings: function () {
            var elem = this[0];
            return siblings(( elem.parentNode || {} ).firstChild, elem);
        },
        /**
         * 子节点
         * @returns {Array}
         */
        children: function () {
            var elem = this[0];
            return siblings(elem.firstChild);
        },
        /**
         * 内容
         * @returns {HTMLDocument|*}
         */
        contents: function () {
            var elem = this[0];
            return elem.contentDocument || vQ.merge([], elem.childNodes);
        }
    });
}());