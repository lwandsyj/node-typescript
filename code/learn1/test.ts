function show() {
    console.log("f(): evaluated");
    return function (target:any, propertyKey: string, descriptor: PropertyDescriptor) {
        console.dir(JSON.stringify(target))
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
        console.log(arguments.callee)
        console.log(Object.prototype.toString.call(this))
    }
}

var a= new Test();
a.say()
