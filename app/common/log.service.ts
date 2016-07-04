import {Injectable} from "@angular/core";

/**
 * Created by laj on 2016/7/4.
 */
@Injectable()
export class LogService {
    enableOutput: boolean = true;

    d(info: string){
        if (this.enableOutput){
            console.info(info);
        }
    }

    i(info: string){
        if (this.enableOutput){
            console.debug(info);
        }
    }

    w(info: string){
        if (this.enableOutput){
            console.warn(info);
        }
    }

    e(info: string){
        if (this.enableOutput){
            console.error(info);
        }
    }
}
