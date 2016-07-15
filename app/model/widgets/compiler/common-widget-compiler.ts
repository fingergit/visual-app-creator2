import {WidgetCompiler} from "./widget-compiler";
import {VacProjectWidget} from "../../element/project-widget";
/**
 * Created by laj on 2016/7/15.
 */
export class CommonWidgetCompiler implements WidgetCompiler{
    compileHtml(widget:VacProjectWidget):string {
        let theCompile = Handlebars.compile(widget.htmlText);
        let context = {
            widget: widget
        };
        let htmlText = theCompile(context);
        htmlText = htmlText.replace(/\[\[/g, '{{');
        htmlText = htmlText.replace(/\]\]/g, '}}');

        return htmlText;
    }
}