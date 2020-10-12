/**
 * span 模块
 */
import Endpoint from './endpoint'
import Annotation from './Annotation'
class Span {
    // traceId
    traceId: string = "";
    // span Id
    spanId: string = "";
    // span name (moduleName(filename)+className+methodName)
    name: string = "";
    // 父级spanId, 在一个span 调用另一个span 时
    parentId: string = "";
    // http,grpc
    methodProtocol: string = "";
    // 请求方式,get,post,delete,put,option 等
    methodType: string = "";
    // 本地服务endpoint
    localEndpoint: Endpoint | null = null;
    // 远程节点
    remoteEndpoint: Endpoint | null = null ;
    // tags
    tags:any ={}
    // 标注
    annotations:Array<Annotation>=[];
    // 时间戳
    timespan:number|null=null;
    // 
    duration:number|null=null;
}

export default Span