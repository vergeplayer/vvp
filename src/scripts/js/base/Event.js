/**
 * Event
 * Copyright 2015-2016, event.js
 * MIT Licensed.
 * @Clazz
 * @constructor
 * @since 2015/3/11.
 * @modify 2016/3/15.
 * @author zhengzk
 */
var CoreObject = require('./core-object.js');

var Event = CoreObject.extend({
  type:'',//事件类型 String
  target:null,//引发事件对象
  currentTarget:null,//当前对象
  cancelBubble:false,//冒泡
  fall:false,//向下广播
  result:null,
  //phase:Event.TARGET,
  //returnValue:true,
  init:function(type,target){
    if('string' == typeof type){
      this.type = type;
    }
    if(target){
      this.target = target;
      this.currentTarget = target;
    }
  },
  /**
   * 阻止事件派发
   */
  stopPropagation:function(){
    this.cancelBubble = true;
  }
});

//Event.TARGET = 0;//当前事件源
//Event.BUBBLING = 1;//冒泡阶段
//Event.FallING	= 2;//下落阶段

module.exports = Event;
