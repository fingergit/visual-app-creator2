/**
 * Created by laj on 2016/7/4.
 */

import {VacProjectElem, EVacProjectElemType} from "./project-element";

export class VacProjectPage extends VacProjectElem{
    constructor(public name: string
                ,public id: string
    ){
        super(name, EVacProjectElemType.PAGE, id, true);
    }

    newInstance():VacProjectElem{
        return new VacProjectPage(this.name, this.id);
    }

    copyFrom(src:VacProjectElem){
        super.copyFrom(src);
    }
}