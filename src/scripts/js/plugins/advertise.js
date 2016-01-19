/**
 * Created by zhengzk on 2015/9/29.
 */
//广告插件
(function(){

    function onPlay(){
        //this.each(function(){
            this.controls(false);
        //});
    }

    function onEnded(){
        this.controls(true);
    }


    vvp.fn.extend({
        advertise:function(options){

            this.bind('onPlay',function(){
                onPlay();
            });

            this.bind('onEnded',function(){
                onEnded();
            });
        }
    });
}());
