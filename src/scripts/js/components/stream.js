/**
 * Created by zhengzk on 2016/1/18.
 */
//拓展自身api
//vvp.component.stream.expand({
//
//});

//处理与player相关部分
vvp.Player.expand({
    /**
     * 初始化Stream 设置player的video
     * @param loading
     * @private
     */
    _initStream:function(stream){
        this.video = this.eles['stream'].video[0];
    }
});