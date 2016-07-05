/**
 * Created by laj on 2016/7/4.
 */

import {VacProjectElem, EVacProjectElemType} from "./project-element";

export class VacProjectWidget extends VacProjectElem{
    constructor(public name: string
                ,public id: string
                ,public widgetType: string
    ){
        super(name, EVacProjectElemType.PAGE, id, true);
    }

    clone(){
        return super.clone();
    }
}