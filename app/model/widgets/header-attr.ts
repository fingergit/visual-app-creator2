import {VacWidgetAttr} from "../widget-attr";
import {VacAttrEnumComboxItem, EVacWidgetAttrType, VacWidgetAttrValue} from "../attr-type";
import {VacMap} from "../../common/map";
import {EVacButtonAttrStyleRange} from "./button-attr";
import {VacContentAttr} from "./content-attr";
import {LogService} from "../../common/log.service";
/**
 * Created by laj on 2016/7/4.
 */

export class VacHeaderAttr extends VacWidgetAttr{
    static STYLE_RANGE: VacMap<EVacButtonAttrStyleRange>;

    public title: VacWidgetAttrValue;
    public style: VacWidgetAttrValue;

    constructor(){
        super('标题栏');

        if (!VacHeaderAttr.STYLE_RANGE){
            VacHeaderAttr.STYLE_RANGE = new VacMap<EVacButtonAttrStyleRange>();
            for (let key in EVacButtonAttrStyleRange){
                if (!EVacButtonAttrStyleRange.hasOwnProperty(key)){
                    continue;
                }
                let item = EVacButtonAttrStyleRange[key];
                VacHeaderAttr.STYLE_RANGE.set(key, item);
            }

        }

        this.title = new VacWidgetAttrValue('标题', '标题', EVacWidgetAttrType.text, null);
        this.style = new VacWidgetAttrValue('样式', EVacButtonAttrStyleRange.light, EVacWidgetAttrType.enumCombBox, VacHeaderAttr.STYLE_RANGE);
    }

    newInstance(){
        return new VacHeaderAttr();
    }

    copyFrom(src:VacWidgetAttr){
        super.copyFrom(src);
    }

    protected fromJsonObjKey(key: string, value: any, obj: Object):boolean {
        return super.fromJsonObjKey(key, value, obj);
    }
}

