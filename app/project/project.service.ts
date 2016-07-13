import {Injectable} from "@angular/core";
import {VacProject} from "../model/project.model";
import {LogService} from "../common/log.service";
import {ClipboardService} from "./clipboard.service";
import {ActionService} from "../action/action.service";
import {MathAction, g_result} from "../action/math-action";
import {EVacProjectElemType} from "../model/project-element";
import {DialogService} from "../common/dialog.service";
import {Json} from "@angular/core/esm/src/facade/lang";
/// <reference path="jquery.d.ts" />

@Injectable()
export class ProjectService {
    projects: Array<VacProject> = [];
    isUntitled: boolean = true;
    curProject: VacProject = new VacProject('Untitled');

    constructor(private clipboard: ClipboardService
        ,private dialog: DialogService){
    }

    getProjects() {
        LogService.d('getProjects');
        
        return this.projects;
    }

    getProject(name: string) {
        LogService.d('getProject');

        let retProj : VacProject = null;

        for (let proj in this.projects){
            if (!this.projects.hasOwnProperty(proj)){
                continue;
            }
            let item = this.projects[proj];
            if (item.name === name){
                retProj = item;
                break;
            }
        }
        
        return retProj;
    }

    static loadProjects(){
        var storage = window.localStorage;
        var projNameList = [];
        for (var item in storage){
            if (!storage.hasOwnProperty(item)){
                continue;
            }
            if (item.substring(0, 5) === 'proj-'){
                projNameList.push(item.substring(5));
            }
        }

        return projNameList;
    }

    saveProjects(){
    }

    newProject(){
        LogService.d('newProject');
        //
        // var action = new MathAction("求和", 12);
        // this.actionService.addAction(action);
        // LogService.d('g_result: ' + g_result);

        DialogService.input('请输入新项目名称', '', '项目名称', (text: string) => {
            this.curProject = new VacProject(text);
        });
    }

    openProject(){
        let $dlgContent:JQuery = $("#project-list-content");

        let content:string = $dlgContent.html();
        let $dlg = $.dialog({
            title: "选择项目",
            content: content,
            onOpen: function(){
                var that = this;
                this.$content.find('.proj-name').on('click', (event) => {
                    let oriEvent = event.originalEvent;
                    let $target = $(oriEvent.srcElement || oriEvent.target);
                    let text = $target.text();
                    $dlg.close();
                    ProjectService._openProject(text);
                });
            }
        });
    }

    private static _openProject(name: string){
        if (!name){
            return;
        }

        name = 'proj-' + name;
        let storage = window.localStorage;
        if (!storage){
            DialogService.alert("项目" + name + "不存在！");
            return;
        }

        let jsonObj = Json.parse(storage[name]);
        console.debug(Json.stringify(jsonObj));
    }

    saveProject(){
        if (!this.curProject){
            return;
        }

        if (this.isUntitled){
            DialogService.input('请输入项目名称', '', '项目名称', (text: string) => {
                this.curProject.name = text;
                this._saveProject();
                this.isUntitled = false;
            });
        }
        else{
            this._saveProject();
        }
    }

    private _saveProject(){
        window.localStorage['proj-' + this.curProject.name] = this.curProject.toJsonText();
    }

    copy(){
        this.clipboard.copy();
    }

    cut(){
        this.clipboard.cut();
    }

    paste(){
        this.clipboard.paste();
    }

    remove(){
        this.clipboard.remove();
    }

    unSelect(){
       // 放弃对控件的选择。
    }
}
