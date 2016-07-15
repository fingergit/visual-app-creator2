import {VacWidgetAttr} from "../widget-attr/widget-attr";
import {VacAttrEnumComboxItem, EVacWidgetAttrType, VacWidgetAttrValue} from "../widget-attr/widget-attr-type";
import {VacMap} from "../../common/map";
import {EVacButtonAttrStyleRange} from "./button-attr";
import {LogService} from "../../common/log.service";
import {VacContentAttr} from "./content-attr";
/**
 * Created by laj on 2016/7/4.
 */

export class VacListViewAttr extends VacWidgetAttr{
    public items: VacWidgetAttrValue;

    constructor(){
        super('列表');
        this.items = new VacWidgetAttrValue('列表项', ['a', 'b', 'c'], EVacWidgetAttrType.textArray, null);
    }

    newInstance(){
        return new VacListViewAttr();
    }

    copyFrom(src:VacWidgetAttr){
        super.copyFrom(src);
    }

    protected fromJsonObjKey(key: string, value: any, obj: Object):boolean {
        return super.fromJsonObjKey(key, value, obj);
    }
}

