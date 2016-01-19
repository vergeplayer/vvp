/**
 * Created by zhengzk on 2015/12/22.
 */
var slice = [].slice,
    hasOwnProp = Object.prototype.hasOwnProperty,
    /**
     * 创建一个object
     * @param obj
     * @returns {F}
     * @constructor
     */
    ObjectCreate = Object.create || function (obj) {
            //Create a new function called 'F' which is just an empty object.
            function F() {
            }

            //the prototype of the 'F' function should point to the
            //parameter of the anonymous function.
            F.prototype = obj;

            //create a new constructor function based off of the 'F' function.
            return new F();
        };