import {Component, OnInit, Input, OnChanges,SimpleChanges} from '@angular/core';
import {ROUTER_DIRECTIVES} from "@angular/router";
import {VacWidgetAttrValue} from "../../../../../../model/widget-attr/widget-attr-type";
import {ProjectService} from "../../../../../../project/project.service";
import {ActionService} from "../../../../../../action/action.service";
import {VacProjectWidget} from "../../../../../../model/element/project-widget";
import {LogService} from "../../../../../../common/log.service";

@Component({
    moduleId: module.id
    ,selector: 'vac-color'
    ,templateUrl: 'color.component.html'
    ,styleUrls: ['color.component.css']
    ,directives: []
    // ,providers: [HeroService, DialogService]
})
export class ColorComponent implements OnInit, OnChanges{
    @Input() attr: VacWidgetAttrValue;
    @Input() value: boolean;

    $emlement: JQuery = null;
    curElem:VacProjectWidget = null;
    id: string = null;
    constructor(private projectService: ProjectService
                ,private actionService: ActionService
    ){
        this.attr = VacWidgetAttrValue.newInstance();
        this.curElem = this.projectService.curProject.getCurrentWidget();
    }

    ngOnInit() {
        this.id = 'color-' + this.curElem.id + '-' + this.attr.type + parseInt((Math.random() * 100000000).toString());
        this.$emlement = $(".color-picker");
        var myInterval = setInterval(()=>{
            LogService.d("wait id: " + this.id);
            let $elem = $("#" + this.id);
            if ($elem.length > 0){
                clearInterval(myInterval);
                myInterval = null;
                LogService.d("timer killed.");
                this.$emlement = $elem;
                this.$emlement.ColorPickerSliders({
                    size: 'sm',
                    placement: 'bottom',
                    sliders: false,
                    hsvpanel: true,
                    swatches: true,
                    color: this.attr.value,
                    previewformat: 'hex',
                    order: {
                        hsl: 1
                    },
                    onchange: (container, color) => {
                        LogService.d(container);

                        var color = color.tiny.toHexString();
                        this.changeAttr(color);
                    }
                });
            }
        },10);
    }

    ngOnChanges(changes:SimpleChanges) {
        for (let key in changes){
            if (!changes.hasOwnProperty(key)){
                continue;
            }

            if (key === 'value'){
                if (this.$emlement){
                    let item = changes[key];
                    this.$emlement.trigger("colorpickersliders.updateColor", this.attr.value);
                }
                break;
            }
        }
    }

    handleChange($event){
        LogService.d("handle change");
        this.changeAttr($event);
    }

    changeAttr(value){
        if (value != this.attr.value){
            this.actionService.changAttr(this.attr, value, false);
        }
    }
}
