import {VacWidgetAttr} from "../widget-attr/widget-attr";
import {VacAttrEnumComboxItem, EVacWidgetAttrType, VacWidgetAttrValue} from "../widget-attr/widget-attr-type";
import {VacMap} from "../../common/map";
import {EVacButtonAttrStyleRange} from "./button-attr";
import {LogService} from "../../common/log.service";
import {VacContentAttr} from "./content-attr";
/**
 * Created by laj on 2016/7/4.
 */

export class VacImageAttr extends VacWidgetAttr{
    static STYLE_RANGE: VacMap<EVacButtonAttrStyleRange>;

    public img: VacWidgetAttrValue;

    constructor(){
        super('图像');
        this.img = new VacWidgetAttrValue('图像', '/visualapp/public/img/defimg.jpg', EVacWidgetAttrType.imgFile, null);
    }

    newInstance(){
        return new VacImageAttr();
    }

    copyFrom(src:VacWidgetAttr){
        super.copyFrom(src);
    }

    protected fromJsonObjKey(key: string, value: any, obj: Object):boolean {
        return super.fromJsonObjKey(key, value, obj);
    }
}

