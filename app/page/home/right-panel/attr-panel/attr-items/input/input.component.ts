import {Component, OnInit, Input} from '@angular/core';
import {ROUTER_DIRECTIVES} from "@angular/router";
import {VacWidgetAttrValue} from "../../../../../../model/widget-attr/widget-attr-type";
import {ProjectService} from "../../../../../../project/project.service";
import {ActionService} from "../../../../../../action/action.service";

@Component({
    selector: 'vac-input'
    ,templateUrl: 'app/page/home/right-panel/attr-panel/attr-items/input/input.component.html'
    ,styleUrls: ['app/page/home/right-panel/attr-panel/attr-items/input/input.component.css']
    ,directives: []
    // ,providers: [HeroService, DialogService]
})
export class InputItemComponent implements OnInit{
    @Input() attr: VacWidgetAttrValue;
    
    ngOnInit() {
    }
    constructor(private projectService: ProjectService
                ,private actionService: ActionService
    ){
        this.attr = VacWidgetAttrValue.newInstance();
    }

    handleChange($event){
        this.actionService.changAttr(this.attr, $event, false);
    }
}
