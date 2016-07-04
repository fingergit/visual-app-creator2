import {VacAction} from "./action";
/**
 * Created by laj on 2016/7/4.
 */
export let g_result: number = 0;

export class MathAction extends VacAction{
    constructor(public name:string
                , private add: number
    ){
        super(name);
    }

    doAction(isRedo:boolean){
        g_result += this.add;
    }

    undoAction(){
        g_result -= this.add;
    }
}