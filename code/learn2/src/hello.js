"use strict";
var b = 2;
console.log(b);
var c = function (a) { return void (0); };
var d = {};
var x = {
    sayTest: function (x, y) {
        console.log('x.sayTest');
    },
    sayhello: function (x, y) {
        console.log('x.sayhello');
    }
};
x.sayTest('1', '2');
x.sayhello('2', '3');
var Message = /** @class */ (function () {
    function Message(say) {
        this.say = say;
        this.say = "123";
    }
    Message.prototype.setName = function (name) {
        return name;
    };
    return Message;
}());
var msg = new Message('');
console.log(msg.setName('name'));
var Message2 = /** @class */ (function () {
    function Message2() {
        this.say = "44";
    }
    return Message2;
}());
function test(x) {
    return x;
}
var obj = {
    name: '123',
    say: function () {
        console.log(this.name);
    }
};
obj.say();
function test2(name) {
    switch (name) {
        case 3:
        case 2:
            break;
    }
}
test2(3);
//# sourceMappingURL=hello.js.map