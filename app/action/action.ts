/**
 * Created by laj on 2016/7/4.
 */
 export class VacAction{
    time: number = new Date().getTime();

    // Action执行后是否需要更新相关区域。
    updateProjectTree: boolean;
    updateEditView: boolean;
    updatePropPanel: boolean;

    constructor(public name: string){}

    doAction(isRedo:boolean){}

    undoAction(){}
}