/**
 * Player
 * Copyright 2016, player.js
 * MIT Licensed
 * @since 2016/1/17.
 * @modify 2016/1/25.
 * @author zhengzk
 **/
//拓展自身api方法
vvp.component.Player.expand({
    /**
     * implements
     * 处理事件
     * @param options
     * @private
     */
    _initEvent:function(options){
        var own = this;
        own.one('onPlay',function(){
            var player = this;
            own.root.bind('click', function (e) {
                var ele = e.target || e.srcElement;
                if(ele == own.root[0]){
                    player.controls(!player.controls());//toggle
                }
            });
        });
    }
});