import {Component, OnInit, Input} from '@angular/core';
import {ROUTER_DIRECTIVES} from "@angular/router";
import {VacWidgetAttrValue} from "../../../../../../model/widget-attr/widget-attr-type";
import {ProjectService} from "../../../../../../project/project.service";
import {ActionService} from "../../../../../../action/action.service";

@Component({
    moduleId: module.id
    ,selector: 'vac-input'
    ,templateUrl: 'input.component.html'
    ,styleUrls: ['input.component.css']
    ,directives: []
    // ,providers: [HeroService, DialogService]
})
export class InputItemComponent implements OnInit{
    @Input() attr: VacWidgetAttrValue;
    @Input() type: string = 'text';
    
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

    handleFileChange($event){
        if (this.type !== 'file'){
            return;
        }

        let files:FileList = event.srcElement.files;
        let file:File = files[0];
        this.actionService.changAttr(this.attr, file.name, false);
        console.log(file.name);
    }
}
