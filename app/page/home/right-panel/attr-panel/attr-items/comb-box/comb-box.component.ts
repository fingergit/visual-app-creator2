import {Component, OnInit, Input} from '@angular/core';
import {VacWidgetAttrValue} from "../../../../../../model/widget-attr/widget-attr-type";
import {ActionService} from "../../../../../../action/action.service";

@Component({
    moduleId: module.id
    ,selector: 'vac-comb-box'
    ,templateUrl: 'comb-box.component.html'
    ,styleUrls: ['comb-box.component.css']
    ,directives: []
})
export class CombBoxComponent implements OnInit{
    @Input() attr: VacWidgetAttrValue;

    constructor(private actionService: ActionService
    ){
        this.attr = VacWidgetAttrValue.newInstance();
    }

    ngOnInit() {
    }

    handleChange(value){
        console.debug(value);
        // this.actionService.changAttr(this.attr, value, false);
        this.actionService.changAttr(this.attr, this.attr.valueRange.get(value), false);
    }
}
