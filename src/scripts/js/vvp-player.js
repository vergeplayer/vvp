/**
 * vvp进行拓展 使其支持多个player的处理
 * Copyright 2015, vvp.js
 * MIT Licensed
 * @since 2015/9/30.
 * @modify 2015/10/20.
 * @author zhengzk
 **/

vvp.fn.extend(function () {
    var ext = {},
        methods = verge.methods,
        attrs = verge.attrs;

    //    , 'attr'
    //    , 'plugin'

    //可调用方法 无返回值 返回vvp
    //bind unbind one load
    vQ.each(methods.events.concat(methods.native).concat(['plugin']), function (inx, fun) {
            ext[fun] = function () {
                var args = slice.call(arguments);
                this.each(function (i, player) {
                    player[fun].apply(player, args);
                });
                return this;
            };
        });

    //回掉函数和方法重名处理
    //play pause
    vQ.each(methods.specialNative, function (inx, fun) {
            ext[fun] = function (arg, flag) {
                if (arguments.length > 0) {
                    if (vQ.isFunction(arg)) {//参数为function
                        var args1 = [fun].concat(slice.call(arguments));
                        this.each(function (i, player) {
                            player['bind'].apply(player, args1);
                        });
                    }
                }
                if (flag !== false) {
                    var args2 = slice.call(arguments); //兼容处理传递arguments
                    this.each(function (i, player) {
                        player[fun].apply(player, args2);
                    });
                }
                return this;
            };
        });


    //需要返回值  只读属性
    //duration
    vQ.each(attrs.readonly, function (inx, fun) {
            ext[fun] = function () {
                var player = this[0];
                if (player) {
                    return player[fun].apply(player, arguments);
                }
                //return undefined;
            };
        });

    //ended seeking error
    //回掉函数和只读获取属性的方法重名处理
    vQ.each(attrs.specialReadonly, function (inx, attr) {
            ext[attr] = function (arg) {
                if (arguments.length > 0) {
                    if (vQ.isFunction(arg)) {
                        var args = [attr].concat(slice.call(arguments));
                        this.each(function (i, player) {
                            player.bind.apply(this, args);
                        });
                    }
                }
                var player = this[0];
                if (player) {
                    return player[attr].apply(player, arguments);
                }
                //return undefined;
            };
        });

    //可以设置or读取属性的方法
    //autoplay
    vQ.each(attrs.readwrite.concat(attrs.specialReadwrite).concat(['attr']), function (inx, attr) {
            ext[attr] = function () {
                var player = this[0];
                if (player) {
                    return player[attr].apply(player, arguments);
                }
                //return undefined;
            };
        });

    /**
     * 增加外部函数入口
     */
    vQ.each(methods.callbacks, function (inx, fun) {
            ext[fun] = function () {
                var own = this;
                var args = [fun].concat(slice.call(arguments));
                own.each(function (i, player) {
                    player['bind'].apply(player, args);
                });
            };
        });

    return ext;
}());

