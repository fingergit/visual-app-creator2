import {Component, OnInit, HostListener} from '@angular/core';
import {ROUTER_DIRECTIVES} from "@angular/router";
import {ProjectService} from "../project/project.service";
import {ActionService} from "../action/action.service";
import {LogService} from "../common/log.service";

declare var $;

@Component({
    selector: 'vac-edit-panel'
    ,templateUrl: 'app/edit-panel/edit-panel.component.html'
    ,styleUrls: ['app/edit-panel/edit-panel.component.css']
    ,directives: []
    // ,providers: [HeroService, DialogService]
})
export class EditPanelComponent implements OnInit{
    ngOnInit() {
    }
    constructor(private projectService: ProjectService
                ,private actionService: ActionService
                ,private logger: LogService
    ){
    }

    @HostListener('dragover', ['$event']) onDragOver(e) {
        e.preventDefault();
        return false;
    }

    @HostListener('drop', ['$event']) onDrop(e) {
        let widgetType = e.dataTransfer.getData('text/plain');
        widgetType = JSON.parse(widgetType);
        this.logger.d(widgetType);

        var target = e.srcElement || e.target;

        // var attr = SFinWidgetAttr.newInstance(EFinProjWidgetDesc[widgetType].attr ? eval(EFinProjWidgetDesc[widgetType].attr) : null);
        // var newWidget = SFinProject.newWidget('added' + $rootScope.idx, $rootScope.project, widgetType, attr);
        // var html = SFinProject.renderPage(newWidget);
        //
        // var okHtml = window.frames[frameName].compileElement(html);
        // var $elem = $(okHtml);
        // $elem.appendTo($(target));
        //
        // var action = new AddWidgetAction($rootScope, '添加控件', newWidget, $rootScope.selectedElem);
        // ActionManager.addAction(action);
        // $rootScope.idx ++;
    }
}
