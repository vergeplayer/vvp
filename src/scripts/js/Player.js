/**
 * 带基础view的播放器
 * Copyright 2015-2016, player.js
 * MIT Licensed
 * @class
 * @since 2015/9/24.
 * @modify 2016/4/5.
 * @author zhengzk
 *
 *
 *    **************************************
 *    *            Player                  *
 *    *    ****************************    *
 *    *    *       VideoPlayer        *    *
 *    *    *    ******************    *    *
 *    *    *    *   html5 video  *    *    *
 *    *    *    ******************    *    *
 *    *    *                          *    *
 *    *    ****************************    *
 *    *                                    *
 *    **************************************
 *
 **/
var log = verge.log,
    browser = verge.browser,
    fsApi = verge.fullscreenApi(document);
    VideoPlayer = verge.VideoPlayer,
    slice = [].slice;

var Component = require('./component.js');
//var utils = require('./utils.js');
var viewFun = require('jade2js?-component&jade!jade/verge/verge.jade');


var Player = VideoPlayer.extend({
//var Player = Component.extend(VideoPlayer,{
  name: "vvp.Player",
  /**
   * Constructor
   * @param element
   * @param options
   */
  init: function (element, options) {
    if (!utils.isDOMElement(element)) {
      throw new Error('The Param element Type Error');
      return;
    }
    //初始化参数
    options = vQ.merge({
      autoplay: false, /*将会传递至video*/
      loop: false, /*将会传递至video*/
      preload: false, /*将会传递至video*/
      //src:'',/*将会传递至video*/ 给src赋值'' # 之类的 src指向页面URL 不支持的格式 导致触发onError
      controls: true,//是否展现controls
      poster: '',
      view: {}
      //type: 'live'//直播播放器(默认) //后续添加点播和切换
    }, options);

    var own = this;

    //创建必要节点
    own.childs = [];
    own._createView(element, options.view);
    if (!own.video || !own.root) {
      //模板中未指定video
      throw new Error("Need Video and Root Target Node");
    }
    own._super(own.video,options);
    own.bind('onFullscreenChange', function (event,flag) {
      if (flag) {
        own.root.addClass('vvp-fullscreen');
      } else {
        own.root.removeClass('vvp-fullscreen');
      }
    });
    own.controls(true);
  },
  removeNode: Component.prototype.removeNode,
  appendChild: Component.prototype.appendChild,
  removeChild: Component.prototype.appendChild,
  isAppend: Component.prototype.isAppend,
  contains: Component.prototype.contains,
  map: Component.prototype.map,
  find: Component.prototype.find,
  each: Component.prototype.each,
  trigger: function (type, args) {
    var own = this;
    var event;
    if('string' == typeof type){
      type = type.toLowerCase();//转小写
      if (type.indexOf('on') == 0) {
        type = type.substring(2);
      }
      event = own._super(type, args);
      event.init(type,this);
    }else if(type && type.type){
      event = type;
      own._super(event.type, args);
      event.currentTarget = own;
    } else {
      throw new TypeError('The \'type\' must be String or Event');
    }

    own.each(function (inx, child) {
      child.trigger(event, args, true);
    });
    return own;
  },
  /**
   * controls
   * @param flag
   */
  controls: function (flag) {
    this.trigger('onControlsChange', [flag]);
  },
  /**
   * 构建View
   * @private
   */
  _createView: function (element, attr) {
    viewFun.apply(this, [attr || {}, this]);//slice.call(arguments));
    this.nodes = vQ(this.fragment.childNodes);
    vQ(element).append(this.fragment);
    this.video = this.root.find('video')[0];
  },
  /**
   * 进入全屏状态 重写
   * @returns {Player}
   */
  requestFullscreen: function () {
    var own = this;
    this.isFullscreen = true;

    if (fsApi['requestFullscreen']) {
      // the browser supports going fullscreen at the element level so we can
      // take the controls fullscreen as well as the video

      // Trigger fullscreenchange event after change
      // We have to specifically add this each time, and remove
      // when canceling fullscreen. Otherwise if there's multiple
      // players on a page, they would all be reacting to the same fullscreen
      // events
      vQ.bind(document, fsApi['fullscreenchange'], function documentFullscreenChange() {
        own.isFullscreen = !!document[fsApi.fullscreenElement];
        // If cancelling fullscreen, remove event listener.
        if (own.isFullscreen === false) {
          vQ.unbind(document, fsApi['fullscreenchange'], documentFullscreenChange);
        }

        own.trigger('onFullscreenChange', [own.isFullscreen]);
      });

      own.root[0][fsApi.requestFullscreen]();

    } else {
      this._super();
    }
    return this;
  },
  /**
   * 退出全屏
   * @overrides methods
   * @returns {Player}
   */
  exitFullscreen: function () {
    var own = this;
    own.isFullscreen = false;

    // Check for browser element fullscreen support
    if (fsApi['exitFullscreen']) {
      document[fsApi.exitFullscreen]();
    } else {
      this._super();
    }
    return this;
  }
  //_createPrompt:function(){
  //    this.bind('onError',function(){
  //        root.show();
  //        text.text('播放出错,请稍后再试');
  //        own.one(['onPlay','onPlaying'], function () {
  //            root.hide();
  //        });
  //    });
  //
  //    root.append(text);
  //    this.root.append(root);
  //}
});

module.exports = Player;
