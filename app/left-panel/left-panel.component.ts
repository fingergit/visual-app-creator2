import {Component} from '@angular/core';
import {ROUTER_DIRECTIVES} from "@angular/router";
import {ProjectTreeComponent} from "./project-tree/project-tree.component";
import {ProjectService} from "../project/project.service";
import {ActionService} from "../action/action.service";
import {AddProjectElemAction} from "../action/add-project-elem-action";
import {EVacProjectElemType} from "../model/project-element";

@Component({
    selector: 'vac-left-panel'
    ,templateUrl: 'app/left-panel/left-panel.component.html'
    ,styleUrls: ['app/left-panel/left-panel.component.css']
    ,directives: [ProjectTreeComponent]
    // ,providers: [HeroService, DialogService]
})
export class LeftPanelComponent {
    constructor(private projectService: ProjectService
                ,private actionService: ActionService
    ){
    }

    addGroup(){
        this.actionService.addGroup();
    }

    addPage(){
        this.actionService.addPage();
    }
}
