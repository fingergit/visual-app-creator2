import {WidgetCompiler} from "./widget-compiler";
import {VacProjectWidget} from "../../element/project-widget";
import {VacWidgetType} from "../custom-attr-factory";
import {VacListViewAttr} from "../list-view-attr";
/**
 * Created by laj on 2016/7/15.
 */
export class ListWidgetCompiler implements WidgetCompiler{
    compileHtml(widget:VacProjectWidget):string {
        let items = '';
        if (widget.widgetType === VacWidgetType.listView){
            let attr:VacListViewAttr = <VacListViewAttr>widget.attrs.custom;
            for (let idx in attr.items.value){
                let item = attr.items.value[idx];
                items += '<ion-item>' + item + '</ion-item>';
            }
        }

        let theCompile = Handlebars.compile(widget.htmlText);
        let context = {
            widget: {
                id: widget.id,
                items: items
            }
        };
        let htmlText = theCompile(context);
        htmlText = htmlText.replace(/\[\[/g, '{{');
        htmlText = htmlText.replace(/\]\]/g, '}}');

        return htmlText;
    }
}