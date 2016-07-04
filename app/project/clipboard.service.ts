import {ProjectModel} from "./project.model";
import {Injectable} from "@angular/core";
import {LogService} from "../common/log.service";
/**
 * Created by laj on 2016/7/4.
 */

@Injectable()
export class ClipboardService {
    curProject: ProjectModel = null;

    constructor(private log: LogService){

    }

    canUndo(): boolean{
        this.log.d('canUndo');
        return false;
    }

    canRedo(): boolean{
        this.log.d('canRedo');
        return false;
    }

    copy(){
        this.log.d('copy');
    }

    cut(){
        this.log.d('cut');
    }

    paste(){
        this.log.d('paste');
    }

    remove(){
        this.log.d('remove');
    }
}
