import {Component, OnInit} from '@angular/core';
import {ROUTER_DIRECTIVES} from "@angular/router";

import { ToolbarComponent } from '../toolbar/toolbar.component';
import { LeftPanelComponent } from '../left-panel/left-panel.component';
import {ProjectService} from "../project/project.service";
import {LogService} from "../common/log.service";
import {ClipboardService} from "../project/clipboard.service";
import {ActionService} from "../action/action.service";
import {HotkeyService} from "./hotkey.service";
import {PlatformService} from "../common/platform.service";
import {CommandService} from "../common/command.service";
import {DialogService} from "../common/dialog.service";
import {VacProjectWidgetTemplateService} from "../project/project-widget-template-service";
import {EditPanelComponent} from "../edit-panel/edit-panel.component";

@Component({
    selector: 'my-app'
    ,templateUrl: 'app/app/app.component.html'
    ,styleUrls: ['app/app/app.component.css']
    // ,directives: [ROUTER_DIRECTIVES]
    ,directives: [ToolbarComponent, LeftPanelComponent,EditPanelComponent]
    ,providers: [LogService, ActionService, ClipboardService, ProjectService, HotkeyService,CommandService, 
        PlatformService, DialogService,VacProjectWidgetTemplateService]
})
export class AppComponent implements OnInit{
    title = 'Visual Application Creator';
    constructor(private hotkey: HotkeyService){
        // console.log("AppComponent constructor");
    }

    ngOnInit() {
        // console.log("AppComponent constructor ngOnInit");
    }
}
