
/**
 * 这是注释文件
 */
const b: Number = null;
console.log(b)

const c: (a: String) => void = (a: String) => void (0);
const d: any = {}

interface message {
    [propName: string]: any;
}

interface func {
    sayhello: (x: string, y: string) => void,
    sayTest(x: string, y: string): void
}

let x: func = {
    sayTest: (x: string, y: string): void => {
        console.log('x.sayTest')
    },
    sayhello(x: string, y: string) {
        console.log('x.sayhello')
    }
}

x.sayTest('1', '2');
x.sayhello('2', '3');

class Message {
    constructor(public say: string) {
        this.say = "123"
    }
    public setName(name: string): string {
        return name;
    }
}

const msg = new Message('')
console.log(msg.setName('name'))

class Message2 {
    say: string;
    constructor() {
        this.say = "44";
    }
}

type middleware = (x: number) => void;

function test(x: string) {
    return x;
}

const obj = {
    name: '123',
    say() {
        console.log(this.name)
    }
}

obj.say()

function test2(name: number) {
    switch (name) {
        case 3:
        case 2:
            break;
    }
}
test2(3)