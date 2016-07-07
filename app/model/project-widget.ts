/**
 * Created by laj on 2016/7/4.
 */

import {VacProjectElem, EVacProjectElemType} from "./project-element";

export class VacProjectWidget extends VacProjectElem{
    constructor(public widgetType: string
                ,name: string
                ,id: string
                ,isContainer: boolean
                ,public htmlText: string
    ){
        super(name, EVacProjectElemType.PAGE, id, isContainer);
    }

    newInstance():VacProjectElem{
        return new VacProjectWidget(this.name, this.id, this.isContainer, this.widgetType, this.htmlText);
    }

    copyFrom(src:VacProjectElem){
        super.copyFrom(src);
        if (src instanceof VacProjectWidget){
            let src2:VacProjectWidget = <VacProjectWidget>src;

            this.widgetType = src2.widgetType;
            this.htmlText = src2.htmlText;
        }
    }
}