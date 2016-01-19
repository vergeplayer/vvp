/**
 * CoreObject
 * 基础类用于对象和类的构建 Object/Class
 * 参考了 Simple JavaScript Inheritance
 * MIT Licensed.
 * @class
 * @constructor
 * @author yuanliang
 * @since 2015/8/24.
 */

(function (exports) {

    /**
     * 这 initializing 变量意思很直接, 它是boolean来检查Class Function(稍后介绍)什么时候被调用.
     * 在创建实例时设置 initializing 为true/false 或者只是返回一个对象指向当前的原型链上来达到"继承"的目的.
     * 如果我们创建一个实例(initializing == false), 正好Class有一个init方法, 这样 init 会自动执行。
     * 再或者, 如果我们仅仅将它分配给原型上(initializing == true), 将不会发生什么, init 方法不会被执行。
     * 这样做是为了避免 每次调用构造方法都要执行 init 方法. （var prototype = new this()）;.
     */
    var initializing = false;

    /**
     * 这个fnTest的目的就是为了验证 class method 中是否使用了 "_super()" 调用.
     * 这种技术叫做 " function decompilation(函数反编译)" 也叫做 "function serialisation(函数序列化)"，
     * Function serialisation 是在一个函数被转换成字符串时发生的. 现在很多浏览器都支持 toString 方法。
     * 测试 Function serialisation, fnTest 使用一个匿名函数 funciton(){xyz;} 设置内容为 "xyz", 在转变成字符串后使用正则对 "xyz" 进行查找.
     * 它将返回true (如果浏览器支持 function serialisation) 因为 函数将转变成字符串所以 "xyz" 也民属于字符串的一部分. 在这个例子中 fnTest 将返回 "/\b_super\b/"，
     * 另一种则返回 "/ .* /" 如果浏览器不支持 function serialisation 则始终返回 true。(这个指的是原始代码中的fnTest.test)使用 fnTest 正则, 和 函数序列化技术,
     * 我们能很容易方法中是否使用了 "_super" 如果它们使用, 则执行一些特殊方法. 反之正常.  这个特殊方法是为了避免在 父类与子类中同时出现同一个方法. 父类将会被覆盖.
     * 浏览器不支持 Function serialisation 将会始终返回 true, 那么会始终对 _super 进行额外的操作,
     * 导致这些新的方法不能在 _super 中使用. 这会有一些小的性能消耗. 但能保证在所有浏览器中 正常执行.
     */
    var fnTest = /'xyz'/.test(function () {
        'xyz';
    }) ? /\b_super\b/ : /.*/;

    /**
     * 创建一个空的构造方法, 放到全局变量中. 这将会是最上层的构造方法. 它没有定义内容, 或一个原型对象.
     * 除了下面的 extends 方法. this 指的是window对象. 使 vvp(Class) 变量为全局对象.
     */
    var CoreObject = function () {
    };

    /**
     * CoreObject.extend
     * 创建新对象 继承和扩展对象
     *
     *     var Animal = CoreObject.extend();
     *     var Dog = Animal.extend();
     *
     * @param {Object} 选择一个对象作为参数
     * @return {vvp.CoreObject} 返回一个继承自CoreObject的对象
     * @this {*}
     */

    CoreObject.extend = function (prop) {

        /**
         * 将当前对象的原型对象存储在 _super中. this.prototype是被扩展对象的原型, 它可以访问父级方法在你需要的地方,
         * 这个变量叫什么 _super , 是因为 super 是保留字. 尽管现在还没有应用起来.
         */
        var _super = this.prototype;

        /**
         *  实例 class 对象存储在 prototype 变量中, 但不执行 init 方法.
         * 之前设置 initializing 为 true 所以在 new Class的时候 不会 fire init 方法.
         * prototype变量分配后, initializing 被设置回 false, 为了下一步可以正常工作. (e.g 当想要创建一个真正的实例的时候)
         */
        initializing = true;
        var prototype = new this();
        initializing = false;

        function factory(name, fn) {
            return function () {
                /**
                 * 对 super 的特殊处理, 我们首先要存储 已存在 _super 属性和类的一些参数. 存储在 临时 tmp 里,
                 * 这是为了防止 _super 中已存在的方法被重写完事儿后我们将 tmp 在赋给 this._super 这样它就可以正常工作了.
                 * 下一步, 我们将 _super[name] 方法赋给 当前对象的 this._super，
                 * 这样当 fn 通过 apply 被执行的时候 this._super()就会指向 父类方法, 这个父类方法中的 this 也同样可以访问 当前对象.
                 * 最后我们将返回值存储在 ret 中， 在将 _super 设置回来后返回该对象.
                 */
                var tmp = this._super;

                // Add a new ._super() method that is the same method
                // but on the super-class
                this._super = _super[name];

                // The method only need to be bound temporarily, so we
                // remove it when we're done executing
                var ret = fn.apply(this, arguments);
                this._super = tmp;
                return ret;
            };
        }

        // Copy the properties over onto the new prototype
        /**
         * 使用一个 for 循环, 我们迭代出 prop 里的属性和方法.
         * 该属性是通过 extend 方法传递进来的, 除了一些对 _super 的特殊处理, 我们将值赋给 prototype 属性.
         * 当我们遍历 prop 里的每个对象时,
         * 如果 满足 (typeof prop[name] == 'function')  (typeof _super[name] == 'function') (fnTest.test(prop[name]) == true)
         * 我们将会加入新的方法来处理 绑定到 父类 新的方法 以及 原始方法.
         */
        for (var name in prop) {
            // Check if we're overwriting an existing function
            prototype[name] = typeof prop[name] == 'function' &&
            typeof _super[name] == 'function' && fnTest.test(prop[name]) ?
                factory(name, prop[name]) :
                //(function (name, fn) {
                //    return function () {
                //        /**
                //         * 对 super 的特殊处理, 我们首先要存储 已存在 _super 属性和类的一些参数. 存储在 临时 tmp 里,
                //         * 这是为了防止 _super 中已存在的方法被重写完事儿后我们将 tmp 在赋给 this._super 这样它就可以正常工作了.
                //         * 下一步, 我们将 _super[name] 方法赋给 当前对象的 this._super，
                //         * 这样当 fn 通过 apply 被执行的时候 this._super()就会指向 父类方法, 这个父类方法中的 this 也同样可以访问 当前对象.
                //         * 最后我们将返回值存储在 ret 中， 在将 _super 设置回来后返回该对象.
                //         */
                //        var tmp = this._super;
                //
                //        // Add a new ._super() method that is the same method
                //        // but on the super-class
                //        this._super = _super[name];
                //
                //        // The method only need to be bound temporarily, so we
                //        // remove it when we're done executing
                //        var ret = fn.apply(this, arguments);
                //        this._super = tmp;
                //        return ret;
                //    };
                //})(name, prop[name]) :
                prop[name];
        }

        /**
         * 这段代码调用 Class 创建一个新的构造方法, 这不同于之前创建的 this.Class，
         * 作为本地的 Class.extend. 这个构造方法返回 Class.extend 的调用(比如之前 Foo.extends).
         * new Foo() 实例后这个构造方法将被执行.构造方法将会自动执行 init() 方法(如果存在的话) 正好上面说的那样,
         * 这个 initializing 变量来控制 init 是否被执行.
         */
        // The dummy class constructor
        function Class() {
            // All construction is actually done in the init method
            if (!initializing && this.init)
                this.init.apply(this, arguments);
        }

        /**
         * 最后这个 prototype,  从父类的构造方法返回一个混合后的 父类原型对象.
         * (e.g var prototype = new this()), 这个结果是通过 extend 函数里的for循环.
         */
            // Populate our constructed prototype object
        Class.prototype = prototype;

        /**
         * 因为我们重写了整个原型对象, 在这个类型中存储这个 原生的构造方法,  让它在一个实例的构造方法中能保持默认形为.
         */
            // Enforce the constructor to be what we expect
        Class.prototype.constructor = Class;

        /**
         * 将赋其自身, 通过  arguments.callee, 在本例中表示 “自身” 其实这里我们可以 避免使用 arguments.callee ,
         * 如果我们修改一下我的原生方法(e.g Class.extend = function extend(prop)) 之后我们就可以通过 使用
         */
            // And make this class extendable
        Class.extend = arguments.callee;

        //确保子类也能使用create方法
        Class.create = CoreObject.create;

        //确保子类也能使用expand方法
        Class.expand = CoreObject.expand;

        /**
         * 实例之后会返回, 一个原型对象, 一个构造属性, 一个 extend 方法 和一个可自执行的 方法 init.!!!
         */
        return Class;
    };

    /**
     * CoreObject.create
     * 创建一个vvp class的对象实例
     *
     *     var myAnimal = Animal.create();
     *
     * @return {vvp.CoreObject} 返回一个继承自CoreObject的子类
     * @this {*}
     */
    CoreObject.create = function () {
        // 创建一个继承自该对象原型的新对象
        var inst = ObjectCreate(this.prototype);

        // 将此构造函数用语新对象
        this.apply(inst, arguments);

        // 返回一个新对象
        return inst;
    };
    /***
     * 对CoreObject进行拓展
     * @param object
     */
    CoreObject.expand = function (object) {
        vQ.extend.apply(this.prototype, arguments);
    };

    exports.CoreObject = CoreObject;
})(vvp);
