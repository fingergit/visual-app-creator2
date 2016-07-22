import {Component, OnInit, Input} from '@angular/core';
import {VacWidgetAttrValue} from "../../../model/widget-attr/widget-attr-type";

@Component({
    moduleId: module.id
    ,selector: 'vac-splash'
    ,templateUrl: 'splash.component.html'
    ,styleUrls: ['splash.component.css']
    ,directives: []
})
export class SplashComponent implements OnInit{
    @Input() face: string;
    @Input() slogan: string;

    constructor(){
    }

    ngOnInit() {
        this.face = "public/img/topback.jpg";
        this.slogan = "public/img/slogan.png?v";
    }
}
