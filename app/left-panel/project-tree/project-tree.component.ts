import {Component, OnInit} from '@angular/core';
import {ROUTER_DIRECTIVES} from "@angular/router";
import {ProjectService} from "../../project/project.service";
import {ActionService} from "../../action/action.service";
import {VacAction} from "../../action/action";
import {LogService} from "../../common/log.service";
import {Json} from "@angular/core/esm/src/facade/lang";
import {VacProjectElem, EVacProjectElemType} from "../../model/project-element";
import {ProjectElemUtils} from "../../utils/project-elem-utils";
import {VacProject} from "../../model/project.model";
import {VacProjectPage} from "../../model/project-page";
import {VacProjectWidget} from "../../model/project-widget";
import {VacProjectGroup} from "../../model/project-group";

declare var $;

@Component({
    selector: 'vac-project-tree'
    ,templateUrl: 'app/left-panel/project-tree/project-tree.component.html'
    ,styleUrls: ['app/left-panel/project-tree/project-tree.component.css']
    // ,directives: [ROUTER_DIRECTIVES]
    // ,providers: [HeroService, DialogService]
})
export class ProjectTreeComponent implements OnInit{
    treeCtrl:any = null;
    constructor(private projectService: ProjectService
                ,private actionService: ActionService
    ){}
    tree = [
        {
            name: "Parent 1",
            type: 'ddd',
            children: [
                {
                    name: "Child 1",
                    children: [
                        {
                            name: "Grandchild 1"
                        },
                        {
                            name: "Grandchild 2"
                        }
                    ]
                },
                {
                    name: "Child 2"
                }
            ]
        },
        {
            name: "Parent 2"
        },
        {
            name: "Parent 3"
        },
        {
            name: "Parent 4"
        },
        {
            name: "Parent 5"
        }
    ];

    ngOnInit(){
        let treeProj:VacProjectElem = this.projectService.curProject.getRoot().clone();
        this.projectToTreeObj(treeProj);

        let treeCtrl = $('#tree');
        treeCtrl.treeview({data: [treeProj], nodeName: 'name'});

        treeCtrl.on('nodeSelected', (event, data) => {
            this.actionService.selectElem(data.id, data.elemType, data.state.selected);
        });
        treeCtrl.on('nodeUnselected', (event, data) => {
            this.actionService.selectElem(data.id, data.elemType, data.state.selected);
        });
        treeCtrl.on('nodeCollapsed', (event, data) => {
            this.onNodeExpand(data);
        });
        treeCtrl.on('nodeExpanded', (event, data) => {
            this.onNodeExpand(data);
        });

        this.actionService.actionChanged.subscribe((action:VacAction) => {
            let root: VacProjectGroup = this.projectService.curProject.getCurrentGroup();
            if (action.updateProjectTree){
                // 获取展开的节点，设置给project。
                let expandNodes = treeCtrl.treeview('getExpanded');
                for (let node in expandNodes){
                    if (!expandNodes.hasOwnProperty(node)){
                        continue;
                    }
                    let item = expandNodes[node];

                    let elem = this.projectService.curProject.findElementById(item.id, item.elemType, root);
                    if (elem){
                        elem.state.expanded = true;
                    }
                }


                let treeProj:VacProjectElem = root.clone();
                this.projectToTreeObj(treeProj);

                treeCtrl.treeview({data: [treeProj], nodeName: 'name'});
                treeCtrl.on('nodeSelected', (event, data) => {
                    this.actionService.selectElem(data.id, data.elemType, data.state.selected);
                });
                treeCtrl.on('nodeUnselected', (event, data) => {
                    this.actionService.selectElem(data.id, data.elemType, data.state.selected);
                });
                treeCtrl.on('nodeCollapsed', (event, data) => {
                    this.onNodeExpand(data);
                });
                treeCtrl.on('nodeExpanded', (event, data) => {
                    this.onNodeExpand(data);
                });
            }
        }, ()=>{
        }, ()=>{
        });

        this.actionService.selectChanged.subscribe((elem: VacProjectElem) => {
            // $.each(treeCtrl.treeview('getEnabled', ['true', 'g', 'state.selected']), $.proxy(function (index, node) {
            //     console.debug(node);
            // }, treeCtrl));

            // treeCtrl.treeview('selectNode', [ nodeId, { silent: true } ]);
        }, ()=>{}, ()=>{});
    }

    projectToTreeObj(parent: VacProjectElem){
        if (!parent.children){
            return;
        }
        for (let i = 0; i < parent.children.length; i++){
            let elem = parent.children[i];
            elem.parent = null;
            elem.icon = ProjectElemUtils.getTreeViewIcon(elem.elemType);
            this.projectToTreeObj(elem);
        }
    }

    onNodeExpand(data:any){
        let elem = this.projectService.curProject.findElementById(data.id, data.elemType, this.projectService.curProject.getRoot());
        if (elem) {
            elem.state.expanded = data.state.expanded;
        }
    }
}
