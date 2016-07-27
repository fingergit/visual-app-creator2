import {VacWidgetAttr, VacWidgetAttrs} from "../widget-attr/widget-attr";
import {VacAttrEnumComboxItem, EVacWidgetAttrType, VacWidgetAttrValue} from "../widget-attr/widget-attr-type";
import {VacMap} from "../../common/map";
import {VacButtonAttr} from "./button-attr";
import {VacContentAttr} from "./content-attr";
import {VacFooterAttr} from "./footer-attr";
import {VacHeaderAttr} from "./header-attr";
import {LogService} from "../../common/log.service";
import {VacRefresherAttr} from "./refresher-attr";
import {VacListViewAttr} from "./list-view-attr";
import {VacSplashAttr} from "./splash-attr";
import {VacImageAttr} from "./image-attr";
/**
 * Created by laj on 2016/7/4.
 */
export class VacWidgetType{
    static button = 'button'; 
    static image = 'image';
    static header = 'header';
    static radio = 'radio'; 
    static range = 'range';
    static content = 'content';
    static footer = 'footer';
    static refresher = 'refresher';
    static listView = 'listView';
    static splash = 'splash';
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
            case VacWidgetType.refresher:
                attr = new VacRefresherAttr();
                break;
            case VacWidgetType.listView:
                attr = new VacListViewAttr();
                break;
            case VacWidgetType.splash:
                attr = new VacSplashAttr();
                break;
            case VacWidgetType.image:
                attr = new VacImageAttr();
                break;
            default:
                LogService.d('not found custom attr for type: ' + widgetType);
                break;
        }

        return attr;
    }


    static fromJsonObj(attrs: VacWidgetAttrs, obj:Object, widgetType: string){
        do{
            if (!obj || !obj.hasOwnProperty('text') || !obj.hasOwnProperty('position') || !obj.hasOwnProperty('border')){
                LogService.d("invalid attrs: ");
                LogService.d(obj);
                break;
            }

            for (let key in obj){
                if (!obj.hasOwnProperty(key)){
                    continue;
                }

                let item = obj[key];
                if (key === 'text' || key === 'position' || key === 'border'){
                    attrs[key].fromJsonObj(item, widgetType);
                }
                else if (key === 'custom' && item){
                    attrs.custom = VacCustomAttrFactory.createAttr(widgetType);
                    attrs.custom.fromJsonObj(item, widgetType);
                }
            }

        }while(false);
    }

}

