import {EVacProjectElemType, VacProjectElem} from "./project-element";
import {VacProjectGroup} from "./project-group";
import {VacProjectPage} from "./project-page";
import {VacProjectWidget} from "./project-widget";
import {LogService} from "../../common/log.service";
/**
 * Created by laj on 2016/7/4.
 */

export class VacProjectElemFactory{
    static createElement(elemType: EVacProjectElemType) : VacProjectElem{
        let elem:VacProjectElem = null;
        switch (elemType){
            case EVacProjectElemType.GROUP:
                elem = VacProjectGroup.newInstance();
                break;
            case EVacProjectElemType.PAGE:
                elem = VacProjectPage.newInstance();
                break;
            case EVacProjectElemType.WIDGET:
                elem = VacProjectWidget.newInstance();
                break;
        }

        return elem;
    }


    static fromJsonObj(elem:VacProjectElem, obj:Object){
        do{
            if (!elem){
                LogService.d("invalid project element.");
                break;
            }

            if (!obj || !obj.hasOwnProperty('name') || !obj.hasOwnProperty('elemType') || !obj.hasOwnProperty('id')){
                LogService.d("invalid project element: ");
                LogService.d(obj);
                break;
            }

            elem.parent = null;
            for (let key in obj){
                if (!obj.hasOwnProperty(key)){
                    continue;
                }

                let item = obj[key];
                if (!VacProjectElemFactory.fromJsonObjKey(elem, key, item, obj) && !elem.fromJsonObjKey(key, item, obj)){
                    LogService.d("not processed key: " + key);
                }
            }

        }while(false);
    }

    // 需要重载。
    static fromJsonObjKey(elem: VacProjectElem, key: string, value: any, obj: Object):boolean{
        let done:boolean = false;

        if (key === 'name' ||
            key == 'elemType' ||
            key == 'id' ||
            key == 'isContainer'
        ){
            elem[key] = value;
            done = true;
        }
        else if (key === 'state'){
            elem.state.fromJsonObj(value);
            done = true;
        }
        else if (key == 'children'){
            for (let key2 in value){
                if (!value.hasOwnProperty(key2)){
                    continue;
                }
                let child = value[key2];
                LogService.d("child: ");
                LogService.d(child);
                let childType:EVacProjectElemType = child.elemType;
                if (!child || !child.elemType){
                    LogService.d('not valid child: ');
                    LogService.d(child);
                    continue;
                }

                let childElem = VacProjectElemFactory.createElement(childType);
                // switch (childType){
                //     case EVacProjectElemType.GROUP:
                //         childElem = VacProjectGroup.newInstance();
                //         break;
                //     case EVacProjectElemType.PAGE:
                //         childElem = VacProjectPage.newInstance();
                //         break;
                //     case EVacProjectElemType.WIDGET:
                //         childElem = VacProjectWidget.newInstance();
                //         break;
                // }
                // if (!childElem){
                //     LogService.d('invalid element type');
                //     continue;
                // }

                VacProjectElemFactory.fromJsonObj(childElem, child);
                if (!elem.children){
                    elem.children = [];
                }

                childElem.parent = elem;
                elem.children.push(childElem);
            }
        }

        return done;
    }
}