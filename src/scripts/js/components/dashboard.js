/**
 * Created by zhengzk on 2016/1/17.
 */

vvp.Player.expand({
    _initDashboard:function(dashboard){
        //if(!dashboard) return;
        var controls = dashboard.eles['controls'];
        var progress = dashboard.eles['progress'];
        var progressMini = dashboard.eles['progressmini'];
        if(controls){
            this._initControls(controls);
        }
        if(progress){
            this._initProgress(progress);
        }

        if(progressMini){
            this._initProgressMini(progressMini);
        }
    },
    controls:function(flag){
        var own = this;
        var player = this.eles['player'];
        var dashboard = player.eles['dashboard'];
        if(arguments.length > 0){
            var clearTimer = function(timer){
                if(own._show_ctl__timer){
                    clearTimeout(own._show_ctl__timer);
                    delete own._show_ctl__timer;
                }
            };
            if(flag){
                dashboard.root.show();
                clearTimer();
                own._show_ctl__timer = setTimeout(function(){
                    if(!own.paused()) {
                        dashboard.root.hide();
                    }
                },5000);
            }else{
                dashboard.root.hide();
                clearTimer();
            }
        }
        return !dashboard.root.isHidden();
    }
});