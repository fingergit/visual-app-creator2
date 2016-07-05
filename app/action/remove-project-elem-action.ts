import {VacAction} from "./action";
import {VacProjectElem, EVacProjectElemType} from "../model/project-element";
import {VacProject} from "../model/project.model";
/**
 * Created by laj on 2016/7/4.
 */
export class AddProjectElemAction extends VacAction{
    parent: VacProjectElem = null;

    constructor(private proj: VacProject
                ,private elem: VacProjectElem
    ){
        super('Remove ' + elem.name);
        this.parent = elem.parent;
    }

    doAction(isRedo:boolean){
        this.proj.removeElement(this.elem);
        this.update();
    }

    undoAction(){
        if (null != this.elem){
            this.proj.reAddElement(this.elem, this.parent);
            this.update();
        }
    }

    private update(){
        switch (this.elem.elemType){
            case EVacProjectElemType.GROUP:
                this.updatePropPanel = true;
                this.updateEditView = true;
                this.updatePropPanel = true;
                break;
            case EVacProjectElemType.PAGE:
                this.updatePropPanel = true;
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