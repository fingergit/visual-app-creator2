import {Component, OnInit, AfterViewChecked, AfterViewInit, ViewChild} from '@angular/core';
import {ROUTER_DIRECTIVES} from "@angular/router";

import {ProjectService} from "../project/project.service";
import {LogService} from "../common/log.service";
import {ClipboardService} from "../project/clipboard.service";
import {ActionService} from "../action/action.service";
import {HotkeyService} from "./hotkey.service";
import {PlatformService} from "../common/platform.service";
import {CommandService} from "../common/command.service";
import {DialogService} from "../common/dialog.service";
import {VacProjectWidgetTemplateService} from "../model/widgets/service/project-widget-template-service";
import {ToolbarComponent} from "../page/home/toolbar/toolbar.component";
import {LeftPanelComponent} from "../page/home/left-panel/left-panel.component";
import {EditPanelComponent} from "../page/home/edit-panel/edit-panel.component";
import {RightPanelComponent} from "../page/home/right-panel/right-panel.component";
import {OpenProjectComponent} from "../page/home/open-project/open-project.component";

@Component({
    selector: 'my-app'
    ,templateUrl: 'app/app/app.component.html'
    ,styleUrls: ['app/app/app.component.css']
    // ,directives: [ROUTER_DIRECTIVES]
    ,directives: [ToolbarComponent, LeftPanelComponent,EditPanelComponent,RightPanelComponent,OpenProjectComponent]
    ,providers: [LogService, ActionService, ClipboardService, ProjectService, HotkeyService,CommandService, 
        PlatformService, DialogService,VacProjectWidgetTemplateService]
})
export class AppComponent implements OnInit,AfterViewChecked, AfterViewInit{
    title = 'Visual Application Creator';
    @ViewChild(ToolbarComponent) toolbar: ToolbarComponent;
    @ViewChild(LeftPanelComponent) leftPanel: LeftPanelComponent;
    @ViewChild(EditPanelComponent) editPanel: EditPanelComponent;
    @ViewChild(RightPanelComponent) rightPanel: RightPanelComponent;

    constructor(private hotkey: HotkeyService){
        // console.log("AppComponent constructor");
    }

    ngOnInit() {
        // console.log("AppComponent constructor ngOnInit");
    }

    ngAfterViewInit() {
        // viewChild is set after the view has been initialized
        let rightPanel:JQuery = $('vac-right-panel');
        let editPanel:JQuery = $('vac-edit-panel');
        let contentBody:JQuery = $('.content-body');
        let windowH:number = $(window).height();
        let rightTop:number = contentBody.position().top;
        let marginTop:number = (contentBody.outerHeight(true) - contentBody.outerHeight());
        rightPanel.height(windowH - (rightTop + marginTop));
        editPanel.height(windowH - (rightTop + marginTop));
    }

    ngAfterViewChecked() {
        // viewChild is updated after the view has been checked
        // if (this.prevHero === this.viewChild.hero) {
        //     this.logIt('AfterViewChecked (no change)');
        // } else {
        //     this.prevHero = this.viewChild.hero;
        //     this.logIt('AfterViewChecked');
        //     this.doSomething();
        // }
    }
}
