/**
 * Created by zhengzk on 2016/1/17.
 */
//拓展自身api
//vvp.component.Trigger.expand({
//
//});

//处理与player相关部分
vvp.Player.expand({
    /**
     * 初始化trigger
     * @param trigger
     * @private
     */
    _initTrigger: function (trigger) {
        //if(!trigger) return;
        var own = this;
        own.one('onPlay',function(){
            trigger.root.bind('click', function () {
                //own.dashboard.toggle();
                own.controls(!own.controls());//toggle
            });

            own.bind(['onPlay','onPlaying'], function () {
                trigger.root.show();
            });

            own.bind('onPause', function () {
                trigger.root.hide();
            });
        });
    }
});
