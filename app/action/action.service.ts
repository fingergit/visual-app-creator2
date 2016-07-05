import {Injectable, Output, EventEmitter} from "@angular/core";
import {LogService} from "../common/log.service";
import {VacAction} from "./action";
import {ActionManager} from "./action-manager";
import {AddProjectElemAction} from "./add-project-elem-action";
import {ProjectService} from "../project/project.service";
import {EVacProjectElemType} from "../model/project-element";
/**
 * Created by laj on 2016/7/4.
 */
@Injectable()
export class ActionService {
    actionManager:ActionManager;
    @Output() actionChanged: EventEmitter<any> = new EventEmitter();

    constructor(private log:LogService
                ,private projectService: ProjectService) {
        this.actionManager = new ActionManager(log);
    }

    addAction(action: VacAction){
        this.actionManager.addAction(action);
        this.actionChanged.emit(action);
    }

    undo(){
        let action:VacAction = this.actionManager.undo();
        if (action){
            this.actionChanged.emit(action);
        }
    }

    redo(){
        let action:VacAction = this.actionManager.redo();

        if (action) {
            this.actionChanged.emit(action);
        }
    }

    canUndo(): boolean{
        return this.actionManager.canUndo();
    }

    canRedo(): boolean{
        return this.actionManager.canRedo();
    }

    clear(){
        return this.actionManager.clear();
    }

    addGroup(){
        let action:AddProjectElemAction = new AddProjectElemAction(this.projectService.curProject, '组', EVacProjectElemType.GROUP);
        this.addAction(action);
    }

    addPage(){
        let action:AddProjectElemAction = new AddProjectElemAction(this.projectService.curProject, '页面', EVacProjectElemType.PAGE);
        this.addAction(action);
    }
}