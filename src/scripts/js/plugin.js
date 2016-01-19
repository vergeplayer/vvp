/**
 * 插件管理器
 * Copyright 2015, plugin.js
 * MIT Licensed
 * @since 2015/9/2.
 * @modify 2015/10/25.
 * @author zhengzk
 **/
vvp.extend({
    plugin:function(name,init){
        this.each(function(inx,player){
            player.expand({
                name:init
            });
        });
    }
});
