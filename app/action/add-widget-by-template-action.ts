import {VacAction} from "./action";
import {VacProjectElem, EVacProjectElemType} from "../model/element/project-element";
import {VacProject} from "../model/element/project.model";
import {VacProjectWidgetTemplate} from "../model/widgets/service/project-widget-template-service";
import {VacProjectWidget} from "../model/element/project-widget";
/**
 * Created by laj on 2016/7/4.
 */
export class AddWidgetByTemplateAction extends VacAction{
    private elem : VacProjectElem = null;
    private success: boolean = false;

    constructor(private parent: VacProjectElem
                ,private widget: VacProjectWidget
                ,private proj: VacProject
    ){
        super('Add Widget ' + widget.name);
    }

    doAction(isRedo:boolean){
        this.success = this.proj.addWidget(this.widget, this.parent, !isRedo);
        if (this.success){
            this.update();
        }
    }

    undoAction(){
        if (this.success){
            this.proj.removeElement(this.widget);
            this.update();
        }
    }

    private update(){
        this.updateView.updateProjectTree = true;
        this.updateView.updateEditView = true;
        this.updateView.updatePropPanel = true;
    }
}