import {VacMap} from "../common/map";
import {LogService} from "../common/log.service";
/**
 * Created by laj on 2016/7/5.
 */
export class EVacWidgetAttrType{
    static text = 'text';
    static enumCombBox = 'enumCombBox';
    static enumButton = 'enumButton';
    static boolSwitch = 'boolSwitch';
}

export class VacAttrEnumComboxItem{
    constructor(public name: string
                ,public value: string
    ){}
}

export class VacWidgetAttrValue{
    constructor(public name: string
                ,public value: any
                ,public type: string
                ,public valueRange: VacMap<any>
    ){}

    newInstance(){
        return new VacWidgetAttrValue();
    }

    copyFrom(src:VacWidgetAttrValue){
        this.name = src.name;
        this.value = src.value;
        this.type = src.type;
        this.valueRange = src.valueRange;
    }

    clone(){
        let attrValue: VacWidgetAttrValue = this.newInstance();
        attrValue.copyFrom(this);
        return attrValue;
    }

    fromJsonObj(obj:Object) {
        do {
            if (!obj || !obj.hasOwnProperty('name') || !obj.hasOwnProperty('value') || !obj.hasOwnProperty('type')) {
                LogService.d("invalid attrs value: ");
                LogService.d(obj);
                break;
            }

            for (let key in obj){
                if (!obj.hasOwnProperty(key)){
                    continue;
                }
                let item = obj[key];
                if (this.hasOwnProperty(key)){
                    if (key === 'valueRange' && item){
                        this.valueRange = new VacMap<any>();
                        this.valueRange.fromJsonObj(item);
                    }
                    else{
                        this[key] = item;
                    }
                }
            }

        }while(false);
    }
}