/**
 * 统一事件管理器(非DOM Event)
 * Copyright 2015-2016, event-manger.js
 * MIT Licensed
 * @since 2015/9/24.
 * @modify 2016/3/16.
 * @author zhengzk
 **/
var CoreObject = require('./core-object.js');
var slice = require('../utils.js').slice;
var Event = require('./Event.js');

//确保每个绑定的方法只有一个ID
var guid = + new Date().getTime().toString().substring(5);

var EventManager = CoreObject.extend({
  /**
   * Constructor
   * @param data
   * @param target
   */
  init: function (data,target) {
    //this._guid = 0;
    this._handlers = {};
    this._contexts = {};
    this._target = target;
    var own = this;
    if (data) {
      vQ.each(data, function (type, handler) {
        own.bind(type, handler);
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
  bind: function (type, handler, context) {
    var own = this;
    if (vQ.isArray(type)) {
      return own._handleMultipleEvents.apply(own, [own.bind].concat(slice.call(arguments)));
    }

    if (!handler.$$guid) {
      handler.$$guid = guid++;
    }

    if (context) {
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
  unbind: function (type, handler, context) {
    var own = this;
    if (vQ.isArray(type)) {
      return own._handleMultipleEvents.apply(own, [own.unbind].concat(slice.call(arguments)));
      //return own._handleMultipleEvents(arguments.callee,type, handler);
    }
    var handlers = own._handlers[type];
    if (handlers) {
      if (own._contexts[handler.$$guid]) {
        delete own._contexts[handler.$$guid];//删除该方法的context
      }
      delete handlers[handler.$$guid];//删除该方法

      //判断事件集合是否为空
      var hasProp = false;
      for (var prop in handlers) {
        hasProp = true;
      }
      if (!hasProp) {
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
  one: function (type, handler, context) {
    var own = this;
    var args = slice.call(arguments);
    if (vQ.isArray(type)) {
      return own._handleMultipleEvents.apply(own, [own.one].concat(args));
    }

    //更换fun 处理解绑
    //context 已经处理所以不用再传给bind来处理了
    var func = function () {
      own.unbind(type, func);
      handler.apply(context || handler, arguments);//支持不定个数的参数
    };

    // copy the guid to the new function so it can removed using the original function's ID
    func.$$guid = handler.$$guid = handler.$$guid || guid++;
    own.bind(type, func);
  },
  /**
   * Method
   * 触发指定事件类型的所有方法
   * @param type {String || Event} 事件类型
   * @param args {Array} 参数列表
   * @param context {Context} 上下文环境
   * @returns {*}
   */
  trigger: function (type, args, context) {
    var own = this;
    //if (vQ.isArray(type)) {
    //  //apply方式 可以动态传参
    //  return own._handleMultipleEvents.apply(own, [own.trigger].concat(slice.call(arguments)));
    //  //return own._handleMultipleEvents(arguments.callee,type,args,context);
    //}
    if(!type){
      throw new TypeError('need the \'type\'');
    }

    var event;
    if(type.constructor == Event){
      event = type;
      event.currentTarget = own._target;
    }else if('string'){
      event = new Event(type,own._target);
    }else{
      throw new TypeError('The \'type\' must be a Event Object or String');
    }

    //if(event.currentTarget != event.target){
    //  if(event.fall){//下落
    //    event.phase = Event.FallING;
    //  }else if(event.cancelBubble){
    //    event.phase = Event.BUBBLING
    //  }
    //}

    //触发回掉函数
    var handlers = own._handlers[event.type];
    if (handlers) {
      //1、make sure args is Array
      //2、push event make the handlers can use event
      args = [event].concat(args == null ? [] :(vQ.isArray(args) ? args : [args] ));
      for (var k in handlers) {
        context = context || own._contexts[handlers[k].$$guid];
        var ret = handlers[k].apply(context || this, args);
        if ( ret !== undefined ) {
          // 如果处理函数返回值是false，则阻止广播事件
          if ( (event.result = ret) === false ) {
            event.stopPropagation();
          }
        }
      }
    }
    //return event.result;//？ 后续考虑优化
    return event;
  },
  /**
   * 事件参数类型多个的处理
   * @param fn {Function} 要执行的事件方法
   * @param types {Array} 方法名称集合
   * @params more
   * @private
   */
  _handleMultipleEvents: function (fn, types) {
    var own = this;
    var args = slice.call(arguments, 2);//动态截取fn所需参数
    vQ.each(types, function (inx, type) {
      fn.apply(own, [type].concat(args));
    });
  }
});

module.exports = EventManager;

//var managers = {};
//
//function factory(arg){
//  if('string' == typeof arg || 'number' == typeof arg){
//    if(managers[arg]){
//      return managers[arg];
//    }
//    managers[arg] = create(arguments[1]);
//    return managers[arg];
//  }
//  return (vQ.isPlainObject(arg) ? new EventManager(arg) :  new EventManager(arg));
//}

//exports factory
//module.exports = factory;
