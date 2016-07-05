import {VacAction} from "./action";
import {VacProjectElem, EVacProjectElemType} from "../model/project-element";
import {VacProject} from "../model/project.model";
/**
 * Created by laj on 2016/7/4.
 */
export class AddProjectElemAction extends VacAction{
    private elem : VacProjectElem = null;

    constructor(private proj: VacProject
                ,private elemName: string
                ,private elemType: EVacProjectElemType
                ,private widgetType?: string
                
                
    ){
        super('Add ' + elemName);
    }

    doAction(isRedo:boolean){
        this.elem = this.proj.addElement(this.elemName, this.elemType, this.widgetType);
        this.update();
    }

    undoAction(){
        if (null != this.elem){
            this.proj.removeElement(this.elem);
            this.update();
        }
    }

    private update(){
        switch (this.elemType){
            case EVacProjectElemType.GROUP:
                this.updateProjectTree = true;
                this.updateEditView = true;
                this.updatePropPanel = true;
                break;
            case EVacProjectElemType.PAGE:
                this.updateProjectTree = true;
                this.updateEditView = true;
                this.updatePropPanel = true;
                break;
            case EVacProjectElemType.WIDGET:
                this.updateEditView = true;
                this.updatePropPanel = true;
                break;
        }
    }
}