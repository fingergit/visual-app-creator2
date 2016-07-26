import {Component, OnInit, HostListener} from '@angular/core';
import {ROUTER_DIRECTIVES} from "@angular/router";
import {VacAction} from "../../../action/action";
import {LogService} from "../../../common/log.service";
import {VacProjectElem, EVacProjectElemType} from "../../../model/element/project-element";
import {ProjectService} from "../../../project/project.service";
import {ActionService} from "../../../action/action.service";
import {
    VacProjectWidgetTemplateService,
    VacProjectWidgetTemplate
} from "../../../model/widgets/service/project-widget-template-service";
import {VacProject} from "../../../model/element/project.model";
import {VacProjectPage} from "../../../model/element/project-page";
import {DialogService} from "../../../common/dialog.service";
import {VacProjectWidget} from "../../../model/element/project-widget";
import {AddWidgetByTemplateAction} from "../../../action/add-widget-by-template-action";
import {WidgetCompilerType, WidgetCompilerFactory} from "../../../model/widgets/compiler/widget-compiler-factory";
import {SplashComponent} from "../../../template/widget/splash/splash.component";

// https://github.com/DefinitelyTyped/DefinitelyTyped
/// <reference path="jquery.d.ts" />

@Component({
    selector: 'vac-edit-panel'
    ,templateUrl: 'app/page/home/edit-panel/edit-panel.component.html'
    ,styleUrls: ['app/page/home/edit-panel/edit-panel.component.css']
    ,directives: [SplashComponent]
    // ,providers: [HeroService, DialogService]
})
export class EditPanelComponent implements OnInit{
    containerId: string = 'widget-container';
    $container: JQuery;
    appFrame: HTMLFrameElement;
    $appFrameBody:JQuery;

    ngOnInit() {
        this.appFrame = window.frames['app-frame'];

        if (this.appFrame.hasOwnProperty('attachEvent')){
            this.appFrame['attachEvent']("onload", ()=>{
                this.initFrame(this.appFrame);
            });
        } else {
            this.appFrame.onload = ()=>{
                this.initFrame(this.appFrame);
            };
        }

        this.actionService.actionChanged.subscribe((action:VacAction) => {
            if (action.updateView.updateEditView) {
                LogService.d("now update editview");
                this._updateView();
            }
        });

        this.actionService.selectChanged.subscribe((elem: VacProjectElem) => {
            this._updateView();
        });

        this.actionService.projectChanged.subscribe(()=>{
            this._updateView();
        });
    }

    constructor(private projectService: ProjectService
                ,private actionService: ActionService
                ,private widgetTemplateService: VacProjectWidgetTemplateService
    ){
    }

    initFrame(appFrame:HTMLFrameElement){
        let $doc:HTMLDocument = appFrame.contentDocument;
        let $appFrameBody:JQuery = $($doc.body);
        this.$appFrameBody = $appFrameBody;
        this.$container = $appFrameBody.find("#widget-container");

        $appFrameBody.on('dragover', (e:JQueryEventObject) => {
            let e2:Event = e.originalEvent;
            e2.preventDefault();

            return false;
        });

        let that = this;
        $appFrameBody.on('drop', (e:JQueryEventObject) => {
            let e2:DragEvent = <DragEvent>e.originalEvent;
            let widgetType = e2.dataTransfer.getData('text/plain');

            let curProj:VacProject = that.projectService.curProject;
            let curPage:VacProjectPage = curProj.getCurrentPage();
            if (!curPage){
                DialogService.alert("请选中一个页面。");
                return;
            }

            let widgetTemplate: VacProjectWidgetTemplate = that.widgetTemplateService.get(widgetType);

            // 要添加的widget。
            let widget:VacProjectWidget = <VacProjectWidget>widgetTemplate.widget.clone();

            // 判断widget的父对象，如果目标为container，把它做为父对象，否则，使用当前页。
            let $target = $(e2.srcElement || e2.target);
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

        this.$container.on("mouseover mouseout", ".vac-widget", (event:JQueryEventObject)=>{
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

        this.$container.on("click", ".vac-widget", (event:JQueryEventObject)=>{
            event.stopImmediatePropagation();

            let oriEvent = event.originalEvent;
            let $target = $(oriEvent.srcElement || oriEvent.target);

            // $target.removeClass('widget-hover');
            // $target.addClass('widget-selected');

            let targetId:string = EditPanelComponent._getElemIdFromHtmlElement($target);
            this.actionService.selectElem(targetId, EVacProjectElemType.WIDGET, true);

            return false;
        });

        this.$container.on("click", (event:JQueryEventObject)=>{
            event.originalEvent.stopPropagation();
            event.originalEvent.preventDefault();
            this.actionService.selectElem(null, EVacProjectElemType.WIDGET, false);

            return false;
        });
    }

    private _updateView(){
        let curProj:VacProject = this.projectService.curProject;
        let curPage:VacProjectPage = curProj.getCurrentPage();
        if (this.$container.length == 0){
            this.$container = this.$appFrameBody.find("#widget-container");
        }
        this.$container.empty();
        if (!curPage){
        }
        else{
            this._addElements(curPage.children, this.$container);
        }
    }

    private _addElements(children: Array<VacProjectElem>, $container:JQuery){
        if ($container.length == 0){
            LogService.d('invalid widget container.');
            return;
        }

        for (let idx in children){
            if (!children.hasOwnProperty(idx)){
                continue;
            }

            let item:VacProjectElem = children[idx];
            let widget:VacProjectWidget = <VacProjectWidget>item;

            // let theCompile = Handlebars.compile(widget.htmlText);
            // let context = {
            //     widget: widget
            // };
            // let htmlText = theCompile(context);
            // htmlText = htmlText.replace(/\[\[/g, '{{');
            // htmlText = htmlText.replace(/\]\]/g, '}}');
            let compilerType = widget.compiler?widget.compiler: WidgetCompilerType.common;
            let compiler = WidgetCompilerFactory.queryCompiler(compilerType);
            let htmlText = compiler.compileHtml(widget);

            // ionic编译
            // let okHtml = this.appFrame.contentWindow.compileElement(htmlText);
            let okHtml = htmlText;

            let $widget:JQuery = $(okHtml);

            if (widget.state.selected){
                $widget.addClass("widget-selected");
            }

            $container.append($widget);
            LogService.d(this.$container);
            if (item.children && item.isContainer){
                this._addElements(item.children, $widget);
            }
        }
    }

    static _getElemIdFromHtmlElement($element:JQuery){
        let targetId:string = $element.attr("id");
        // let targetIdAry:Array<string> = targetId.split('-');
        // targetId = targetIdAry[targetIdAry.length-1];

        return targetId;
    }
}
