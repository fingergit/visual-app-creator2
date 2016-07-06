import {Component, OnInit} from '@angular/core';
import {ROUTER_DIRECTIVES} from "@angular/router";
import {ProjectTreeComponent} from "./project-tree/project-tree.component";
import {ProjectService} from "../project/project.service";
import {ActionService} from "../action/action.service";
import {AddProjectElemAction} from "../action/add-project-elem-action";
import {EVacProjectElemType} from "../model/project-element";
import {Observer, Observable, Subscription} from "rxjs/Rx";

declare var $;

@Component({
    selector: 'vac-left-panel'
    ,templateUrl: 'app/left-panel/left-panel.component.html'
    ,styleUrls: ['app/left-panel/left-panel.component.css']
    ,directives: [ProjectTreeComponent]
    // ,providers: [HeroService, DialogService]
})
export class LeftPanelComponent implements OnInit{
    ngOnInit() {
        $.contextMenu({
            selector: '#project-tree-add',
            callback: function(key, options) {
                var m = "clicked: " + key + " on " + $(this).text();
                window.console && console.log(m) || alert(m);
            },
            items: {
                "edit": {name: "Edit", icon: "edit"},
                "cut": {name: "Cut", icon: "cut"},
                "copy": {name: "Copy", icon: "copy"},
                "paste": {name: "Paste", icon: "paste"},
                "delete": {name: "Delete", icon: "delete"},
                "sep1": "---------",
                "quit": {name: "Quit", icon: function($element, key, item){ return 'context-menu-icon context-menu-icon-quit'; }}
            }
        });

        let ary:Array<number> = [1, 2, 4, 8];
        Observable.create((observer:Observer)=>{
            observer.next(ary);
            observer.complete();
        }).subscribe((x)=>{
            console.log(x);
        }, (e) =>{
            console.log("err");
        });
    }
    constructor(private projectService: ProjectService
                ,private actionService: ActionService
    ){
    }

    addGroup(){
        this.actionService.addGroup();
    }

    addPage(){
        this.actionService.addPage();
    }
}
