import {Component, OnInit, Input} from '@angular/core';
import {ROUTER_DIRECTIVES} from "@angular/router";
import {ActionService} from "../../../action/action.service";
import {ProjectService} from "../../../project/project.service";
import {VacAction} from "../../../action/action";
import {VacWidgetAttrValue, EVacWidgetAttrType} from "../../../model/attr-type";
import {ChangeAttrAction} from "../../../action/change-attr-action";

@Component({
    selector: 'vac-input-item'
    ,templateUrl: 'app/right-panel/attr-panel/attr-items/input-item.component.html'
    ,styleUrls: ['app/right-panel/attr-panel/attr-items/input-item.component.css']
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
        this.attr = new VacWidgetAttrValue('', '');
    }

    handleChange($event){
        this.actionService.changAttr(this.attr, $event, false);
    }
}
