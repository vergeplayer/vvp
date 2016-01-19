/**
 * Created by zhengzk on 2016/1/18.
 */

//拓展组件自身api
vvp.component.Poster.expand({
    /**
     * 设置poster image url
     */
    setSrc:function(){

    }
});

//处理组件与player相关部分
vvp.Player.expand({
    /**
     * 初始化poster
     * @param poster
     * @private
     */
    _initPoster:function(poster){
        if(!poster) return;
        var own = this;
        this.one(['onPlay', 'onError'], function () {
            poster.root.hide();
        });
    }
});