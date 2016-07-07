/**
 * Created by laj on 2016/7/4.
 */

import {VacProjectElem, EVacProjectElemType} from "./project-element";

export class VacProjectGroup extends VacProjectElem{
    constructor(public name: string
                ,public id: string
    ){
        super(name, EVacProjectElemType.GROUP, id, true);
    }


    newInstance():VacProjectElem{
        return new VacProjectGroup(this.name, this.id);
    }

    copyFrom(src:VacProjectElem){
        super.copyFrom(src);
    }
}