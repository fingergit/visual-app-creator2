import {Injectable} from "@angular/core";
import {VacProject} from "../model/project.model";
import {LogService} from "../common/log.service";
import {ClipboardService} from "./clipboard.service";
import {ActionService} from "../action/action.service";
import {MathAction, g_result} from "../action/math-action";
import {EVacProjectElemType} from "../model/project-element";

@Injectable()
export class ProjectService {
    projects: Array<VacProject> = [];
    curProject: VacProject = new VacProject('Untitled');

    constructor(private logger: LogService
        , private clipboard: ClipboardService){
        console.log('log: ' + this.logger);
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
        this.logger.d('loadProjects');
    }

    saveProjects(){
        this.logger.d('saveProjects');
    }

    newProject(){
        this.logger.d('newProject');
        //
        // var action = new MathAction("求和", 12);
        // this.actionService.addAction(action);
        // this.logger.d('g_result: ' + g_result);
    }

    openProject(){
        this.logger.d('openProject');
    }

    saveProject(){
        this.logger.d('saveProject');
    }

    undo(){
        // if (this.actionService.canUndo()){
        //     this.actionService.undo();
        //     this.logger.d('g_result: ' + g_result);
        // }
    }

    redo(){
        // if (this.actionService.canRedo()){
        //     this.actionService.redo();
        //     this.logger.d('g_result: ' + g_result);
        // }
    }
    //
    // canUndo() : boolean{
    //     return this.actionService.canUndo();
    // }
    //
    // canRedo(): boolean{
    //     return this.actionService.canRedo();
    // }

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
