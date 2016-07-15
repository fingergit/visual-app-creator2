import {VacProjectWidget} from "../../element/project-widget";

/**
 * Created by laj on 2016/7/15.
 */
export interface WidgetCompiler{
    compileHtml(widget:VacProjectWidget):string;
}