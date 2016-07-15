import {EVacProjectElemType} from "../model/element/project-element";
import {VacProjectWidget} from "../model/element/project-widget";
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

    static widgetHtmlId2Id(htmlId: string, widget: VacProjectWidget){
        widget.id = EVacProjectElemType[widget.elemType] + '-' + widget.widgetType + '-' + htmlId;
    }
}