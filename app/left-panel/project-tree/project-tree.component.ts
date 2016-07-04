import {Component, OnInit} from '@angular/core';
import {ROUTER_DIRECTIVES} from "@angular/router";

declare var $;

@Component({
    selector: 'vac-project-tree'
    ,templateUrl: 'app/left-panel/project-tree/project-tree.component.html'
    ,styleUrls: ['app/left-panel/project-tree/project-tree.component.css']
    // ,directives: [ROUTER_DIRECTIVES]
    // ,providers: [HeroService, DialogService]
})
export class ProjectTreeComponent implements OnInit{
    tree = [
        {
            text: "Parent 1",
            nodes: [
                {
                    text: "Child 1",
                    nodes: [
                        {
                            text: "Grandchild 1"
                        },
                        {
                            text: "Grandchild 2"
                        }
                    ]
                },
                {
                    text: "Child 2"
                }
            ]
        },
        {
            text: "Parent 2"
        },
        {
            text: "Parent 3"
        },
        {
            text: "Parent 4"
        },
        {
            text: "Parent 5"
        }
    ];

    ngOnInit(){
        $('#tree').treeview({data: this.tree});
    }
}
