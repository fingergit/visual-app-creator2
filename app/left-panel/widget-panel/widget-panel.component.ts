import {Component, OnInit} from '@angular/core';
import {ROUTER_DIRECTIVES} from "@angular/router";
import {ProjectService} from "../../project/project.service";
import {ActionService} from "../../action/action.service";
import {VacAction} from "../../action/action";
import {LogService} from "../../common/log.service";
import {Json} from "@angular/core/esm/src/facade/lang";
import {VacProjectElem, EVacProjectElemType} from "../../model/project-element";
import {ProjectElemUtils} from "../../utils/project-elem-utils";
import {VacProjectWidgetTemplateService} from "../../project/project-widget-template-service";
import {DragDirective} from "./drag.directive";

declare var $;

@Component({
    selector: 'vac-widget-panel'
    ,templateUrl: 'app/left-panel/widget-panel/widget-panel.component.html'
    ,styleUrls: ['app/left-panel/widget-panel/widget-panel.component.css']
    ,directives: [DragDirective]
    // ,providers: [HeroService, DialogService]
})
export class WidgetPanelComponent implements OnInit{
    treeCtrl:any = null;
    constructor(private projectService: ProjectService
                ,private actionService: ActionService
                ,private widgetTemplate: VacProjectWidgetTemplateService
    ){
        LogService.d(this.widgetTemplate.templates.get("radio"));
    }

    ngOnInit(){
    }
}
