/**
 * The Select Component
 * Copyright 2016, select.js
 * MIT Licensed
 * @since 2016/3/17.
 * @modify 2016/3/17.
 * @author zhengzk
 **/
var Component = require('js/component.js');
var Select = Component.extend({
  name:'Select',
  /**
   * overwrite implements
   * 处理Dom元素事件/process Dom element events
   * @param attr
   * @param player
   * @private
   */
  //panel:vQ(),
  //button:vQ(),
  //opts:vQ([]),
  _initEvent: function (attr,player) {
    var own = this;

    var _fun =  function(e){
      var ele = e.target || e.srcElement;
      if(!own.root.contains(ele)){
        hide();
      }
    };
    var  show = function(){
      vQ(document).bind('mousedown',_fun);
      own.panel.attr('aria-hidden','true');
      own.panel.show();
    };

    var hide = function(){
      vQ(document).unbind('mousedown',_fun);
      own.panel.attr('aria-hidden','false');
      own.panel.hide();
    };

    own.button.bind('click',function(){
      own.panel.isHidden()?show():hide();
    });

    var funName = 'on'+own.name+"Change";

    //绑定事件
    own.opts.each(function(inx,opt){
    //vQ.each(own.opts,function(inx,opt){
      opt = vQ(opt);
      opt.bind('click',function(){
        var key = opt.attr('key');
        if(key != own._key){
          var val = own.val(key);
          own.trigger(funName,val);
        }
        hide();
      });
    });
    own.bind(funName,function(event,val){
        own.val(val);
    });
    own._key = own.button.attr('key');
  },
  createOptions:function(){

  },
  /**
   * val
   * @param key
   * @returns {*}
   */
  val:function(key){
    var own = this;
    if(key && key != own._key){//非有效key时会有问题
      own.opts.each(function(inx,opt){
      //vQ.each(own.opts,function(inx,opt){
        opt = vQ(opt);
        var val = opt.attr('key');
        if(key == val){
          own.button.attr('key',val);
          own.button.find('span').text(opt.text());
          opt.attr('aria-selected','true');
          opt.addClass('vvp-selected');
          own._key = val;
        } else{
          opt.removeClass('vvp-selected');
          opt.attr('aria-selected','false');
        }
      });
    }
    return own._key;
  }
});

module.exports = Select;
