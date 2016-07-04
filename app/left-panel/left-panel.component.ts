import {Component} from '@angular/core';
import {ROUTER_DIRECTIVES} from "@angular/router";
import {ProjectTreeComponent} from "./project-tree/project-tree.component";

@Component({
    selector: 'vac-left-panel'
    ,templateUrl: 'app/left-panel/left-panel.component.html'
    ,styleUrls: ['app/left-panel/left-panel.component.css']
    ,directives: [ProjectTreeComponent]
    // ,providers: [HeroService, DialogService]
})
export class LeftPanelComponent {
}
