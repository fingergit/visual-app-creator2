import {Component, OnInit} from '@angular/core';
import {ROUTER_DIRECTIVES} from "@angular/router";
import {ProjectService} from "../../project/project.service";
import {ActionService} from "../../action/action.service";
import {VacAction} from "../../action/action";
import {VacProjectPage} from "../../model/project-page";
import {VacProject} from "../../model/project.model";
import {VacProjectWidget} from "../../model/project-widget";
import {
    VacWidgetAttrs, VacWidgetAttr, VacWidgetTextAttr, VacWidgetPositionAttr,
    VacWidgetBorderAttr
} from "../../model/widget-attr";
import {InputItemComponent} from "./attr-items/input-item.component";
import {VacWidgetAttrValue, EVacWidgetAttrType} from "../../model/attr-type";
import {VacProjectElem} from "../../model/project-element";

declare var $;

@Component({
    selector: 'vac-attr-panel'
    ,templateUrl: 'app/right-panel/attr-panel/attr-panel.component.html'
    ,styleUrls: ['app/right-panel/attr-panel/attr-panel.component.css']
    ,directives: [InputItemComponent]
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
            if (action.updatePropPanel){
                this.updatePanel();
            }
        }, ()=>{}, ()=>{});

        this.actionService.selectChanged.subscribe((elem: VacProjectElem) => {
            this.updatePanel();
        }, ()=>{}, ()=>{});
    }
    constructor(private projectService: ProjectService
                ,private actionService: ActionService
    ){
    }

    private updatePanel(){
        let curProj:VacProject = this.projectService.curProject;
        let curWidget:VacProjectWidget = curProj.currentWidget;
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
