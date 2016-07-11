import {VacWidgetAttr} from "../widget-attr";
import {VacAttrEnumComboxItem, EVacWidgetAttrType, VacWidgetAttrValue} from "../attr-type";
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
    static STYLE_RANGE: Array<EVacButtonAttrStyleRange>;

    public text: VacWidgetAttrValue;
    public style: VacWidgetAttrValue;

    constructor(){
        super('按钮');

        if (!VacButtonAttr.STYLE_RANGE){
            VacButtonAttr.STYLE_RANGE = [];
            for (let key in EVacButtonAttrStyleRange){
                if (!EVacButtonAttrStyleRange.hasOwnProperty(key)){
                    continue;
                }
                let item = EVacButtonAttrStyleRange[key];
                VacButtonAttr.STYLE_RANGE.push(item);
                console.log(item);
            }

        }

        this.text = new VacWidgetAttrValue('名称', '按钮', EVacWidgetAttrType.text, null);
        this.style = new VacWidgetAttrValue('样式', EVacButtonAttrStyleRange.light, EVacWidgetAttrType.enumCombBox, VacButtonAttr.STYLE_RANGE);
    }

    newInstance(){
        return new VacButtonAttr();
    }

    copyFrom(src:VacWidgetAttr){
        let src2 = <VacButtonAttr>src;
        this.text = src2.text.clone();
        this.style = src2.style.clone();
    }
}

