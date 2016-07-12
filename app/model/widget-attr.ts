import {VacMap} from "../common/map";
/**
 * Created by laj on 2016/7/4.
 */

export abstract class VacWidgetAttr{
    constructor(public name:string){}

    abstract newInstance();
    copyFrom(src:VacWidgetAttr){
        this.name = src.name;
    }

    clone(){
        let attr: VacWidgetAttr = this.newInstance();
        attr.copyFrom(this);
        return attr;
    }

    /**
     * 初始化带有取值范围的属性的取值范围
     * @param range 要返回的取值范围。
     * @param rangeClass 存放枚举值的类名。
     * @returns {VacMap<T>} 取值范围。
     */
    static initRange(range: VacMap<T>, rangeClass:any):VacMap<T>{
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
}

export class VacWidgetAttrs{
    text = new VacWidgetTextAttr();
    position = new VacWidgetPositionAttr();
    border = new VacWidgetBorderAttr();
    custom:VacWidgetAttr = null;

    constructor(custom?: VacWidgetAttr){
        this.custom = custom;
    }

    clone(){
        let custom : VacWidgetAttr = null;
        if (this.custom){
            custom = this.custom.clone();
        }

        let newAttrs = new VacWidgetAttrs(custom);
        if (this.text){
            newAttrs.text = this.text.clone();
        }
        if (this.position) {
            newAttrs.position = this.position.clone();
        }
        if (this.border) {
            newAttrs.border = this.border.clone();
        }

        return newAttrs;
    }
}