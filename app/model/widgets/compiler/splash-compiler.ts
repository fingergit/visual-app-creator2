import {WidgetCompiler} from "./widget-compiler";
import {VacProjectWidget} from "../../element/project-widget";
import {VacWidgetType} from "../custom-attr-factory";
import {VacListViewAttr} from "../list-view-attr";
import {VacSplashAttr} from "../splash-attr";
/**
 * Created by laj on 2016/7/15.
 */
export class SplashCompiler implements WidgetCompiler{
    compileHtml(widget:VacProjectWidget):string {
        if (widget.widgetType === VacWidgetType.splash){
        }

        let theCompile = Handlebars.compile(widget.htmlText);
        let context = {
            widget: widget
        };
        let htmlText = theCompile(context);
        htmlText = htmlText.replace(/\[\[/g, '{{');
        htmlText = htmlText.replace(/\]\]/g, '}}');

        let $elem:JQuery = $(htmlText);
        let custom:VacSplashAttr = <VacSplashAttr>widget.attrs.custom;
        $elem.css('background-color', custom.back.value);

        return $elem.prop('outerHTML');
    }
}