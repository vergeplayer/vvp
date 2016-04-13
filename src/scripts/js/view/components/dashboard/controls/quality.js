/**
 * Created by zhengzk on 2016/3/17.
 */
/**
 * 清晰度组件 / the Quality Component
 * Copyright 2016, quality.js
 * MIT Licensed
 * @since 2016/3/17.
 * @modify 2016/3/17.
 * @author zhengzk
 **/
//var Quality = require('jade2js!jade/components/dashboard/controls/quality.jade');
var viewFun = require('jade2js?-component!jade/components/dashboard/controls/quality.jade');
var Select = require('js/view/base/select.js');
var slice = [].slice;
//var utils = require('js/utils.js');

var Quality = Select.extend({
  name:"Quality",
  /**
   * 创建View overwrite
   * @private
   */
  _createView:function(options,player){
    viewFun.apply(this,slice.call(arguments));
    this.opts = this.root.find('ul li button');
  },
  /**
   * 刷新数据
   * @param data
   * @param curr
   */
  reflushData:function(data,curr){

  }
});
module.exports = Quality;
