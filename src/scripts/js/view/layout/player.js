/**
 * Player
 * Copyright 2016, player.js
 * MIT Licensed
 * @since 2016/1/17.
 * @modify 2016/3/16.
 * @author zhengzk
 **/
//拓展自身api方法
//获取组件DOM结构
var Player = require('jade2js?jade!jade/layout/player.jade');
//扩展组件为其添加事件交互等
Player.expand({
    /**
     * implements
     * 处理事件
     * @param options
     * @private
     */
    _initEvent:function(options,player){
        var own = this;
        own.one('onPlay',function(){
            own.root.bind('click', function (e) {
                var ele = e.target || e.srcElement;
                if(ele == own.root[0]){
                    player.controls(!player.controls());//toggle
                }
            });
        });
    }
});

module.exports = Player;
