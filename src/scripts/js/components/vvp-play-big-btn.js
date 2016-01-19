/**
 * Created by zhengzk on 2016/1/18.
 */

//拓展自身api
//vvp.component.VvpPlayBigBtn.expand({
//
//});

//处理与player相关部分
vvp.Player.expand({
    /**
     * 初始化大的播放按钮
     * @param playerBtn
     * @private
     */
    _initPlayBigBtn:function(playerBtn){
        if(!playerBtn) return;
        var own = this;
        playerBtn.root.bind('click', function () {
            own.play();
        });

        own.bind(['onError','onPlay','onPlaying','onWaiting'],function(){
            playerBtn.root.hide();
        });

        own.bind('onPause', function () {
            playerBtn.root.show();
        });
    }
});