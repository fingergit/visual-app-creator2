import {Injectable, Output, EventEmitter} from "@angular/core";
import {LogService} from "../common/log.service";
import {VacAction} from "./action";
import {ActionManager} from "./action-manager";
import {AddProjectElemAction} from "./add-project-elem-action";
import {ProjectService} from "../project/project.service";
import {EVacProjectElemType, VacProjectElem} from "../model/project-element";
import {DialogService} from "../common/dialog.service";
import {VacProject} from "../model/project.model";
import {RemoveProjectElemAction} from "./remove-project-elem-action";
import {VacWidgetAttrValue} from "../model/attr-type";
import {ChangeAttrAction} from "./change-attr-action";
/**
 * Created by laj on 2016/7/4.
 */
@Injectable()
export class ActionService {
    actionManager:ActionManager;
    @Output() actionChanged: EventEmitter<any> = new EventEmitter();
    // 当选择集发生变化时触发。
    @Output() selectChanged: EventEmitter<any> = new EventEmitter();

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
        this.log.d('addGroup');

        DialogService.input("请输入组名", '', '组名', (text:string) => {
            let action:AddProjectElemAction = new AddProjectElemAction(this.projectService.curProject, text, EVacProjectElemType.GROUP);
            this.log.d('addAction by dlg');
            this.addAction(action);
        });
    }

    addPage(){
        DialogService.input("请输入组名", '', '组名', (text:string) => {
            let action:AddProjectElemAction = new AddProjectElemAction(this.projectService.curProject, text, EVacProjectElemType.PAGE);
            this.addAction(action);
        });
    }

    deleteElement(){
        let curProj: VacProject = this.projectService.curProject;
        let selElem:VacProjectElem = curProj.currentWidget ? curProj.currentWidget :
                                     curProj.currentPage ? curProj.currentPage :
                                         curProj.currentGroup ? curProj.currentGroup : null;
        if (null == selElem){
            DialogService.alert("请选择一个元素。");
            return;
        }
        else if (selElem === curProj.root){
            DialogService.error("不能删除根元素。");
            return;
        }
        
        DialogService.confirm("删除",  "确定要删除" + selElem.name + "吗？", () => {
            let action:RemoveProjectElemAction = new RemoveProjectElemAction(this.projectService.curProject, selElem);
            this.addAction(action);
        });
    }

    changAttr(attr: VacWidgetAttrValue, newValue:any, updatePropPanel:boolean){
        let action:ChangeAttrAction = new ChangeAttrAction(attr, newValue, updatePropPanel);
        this.addAction(action);
    }

    emitSelectChanged(elem: VacProjectElem){
        this.selectChanged.emit(elem);
    }

    emitAttrChanged(attr: VacWidgetAttrValue, newValue: any){
        this.attrChanged.emit(attr, newValue);
    }
}