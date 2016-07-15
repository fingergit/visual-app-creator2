import {Component, OnInit} from '@angular/core';
import {ROUTER_DIRECTIVES} from "@angular/router";
import {ProjectService} from "../../../project/project.service";

@Component({
    selector: 'vac-project-list'
    ,templateUrl: 'app/page/home/open-project/open-project.component.html'
    ,styleUrls: ['app/page/home/open-project/open-project.component.css']
    ,directives: []
    // ,providers: [HeroService, DialogService]
})
export class OpenProjectComponent implements OnInit{
    projNameList: Array<string>;
    ngOnInit() {
        this.projNameList = ProjectService.loadProjects();
    }
    
    constructor(private projectService: ProjectService
    ){
    }

    onSelect(item:string){
        alert(item);
    }
}
