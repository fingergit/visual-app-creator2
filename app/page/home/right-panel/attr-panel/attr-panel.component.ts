import {Component, OnInit} from '@angular/core';
import {ROUTER_DIRECTIVES} from "@angular/router";
import {InputItemComponent} from "./attr-items/input/input.component";
import {CombBoxComponent} from "./attr-items/comb-box/comb-box.component";
import {SwitchComponent} from "./attr-items/switch/switch.component";
import {ListBoxComponent} from "./attr-items/list-box/list-box.component";
import {
    VacWidgetAttrs, VacWidgetAttr, VacWidgetTextAttr,
    VacWidgetPositionAttr, VacWidgetBorderAttr
} from "../../../../model/widget-attr/widget-attr";
import {VacWidgetAttrValue, EVacWidgetAttrType} from "../../../../model/widget-attr/widget-attr-type";
import {VacAction} from "../../../../action/action";
import {VacProjectElem} from "../../../../model/element/project-element";
import {ProjectService} from "../../../../project/project.service";
import {ActionService} from "../../../../action/action.service";
import {VacProject} from "../../../../model/element/project.model";
import {VacProjectWidget} from "../../../../model/element/project-widget";
import {InputFileComponent} from "./attr-items/input-file/input-file.component";
import {ColorComponent} from "./attr-items/color/color.component";

declare var $;

@Component({
    moduleId: module.id
    ,selector: 'vac-attr-panel'
    ,templateUrl: 'attr-panel.component.html'
    ,styleUrls: ['attr-panel.component.css']
    ,directives: [InputItemComponent,CombBoxComponent,SwitchComponent,ListBoxComponent,InputFileComponent,ColorComponent]
    // ,providers: [HeroService, DialogService]
})
export class AttrPanelComponent implements OnInit{
    attrs: VacWidgetAttrs = null;
    customAttrs: Array<VacWidgetAttrValue> = [];
    textAttrs: Array<VacWidgetAttrValue> = [];
    positionAttrs: Array<VacWidgetAttrValue> = [];
    borderAttrs: Array<VacWidgetAttrValue> = [];

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
        if (!curWidget){
            this.attrs = null;
        }
        else{
            this.attrs = curWidget.attrs;
            this.customAttrs = [];
            this.textAttrs = [];
            this.positionAttrs = [];
            this.borderAttrs = [];
            for (let attrkey in this.attrs){
                if (!this.attrs.hasOwnProperty(attrkey)){
                    continue;
                }
                let item = this.attrs[attrkey];
                if (!(item instanceof VacWidgetAttr)){
                    continue;
                }

                let ary:Array<VacWidgetAttrValue> = null;
                if (item instanceof VacWidgetTextAttr){
                    ary = this.textAttrs;
                }
                else if (item instanceof VacWidgetPositionAttr){
                    ary = this.positionAttrs;
                }
                else if (item instanceof VacWidgetBorderAttr){
                    ary = this.borderAttrs;
                }
                else{
                    ary = this.customAttrs;
                }

                for (let idx in item){
                    if (!item.hasOwnProperty(idx)){
                        continue;
                    }
                    let item2 = item[idx];
                    if (!(item2 instanceof VacWidgetAttrValue)){
                        continue;
                    }

                    ary.push(item2);
                }
            }
        }
    }
}
