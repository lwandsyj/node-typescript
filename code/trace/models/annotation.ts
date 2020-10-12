/**
 * 标注
 */
class Annotation {
    constructor(public timespan: number, public value: string) {
        // 时间戳，单位微秒
        this.timespan = timespan;
        // 值 cr cs ss sr
        this.value = value;
    }
}

export default Annotation