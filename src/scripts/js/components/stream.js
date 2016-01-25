/**
 * Stream
 * Copyright 2016, stream.js
 * MIT Licensed
 * @since 2016/1/18.
 * @modify 2016/1/25.
 * @author zhengzk
 **/
vvp.component.Stream.expand({
    /**
     * implements
     * 处理事件
     * @param options
     * @private
     */
    _initEvent:function(options){
        options.player.video = this.video[0];
    }
});