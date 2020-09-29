declare const b: Number;
declare const c: (a: String) => void;
declare const d: any;
interface message {
    [propName: string]: any;
}
interface func {
    sayhello: (x: string, y: string) => void;
    sayTest(x: string, y: string): void;
}
declare let x: func;
declare class Message {
    say: string;
    constructor(say: string);
    setName(name: string): string;
}
declare const msg: Message;
declare class Message2 {
    say: string;
    constructor();
}
declare type middleware = (x: number) => void;
declare function test(x: string): string;
declare const obj: {
    name: string;
    say(): void;
};
declare function test2(name: number): void;
//# sourceMappingURL=hello.d.ts.map