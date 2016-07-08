import {Component, OnInit} from '@angular/core';
import {ROUTER_DIRECTIVES} from "@angular/router";
import {ProjectService} from "../project/project.service";
import {ActionService} from "../action/action.service";
import {AttrPanelComponent} from "./attr-panel/attr-panel.component";

declare var $;

@Component({
    selector: 'vac-right-panel'
    ,templateUrl: 'app/right-panel/right-panel.component.html'
    ,styleUrls: ['app/right-panel/right-panel.component.css']
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
