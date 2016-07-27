import {Component, OnInit, Input} from '@angular/core';
import {ROUTER_DIRECTIVES} from "@angular/router";
import {InputItemComponent} from "../attr-items/input/input.component";
import {CombBoxComponent} from "../attr-items/comb-box/comb-box.component";
import {SwitchComponent} from "../attr-items/switch/switch.component";
import {ListBoxComponent} from "../attr-items/list-box/list-box.component";
import {InputFileComponent} from "../attr-items/input-file/input-file.component";
import {ColorComponent} from "../attr-items/color/color.component";
import {
    VacWidgetAttrs, VacWidgetAttr, VacWidgetTextAttr,
    VacWidgetPositionAttr, VacWidgetBorderAttr
} from "../../../../../model/widget-attr/widget-attr";
import {VacWidgetAttrValue,EVacWidgetAttrType} from "../../../../../model/widget-attr/widget-attr-type";
import {VacAction} from "../../../../../action/action";
import {VacProjectElem} from "../../../../../model/element/project-element";
import {ProjectService} from "../../../../../project/project.service";
import {ActionService} from "../../../../../action/action.service";
import {VacProject} from "../../../../../model/element/project.model";
import {VacProjectWidget} from "../../../../../model/element/project-widget";

declare var $;

@Component({
    moduleId: module.id
    ,selector: 'vac-attr-tab-panel'
    ,templateUrl: 'attr-tab-panel.component.html'
    ,styleUrls: ['attr-tab-panel.component.css']
    ,directives: [InputItemComponent,CombBoxComponent,SwitchComponent,ListBoxComponent,InputFileComponent,ColorComponent]
    // ,providers: [HeroService, DialogService]
})
export class AttrTabPanelComponent implements OnInit{
    @Input() attr: VacWidgetAttr;
    @Input() attrKey: string;

    attrItems: Array<VacWidgetAttrValue> = [];

    EVacWidgetAttrType = EVacWidgetAttrType;

    ngOnInit() {
        this.actionService.actionChanged.subscribe((action:VacAction) => {
            if (action.updateView.updatePropPanel){
                this._updateView();
            }
        }, ()=>{}, ()=>{});

        this.actionService.selectChanged.subscribe((elem: VacProjectElem) => {
            this._updateView();
        }, ()=>{}, ()=>{});

        this.actionService.projectChanged.subscribe(()=>{
            this._updateView();
        });
    }
    constructor(private projectService: ProjectService
                ,private actionService: ActionService
    ){
    }

    private _updateView(){
        let curProj:VacProject = this.projectService.curProject;
        let curWidget:VacProjectWidget = curProj.getCurrentWidget();
        this.attrItems = [];
        if (!curWidget){
            this.attr = null;
        }
        else{
            this.attr = curWidget.attrs[this.attrKey];
        }
        for (let idx in this.attr){
            if (!this.attr.hasOwnProperty(idx)){
                continue;
            }
            let item2 = this.attr[idx];
            if (!(item2 instanceof VacWidgetAttrValue)){
                continue;
            }

            this.attrItems.push(item2);
        }
    }
}
