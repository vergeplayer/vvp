/**
 * Created by zhengzk on 2016/1/17.
 */
//拓展loading自身api
//vvp.component.loading.expand({
//
//});

//处理loading与player相关部分
vvp.Player.expand({
    /**
     * 初始化loading按钮
     * @param loading
     * @private
     */
    _initLoading:function(loading){
        if(!loading) return;
        this.bind(['onPlay','onPlaying','onError','onPause'], function () {
            loading.root.hide();
        });

        this.bind('onWaiting', function () {
            loading.root.show();
        });
    }
});