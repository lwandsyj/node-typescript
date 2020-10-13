1. JavaScript里，this的值在函数被调用的时候才会指定. this 指向当前函数所在的对象。默认为window, strict 严格模式为undefined

2. 改变this 指向，使用apply ,call,bind

+ apply : 所有函数自带的功能，参数使用数组或类数组的形式传递

        hello.apply(window,[1,2,3,4,5])

+ call: 参数一个一个的传入

        hello.call(window,1,2,3,4,5)

**注意**

call 和 apply 的唯一区别就是参数传入的方式不同

+ bind: 绑定this 对象，但是函数并不执行，返回一个函数，this 执行绑定的this 对象，参数用一个一个的传入

        const boundFunction = hello.bind(window);

        boundFunction(1,2,3)

        或者

        const boundFunction = hello.bind(window,x,y)
        boundFunction();

使用原生实现bind 方法

        Function.prototype.bind = function (thisObj){
            var args = Array.prototype.slice.call(arguments,1);
            var fn = this;
            return function(){
                var args1 = args.concat(Array.prototype.slice.call(arguments));
                return fn.apply(thisObj,args1)
            }
        }

**注意**

bind 不会执行原方法，只是生成一个函数