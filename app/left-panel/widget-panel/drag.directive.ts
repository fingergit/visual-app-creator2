import {Directive, ElementRef, HostListener, Input} from '@angular/core';
import {Json} from "@angular/core/esm/src/facade/lang";
import {VacProjectWidgetTemplateService} from "../../project/project-widget-template-service";
import {LogService} from "../../common/log.service";

declare var $;

@Directive({ selector: '[vac-drag]' })
export class DragDirective{
    @Input('vac-drag') widgetType: string;

    constructor(el: ElementRef,
                private templateService: VacProjectWidgetTemplateService) {
        // el.nativeElement.style.backgroundColor = 'yellow';
        let $elem = $(el.nativeElement);
        $elem.attr('draggable', true);
        // $elem.on('dragstart', function (e) {
        //     // var text = '<label class="toggle"><input type="checkbox"><div class="track"><div class="handle"></div></div></label>';
        //     let target = e.originalEvent.srcElement || e.originalEvent.target;
        //     let type = $(target).data('widget-type');
        //     let tempText = Json.stringify(templateService.templates.get(type));
        //     e.originalEvent.dataTransfer.setData('text/plain', tempText);
        //
        //     // var backImg = $(e.target).find(".widget:first-child").css("background-image");
        //     // backImg = backImg.slice(5,backImg.length-2);
        //     // var $img = $("<img src='" + backImg + "'>");
        //     // e.originalEvent.dataTransfer.setDragImage($img[0], 0, 0);
        //
        //     // e.originalEvent.dataTransfer.effectAllowed = "move";
        //     return true;
        // });
    }

    @HostListener('dragstart', ['$event']) onDragStart(e) {
        // var text = '<label class="toggle"><input type="checkbox"><div class="track"><div class="handle"></div></div></label>';
        let target = e.srcElement || e.target;
        // let tempText = Json.stringify(this.templateService.templates.get(this.widgetType));
        e.dataTransfer.setData('text/plain', this.widgetType);

        // var backImg = $(e.target).find(".widget:first-child").css("background-image");
        // backImg = backImg.slice(5,backImg.length-2);
        // var $img = $("<img src='" + backImg + "'>");
        // e.originalEvent.dataTransfer.setDragImage($img[0], 0, 0);

        // e.originalEvent.dataTransfer.effectAllowed = "move";
        // e.preventDefault();
        return true;
    }
}
