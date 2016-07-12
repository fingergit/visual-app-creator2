import {Injectable} from "@angular/core";
import {VacProject} from "../model/project.model";
import {LogService} from "../common/log.service";
import {ClipboardService} from "./clipboard.service";
import {ActionService} from "../action/action.service";
import {MathAction, g_result} from "../action/math-action";
import {EVacProjectElemType} from "../model/project-element";
import {DialogService} from "../common/dialog.service";
import {Json} from "@angular/core/esm/src/facade/lang";
declare var $;

@Injectable()
export class ProjectService {
    projects: Array<VacProject> = [];
    isUntitled: boolean = true;
    curProject: VacProject = new VacProject('Untitled');

    constructor(private logger: LogService
        , private clipboard: ClipboardService
        ,private dialog: DialogService){
    }

    getProjects() {
        this.logger.d('getProjects');
        
        return this.projects;
    }

    getProject(name: string) {
        this.logger.d('getProject');

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

    loadProjects(){
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

        this.logger.d(projNameList);

        return projNameList;
    }

    saveProjects(){
    }

    newProject(){
        this.logger.d('newProject');
        //
        // var action = new MathAction("求和", 12);
        // this.actionService.addAction(action);
        // this.logger.d('g_result: ' + g_result);

        DialogService.input('请输入新项目名称', '', '项目名称', (text: string) => {
            this.curProject = new VacProject(text);
        });
    }

    openProject(){
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
        this.curProject.root.unlinkParents(null);
        let jsonText:string = Json.stringify(this.curProject);

        window.localStorage['proj-' + this.curProject.name] = jsonText;
        this.curProject.root.relinkParents(null, null);
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
