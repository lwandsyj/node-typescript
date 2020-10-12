/**
 * 服务器站点
 */
class Endpoint{
    constructor(public serviceName:string,public host:string,public port:number){
        // 应用程序名称
        this.serviceName=serviceName;
        // 服务器ip地址，方便查找本次请求走的那台服务器
        this.host=host;
        // 端口号
        this.port=port;
    }
}

export default Endpoint;