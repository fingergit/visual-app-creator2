import {Component, OnInit} from '@angular/core';
import {ROUTER_DIRECTIVES} from "@angular/router";
import {ProjectService} from "../../project/project.service";
import {ActionService} from "../../action/action.service";
import {VacAction} from "../../action/action";
import {LogService} from "../../common/log.service";
import {Json} from "@angular/core/esm/src/facade/lang";
import {VacProjectElem, EVacProjectElemType} from "../../model/project-element";

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
                ,private logger: LogService
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
        // this.projectService.curProject.addElement('group', EVacProjectElemType.GROUP);
        // this.projectToTreeObj(this.projectService.curProject.root);
        let treeProj:VacProjectElem = this.projectService.curProject.root.clone();
        this.projectToTreeObj(treeProj);

        let treeCtrl = $('#tree');
        treeCtrl.treeview({data: [treeProj], nodeName: 'name'});

        treeCtrl.on('nodeSelected', (event, data) => {
            this.onNodeSelect(data);
        });
        treeCtrl.on('nodeUnselected', (event, data) => {
            this.onNodeSelect(data);
        });
        treeCtrl.on('nodeCollapsed', (event, data) => {
            this.onNodeExpand(data);
        });
        treeCtrl.on('nodeExpanded', (event, data) => {
            this.onNodeExpand(data);
        });

        this.actionService.actionChanged.subscribe((action:VacAction) => {
            if (action.updateProjectTree){

                // 获取展开的节点，设置给project。
                let expandNodes = treeCtrl.treeview('getExpanded');
                this.logger.d(Json.stringify(expandNodes));
                for (let node in expandNodes){
                    if (!expandNodes.hasOwnProperty(node)){
                        continue;
                    }
                    let item = expandNodes[node];

                    let elem = this.projectService.curProject.findElementById(item.id, item.elemType, this.projectService.curProject.root);
                    if (elem){
                        elem.state.expanded = true;
                    }
                }


                let treeProj:VacProjectElem = this.projectService.curProject.root.clone();
                this.projectToTreeObj(treeProj);

                // this.logger.d(Json.stringify(this.projectService.curProject.root));

                treeCtrl.treeview({data: [treeProj], nodeName: 'name'});
                treeCtrl.on('nodeSelected', (event, data) => {
                    this.onNodeSelect(data);
                });
                treeCtrl.on('nodeUnselected', (event, data) => {
                    this.onNodeSelect(data);
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
    }

    projectToTreeObj(parent: VacProjectElem){
        if (!parent.children){
            return;
        }
        for (let i = 0; i < parent.children.length; i++){
            let elem = parent.children[i];
            elem.parent = null;
            this.projectToTreeObj(elem);
        }
    }

    onNodeSelect(data){
        let elem = this.projectService.curProject.findElementById(data.id, data.elemType, this.projectService.curProject.root);
        if (elem){
            elem.state.selected = data.state.selected;
            this.logger.d("selected: " + elem.name + elem.id);

            switch (data.elemType){
                case EVacProjectElemType.GROUP:
                    if (this.projectService.curProject.currentGroup){
                        this.projectService.curProject.currentGroup.state.selected = false;
                    }
                    this.projectService.curProject.currentGroup = elem;
                    break;
                case EVacProjectElemType.PAGE:
                    if (this.projectService.curProject.currentPage){
                        this.projectService.curProject.currentPage.state.selected = false;
                    }
                    this.projectService.curProject.currentPage = elem;
                    break;
                case EVacProjectElemType.WIDGET:
                    if (this.projectService.curProject.currentWidget){
                        this.projectService.curProject.currentWidget.state.selected = false;
                    }
                    this.projectService.curProject.currentWidget = elem;
                    break;
            }
        }
    }
    
    onNodeExpand(data:any){
        let elem = this.projectService.curProject.findElementById(data.id, data.elemType, this.projectService.curProject.root);
        if (elem) {
            elem.state.expanded = data.state.expanded;
        }
    }
}
