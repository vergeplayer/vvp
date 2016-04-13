/**
 * 组件基类 / the basic Component class
 * Copyright 2016, component.js
 * MIT Licensed
 * @since 2016/1/25.
 * @modify 2016/3/17.
 * @author zhengzk
 **/

//var utils = require('./utils.js');
var log = verge.log,
    CoreObject = verge.CoreObject,
    EventManager = verge.EventManager,
    //Event = verge.Event,
    slice = [].slice;

var components = {};

/**
 * 判断是否是Component 实例
 * @param component
 * @returns {boolean}
 */
function isComponent(component) {
  //非function & normal function
  if (!component || !vQ.isFunction(component.constructor) || component.constructor == Function) {
    return false;
  }

  if (component.constructor == Component) {
    return true;
  }
  //处理继承
  return isComponent(component.constructor);
}

/**
 * 判断是否是Component 类
 * @param clazz
 * @returns {boolean}
 */
function isComponentClazz(clazz){
  if(!vQ.isFunction(clazz)){
    return false;
  }
  return (clazz.extend && clazz.extend == Component.extend);
}
/**
 * 是否包含子组件
 * @param parent
 * @param child
 */
function contains(parent, child) {
  if (isComponent(parent) && isComponent(child)) {
    if (parent == child) {
      return true;
    }
    var _childs = parent.childs;
    //是否是子组件
    for (var i = 0; i <= _childs.length; i++) {
      if (contains(_childs[i], child)) {
        return true;
      }
    }
  }
  return false;
}

var Component = CoreObject.extend({
  name: 'Component',//name
  /**
   * Constructor
   * @param options
   */
  init: function (attr,player) {
    //this._super();
    attr = vQ.merge({}, attr);// merge option
    //this.eles = [];//带标记的元素
    this.childs = [];//子组件
    this._attr = attr;
    this.player = player;
    this._events = new EventManager(attr.callback || {},this);
    this._createView(attr,player);//构建View
    this.nodes = vQ(this.fragment.childNodes);//获取DOM节点
    this._initEvent(attr,player);//绑定事件
  },
  /**
   * Interface
   * 处理Dom元素事件/process Dom element events
   * @param attr
   * @param player
   * @private
     */
  _initEvent: function (attr,player) {

  },
  /**
   * Interface
   * 构建View / build Dom
   * @param attr
   * @param player
   * @returns {DocumentFragment}
   * @private
   */
  _createView: function (attr,player) {
    var frag = document.createDocumentFragment();
    this.fragment = frag;
    return frag;
  },
  /**
   * 设置or获取attr值
   * @param arg
   * @returns {val|Component}
   */
  attr: function (arg) {
    //获取属性值
    var own = this;
    if (arguments.length < 2) {
      if ('string' == typeof arg) {
        return own._attr[arg];
      }
      return own._attr;
    }
    //设置属性值
    var attr = {};
    if (vQ.isPlainObject(arg)) {// merge attr
      attr = vQ.merge(attr, arg);//attr = arg;
    } else if ('string' == typeof arg) {
      attr[arg] = arguments[1];
    }
    vQ.each(attr, function (key, val) {
      if (own._attr[key] != val) {
        own.trigger('on' + key + "change", val);
      }
    });
    own._attr = vQ.merge(own._attr, attr);
    return this;
  },
  /**
   * find
   * @param arg
   * @returns {*}
   */
  find: function (arg) {
    var own = this;
    if (vQ.isFunction(arg)) {
      return own.map(arg);
    }
    var ret = [];
    if ('string' == typeof arg) {
      if (arg == this.name) {
        ret.push(this);
      }
      this.each(function (inx, child) {
        ret = ret.concat(child.find(arg));
      });
    }
    return ret;
  },
  /**
   * 遍历组件
   * @param fn
   * @returns {Component}
   */
  each: function (fn) {
    if (vQ.isFunction(fn)) {
      var own = this;
      for (var i = 0; i < own.childs.length; i++) {
        var child = own.childs[i];
        fn(i, child);
      }
    }
    return this;
  },
  /**
   * map子组件
   * @param fn
   * @returns {Array}
   */
  map: function (fn) {
    if (vQ.isFunction(fn)) {
      var _arr = [];
      vQ.each(this.childs, function (inx, child) {
        var ret = fn(inx, child);
        if (ret != null) {
          _arr.push(child);
        }
      });
      return _arr;
    }
  },
  /**
   * 按条件获取父组件
   * @param arg
   * @returns {Array}
   */
  parents:function(arg){
    var own = this;
    var _arr = [];
    var _parent  =  own.parent;
    while(_parent){
      if (vQ.isFunction(arg)) {
        var ret = fn(_parent);
        if (ret != null) {
          _arr.push(child);
        }
      } else if ('string' == typeof arg) {
        if (arg == _parent.name) {
          _arr.push(_parent);
        }
      } else{
        _arr.push(_parent);
      }
      _parent = _parent.parent || false;
    }

    return _arr;
  },
  /**
   * 是否包含某个组件
   * @param component
   * @returns {*}
   */
  contains: function (component) {
    return contains(this, component);
  },
  /**
   * 是否已经被追加
   * @returns {boolean}
   */
  isAppend:function(){
    //追加至dom节点后fragment
    return !(this.fragment.childNodes.length > 0);
  },
  /**
   * 移除自身
   */
  remove: function () {
    var own = this;
    if(own.parent){
      own.parent.removeNode(own.nodes);
    }else{
      own.nodes.remove();//移除Dom节点
    }
    return own;
  },
  /**
   * 移除子组件
   * @returns {Component}
   */
  removeChild: function (child) {
    //this.nodes.remove();//移除Dom节点
    var own = this;
    var comps = [];
    if(isComponent(child) && child.parent == this){
      comps.push(child);
    }else{
      var Clazz;
      if('string' == typeof child){
        Clazz = components[child];
        if(!components[child]){
          throw new TypeError('Can\'t Find The Component:'+ child);
        }
      }else if(isComponentClazz(child)) {
        Clazz = child;
      }
      if(Clazz){
        own.each(function(inx,comp){
          if(comp.constructor == Clazz){
            comps.push(comp);
          }
        });
      }
    }
    for(var i = 0 ; i < comps.length ; i++){
      var comp = comps[i];
      comp.remove();
      //own.removeNode(comp.nodes);
    }
    return this;
  },
  /**
   * 删除dom节点&索引
   * @param node
   */
  removeNode:function(node){
    var own = this;
    if(vQ.isArray(node)){
      for(var k = 0 ; k < node.length ; k ++){
        own.removeNode(node[k]);
      }
      return;
    }

    //非DOM元素
    if(!utils.isDOMElement(node)){
      return ;
    }

    var inx = -1;
    for(var i = 0,len= own.nodes.length ; i < len ; i ++){
      var _node = own.nodes[k];
      if(node == _node){
        inx = i;
        break;
      }
    }

    if(inx > -1){
      node.remove();
      own.nodes.splice(inx,1);
    }
  },
  /**
   * 追加子组件
   * @param child
   * @param options
   * @returns {Component}
   */
  appendChild: function (child,options) {
    var own = this;
    var comp;
    if('string' == typeof child){
      var Clazz = components[child];
      if(!components[child]){
        throw new TypeError('Can\'t Find The Component:'+ child);
      }
      if (!options) {
        options = {};
      }
      comp = Clazz.create(options);
    }else if(isComponentClazz(child)){
      comp = child.create(options);
    }else if(isComponent(child) && !child.isAppend()){
      comp = child;
    }
    if(comp){
      own.nodes.after(comp.fragment);//追加结构
      own.nodes = own.nodes.concat(comp.nodes);
    }
    return own;
  },
  /**
   *
   */
  trigger:function(type,args,fall){
    var own = this;
    //下落到自身阶段 不再触发
    if(type && type.fall &&  own == type.target){
      return ;
    }
    //触发
    var event = this._trigger(type,args);//type, args, context

    //向下
    if(!!fall){
      event.fall = true;
      own.each(function (inx, child) {
        child.trigger(event,args,true);
      });
    }else{
      //冒泡 向上触发
      if(!event.cancelBubble && own.parent){
        own.parent.trigger(event,args);
      }
    }
  }
});

var _extend = Component.extend;
Component.extend = function(prop){
  if(!prop.name || 'string' != typeof prop.name){
    throw new TypeError('The Component need "name" property');
  }
  if(components[prop.name]){
    log.warn('The Component:' + prop.name + 'will be replaced');
  }
  var Clazz = _extend.call(this,prop);
  Clazz.extend = arguments.callee;
  components[prop.name] = Clazz;
  return Clazz;
};
/**
 * 为Component添加bind、unbind、one、trigger方法 /add bind、unbind、one、trigger method for Component
 */
//var api = require("./api/player-api.js");
Component.expand(function () {
  var extend = {};
  //events = new EventManager();

  //bind unbind one等事件绑定方法
  vQ.each(['bind','unbind','one'], function (inx, fun) {
    extend[fun] = function (type) {
      var own = this;
      var events = own._events;
      var args = slice.call(arguments,1);
      //处理数组
      if (vQ.isArray(type)) {
        vQ.each(type, function (inx, _fun) {
          extend[fun].apply(own,[_fun].concat(args));
        });
      } else if ('string' == typeof type) {
        //以on开头
        type = type.toLowerCase();//转小写
        if(type.indexOf('on') == 0){
          type = type.substring(2);
        }
        events[fun].apply(events, [type].concat(args));
      }
      return own;
    };
  });

  extend['_trigger'] = function (type) {
    var events = this._events;
    var args = slice.call(arguments,1);
    if ('string' == typeof type) {
      //以on开头
      type = type.toLowerCase();//转小写
      if(type.indexOf('on') == 0){
        type = type.substring(2);
      }
    }
    return events['trigger'].apply(events, [type].concat(args));
  };

  return extend;
}());

module.exports = Component;
