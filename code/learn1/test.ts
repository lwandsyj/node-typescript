function show(params:string) {
    console.log("f(): evaluated");
    return function (target:any, propertyKey: string, descriptor: PropertyDescriptor) {
        console.dir(target)
        console.log(propertyKey)
        console.log(descriptor)
        console.log("f(): called");
       
    }
}
function f(target:any,propertyKey: string,descriptor: PropertyDescriptor){
    console.log(target)
}
class Test{
   
    say(){
       console.log('Test.say')
    }
}

function learn(constructor:Function){
    console.log(constructor)
}

@learn
class Test2{
    constructor(){
        console.log('2222')
    }
    @show('s')
    say(){
        console.log('Test2.say')
    }
}
(new Test2()).say()