/**
 * 获取DOM元素事件绑定方法
 * Copyright 2015, event.js
 * MIT Licensed
 * @since 2015/9/2.
 * @modify 2015/9/6.
 * @author zhengzk
 **/
(function () {

    var event = ObjectCreate({
        /**
         * 为元素绑定方法
         * @param element
         * @param type
         * @param handler
         * @param context
         * @returns {*}
         */
        bind: function (element, type, handler, context) {
            var own = this;

            //非DOM元素不处理 handler 非function 不处理
            if (!(1 == element.nodeType || element.nodeType == 9 || element === window) || !vQ.isFunction(handler)) {
                return;
            }

            //多个事件处理
            if (vQ.isArray(type)) {
                return own._handleMultipleEvents(own.observe, element, type, handler);
            }

            var _handler = handler;

            //上下文对象处理
            if (context) {
                _handler = function () {
                    handler.apply(context, arguments);
                };
                own._contextHandler[handler.$$guid] = _handler;
                _handler.$$guid = handler.$$guid = handler.$$guid || own._guid++;
            }

            //调用原生方法绑定事件
            if (element.addEventListener) {
                element.addEventListener(type, _handler, false);
            } else {
                //IE等 自行托管事件

                // assign each event handler a unique ID
                if (!_handler.$$guid) _handler.$$guid = this._guid++;
                // create a hash table of event types for the element
                if (!element.events) element.events = {};
                // create a hash table of event handlers for each element/event pair
                var handlers = element.events[type];
                if (!handlers) {
                    handlers = element.events[type] = {};
                    // store the existing event handler (if there is one)
                    if (element['on' + type]) {
                        handlers[0] = element['on' + type];
                    }
                }
                // store the event handler in the hash table
                handlers[_handler.$$guid] = _handler;
                // assign a global event handler to do all the work
                element['on' + type] = own._handleEvent;
            }
        },
        /**
         * 为元素解除已绑定方法
         * @param element
         * @param type
         * @param handler
         * @returns {*}
         */
        unbind: function (element, type, handler) {
            var own = this;
            //非DOM元素不处理 handler 非function 不处理
            if (!(1 == element.nodeType || element.nodeType == 9 || element === window) || !vQ.isFunction(handler)) {
                return;
            }

            //批量事件绑定
            if (vQ.isArray(type)) {
                return own._handleMultipleEvents(own.remove, element, type, handler);
            }
            //处理绑定了了context的事件
            var _handler = own._contextHandler[handler.$$guid];// || handler;

            //调用原生方法解除已绑定事件
            if (element.removeEventListener) {
                element.removeEventListener(type, _handler || handler, false);
            } else {
                //IE等 自行托管事件

                // delete the event handler from the hash table
                var events = element.events;
                if (events) {
                    delete events[handler.$$guid];//删除该方法
                    //判断事件集合是否为空
                    var hasProp = false;
                    for (var prop in events) {
                        hasProp = true;
                    }
                    if (!hasProp) {
                        delete element.events;
                    }
                }
            }
            if (_handler && !delete own._contextHandler[handler.$$guid]) {
                own._contextHandler[handler.$$guid] = null;
            }
        },
        /**
         * Trigger a listener only once for an event
         * @param  {Element|Object}   elem Element or object to
         * @param  {String|Array}   type
         * @param  {Function} fn
         * @private
         */
        one: function (element, type, handler, context) {
            var own = this;
            //非Dom元素不处理
            if (!(1 == element.nodeType || element.nodeType == 9 || element === window)|| !vQ.isFunction(handler)) {
                return;
            }
            //获取传入参数
            var args = slice.call(arguments);

            //批量绑定事件处理
            if (vQ.isArray(type)) {
                return own._handleMultipleEvents.apply(own, [own.one].concat(args));
                //return own._handleMultipleEvents(own.one, element, type, handler);
            }

            var func = function () {
                own.unbind(element, type, func);
                handler.apply(context || element, arguments);
            };

            // copy the guid to the new function so it can removed using the original function's ID
            func.$$guid = handler.$$guid = handler.$$guid || own._guid++;
            own.bind(element, type, func);


            //var func = function(){
            //    own.unbind.apply(own,args);
            //    handler.apply(context || element, arguments);
            //};
            ////args = [type, func].concat(args.slice(2));//更换fun 这样支持不定个数的参数
            //
            //// copy the guid to the new function so it can removed using the original function's ID
            //func.$$guid = handler.$$guid = handler.$$guid || own._guid++;
            ////own.observe(element, type, func);
            //own.bind.apply(own,args);
        },
        /**
         * @private
         */
        _guid: 0, //unique 事件唯一ID
        _contextHandler: {},//context 事件存储
        /**
         * 处理多事件的绑定
         * @param fn
         * @param elem
         * @param types
         * @private
         */
        _handleMultipleEvents: function (fn, elem, types) {
            var own = this;
            var args = Array.prototype.slice.call(arguments).slice(3);//动态截取fn所需参数
            vQ.each(types, function (inx, type) {
                fn.apply(own, [elem, type].concat(args));
            });
        },
        /**
         * 处理事件
         * @param event
         * @returns {boolean}
         * @private
         */
        _handleEvent: function (event) {
            var own = this;
            var returnValue = true;
            // grab the event object (IE uses a global event object)
            event = event || own._fixEvent(((this.ownerDocument || this.document || this).parentWindow || window).event);
            // get a reference to the hash table of event handlers
            var handlers = this.events[event.type];
            // execute each event handler
            for (var i in handlers) {
                var _handleEvent = handlers[i];
                if (_handleEvent(event) === false) {
                    returnValue = false;
                }
            }
            return returnValue;
        },
        /**
         * 修复原生事件
         * @param  {Object} event Event object to fix
         * @return {Object}
         * @private
         */
        _fixEvent: function (event) {
            //Fix a native event to have standard property values
            function returnTrue() {
                return true;
            }

            function returnFalse() {
                return false;
            }

            // Test if fixing up is needed
            // Used to check if !event.stopPropagation instead of isPropagationStopped
            // But native events return true for stopPropagation, but don't have
            // other expected methods like isPropagationStopped. Seems to be a problem
            // with the Javascript Ninja code. So we're just overriding all events now.
            if (!event || !event.isPropagationStopped) {
                var old = event || window.event;

                event = {};
                // Clone the old object so that we can modify the values event = {};
                // IE8 Doesn't like when you mess with native event properties
                // Firefox returns false for event.hasOwnProperty('type') and other props
                //  which makes copying more difficult.
                // TODO: Probably best to create a whitelist of event props
                for (var key in old) {
                    // Safari 6.0.3 warns you if you try to copy deprecated layerX/Y
                    // Chrome warns you if you try to copy deprecated keyboardEvent.keyLocation
                    if (key !== 'layerX' && key !== 'layerY' && key !== 'keyLocation') {
                        // Chrome 32+ warns if you try to copy deprecated returnValue, but
                        // we still want to if preventDefault isn't supported (IE8).
                        if (!(key == 'returnValue' && old.preventDefault)) {
                            event[key] = old[key];
                        }
                    }
                }

                // The event occurred on this element
                if (!event.target) {
                    event.target = event.srcElement || document;
                }

                // Handle which other element the event is related to
                event.relatedTarget = event.fromElement === event.target ? event.toElement : event.fromElement;

                // Stop the default browser action
                event.preventDefault = function () {
                    if (old.preventDefault) {
                        old.preventDefault();
                    }
                    event.returnValue = false;
                    event.isDefaultPrevented = returnTrue;
                    event.defaultPrevented = true;
                };

                event.isDefaultPrevented = returnFalse;
                event.defaultPrevented = false;

                // Stop the event from bubbling
                event.stopPropagation = function () {
                    if (old.stopPropagation) {
                        old.stopPropagation();
                    }
                    event.cancelBubble = true;
                    event.isPropagationStopped = returnTrue;
                };

                event.isPropagationStopped = returnFalse;

                // Stop the event from bubbling and executing other handlers
                event.stopImmediatePropagation = function () {
                    if (old.stopImmediatePropagation) {
                        old.stopImmediatePropagation();
                    }
                    event.isImmediatePropagationStopped = returnTrue;
                    event.stopPropagation();
                };

                event.isImmediatePropagationStopped = returnFalse;

                // Handle mouse position
                if (event.clientX != null) {
                    var doc = document.documentElement, body = document.body;

                    event.pageX = event.clientX +
                        (doc && doc.scrollLeft || body && body.scrollLeft || 0) -
                        (doc && doc.clientLeft || body && body.clientLeft || 0);
                    event.pageY = event.clientY +
                        (doc && doc.scrollTop || body && body.scrollTop || 0) -
                        (doc && doc.clientTop || body && body.clientTop || 0);
                }

                // Handle key presses
                event.which = event.charCode || event.keyCode;

                // Fix button for mouse clicks:
                // 0 == left; 1 == middle; 2 == right
                if (event.button != null) {
                    event.button = (event.button & 1 ? 0 :
                        (event.button & 4 ? 1 :
                            (event.button & 2 ? 2 : 0)));
                }
            }

            // Returns fixed-up instance
            return event;
        }
    });

    vQ.extend({
        /**
         * 绑定事件
         * @param ele
         * @param type
         * @param fun
         */
        bind: function (ele, type, fun) {
            event.bind.apply(event, arguments);
        },
        /**
         * 解除绑定事件
         * @param ele
         * @param type
         * @param fun
         */
        unbind:function(ele,type,fun){
            event.unbind.apply(event,arguments);
        },
        /**
         * 绑定只执行一次的事件
         * @param ele
         * @param type
         * @param fun
         */
        one:function(ele,type,fun){
            event.one.apply(event,arguments);
        }
    });
    vQ.fn.extend({
        /**
         * 绑定事件
         * @param type
         * @param fun
         * @returns {*}
         */
        bind: function (type, fun) {
            this.each(function (inx, ele) {
                vQ.bind(ele, type, fun);
            });
            return this;
        },
        /**
         * 解除绑定事件
         * @param type
         * @param fun
         * @returns {*}
         */
        unbind: function (type, fun) {
            this.each(function (inx, ele) {
                vQ.unbind(ele, type, fun);
            });
            return this;
        },
        /**
         * 绑定只执行一次的事件
         * @param type
         * @param fun
         * @returns {*}
         */
        one: function (type, fun) {
            this.each(function (inx, ele) {
                vQ.one(ele, type, fun);
            });
            return this;
        }
    });

}());

