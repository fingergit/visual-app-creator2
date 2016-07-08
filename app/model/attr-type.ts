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
                ,public valueRange: Array<any>
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
}