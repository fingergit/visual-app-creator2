import {VacAction} from "./action";
import {VacProjectElem, EVacProjectElemType} from "../model/element/project-element";
import {VacWidgetAttrValue} from "../model/widget-attr/widget-attr-type";
/**
 * Created by laj on 2016/7/4.
 */
export class ChangeAttrAction extends VacAction{
    oldValue: any = null;

    constructor(private attr: VacWidgetAttrValue
                ,private newValue: any
                ,updatePropPanel: boolean
    ){
        super('Change attribute: ' + attr.name);
        this.oldValue = attr.value;
        this.updateView.updatePropPanel = updatePropPanel;
    }

    doAction(isRedo:boolean){
        this.attr.value = this.newValue;
        this.update();
    }

    undoAction(){
        this.attr.value = this.oldValue;
        this.update();
    }

    private update(){
        this.updateView.updateEditView = true;
    }
}