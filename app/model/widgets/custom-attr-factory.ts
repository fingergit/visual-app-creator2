import {VacWidgetAttr} from "../widget-attr";
import {VacAttrEnumComboxItem, EVacWidgetAttrType, VacWidgetAttrValue} from "../attr-type";
import {VacMap} from "../../common/map";
import {VacButtonAttr} from "./button-attr";
import {VacContentAttr} from "./content-attr";
import {VacFooterAttr} from "./footer-attr";
import {VacHeaderAttr} from "./header-attr";
import {LogService} from "../../common/log.service";
/**
 * Created by laj on 2016/7/4.
 */
export class VacWidgetType{
    static button = 'button'; 
    static header = 'header'; 
    static radio = 'radio'; 
    static range = 'range';
    static content = 'content';
    static footer = 'footer';
}
    
export class VacCustomAttrFactory{
    static createAttr(widgetType: string){
        let attr: VacWidgetAttr = null;
        switch (widgetType){
            case VacWidgetType.button:
                attr = new VacButtonAttr();
                break;
            case VacWidgetType.content:
                attr = new VacContentAttr();
                break;
            case VacWidgetType.footer:
                attr = new VacFooterAttr();
                break;
            case VacWidgetType.header:
                attr = new VacHeaderAttr();
                break;
            default:
                LogService.d('not found custom attr for type: ' + widgetType);
                break;
        }

        return attr;
    }
}

