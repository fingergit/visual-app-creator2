import {Component, OnInit, Input, OnChanges, SimpleChanges} from '@angular/core';
import {VacWidgetAttrValue, EVacWidgetAttrType} from "../../../../model/attr-type";
import {ActionService} from "../../../../action/action.service";
import {EVacButtonAttrStyleRange} from "../../../../model/widgets/button-attr";

@Component({
    selector: 'vac-switch'
    ,templateUrl: 'app/right-panel/attr-panel/attr-items/switch/switch.component.html'
    ,styleUrls: ['app/right-panel/attr-panel/attr-items/switch/switch.component.css']
    ,directives: []
})
export class SwitchComponent implements OnInit, OnChanges{
    @Input() attr: VacWidgetAttrValue;
    // attr.value，做为input是因为对于attr，当attr.value改变时，不会调用ngOnChanges函数。
    // 我们需要监听attr.value的改变，来开关switch界面。
    @Input() value: boolean;

    $checkbox: JQuery;

    constructor(private actionService: ActionService
    ){
        this.attr = new VacWidgetAttrValue('', false, EVacWidgetAttrType.boolSwitch, null);
    }

    ngOnInit() {
        this.$checkbox = $(".switch-checkbox");
        this.$checkbox.bootstrapSwitch('state', this.attr.value);
        this.$checkbox.on('switchChange.bootstrapSwitch', (event,state)=>{this.handleChange(state);});
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
