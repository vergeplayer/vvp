/**
 * 获取DOM元素css方式相关操作
 * Copyright 2015, css.js
 * MIT Licensed
 * @since 2015/9/24.
 * @modify 2015/9/28.
 * @author zhengzk
 **/

//css width height
(function() {
    /**
     * 获取当前生效的样式
     * @param ele
     * @param attribute
     * @returns {*}
     */
    function currentStyle(ele,attribute){ // 返回最终样式函数，兼容IE，设置参数：元素对象、样式特性
        return ele.currentStyle
            ?ele.currentStyle[attribute]
            :document.defaultView.getComputedStyle(ele,false)[attribute];
    }

    /**
     * 是否处于隐藏状态
     * @param ele
     * @returns {boolean}
     */
    function isHidden(ele){
        return currentStyle(ele,'display') === 'none' || !vQ.contains(ele.ownerDocument,ele);
    }

    /**
     * 显示或隐藏某元素
     * @param ele
     * @param show
     */
    function showHide(ele,show){
        var display = currentStyle(ele,'display');
        if ( show ) {
            if ( display === 'none' ) {
                // Restore a pre-hide() value if we have one
                ele.style.display = ele.prevDisplay || 'block';
            }
        } else {
            if ( display !== 'none' ) {
                // Remember the value we're replacing
                if(ele.style.display){
                    ele.prevDisplay = ele.style.display;
                }
                ele.style.display = 'none';
            }
        }
    }

    /**
     * 设置样式
     * @param el
     * @param strCss
     */
    function setStyle(el, strCss){
        function endsWith(str, suffix) {
            var l = str.length - suffix.length;
            return l >= 0 && str.indexOf(suffix, l) == l;
        }
        var sty = el.style,
            cssText = sty.cssText;
        if(!endsWith(cssText, ';')){
            cssText += ';';
        }
        sty.cssText = cssText + strCss;
    }

vQ.extend( {
    /**
     * 显示
     * @param ele
     */
    show: function(ele) {
        showHide( ele, true );
    },
    /**
     * 隐藏
     * @param ele
     */
    hide: function(ele) {
        showHide( ele );
    },
    /**
     * 显示->隐藏 互转
     * @param state
     * @returns {*}
     */
    toggle: function( ele,state ) {
        if ( typeof state === 'boolean' ) {
            return state ? this.show() : this.hide();
        }

        if ( isHidden( ele ) ) {
            showHide( ele, true );
        } else {
            showHide( ele );
        }
        return this;
    }
});

vQ.fn.extend( {
    /**
     * 设置or获取css属性
     * @param arg
     * @param val
     * @returns {*}
     */
    css:function(arg,val){
        if(arguments.length == 1){
            if(typeof arg == 'string'){
                return currentStyle(this[0],arg);
            }else if(vQ.isPlainObject(arg)){
                var cssStr = '';
                vQ.each(arg,function(key,val){
                    cssStr += key + ':' + val + ';';
                });
                setStyle(this[0],cssStr);
            }
        }else if(arguments.length == 2){
            setStyle(this[0],arg + ':' + val + ';');
        }
        return this;
    },
    /**
     * 显示
     */
    show: function() {
        this.each( function() {
            showHide( this, true );
        });
    },
    /**
     * 隐藏
     */
    hide: function() {
        this.each( function() {
            showHide( this );
        } );
    },
    /**
     * 是否处于隐藏状态
     * @returns {boolean}
     */
    isHidden:function(){
        return isHidden( this[0] );
    },
    /**
     * 显示隐藏互转
     * @param state
     * @returns {*}
     */
    toggle: function( state ) {

        if ( typeof state === 'boolean' ) {
            return state ? this.show() : this.hide();
        }
        this.each( function() {
            if ( isHidden( this ) ) {
                showHide( this, true );
            } else {
                showHide( this );
            }
        } );
        return this;
    }
});
 }());