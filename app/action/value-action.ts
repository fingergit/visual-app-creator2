import {VacAction} from "./action";
/**
 * Created by laj on 2016/7/4.
 */
 export class ValueAction extends VacAction{
    constructor(public name: string
                ,public obj: any
                ,public field: any
                ,public oldValue: any
                ,public newValue: any
        ){
        super(name);
    }

    doAction(isRedo:boolean){
        this.obj[this.field] = this.newValue;
        this.obj.undo = false;
        this.obj.redo = isRedo;
    }

    undoAction(){
        this.obj[this.field] = this.oldValue;
        this.obj.undo = true;
        this.obj.redo = false;
    }
}