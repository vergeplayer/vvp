/**
 * 工具方法
 * Copyright 2015-2016, utils.js
 * MIT Licensed
 * @since 2015/9/8.
 * @modify 2016/2/29.
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
        file.contents = new Buffer(content);
        //this.push(file);
        cb(null, file);
    });
}

/**
 * 转换数据
 * @param data
 * @param options
 * @returns {string}
 */
function parseData(data,options) {
    options = options || {};
    var name = options.name || pkg.name;
    var version = options.version || pkg.version;
    var path = options.path || (name + "/" + version);
    var data = data
            .replace(/@VERSION/g,version)
            .replace(/@NAME/g,name)
            .replace(/@PATH/g,path);
    return data;
}

/**
 * 添加注释信息
 * @param data
 * @param options
 * @returns {string}
 */
function addNote(data,options) {
    options = options || {};
    var timeStr = ( new Date() ).toISOString().replace( /:\d+\.\d+Z$/, "Z" );
    var name = options.name || pkg.name;
    var version = options.version || pkg.version;
    //var global = options.global || 'window';

    return '/*!' + name + ' <' + version + '@' + timeStr + '> */\n' + data ;
        //+ '(function(exports,undefined){\n'
        //+ data
        //+ '}('+ global +'));';
}

/**
 * merge
 * @param first
 * @param second
 * @returns {*}
 */
function merge(first, second) {
    if (!second) {
        return first;
    }
    for (var key in second) {
        if (hasOwnProp.call(second, key)) {
            first[key] = second[key];
        }
    }
    return first;
}

//exports
exports.parseData = function(options){
    return modify(function(str){
        return parseData(str,options);
    });
};

exports.addNote = function(options){
    return modify(function(str){
        return addNote(str,options);
    });
};

exports.modify = modify;
exports.merge = merge;


