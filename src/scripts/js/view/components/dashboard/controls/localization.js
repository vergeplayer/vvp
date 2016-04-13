/**
 * 多语言组件 / the Localization Component
 * Copyright 2016, localization.js
 * MIT Licensed
 * @since 2016/3/17.
 * @modify 2016/3/17.
 * @author zhengzk
 **/
var viewFun = require('jade2js?-component!jade/components/dashboard/controls/localization.jade');
var slice = [].slice;
//var utils = require('js/utils.js');
var Select = require('js/view/base/select.js');


var Localization = Select.extend({
  name:"Localization",
  init:function(attr,player){
    this._super(attr,player);
  },
  /**
   * 创建View overwrite
   * @private
   */
  _createView:function(){
    viewFun.apply(this,slice.call(arguments));
    this.opts = this.panel.find('ul li button');
  },
  /**
   * 刷新数据
   * @param data
   * @param curr
   */
  reflushData:function(data,curr){

  }
});
module.exports = Localization;
