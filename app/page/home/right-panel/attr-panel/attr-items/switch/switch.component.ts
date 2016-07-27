import {Component, OnInit, Input, OnChanges, SimpleChanges} from '@angular/core';
import {VacWidgetAttrValue, EVacWidgetAttrType} from "../../../../../../model/widget-attr/widget-attr-type";
import {ActionService} from "../../../../../../action/action.service";
import {VacProjectWidget} from "../../../../../../model/element/project-widget";
import {LogService} from "../../../../../../common/log.service";
import {ProjectService} from "../../../../../../project/project.service";

@Component({
    moduleId: module.id
    ,selector: 'vac-switch'
    ,templateUrl: 'switch.component.html'
    ,styleUrls: ['switch.component.css']
    ,directives: []
})
export class SwitchComponent implements OnInit, OnChanges{
    @Input() attr: VacWidgetAttrValue;
    // attr.value，做为input是因为对于attr，当attr.value改变时，不会调用ngOnChanges函数。
    // 我们需要监听attr.value的改变，来开关switch界面。
    @Input() value: boolean;

    id: string = null;
    curElem:VacProjectWidget = null;

    $checkbox: JQuery;

    constructor(private projectService: ProjectService,
                private actionService: ActionService
    ){
        this.attr = new VacWidgetAttrValue('', false, EVacWidgetAttrType.boolSwitch, null);
        this.curElem = this.projectService.curProject.getCurrentWidget();
    }

    ngOnInit() {
        this.id = 'switch-' + this.curElem.id + '-' + this.attr.type + parseInt((Math.random() * 100000000).toString());

        this.$checkbox = $(".switch-checkbox");

        var myInterval = setInterval(()=>{
            let $elem = $("#" + this.id);
            if ($elem.length > 0){
                clearInterval(myInterval);
                myInterval = null;
                LogService.d("2timer killed.");
                this.$checkbox = $elem;
                this.$checkbox.bootstrapSwitch('state', this.attr.value);
                this.$checkbox.on('switchChange.bootstrapSwitch', (event,state)=>{this.handleChange(state);});
            }
        },10);

    }
    
    ngOnChanges(changes:SimpleChanges) {
        for (let key in changes){
            if (!changes.hasOwnProperty(key)){
                continue;
            }

            if (key === 'value'){
                if (this.$checkbox){
                    let item = changes[key];
                    let oldValue = this.$checkbox.bootstrapSwitch('state');
                    if (oldValue !== this.attr.value){
                        this.$checkbox.bootstrapSwitch('state', this.attr.value);
                    }
                }
                break;
            }
        }
    }

    handleChange(state){
        if (state === this.attr.value){
            return;
        }
        this.actionService.changAttr(this.attr, state, true);
        // this.actionService.changAttr(this.attr, this.attr.valueRange.get(value), false);
    }
}
