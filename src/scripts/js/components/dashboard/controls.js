/**
 * Created by zhengzk on 2016/1/17.
 */
//拓展组件自身api
//vvp.component.Controls.expand({
//
//});

//处理组件与player相关部分
vvp.Player.expand({
    /**
     * 初始化 controls
     * @param controls
     * @private
     */
    _initControls:function(controls){
        var playBtn = controls.eles['playbtn'];
        var fullscreen = controls.eles['fullscreen'];
        //var localization = controls.eles['localization'];
        //var quality = controls.eles['quality'];
        //var playshow = controls.eles['playshow'];
        var timeDisplay = controls.eles['timedisplay'];
        //var subtitlesSwitch = controls.eles['subtitlesswitch'];
        if(playBtn){
            this._initPlayBtn(playBtn);
        }
        if(timeDisplay){
            this._initTimeDisplay(timeDisplay);
        }
        if(fullscreen){
            this._initFullscreen(fullscreen);
        }
    }
});