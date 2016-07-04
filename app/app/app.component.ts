import {Component} from '@angular/core';
import {ROUTER_DIRECTIVES} from "@angular/router";

import { ToolbarComponent } from '../toolbar/toolbar.component';
import { LeftPanelComponent } from '../left-panel/left-panel.component';
import {ProjectService} from "../project/project.service";
import {LogService} from "../common/log.service";
import {ClipboardService} from "../project/clipboard.service";
import {ActionService} from "../action/action.service";

@Component({
    selector: 'my-app'
    ,templateUrl: 'app/app/app.component.html'
    // ,directives: [ROUTER_DIRECTIVES]
    ,directives: [ToolbarComponent, LeftPanelComponent]
    ,providers: [LogService, ActionService, ClipboardService, ProjectService]
})
export class AppComponent {
    title = 'Visual Application Creator';
}
