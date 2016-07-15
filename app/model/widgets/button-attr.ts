import {VacWidgetAttr} from "../widget-attr/widget-attr";
import {VacAttrEnumComboxItem, EVacWidgetAttrType, VacWidgetAttrValue} from "../widget-attr/widget-attr-type";
import {VacMap} from "../../common/map";

/**
 * Created by laj on 2016/7/4.
 */

export class EVacButtonAttrStyleRange{
    static light = new VacAttrEnumComboxItem('light', 'light');
    static stable = new VacAttrEnumComboxItem('stable', 'stable');
    static positive = new VacAttrEnumComboxItem('positive', 'positive');
    static calm = new VacAttrEnumComboxItem('calm', 'calm');
    static balanced = new VacAttrEnumComboxItem('balanced', 'balanced');
    static energized = new VacAttrEnumComboxItem('energized', 'energized');
    static assertive = new VacAttrEnumComboxItem('assertive', 'assertive');
    static royal = new VacAttrEnumComboxItem('royal', 'royal');
    static dark = new VacAttrEnumComboxItem('dark', 'dark');
}

export class VacButtonAttr extends VacWidgetAttr{
    static STYLE_RANGE: VacMap<EVacButtonAttrStyleRange>;

    public text: VacWidgetAttrValue = VacWidgetAttrValue.newInstance();
    public style: VacWidgetAttrValue = VacWidgetAttrValue.newInstance();

    constructor(){
        super('按钮');

        if (!VacButtonAttr.STYLE_RANGE){
            VacButtonAttr.STYLE_RANGE = new VacMap<EVacButtonAttrStyleRange>();
            for (let key in EVacButtonAttrStyleRange){
                if (!EVacButtonAttrStyleRange.hasOwnProperty(key)){
                    continue;
                }
                let item = EVacButtonAttrStyleRange[key];
                VacButtonAttr.STYLE_RANGE.set(key, item);
            }

        }

        this.text = new VacWidgetAttrValue('名称', '按钮', EVacWidgetAttrType.text, null);
        this.style = new VacWidgetAttrValue('样式', EVacButtonAttrStyleRange.light, EVacWidgetAttrType.enumCombBox, VacButtonAttr.STYLE_RANGE);
    }

    newInstance(){
        return new VacButtonAttr();
    }

    copyFrom(src:VacWidgetAttr){
        super.copyFrom(src);
    }

    protected fromJsonObjKey(key: string, value: any, obj: Object):boolean {
        return super.fromJsonObjKey(key, value, obj);
    }
}

