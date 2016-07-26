import {Injectable} from "@angular/core";
import {VacProject} from "../model/element/project.model";
import {LogService} from "../common/log.service";
import {ClipboardService} from "./clipboard.service";
import {DialogService} from "../common/dialog.service";
import {EVacProjectElemType} from "../model/element/project-element";

/// <reference path="jquery.d.ts" />

@Injectable()
export class ProjectService {
    projects: Array<VacProject> = [];
    private static UNTITLED = 'Untitled';
    curProject: VacProject = new VacProject(ProjectService.UNTITLED);

    constructor(private clipboard: ClipboardService
        ,private dialog: DialogService){
        this.curProject.addElement('default', EVacProjectElemType.PAGE, null);
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
            if (item.getName() === name){
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

    newProject(afterNew:()=>void){
        LogService.d('newProject');

        DialogService.input('请输入新项目名称', '', '项目名称', (text: string) => {
            this.curProject = new VacProject(text);
            if (afterNew){
                afterNew();
            }
        });
    }

    openProject(afterOpen:()=>void){
        let $dlgContent:JQuery = $("#project-list-content");

        let content:string = $dlgContent.html();
        var that = this;
        let $dlg = $.dialog({
            title: "选择项目",
            content: content,
            onOpen: function(){
                this.$content.find('.proj-name').on('click', (event) => {
                    let oriEvent = event.originalEvent;
                    let $target = $(oriEvent.srcElement || oriEvent.target);
                    let text = $target.text();
                    $dlg.close();
                    // ProjectService._openProject(text);
                    if (that._openProject(text)){
                        if (afterOpen){
                            afterOpen();
                        }
                    }
                });
            }
        });
    }

    private _openProject(name: string):boolean{
        if (!name){
            return false;
        }

        name = 'proj-' + name;
        let storage = window.localStorage;
        if (!storage){
            DialogService.alert("项目" + name + "不存在！");
            return;
        }

        let proj:VacProject = VacProject.fromJson(storage[name]);
        // console.debug(proj.toJsonText());
        if (proj){
            this.curProject = proj;
            return true;
        }

        return false;
    }

    saveProject(){
        if (!this.curProject){
            return;
        }

        if (this.curProject.getName() === ProjectService.UNTITLED){
            DialogService.input('请输入项目名称', '', '项目名称', (text: string) => {
                this.curProject.setName(text);
                this._saveProject();
            });
        }
        else{
            this._saveProject();
        }
    }

    private _saveProject(){
        window.localStorage['proj-' + this.curProject.getName()] = this.curProject.toJsonText();
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
