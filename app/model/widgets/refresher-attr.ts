import {VacWidgetAttr} from "../widget-attr/widget-attr";
import {VacAttrEnumComboxItem, EVacWidgetAttrType, VacWidgetAttrValue} from "../widget-attr/widget-attr-type";
import {VacMap} from "../../common/map";
import {EVacButtonAttrStyleRange} from "./button-attr";
import {LogService} from "../../common/log.service";
import {VacContentAttr} from "./content-attr";
/**
 * Created by laj on 2016/7/4.
 */

export class VacRefresherAttr extends VacWidgetAttr{
    public pullingText: VacWidgetAttrValue;
    public onRefresh: VacWidgetAttrValue;

    constructor(){
        super('列表刷新');
        this.pullingText = new VacWidgetAttrValue('提示', 'Pull to refresh...', EVacWidgetAttrType.text, null);
        this.onRefresh = new VacWidgetAttrValue('回调', '', EVacWidgetAttrType.text, null);
    }

    newInstance(){
        return new VacRefresherAttr();
    }

    copyFrom(src:VacWidgetAttr){
        super.copyFrom(src);
    }

    protected fromJsonObjKey(key: string, value: any, obj: Object):boolean {
        return super.fromJsonObjKey(key, value, obj);
    }
}

