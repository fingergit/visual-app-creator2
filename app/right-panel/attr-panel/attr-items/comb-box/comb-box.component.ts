import {Component, OnInit, Input} from '@angular/core';
import {VacWidgetAttrValue} from "../../../../model/attr-type";
import {ActionService} from "../../../../action/action.service";
import {EVacButtonAttrStyleRange} from "../../../../model/widgets/button-attr";

@Component({
    selector: 'vac-comb-box'
    ,templateUrl: 'app/right-panel/attr-panel/attr-items/comb-box/comb-box.component.html'
    ,styleUrls: ['app/right-panel/attr-panel/attr-items/comb-box/comb-box.component.css']
    ,directives: []
})
export class CombBoxComponent implements OnInit{
    @Input() attr: VacWidgetAttrValue;

    constructor(private actionService: ActionService
    ){
        this.attr = new VacWidgetAttrValue('', '');
    }

    ngOnInit() {
    }

    handleChange(value){
        console.debug(value);
        // this.actionService.changAttr(this.attr, value, false);
        this.actionService.changAttr(this.attr, this.attr.valueRange[value], false);
    }
}
