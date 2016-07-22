import {Component, OnInit, Input} from '@angular/core';

@Component({
    selector: 'vac-splash'
    ,templateUrl: 'widget/splash/splash.component.html'
    ,styleUrls: []
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
