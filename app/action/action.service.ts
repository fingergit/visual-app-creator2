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
import {VacProjectWidget} from "../model/project-widget";
import {VacProjectPage} from "../model/project-page";
import {VacProjectGroup} from "../model/project-group";
/**
 * Created by laj on 2016/7/4.
 */
@Injectable()
export class ActionService {
    actionManager:ActionManager;
    @Output() actionChanged: EventEmitter<any> = new EventEmitter();
    // 当选择集发生变化时触发。
    @Output() selectChanged: EventEmitter<any> = new EventEmitter();
    // 当整个项目文件发生变化时触发。
    @Output() projectChanged: EventEmitter<any> = new EventEmitter();

    constructor(private projectService: ProjectService) {
        this.actionManager = new ActionManager();
    }

    addAction(action: VacAction){
        this.actionManager.addAction(action);
        this.actionChanged.emit(action);
        this.projectService.saveProject();
    }

    undo(){
        let action:VacAction = this.actionManager.undo();
        if (action){
            this.actionChanged.emit(action);
            this.projectService.saveProject();
        }
    }

    redo(){
        let action:VacAction = this.actionManager.redo();

        if (action) {
            this.actionChanged.emit(action);
            this.projectService.saveProject();
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

    newProject(){
        this.projectService.newProject(()=>{
            this.emitProjectChanged();
        });
    }

    openProject() {
        this.projectService.openProject(()=>{
            this.emitProjectChanged();
        });
    }

    addGroup(){
        LogService.d('addGroup');

        DialogService.input("请输入组名", '', '组名', (text:string) => {
            let action:AddProjectElemAction = new AddProjectElemAction(this.projectService.curProject, text, EVacProjectElemType.GROUP);
            LogService.d('addAction by dlg');
            this.addAction(action);
        });
    }

    addPage(){
        DialogService.input("请输入页名", '', '页名', (text:string) => {
            let action:AddProjectElemAction = new AddProjectElemAction(this.projectService.curProject, text, EVacProjectElemType.PAGE);
            this.addAction(action);
        });
    }

    deleteElement(){
        let curProj: VacProject = this.projectService.curProject;
        let selElem:VacProjectElem = curProj.getCurrentWidget() ? curProj.getCurrentWidget() :
                                     curProj.getCurrentPage() ? curProj.getCurrentPage() :
                                         curProj.getCurrentGroup() ? curProj.getCurrentGroup() : null;
        if (null == selElem){
            DialogService.alert("请选择一个元素。");
            return;
        }
        else if (selElem === curProj.getRoot()){
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

    selectElem(elemId: string, elemType: EVacProjectElemType, selected: boolean){
        let curProj:VacProject = this.projectService.curProject;
        let elem = curProj.findElementById(elemId, elemType, curProj.getRoot());
        if (elem && selected){
            let curGroup = curProj.getCurrentGroup();
            let curPage = curProj.getCurrentPage();
            switch (elemType){
                case EVacProjectElemType.GROUP:
                    if (curGroup !== elem){
                        curProj.setCurrentGroup(<VacProjectGroup>elem);
                        curProj.setCurrentPage(null);
                        curProj.setCurrentWidget(null);
                    }

                    break;
                case EVacProjectElemType.PAGE:
                    if (curPage !== elem){
                        curProj.setCurrentPage(<VacProjectPage>elem);
                        curProj.setCurrentWidget(null);
                    }
                    break;
                case EVacProjectElemType.WIDGET:
                    let page:VacProjectPage = (<VacProjectWidget>elem).getPage();
                    if (curPage !== page){
                        curProj.setCurrentPage(page);
                    }

                    curProj.setCurrentWidget(<VacProjectWidget>elem);
                    break;
            }
        }
        else{
            switch (elemType){
                case EVacProjectElemType.GROUP:
                    curProj.setCurrentGroup(null);
                    curProj.setCurrentPage(null);
                    curProj.setCurrentWidget(null);

                    break;
                case EVacProjectElemType.PAGE:
                    curProj.setCurrentPage(null);
                    curProj.setCurrentWidget(null);
                    break;
                case EVacProjectElemType.WIDGET:
                    curProj.setCurrentWidget(null);
                    break;
            }
        }

        this.emitSelectChanged(elem);
    }

    emitSelectChanged(elem: VacProjectElem){
        this.selectChanged.emit(elem);
    }

    emitProjectChanged(){
        this.projectChanged.emit(null);
    }
}