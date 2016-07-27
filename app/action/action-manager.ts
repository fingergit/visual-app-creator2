import {Injectable} from "@angular/core";
import {LogService} from "../common/log.service";
import {VacAction} from "./action";
import {ValueAction} from "./value-action";
/**
 * Created by laj on 2016/7/4.
 */
@Injectable()
export class ActionManager {
    redoList: Array<VacAction> = [];
    undoList: Array<VacAction> = [];

    constructor() {

    }

    addAction(action: VacAction){
        // 如果action的名称与前一个action的名称相同，且此次调用时间与上次调用时间不超过0.2秒钟，则认为与上个action为同一个action。
        if (action instanceof ValueAction){
            if (this.undoList.length > 0){
                let lastAction = this.undoList[this.undoList.length-1];
                if (lastAction instanceof ValueAction){
                    if (lastAction.name != null && lastAction.name == action.name &&
                        action.obj === lastAction.obj &&
                        action.field === lastAction.field &&
                        action.time - lastAction.time<200
                    ){
                        action.oldValue = lastAction.oldValue;
                        this.undoList.pop();
                    }
                }
            }
        }
        this.undoList.push(action);
        this.redoList.length = 0;
        action.doAction(false);
        // LogService.d("undolist: " + this.undoList.length);
    }

    undo(): VacAction{
        // LogService.d('undo');

        if (this.undoList.length == 0){
            return null;
        }

        let action = this.undoList.pop();
        this.redoList.push(action);
        action.undoAction();
        
        return action;
    }

    redo(): VacAction{
        // LogService.d('redo');

        if (this.redoList.length == 0){
            return null;
        }

        let action = this.redoList.pop();
        this.undoList.push(action);
        action.doAction(true);
        
        return action;
    }

    canUndo(): boolean{
        // LogService.d('canUndo');
        return this.undoList.length > 0;
    }

    canRedo(): boolean{
        // LogService.d('canRedo');
        return this.redoList.length > 0;
    }

    clear(){
        this.undoList.length = 0;
        this.redoList.length = 0;
    }
}