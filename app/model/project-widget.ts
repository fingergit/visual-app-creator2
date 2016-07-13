/**
 * Created by laj on 2016/7/4.
 */

import {VacProjectElem, EVacProjectElemType} from "./project-element";
import {VacWidgetAttrs, VacWidgetAttr} from "./widget-attr";
import {VacProjectPage} from "./project-page";

export class VacProjectWidget extends VacProjectElem{
    attrs: VacWidgetAttrs = null;
    constructor(public widgetType: string
                ,name: string
                ,id: string
                ,isContainer: boolean
                ,public htmlText: string
                ,customAttr?: VacWidgetAttr
    ){
        super(name, EVacProjectElemType.WIDGET, id, isContainer);
        this.attrs = new VacWidgetAttrs(customAttr);
    }

    newInstance():VacProjectElem{
        return new VacProjectWidget(this.name, this.id, this.isContainer, this.widgetType, this.htmlText);
    }

    static newInstance():VacProjectElem{
        return new VacProjectWidget('', '1', false, '', '');
    }

    copyFrom(src:VacProjectElem){
        super.copyFrom(src);
        if (src instanceof VacProjectWidget){
            let src2:VacProjectWidget = <VacProjectWidget>src;

            this.widgetType = src2.widgetType;
            this.htmlText = src2.htmlText;
            this.attrs = src2.attrs.clone();
        }
    }

    protected fromJsonObjKey(key:string, value:any, obj: Object):boolean {
        if (super.fromJsonObjKey(key, value, obj)){
            return true;
        }

        if (key === 'widgetType'
        || key === 'htmlText'){
            this[key] = value;
        }
        else if (key === 'attrs'){
            this.attrs.fromJsonObj(value, obj.widgetType);
        }
    }

    getPage():VacProjectPage{
        return this._getPage(null);
    }

    private _getPage(elem: VacProjectElem):VacProjectPage{
        if (elem == null){
            elem = this;
        }

        if (elem.parent instanceof VacProjectPage){
            return <VacProjectPage>elem.parent;
        }
        else if (!elem.parent){
            return null;
        }
        else{
            return this._getPage(elem.parent);
        }
    }
}
