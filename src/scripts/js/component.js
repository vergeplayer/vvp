/**
 * 组件基类 / the basic Component class
 * Copyright 2016, component.js
 * MIT Licensed
 * @since 2016/1/25.
 * @modify 2016/1/25.
 * @author zhengzk
 **/
vvp.Component = vvp.CoreObject.extend({
    /**
     * Constructor
     * @param options
     */
    init: function (options) {
        options = vQ.merge({},options);// merge option
        this._options = options;
        this._createView(options);//构建View
        this._initEvent(options);//绑定事件
    },
    ///**
    // * Method
    // * 设置or获取options/setting or getting options
    // * @param obj
    // * @returns {*|Map}
    // */
    //options:function(obj){
    //    if(vQ.isPlainObject(obj)){// merge option
    //        this._options = vQ.merge(this._options,obj);
    //    }
    //    return this._options;
    //},
    /**
     * Interface
     * 处理Dom元素事件/process Dom element events
     * @private
     */
    _initEvent:function(){

    },
    /**
     * Interface
     * 构建View / build Dom
     * @private
     */
    _createView: function () {
        var frag = document.createDocumentFragment();
        this.fragment = frag;
        return frag;
    }
});

/**
 * 为Component添加bind、unbind、one、trigger方法 /add bind、unbind、one、trigger method for Component
 * //Component通过bind、unbind、one、trigger方法与player交互
 */
vvp.Component.expand(function(){
    var extend = {},
        methods = verge.methods;
        //events = new verge.EventManager();

    //bind unbind one trigger事件处理
    vQ.each(methods.events,function(inx,fun){
        /**
         * @param type {String|Array} 事件类型
         * @param handler {Function} 事件方法
         * @param context {Context} 上下文环境
         * @returns {*}
         */
        extend[fun] = function() {
            var own = this;
            var player = this._options.player;
            var args = slice.call(arguments,0,2).concat(player);
            if(!(vQ.isArray(args[0]) || 'string' == typeof args[0])){//参数不合法
                return;
            }
            if(player){
                player[fun].apply(player, args);
            }
            //events[fun].apply(events, args);
            return own;
        };
    });

    return extend;
}());