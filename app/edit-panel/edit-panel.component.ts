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
    $container: JQuery;
    appFrame: HTMLFrameElement;
    ngOnInit() {
        this.appFrame = window.frames['app-frame'];

        if (this.appFrame.attachEvent){
            this.appFrame.attachEvent("onload", ()=>{
                this.initFrame(this.appFrame);
            });
        } else {
            this.appFrame.onload = ()=>{
                this.initFrame(this.appFrame);
            };
        }

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
                ,private widgetTemplateService: VacProjectWidgetTemplateService
    ){
    }

    initFrame(appFrame:HTMLElement){
        let $doc:HTMLDocument = appFrame.contentDocument;
        let $appFrameBody:JQuery = $($doc.body);
        this.$container = $appFrameBody.find("#widget-container");

        $appFrameBody.on('dragover', (e) => {
            e = e.originalEvent;
            e.preventDefault();

            return false;
        });

        let that = this;
        $appFrameBody.on('drop', (e) => {
            e = e.originalEvent;
            let widgetType = e.dataTransfer.getData('text/plain');

            let curProj:VacProject = that.projectService.curProject;
            let curPage:VacProjectPage = curProj.getCurrentPage();
            if (!curPage){
                DialogService.alert("请选中一个页面。");
                return;
            }

            let widgetTemplate: VacProjectWidgetTemplate = that.widgetTemplateService.get(widgetType);

            // 要添加的widget。
            let widget:VacProjectElem = widgetTemplate.widget.clone();

            // 判断widget的父对象，如果目标为container，把它做为父对象，否则，使用当前页。
            let $target = $(e.srcElement || e.target);
            let targetId:string = EditPanelComponent._getElemIdFromHtmlElement($target);

            let parentElem:VacProjectElem = null;
            if (targetId === that.containerId){
                parentElem = curPage;
            }
            else{
                parentElem = curPage.getChild(curPage.children, EVacProjectElemType.WIDGET, targetId);
                if (null == parentElem || !parentElem.isContainer){
                    parentElem = curPage;
                }
            }

            let action:AddWidgetByTemplateAction = new AddWidgetByTemplateAction(parentElem, widget, curProj);
            that.actionService.addAction(action);
        });

        this.$container.on("mouseover mouseout", ".vac-widget", (event:jQuery.Event)=>{
            let oriEvent = event.originalEvent;
            let $target = $(oriEvent.srcElement || oriEvent.target);
            if(event.type == "mouseover"){
                if ($target.hasClass('widget-selected')){
                    // 已选中，什么都不做。
                    return true;
                }
                //鼠标悬浮
                $(event.originalEvent.target).addClass('widget-hover');
            }else if(event.type == "mouseout"){
                //鼠标离开
                $(event.originalEvent.target).removeClass('widget-hover');
            }
            return false;
        });

        this.$container.on("click", ".vac-widget", (event:jQuery.Event)=>{
            event.stopImmediatePropagation();

            let oriEvent = event.originalEvent;
            let $target = $(oriEvent.srcElement || oriEvent.target);

            // $target.removeClass('widget-hover');
            // $target.addClass('widget-selected');

            let targetId:string = EditPanelComponent._getElemIdFromHtmlElement($target);
            this.actionService.selectElem(targetId, EVacProjectElemType.WIDGET, true);

            return false;
        });

        this.$container.on("click", (event:jQuery.Event)=>{
            event.originalEvent.stopPropagation();
            event.originalEvent.preventDefault();
            return false;
        });
    }

    private updateEditView(){
        let curProj:VacProject = this.projectService.curProject;
        let curPage:VacProjectPage = curProj.getCurrentPage();
        this.$container.empty();
        if (!curPage){
        }
        else{
            this._addElements(curPage.children, this.$container);
        }
    }

    private _addElements(children: Array<VacProjectElem>, $container:JQuery){
        if (!$container){
            $container = this.$container;
        }

        for (let idx in children){
            if (!children.hasOwnProperty(idx)){
                continue;
            }

            let item:VacProjectElem = children[idx];
            let widget:VacProjectWidget = <VacProjectWidget>item;

            let theCompile = Handlebars.compile(widget.htmlText);
            let context = {
                widget: widget
                // widget: {
                //     name: widget.name
                //     ,id: widget.widgetType + '-' + widget.id
                // }
            };
            let htmlText = theCompile(context);

            // ionic编译
            let okHtml = this.appFrame.contentWindow.compileElement(htmlText);

            let $widget:JQuery = $(okHtml);

            if (widget.state.selected){
                $widget.addClass("widget-selected");
            }

            $container.append($widget);
            if (item.children && item.isContainer){
                this._addElements(item.children, $widget);
            }
        }
    }

    static _getElemIdFromHtmlElement($element:JQuery){
        let targetId:string = $element.attr("id");
        let targetIdAry:Array = targetId.split('-');
        targetId = targetIdAry[targetIdAry.length-1];

        return targetId;
    }
}
