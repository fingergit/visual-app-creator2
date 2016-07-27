import {WidgetCompiler} from "./widget-compiler";
import {VacProjectWidget} from "../../element/project-widget";
import {VacWidgetPositionAttr, VacWidgetBorderAttr} from "../../widget-attr/widget-attr";
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

        let $elem:JQuery = $(htmlText);
        let position:VacWidgetPositionAttr = <VacWidgetPositionAttr>widget.attrs.position;
        if (null != position){
            $elem.css('position', position.position.value.value);
            $elem.css('float', position.float.value.value);
            $elem.css('left', position.floatLeft.value);
            $elem.css('right', position.floatRight.value);
            $elem.css('top', position.floatTop.value);
            $elem.css('bottom', position.floatBottom.value);

            if (position.center.value){
                $elem.css('position', 'absolute');
            }
        }

        let border:VacWidgetBorderAttr = <VacWidgetBorderAttr>widget.attrs.border;
        if (null != border){
            $elem.css('marginLeft', border.marginLeft.value);
            $elem.css('marginRight', border.marginRight.value);
            $elem.css('marginTop', border.marginTop.value);
            $elem.css('marginBottom', border.marginBottom.value);

            $elem.css('paddingLeft', border.paddingLeft.value);
            $elem.css('paddingRight', border.paddingRight.value);
            $elem.css('paddingTop', border.paddingTop.value);
            $elem.css('paddingBottom', border.paddingBottom.value);

            $elem.css('borderLeftColor', border.leftColor.value);
            $elem.css('borderLeftStyle', border.leftStyle.value.value);
            $elem.css('borderLeftWidth', border.leftWidth.value);

            $elem.css('borderRightColor', border.rightColor.value);
            $elem.css('borderRightStyle', border.rightStyle.value.value);
            $elem.css('borderRightWidth', border.rightWidth.value);

            $elem.css('borderTopColor', border.topColor.value);
            $elem.css('borderTopStyle', border.topStyle.value.value);
            $elem.css('borderTopWidth', border.topWidth.value);

            $elem.css('borderBottomColor', border.bottomColor.value);
            $elem.css('borderBottomStyle', border.bottomStyle.value.value);
            $elem.css('borderBottomWidth', border.bottomWidth.value);

            $elem.css('borderTopLeftRadius', border.tlRadius.value);
            $elem.css('borderTopRightRadius', border.trRadius.value);
            $elem.css('borderBottomLeftRadius', border.blRadius.value);
            $elem.css('borderBottomRightRadius', border.brRadius.value);
        }

        return $elem.prop('outerHTML');
    }
}