/**
 * ObjectCreate
 * Copyright 2015-2016, object-create.js
 * MIT Licensed
 * @since 2015/2/19.
 * @modify 2016/2/22.
 * @author zhengzk
 **/

/**
 * 创建一个object
 * @param obj
 * @returns {F}
 * @constructor
 */
var ObjectCreate = Object.create || function (obj) {
    //Create a new function called 'F' which is just an empty object.
    function F() {
    }

    //the prototype of the 'F' function should point to the
    //parameter of the anonymous function.
    F.prototype = obj;

    //create a new constructor function based off of the 'F' function.
    return new F();
  };

module.exports = ObjectCreate;
