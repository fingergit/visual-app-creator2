import {Component, OnInit, Input} from '@angular/core';
import {VacWidgetAttrValue} from "../../../../model/attr-type";
import {ActionService} from "../../../../action/action.service";

@Component({
    selector: 'vac-list-box'
    ,templateUrl: 'app/right-panel/attr-panel/attr-items/list-box/list-box.component.html'
    ,styleUrls: ['app/right-panel/attr-panel/attr-items/list-box/list-box.component.css']
    ,directives: []
})
export class ListBoxComponent implements OnInit{
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
