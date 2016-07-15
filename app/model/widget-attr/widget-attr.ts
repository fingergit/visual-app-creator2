import {VacMap} from "../../common/map";
import {LogService} from "../../common/log.service";
import {VacWidgetAttrValue} from "./widget-attr-type";
/**
 * Created by laj on 2016/7/4.
 */

export abstract class VacWidgetAttr{
    constructor(public name:string){}

    abstract newInstance();
    copyFrom(src:VacWidgetAttr){
        this.name = src.name;

        for (let key in src){
            if (!src.hasOwnProperty(key)){
                continue;
            }
            let item = src[key];
            if (item instanceof VacWidgetAttrValue){
                this[key] = item.clone();
            }
        }
    }

    clone(){
        let attr: VacWidgetAttr = this.newInstance();
        attr.copyFrom(this);
        return attr;
    }

    fromJsonObj(obj:Object, widgetType: string) {
        do{
            if (!obj || !obj.hasOwnProperty('name')){
                LogService.d("invalid project element: ");
                LogService.d(obj);
                break;
            }

            for (let key in obj){
                if (!this.hasOwnProperty(key)){
                    continue;
                }

                let item = obj[key];
                if (!this.fromJsonObjKey(key, item, obj)){
                    LogService.d("not processed key: " + key);
                }
            }

        }while(false);
    }

    protected fromJsonObjKey(key: string, value: any, obj: Object):boolean {
        let done:boolean = false;
        if (key === 'name'){
            this[key] = value;
            done = true;
        }
        else if (this.hasOwnProperty(key) && this[key] instanceof VacWidgetAttrValue){
            this[key].fromJsonObj(value);
            done = true;
        }
        return done;
    }

        /**
     * 初始化带有取值范围的属性的取值范围
     * @param range 要返回的取值范围。
     * @param rangeClass 存放枚举值的类名。
     * @returns {VacMap<T>} 取值范围。
     */
    static initRange<T>(range: VacMap<T>, rangeClass:any):VacMap<T>{
        if (!range){
            range = new VacMap<T>();
            for (let key in rangeClass){
                if (!rangeClass.hasOwnProperty(key)){
                    continue;
                }
                let item = rangeClass[key];
                range.set(key, item);
            }
        }
        return range;
    }
}

export class VacWidgetTextAttr extends VacWidgetAttr{
    constructor(){
        super('文本');
    }

    newInstance(){
        return new VacWidgetTextAttr();
    }

    copyFrom(src:VacWidgetAttr){
        let src2 = <VacWidgetTextAttr>src;
    }

    protected fromJsonObjKey(key: string, value: any, obj: Object):boolean {
        return super.fromJsonObjKey(key, value, obj);
    }
}

export class VacWidgetPositionAttr extends VacWidgetAttr{
    constructor(){
        super('位置');
    }

    newInstance(){
        return new VacWidgetPositionAttr();
    }

    copyFrom(src:VacWidgetAttr){
        let src2 = <VacWidgetPositionAttr>src;
    }

    protected fromJsonObjKey(key: string, value: any, obj: Object):boolean {
        return super.fromJsonObjKey(key, value, obj);
    }
}

export class VacWidgetBorderAttr extends VacWidgetAttr{
    constructor(){
        super('边框');
    }

    newInstance(){
        return new VacWidgetBorderAttr();
    }

    copyFrom(src:VacWidgetAttr){
        let src2 = <VacWidgetBorderAttr>src;
    }

    protected fromJsonObjKey(key: string, value: any, obj: Object):boolean {
        return super.fromJsonObjKey(key, value, obj);
    }
}

export class VacWidgetAttrs {
    text = new VacWidgetTextAttr();
    position = new VacWidgetPositionAttr();
    border = new VacWidgetBorderAttr();
    custom:VacWidgetAttr = null;

    constructor(custom?:VacWidgetAttr) {
        this.custom = custom;
    }

    clone() {
        let custom:VacWidgetAttr = null;
        if (this.custom) {
            custom = this.custom.clone();
        }

        let newAttrs = new VacWidgetAttrs(custom);
        for (let key in this) {
            if (!this.hasOwnProperty(key)) {
                continue;
            }
            let item = this[key];
            if (item instanceof VacWidgetAttr) {
                newAttrs[key] = item.clone();
            }
        }

        return newAttrs;
    }
}