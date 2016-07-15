import {Component, OnInit} from '@angular/core';
import {ROUTER_DIRECTIVES} from "@angular/router";
import {DragDirective} from "./drag.directive";
import {ProjectService} from "../../../../project/project.service";
import {ActionService} from "../../../../action/action.service";
import {VacProjectWidgetTemplateService} from "../../../../model/widgets/service/project-widget-template-service";
import {LogService} from "../../../../common/log.service";

declare var $;

@Component({
    selector: 'vac-widget-panel'
    ,templateUrl: 'app/page/home/left-panel/widget-panel/widget-panel.component.html'
    ,styleUrls: ['app/page/home/left-panel/widget-panel/widget-panel.component.css']
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
