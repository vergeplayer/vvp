/**
 * 统一事件管理器(非DOM Event)
 * Copyright 2015, event-manger.js
 * MIT Licensed
 * @since 2015/8/24.
 * @modify 2016/1/25.
 * @author zhengzk
 **/
verge.EventManager = vvp.CoreObject.extend({
    /**
     * Constructor
     * @param data
     */
    init:function(data){
        this._guid = 0;
        this._handlers = {};
        this._contexts = {};
        var own = this;
        if(data) {
            vQ.each(data,function (type,handler) {
                own.observe(type,handler);
            });
        }
    },
    /**
     * Method
     * 为指定的事件类型绑定执行方法
     * @param type {String|Array} 事件类型
     * @param handler {Function} 事件方法
     * @param context {Context} 上下文环境
     * @returns {*}
     */
    bind:function(type,handler,context){
        var own = this;
        if (vQ.isArray(type)) {
            return own._handleMultipleEvents.apply(own,[own.bind].concat(slice.call(arguments)));
        }

        if (!handler.$$guid) {
            handler.$$guid = own._guid ++;
        }

        if(context){
            this._contexts[handler.$$guid] = context;
        }

        var handlers = own._handlers[type];
        if (!handlers) {
            handlers = own._handlers[type] = {};
        }
        // store the event handler in the hash table
        handlers[handler.$$guid] = handler;
    },
    /**
     * Method
     *移除已添加的指定事件类型的方法
     * @param type {String|Array} 事件类型
     * @param handler {Function} 事件方法
     * @param context {Context} 上下文环境
     * @returns {*}
     */
    unbind:function(type,handler,context){
        var own = this;
        if (vQ.isArray(type)) {
            return own._handleMultipleEvents.apply(own,[own.unbind].concat(slice.call(arguments)));
            //return own._handleMultipleEvents(arguments.callee,type, handler);
        }
        var handlers = own._handlers[type];
        if (handlers) {
            if(own._contexts[handler.$$guid]){
                delete own._contexts[handler.$$guid];//删除该方法的context
            }
            delete handlers[handler.$$guid];//删除该方法

            //判断事件集合是否为空
            var hasProp = false;
            for(var prop in handlers){
                hasProp = true;
            }
            if(!hasProp){
                delete own._handlers[type];
            }
        }
    },
    /**
     * Method
     * 绑定只执行一次的事件类型的方法
     * @param type {String|Array} 事件类型
     * @param handler {Function} 事件方法
     * @param context {Context} 上下文环境
     * @returns {*}
     */
    one:function(type, handler,context) {
        var own = this;
        var args = slice.call(arguments);
        if (vQ.isArray(type)) {
            return own._handleMultipleEvents.apply(own,[own.one].concat(args));
        }

        //更换fun 处理解绑
        //context 已经处理所以不用再传给bind来处理了
        var func = function(){
            own.unbind(type, func);
            handler.apply(context || handler, arguments);//支持不定个数的参数
        };

        // copy the guid to the new function so it can removed using the original function's ID
        func.$$guid = handler.$$guid = handler.$$guid || own._guid++;
        own.bind(type, func);
    },
    /**
     * Method
     * 触发指定事件类型的所有方法
     * @param type {String|Array} 事件类型
     * @param args {Array} 参数列表
     * @param context {Context} 上下文环境
     * @returns {*}
     */
    trigger:function(type,args,context){
        var own = this;
        if (vQ.isArray(type)) {
            return own._handleMultipleEvents.apply(own,[own.trigger].concat(slice.call(arguments)));
            //return own._handleMultipleEvents(arguments.callee,type,args,context);
        }

        var handlers = own._handlers[type];
        if (handlers) {
            for(var k in handlers){
                context = context || own._contexts[handlers[k].$$guid];
                handlers[k].apply(context || this , args );
            }
        }
    },
    /**
     * 事件参数类型多个的处理
     * @param fn {Function} 要执行的事件方法
     * @param types {Array} 方法名称集合
     * @params more
     * @private
     */
    _handleMultipleEvents:function(fn,types){
        var own = this;
        var args = slice.call(arguments,2);//动态截取fn所需参数
        vQ.each(types,function(inx,type){
            fn.apply(own,[type].concat(args));
        });
    }
});
