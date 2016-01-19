/**
 * 文档加载完成后执行相关方法
 * Copyright 2015, ready.js
 * MIT Licensed
 * @since 2015/9/2.
 * @modify 2015/9/24.
 * @author zhengzk
 **/
(function () {
    var readyList = [];

    /**
     * window.onload
     */
    function completed() {
        document.removeEventListener('DOMContentLoaded', completed);
        window.removeEventListener('load', completed);
        vvp.ready();
    }

// Catch cases where $(document).ready() is called
// after the browser event has already occurred.
// We once tried to use readyState "interactive" here,
// but it caused issues like the one
// discovered by ChrisS here: http://bugs.jquery.com/ticket/12282#comment:15
    if (document.readyState === 'complete') {

        // Handle it asynchronously to allow scripts the opportunity to delay ready
        window.setTimeout(vvp.ready);

    } else {

        // Use the handy event callback
        document.addEventListener('DOMContentLoaded', completed);

        // A fallback to window.onload, that will always work
        window.addEventListener('load', completed);
    }

    vvp.extend({
        isReady: false,
        readyWait: 1,
        /**
         * 加载完成
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

})();
