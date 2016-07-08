import {Component, OnInit, HostListener} from '@angular/core';
import {ROUTER_DIRECTIVES} from "@angular/router";
import {ProjectService} from "../project/project.service";
import {ActionService} from "../action/action.service";
import {LogService} from "../common/log.service";
import {VacProjectWidgetTemplate, VacProjectWidgetTemplateService} from "../project/project-widget-template-service";
import {VacProjectElem, EVacProjectElemType} from "../model/project-element";
import {VacProject} from "../model/project.model";
import {VacProjectPage} from "../model/project-page";
import {DialogService} from "../common/dialog.service";
import {AddWidgetByTemplateAction} from "../action/add-widget-by-template-action";
import {VacAction} from "../action/action";
import {VacProjectWidget} from "../model/project-widget";

// https://github.com/DefinitelyTyped/DefinitelyTyped
/// <reference path="jquery.d.ts" />

@Component({
    selector: 'vac-edit-panel'
    ,templateUrl: 'app/edit-panel/edit-panel.component.html'
    ,styleUrls: ['app/edit-panel/edit-panel.component.css']
    ,directives: []
    // ,providers: [HeroService, DialogService]
})
export class EditPanelComponent implements OnInit{
    containerId: string = 'widget-container';
    container: JQuery;
    ngOnInit() {
        this.container = $("#widget-container");
        this.logger.d(this.container.text());
        this.actionService.actionChanged.subscribe((action:VacAction) => {
            if (action.updateEditView) {
                this.logger.d("now update editview");
                this.updateEditView();
            }
        });

        this.actionService.selectChanged.subscribe((elem: VacProjectElem) => {
            this.updateEditView();
        });
    }

    constructor(private projectService: ProjectService
                ,private actionService: ActionService
                ,private logger: LogService
                ,private widgetTemplateService: VacProjectWidgetTemplateService
    ){
    }

    @HostListener('dragover', ['$event']) onDragOver(e) {
        e.preventDefault();
        return false;
    }

    @HostListener('drop', ['$event']) onDrop(e) {
        let widgetType = e.dataTransfer.getData('text/plain');
        // widgetType = JSON.parse(widgetType);
        // this.logger.d(widgetType);

        let curProj:VacProject = this.projectService.curProject;
        let curPage:VacProjectPage = curProj.currentPage;
        if (!curPage){
            DialogService.alert("请选中一个页面。");
            return;
        }

        let widgetTemplate: VacProjectWidgetTemplate = this.widgetTemplateService.get(widgetType);
        // let $widget = $(widgetTemplate.widget.htmlText);
        // this.container.append($widget);

        // 要添加的widget。
        let widget:VacProjectElem = widgetTemplate.widget.clone();

        // 判断widget的父对象，如果目标为container，把它做为父对象，否则，使用当前页。
        let $target = $(e.srcElement || e.target);
        let targetId:string = $target.attr("id");
        let targetIdAry:Array = targetId.split('-');
        targetId = targetIdAry[targetIdAry.length-1];

        let parentElem:VacProjectElem = null;
        if (targetId === this.containerId){
            parentElem = curPage;
        }
        else{
            parentElem = curPage.getChild(curPage.children, EVacProjectElemType.WIDGET, targetId);
            if (null == parentElem || !parentElem.isContainer){
                parentElem = curPage;
            }
        }

        let action:AddWidgetByTemplateAction = new AddWidgetByTemplateAction(parentElem, widget, curProj);
        this.actionService.addAction(action);

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

    private updateEditView(){
        let curProj:VacProject = this.projectService.curProject;
        let curPage:VacProjectPage = curProj.currentPage;
        this.container.empty();
        if (!curPage){
        }
        else{
            this._addElements(curPage.children, this.container);
        }
    }

    private _addElements(children: Array<VacProjectElem>, $container:JQuery){
        if (!$container){
            $container = this.container;
        }

        for (let idx in children){
            if (!children.hasOwnProperty(idx)){
                continue;
            }

            let item:VacProjectElem = children[idx];
            let widget:VacProjectWidget = <VacProjectWidget>item;

            let theCompile = Handlebars.compile(widget.htmlText);
            let context = {
                widget: {
                    name: widget.name
                    ,id: widget.widgetType + '-' + widget.id
                }
            };
            let htmlText = theCompile(context);
            let $widget:JQuery = $(htmlText);

            if (widget.state.selected){
                $widget.addClass("widget-selected");
            }

            $container.append($widget);
            if (item.children && item.isContainer){
                this._addElement(item.children, $widget);
            }
        }
    }
}
