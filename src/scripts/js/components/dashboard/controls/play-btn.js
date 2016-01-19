/**
 * Created by zhengzk on 2016/1/12.
 */

//拓展组件自身api
vvp.component.PlayBtn.expand({
    isPlaying: false,
    /**
     * 设置播放状态
     * flag = true 播放 flag = false 暂停  不传flag 播放与暂停互换
     * @param flag
     * @returns {boolean|*}
     */
    play: function (flag) {
        if (arguments.length > 0) {
            this.isPlaying = flag || false;
        } else {
            this.isPlaying = !this.isPlaying;
        }
        this._setStyle(this.isPlaying);
        return this.isPlaying;
    },
    //处理播放按钮展现样式
    _setStyle: function (isPlaying) {
        if (isPlaying) {//播放状态 显示为暂停按钮
            this.btn.attr('role', 'pause');
            this.bg.hide();
            this.icon.removeClass('vvp-ico-play').addClass('vvp-ico-pause');
        } else {//暂停状态  显示为播放按钮
            this.btn.attr('role', 'play');
            this.bg.show();
            this.icon.removeClass('vvp-ico-pause').addClass('vvp-ico-play');
        }
    }
});

//处理组件与player相关部分
vvp.Player.expand({
    /**
     * 初始化playbtn
     * @private
     */
    _initPlayBtn: function (playBtn) {
        var own = this;
        playBtn.btn.bind('click', function () {
            playBtn.play();
            own.play(playBtn.isPlaying);
            if (playBtn.isPlaying) {
                own.play();
            } else {
                own.pause();
            }
        });

        own.bind(['onPlay', 'onPlaying'], function () {
            playBtn.play(!own.paused());
        });
        own.bind(['onEnded', 'onError', 'onPause'], function () {
            playBtn.play(false);
        });
    }
});
