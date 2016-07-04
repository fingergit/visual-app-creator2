/**
 * Created by laj on 2016/7/4.
 */
 export class VacAction{
    time: number = new Date().getTime();

    constructor(public name: string){}

    doAction(isRedo:boolean){}

    undoAction(){}
}