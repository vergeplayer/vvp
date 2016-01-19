/**
 * Created by zhengzk on 2016/1/17.
 */
//拓展自身api方法
//vvp.component.Player.expand({
//
//});

//处理与player相关部分
vvp.Player.expand({
    /**
     * 初始化component.Player
     * @param player
     * @private
     */
    _initPlayer:function(player){
        if(!player) return;
        var own = this;
        var poster = player.eles['poster'];
        var loading = player.eles['loading'];
        //var advert = player.eles['advert'];
        //var contextmenu = player.eles['contextmenu'];
        var dashboard = player.eles['dashboard'];
        var bigbtn = player.eles['vvpplaybigbtn'];
        if(poster){
            this._initPoster(poster);
        }
        if(loading){
            this._initLoading(loading)
        }
        if(dashboard){
            this._initDashboard(dashboard);
        }
        if(bigbtn){
            this._initPlayBigBtn(bigbtn);
        }

        own.one('onPlay',function(){
            player.root.bind('click', function (e) {
                var ele = e.target || e.srcElement;
                if(ele == player.root[0]){
                    own.controls(!own.controls());//toggle
                }
            });
        });
    }
});