import {Component, OnInit} from '@angular/core';
import {ROUTER_DIRECTIVES} from "@angular/router";
import {AttrPanelComponent} from "./attr-panel/attr-panel.component";
import {ProjectService} from "../../../project/project.service";
import {ActionService} from "../../../action/action.service";

declare var $;

@Component({
    moduleId: module.id
    ,selector: 'vac-right-panel'
    ,templateUrl: 'right-panel.component.html'
    ,styleUrls: ['right-panel.component.css']
    ,directives: [AttrPanelComponent]
    // ,providers: [HeroService, DialogService]
})
export class RightPanelComponent implements OnInit{
    ngOnInit() {
    }
    constructor(private projectService: ProjectService
                ,private actionService: ActionService
    ){
    }
}
