/**
 * gulp 自定义任务
 * Copyright 2015, player.js
 * MIT Licensed
 * @since 2015/9/8.
 * @modify 2015/9/8.
 * @author zhengzk
 **/
var hasOwnProp = Object.prototype.hasOwnProperty,
    pkg = require('../package.json'),
    through2 = require('through2');

/**
 * 将流转换为字符串进行处理
 * @param modifier function
 **/
function modify(modifier) {
    return through2.obj(function (file, encoding, cb) {
        var content = modifier(String(file.contents),file);
        //var content = modifier(String(file.contents));
        file.contents = new Buffer(content);
        //this.push(file);
        cb(null, file);
    });
}

/**
 * 转换数据
 **/
var paseData = function (data,options) {
    options = options || {};
    var name = options.name || pkg.name;
    var version = options.version || pkg.version;
    var path = options.path || (name + "/" + version)
    var data = data
            .replace(/@VERSION/g,version)
            .replace(/@NAME/g,name)
            .replace(/@PATH/g,path);
    return data;
}


/**
 * 添加版本信息等
 **/
var addNote = function (data,options) {
    options = options || {};
    //var timeStr = getCurrentTime();
    var timeStr = ( new Date() ).toISOString().replace( /:\d+\.\d+Z$/, "Z" );
    var name = options.name || pkg.name;
    var version = options.version || pkg.version;
    //var global = options.global || 'window';

    return '/*!' + name + ' <' + version + '@' + timeStr + '> */\n' + data ;
        //+ '(function(exports,undefined){\n'
        //+ data
        //+ '}('+ global +'));';
}

exports.paseData = function(options){
    return modify(function(str){
        return paseData(str,options);
    });
};

exports.addNote = function(options){
    return modify(function(str){
        return addNote(str,options);
    });
};

exports.modify = function(cb){
    return modify(cb);
};

exports.merge = function (first, second) {
    if (!second) {
        return first;
    }
    for (var key in second) {
        if (hasOwnProp.call(second, key)) {
            first[key] = second[key];
        }
    }
    return first;
};

function translate(data,name){
    return name + " = vvp.CoreObject.extend({\n"
        +"\t init:function(options){\n"
        +"\t\t this.options = options || {};\n"
        +"\t\t this._createView(this.options);\n"
        +"\t},\n"
        +"\t _createView:"
        + data
        + "});\n";
        //+ name.replace("view","component") + " = " + name + ";\n";
}


exports.translate = function(data,name){
    return translate(data,name);
};
