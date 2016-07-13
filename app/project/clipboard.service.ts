import {VacProject} from "../model/project.model";
import {Injectable} from "@angular/core";
import {LogService} from "../common/log.service";
/**
 * Created by laj on 2016/7/4.
 */

@Injectable()
export class ClipboardService {
    curProject: VacProject = null;

    constructor(){

    }

    canUndo(): boolean{
        LogService.d('canUndo');
        return false;
    }

    canRedo(): boolean{
        LogService.d('canRedo');
        return false;
    }

    copy(){
        LogService.d('copy');
    }

    cut(){
        LogService.d('cut');
    }

    paste(){
        LogService.d('paste');
    }

    remove(){
        LogService.d('remove');
    }
}
