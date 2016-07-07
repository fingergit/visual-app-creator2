import {EVacProjectElemType} from "../model/project-element";
/**
 * Created by laj on 2016/7/7.
 */
export class ProjectElemUtils{
    static getTreeViewIcon(type: EVacProjectElemType){
        switch (type){
            case EVacProjectElemType.GROUP:
                return 'glyphicon glyphicon-book';
            case EVacProjectElemType.PAGE:
                return 'glyphicon glyphicon-file';
            case EVacProjectElemType.WIDGET:
                return 'glyphicon glyphicon-font';
        }

        return '';
    }
}