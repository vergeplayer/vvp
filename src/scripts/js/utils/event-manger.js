/**
 * 统一事件管理器(非DOM Event)
 * Copyright 2015, event-manger.js
 * MIT Licensed
 * @since 2015/8/24.
 * @modify 2015/9/17.
 * @author zhengzk
 **/

verge.EventManager = vvp.CoreObject.extend({
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
    /***
     * 为指定的事件类型绑定方法
     * @param type String 事件类型
     * @param handle Function 事件方法
     */
    bind:function(type,handler,context){
        var own = this;
        if (vQ.isArray(type)) {
            return own._handleMultipleEvents.apply(own,[arguments.callee].concat(slice.call(arguments)));
            //return own._handleMultipleEvents(arguments.callee,type, handler);
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
    /***
     * 移除已添加的指定事件类型的方法
     * @param type String 事件类型
     * @param handle Function 事件方法
     */
    unbind:function(type,handler,context){
        var own = this;
        if (vQ.isArray(type)) {
            return own._handleMultipleEvents.apply(own,[arguments.callee].concat(slice.call(arguments)));
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
     * 绑定只执行一次的事件
     * @param  {Element|Object}   elem Element or object to
     * @param  {String|Array}   type
     * @param  {Function} fn
     * @private
     */
    one:function(type, handler,context) {
        var own = this;
        var args = slice.call(arguments);
        if (vQ.isArray(type)) {
            return own._handleMultipleEvents.apply(own,[own.one].concat(args));
            //return own._handleMultipleEvents(arguments.callee, type, handler);
        }

        var func = function(){
            own.unbind(type, func);
            handler.apply(context || handler, arguments);
        };

        // copy the guid to the new function so it can removed using the original function's ID
        func.$$guid = handler.$$guid = handler.$$guid || own._guid++;
        own.bind(type, func);

        //var func = function(){
        //    own.unbind.apply(own,args);
        //    handler.apply(context || handler, arguments);
        //};
        ////args = [type, func].concat(args.slice(2));//更换fun 这样支持不定个数的参数
        //args = [type, func];//context 已经处理所以不用再传给bind来处理了
        //
        //// copy the guid to the new function so it can removed using the original function's ID
        //func.$$guid = handler.$$guid = handler.$$guid || own._guid++;
        //own.bind.apply(own,args);
    },
    /**
     * 触发指定事件类型的所有方法
     * @param type String 事件类型
     * @param args
     * @param context
     * @returns {*}
     */
    trigger:function(type,args,context){
        var own = this;
        if (vQ.isArray(type)) {
            return own._handleMultipleEvents.apply(own,[arguments.callee].concat(slice.call(arguments)));
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
     * @param fn Function
     * @param types Array
     * @param callback Function
     * @private
     */
    _handleMultipleEvents:function(fn,types){
        var own = this;
        var args = slice.call(arguments,2);//.slice(2);//动态截取fn所需参数
        vQ.each(types,function(inx,type){
            fn.apply(own,[type].concat(args));
        });
    }
});
