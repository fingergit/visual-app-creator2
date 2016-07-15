/**
 * Created by laj on 2016/7/4.
 */

import {VacProjectElem, EVacProjectElemType} from "./project-element";
import {VacWidgetAttrs, VacWidgetAttr} from "../widget-attr/widget-attr";
import {VacProjectPage} from "./project-page";
import {VacCustomAttrFactory} from "../widgets/custom-attr-factory";
import {WidgetCompilerType} from "../widgets/compiler/widget-compiler-factory";

export class VacProjectWidget extends VacProjectElem{
    attrs: VacWidgetAttrs = null;
    constructor(public widgetType: string
                ,name: string
                ,id: string
                ,isContainer: boolean
                ,public htmlText: string
                ,public compiler: string
                ,customAttr?: VacWidgetAttr
    ){
        super(name, EVacProjectElemType.WIDGET, id, isContainer);
        this.attrs = new VacWidgetAttrs(customAttr);
    }

    newInstance():VacProjectElem{
        return new VacProjectWidget(this.widgetType, this.name, this.id, this.isContainer, this.htmlText, this.compiler);
    }

    static newInstance():VacProjectElem{
        return new VacProjectWidget(null, null, '1', false, null, WidgetCompilerType.common);
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

    fromJsonObjKey(key:string, value:any, obj: Object):boolean {
        let done:boolean = false;
        if (key === 'widgetType'
        || key === 'htmlText'
        || key == 'compiler'){
            this[key] = value;
            done = true;
        }
        else if (key === 'attrs'){
            VacCustomAttrFactory.fromJsonObj(this.attrs, value, this.widgetType);
            done = true;
        }
        
        return done;
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
