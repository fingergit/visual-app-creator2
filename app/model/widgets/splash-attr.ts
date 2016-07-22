import {VacWidgetAttr} from "../widget-attr/widget-attr";
import {VacAttrEnumComboxItem, EVacWidgetAttrType, VacWidgetAttrValue} from "../widget-attr/widget-attr-type";
import {VacMap} from "../../common/map";
import {EVacButtonAttrStyleRange} from "./button-attr";
import {LogService} from "../../common/log.service";
import {VacContentAttr} from "./content-attr";
/**
 * Created by laj on 2016/7/4.
 */

export class VacSplashAttr extends VacWidgetAttr{
    public img: VacWidgetAttrValue;
    public slogan: VacWidgetAttrValue;

    constructor(){
        super('启动');
        this.img = new VacWidgetAttrValue('图像', '', EVacWidgetAttrType.imgFile, null);
        this.slogan = new VacWidgetAttrValue('图标', '', EVacWidgetAttrType.imgFile, null);
    }

    newInstance(){
        return new VacSplashAttr();
    }

    copyFrom(src:VacWidgetAttr){
        super.copyFrom(src);
    }

    protected fromJsonObjKey(key: string, value: any, obj: Object):boolean {
        return super.fromJsonObjKey(key, value, obj);
    }
}

