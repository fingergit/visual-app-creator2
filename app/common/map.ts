import {LogService} from "./log.service";
export class VacMap<V>{
    private keys:Array<number> = [];
    private data:Array<V> = [];

    fromJsonObj(obj:Object) {
        do {
            if (!obj || !obj.hasOwnProperty('keys') || !obj.hasOwnProperty('data')) {
                LogService.d("invalid map value: ");
                LogService.d(obj);
                break;
            }

            for (let key in obj){
                if (!obj.hasOwnProperty(key)){
                    continue;
                }
                let item = obj[key];
                if (this.hasOwnProperty(key)){
                    this[key] = item;
                }
            }
        }while(false);
    }


    //添加键值对
    set(key:string, value:V):Map<V> {
        if (this.keys[key] === undefined || this.keys[key] === null) {//如键不存在则身【键】数组添加键名
            this.keys[key] = this.data.length; // 标识
            this.data.push(value);
        }
        else{
            this.data[this.keys[key]] = value;//给键赋值
        }

        return this;
    };

    //去除键值，(去除键数据中的键名及对应的值)
    remove(key:string):Map<V> {
        let idx:number = this.keys[key];
        if (this.keys[key] === undefined || this.keys[key] === null){
            return;
        }

        this.data.splice(idx, 1);
        this.keys[key] = undefined;

        return this;
    };

    //获取键对应的值
    get(key:string):V{
        let idx:number = this.keys[key];
        if (this.keys[key] === undefined || this.keys[key] === null){
            return null;
        }

        return this.data[idx];
    };

    //判断键值元素是否为空
    isEmpty():boolean {
        return this.data.length == 0;
    };

    //获取键值元素大小
    size():number {
        return this.data.length;
    };

    values():Array<V>{
        return this.data;
    }
}
