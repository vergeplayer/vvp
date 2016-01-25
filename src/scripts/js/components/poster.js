/**
 * Poster
 * Copyright 2016, poster.js
 * MIT Licensed
 * @since 2016/1/18.
 * @modify 2016/1/25.
 * @author zhengzk
 **/

//拓展组件自身api
vvp.component.Poster.expand({
    /**
     * implements
     * 处理事件
     * @param options
     * @private
     */
    _initEvent:function(options){
        var own = this;
        own.one(['onPlay', 'onError'], function () {
            own.root.hide();
        });
    },
    /**
     * 设置poster image url
     */
    setSrc:function(){

    }
});