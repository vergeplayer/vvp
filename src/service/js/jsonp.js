/**
 * jsonp方式发送数据
 * Copyright 2015, jsonp.js
 * MIT Licensed
 * @since 2015/9/2.
 * @modify 2015/9/20.
 * @author zhengzk
 **/

//JSONP 请求回掉事件绑定的对象 需绑定在window可取到的对象上
var CallBackEventTarget = window['@NAME'].callbacks = window['@NAME'].callbacks || {};//CallBackEventTarget
var CallBackEventNamePrefix = '@NAME' + '.callbacks.';//Callback名称前缀

(function (exports) {
    /**
     * 获取数据后销毁动态生成的script
     * @param script
     * @param name
     * @param fail
     */
    function removeScript(script, name) {
        if (script.timer) {
            clearTimeout(script.timer);
        }
        if (script.clearAttributes) {
            script.clearAttributes();
        } else {
            script.onload = script.onreadystatechange = script.onerror = null;
        }
        delete CallBackEventTarget[name];
        script.parentNode.removeChild(script);
    }

    /**
     * 发送jsonp请求
     * @param options Object
     * @constructor
     */
    var JSONP = function (options) {

        options = options || {};//设定默认值
        if (!options.url) { //校验url参数
            throw new TypeError('Param Error');
        }
        var callback = options.callback || 'callback';//callback name
        var data = options.data || {};
        var time = parseInt(options.time) || 10000; //超时时长
        var name = 'cb_' + getRandomString(6);//回掉函数名称
        data[callback] = CallBackEventNamePrefix + name;
        var params = urlParameter(data);

        var url = options.url;
        if (url.indexOf('?') === -1) {
            url += '?' + params;
        } else {
            url += '&' + params;
        }
        var script = document.createElement('script');
        //定义被脚本执行的回调函数
        CallBackEventTarget[name] = function (resJson) {//
            try {
                if(script.jsonp != 'timeout'){//超时后不处理
                    script.jsonp = 'success';
                    options.success && options.success(resJson);
                }
            } catch (e) {
                //
                log('-- JSONP --');
                log(e);
            }
        };

        //超时处理
        if (time) {
            script.timer = setTimeout(function () {
                script.jsonp = 'timeout';
                //removeScript(script, name);
                options.fail && options.fail({ message: 'timeout' });
            }, time);
        }

        //IE9 左右版本两个事件都支持 但removeScript中删除了script 所以只会触发一个 一般情况不建议这样写
        script.onreadystatechange = script.onload = function(){
            if(!this.readyState || this.readyState == 'loaded' || this.readyState == 'complete'){
                if(script.jsonp !== 'timeout' && script.jsonp != 'success'){//超时不执行callback
                    options.fail && options.fail({ message: 'fail' });
                }
                removeScript(script, name);//移除脚本
            }
        };

        //E6~8与opera11 不支持
        script.onerror = function () {
            script.jsonp = 'error';
            removeScript(script, name);
            options.fail && options.fail({ message: 'error' });
        };

        script.src = url;
        document.getElementsByTagName('head')[0].appendChild(script);
    };

    //添加到vvp对象上去
    exports.jsonp = JSONP;
}(vvp));