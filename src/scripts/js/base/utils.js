/**
 * Created by zhengzk on 2015/12/22.
 */

/**
 * 字符字典
 * @type {Array}
 */
var StringDictionary = '1234567890abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ'.split('');
/**
 * 产生一个指定长度的随机字符串
 * @param length
 * @returns {string}
 */
function getRandomString(length) {//产生随机字符串 如函数名
    length = length || 3;
    var len = StringDictionary.length;
    var ret = '';
    while (length >= 0) {
        ret += StringDictionary[Math.floor(Math.random() * len)];
        length--;
    }
    return ret;
}

function urlParameter (object) {
    var arr = [];
    for (var o in object) {
        arr.push(o + '=' + object[o]);
    }
    return arr.join('&');
}