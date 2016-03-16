/**
 * 获取运行环境(浏览器)支持度
 * Copyright 2015-2016, browser.js
 * MIT Licensed
 * @since 2015/9/24.
 * @modify 2016/2/22.
 * @author zhengzk
 **/
/**
 * 检查是否支持flash
 * @returns {{f: number, v: number, e: number}}
 */
function flashChecker() {
  var hasFlash = 0; //是否安装了flash
  var flashVersion = 0;   //flash版本
  var exception = 0;
  try {
    var ActiveXObject = ActiveXObject || function () {
        return undefined;
      };
    if (document.all) {
      var swf1 = new ActiveXObject('ShockwaveFlash.ShockwaveFlash');
      if (swf1) {
        hasFlash = 1;
        var VSwf = swf1.GetVariable('$version');
        flashVersion = parseInt(VSwf.split(' ')[1].split(',')[0]);
      }
    } else if (navigator.plugins && navigator.plugins.length > 0) {
      var swf2 = navigator.plugins['Shockwave Flash'];
      if (swf2) {
        hasFlash = 1;
        var words = swf2.description.split(' ');
        for (var i = 0; i < words.length; ++i) {
          if (isNaN(parseInt(words[i]))) continue;
          flashVersion = parseInt(words[i]);
        }
      }
    }
  } catch (e) {
    hasFlash = 1;
    exception = 1;
  }
  return {f: hasFlash, v: flashVersion, e: exception};
}

var retObj = {};
var video = document.createElement('video');
var videoType = {
  MP4: 'video/mp4',
  OGG: 'video/ogg',
  WEBM: 'video/webm'
};
var osType = {
  isWin: 'Win',
  isMac: 'Mac',
  isSafari: 'Safari',
  isChrome: 'Chrome',
  isFirefox: 'Firefox',
  isIPAD: 'iPad',
  isIPAD7: 'iPad; CPU OS 7',
  isIPHONE: 'iPhone',
  isIPOD: 'iPod',
  isLEPAD: 'lepad_hls',
  isMIUI: 'MI-ONE',
  isAndroid: 'Android',
  isAndroid4: 'Android 4.',
  isAndroid41: 'Android 4.1',
  isSonyDTV: 'SonyDTV',
  isBlackBerry: 'BlackBerry',
  isMQQBrowser: 'MQQBrowser',
  isMobile: 'Mobile',
  isSamSung: 'SAMSUNG',
  isHTC: 'HTC',
  isLumia: 'Lumia',
  isVIVO: 'vivo',
  isWeixin: 'MicroMessenger'
};
retObj.supportHTML5Video = false;
retObj.isIOS = false;
retObj.os = '';
if (video.canPlayType) {
  retObj.supportHTML5Video = true;
  for (var type in videoType) {
    if (video.canPlayType(videoType[type])) {
      retObj['canPlay' + type] = true;
    } else {
      retObj['canPlay' + type] = false;
    }
  }
}
var ua = navigator.userAgent;
for (var os in osType) {
  if (ua.indexOf(osType[os]) !== -1) {
    retObj[os] = true;
    retObj.os += osType[os] + ' ';
  } else {
    retObj[os] = false;
  }
  if (ua.indexOf('Android') !== -1) {
    var ind = ua.indexOf('Android');
    var andr = ua.substr(ind, 10);
    if (andr > osType.isAndroid4) {
      retObj.isAndroid4 = true;
      retObj.os += andr + ' ';
    }
  }
}

//IOS设备
retObj.isMobileIOS = (retObj.isIPAD || retObj.isIPHONE || retObj.isIPOD);
retObj.isIOS = (retObj.isMobileIOS || retObj.isMac);
// 下面三个值比较重要
retObj.isSupportH5M3U8 = (retObj.isMobileIOS || (retObj.isMac && retObj.isSafari && !retObj.isChrome) || retObj.isLEPAD || retObj.isSonyDTV);
retObj.isSupportH5MP4 = (retObj.isChrome || retObj.isIE10 || retObj.isAndroid41 || retObj.isAndroid4 || retObj.isLumia /*|| retObj.isMIUI*/ ) && retObj.canPlayMP4;
var fls = flashChecker();
// retObj.isSupportFlash  = (!retObj.isMobileIOS)||retObj.isChrome ||  fls.f ;
retObj.isSupportFlash = fls.f && !fls.e;
if (retObj.isMQQBrowser || retObj.isLumia) {
  //    retObj.isSupportH5MP4 = false;
  retObj.isSupportFlash = false;
}
//phone 和 pad 的类型判断
retObj.isPhone = (retObj.isIPHONE || retObj.isIPOD || (retObj.isAndroid && retObj.isMobile));
retObj.isAndroidPad = (retObj.isAndroid && !retObj.isMobile);
retObj.isPad = (retObj.isIPAD || retObj.isAndroidPad);
//添加一个是否是移动设备的判断
//在多片mp4模式下，移动设备上是不能自动切片的，切片时需要给出提示，让用户点击播放按钮
retObj.isMobile = (retObj.isIPAD || retObj.isIPHONE || retObj.isIPOD || retObj.isLEPAD ||
retObj.isMIUI || retObj.isAndroid4 || retObj.isSonyDTV || retObj.isLumia);
//return retObj;

retObj.supportsFullscreen = false;
if (typeof video.webkitEnterFullscreen == 'function') {
  // Seems to be broken in Chromium/Chrome && Safari in Leopard
  if (/Android/.test(ua) || !/Chrome|Mac OS X 10.5/.test(ua)) {
    retObj.supportsFullscreen = true;
  }
}

//exports retObj;
module.exports = retObj;
