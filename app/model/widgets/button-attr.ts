import {VacWidgetAttr} from "../widget-attr";
import {VacAttrEnumComboxItem, EVacWidgetAttrType, VacWidgetAttrValue} from "../attr-type";
import {VacMap} from "../../common/map";
/**
 * Created by laj on 2016/7/4.
 */

export class EVacButtonAttrStyleRange{
    static default = new VacAttrEnumComboxItem('default', 'default');
    static primary = new VacAttrEnumComboxItem('primary', 'primary');
    static success = new VacAttrEnumComboxItem('success', 'success');
    static info = new VacAttrEnumComboxItem('info', 'info');
    static warning = new VacAttrEnumComboxItem('warning', 'warning');
    static danger = new VacAttrEnumComboxItem('danger', 'danger');
    static link = new VacAttrEnumComboxItem('link', 'link');
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
        this.style = new VacWidgetAttrValue('样式', EVacButtonAttrStyleRange.default, EVacWidgetAttrType.enumCombBox, VacButtonAttr.STYLE_RANGE);
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

