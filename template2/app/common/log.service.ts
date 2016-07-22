import {Injectable} from "@angular/core";

/**
 * Created by laj on 2016/7/4.
 */
@Injectable()
export class LogService {
    static enableOutput: boolean = true;

    static d(info: any){
        if (LogService.enableOutput){
            console.info(info);
        }
    }

    static i(info: any){
        if (LogService.enableOutput){
            console.debug(info);
        }
    }

    static w(info: any){
        if (LogService.enableOutput){
            console.warn(info);
        }
    }

    static e(info: any){
        if (LogService.enableOutput){
            console.error(info);
        }
    }
}
