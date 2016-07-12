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
            if (action.updateProjectTree){

                // 获取展开的节点，设置给project。
                let expandNodes = treeCtrl.treeview('getExpanded');
                // this.logger.d(Json.stringify(expandNodes));
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
    //
    // onNodeSelect(data){
    //     let curProj:VacProject = this.projectService.curProject;
    //     let elem = curProj.findElementById(data.id, data.elemType, curProj.root);
    //     if (elem){
    //         elem.state.selected = data.state.selected;
    //         // this.logger.d("selected: " + elem.name + elem.id);
    //
    //         switch (data.elemType){
    //             case EVacProjectElemType.GROUP:
    //                 if (curProj.currentGroup && curProj.currentGroup !== elem){
    //                     curProj.currentGroup.state.selected = false;
    //                 }
    //                 if (curProj.currentGroup !== elem){
    //                     curProj.currentGroup = elem;
    //                     if (curProj.currentPage){
    //                         curProj.currentPage.state.selected = false;
    //                         curProj.currentPage = null;
    //                     }
    //                     if (curProj.currentWidget){
    //                         curProj.currentWidget.state.selected = false;
    //                         curProj.currentWidget = null;
    //                     }
    //                 }
    //
    //                 break;
    //             case EVacProjectElemType.PAGE:
    //                 if (curProj.currentPage && curProj.currentPage !== elem){
    //                     curProj.currentPage.state.selected = false;
    //                 }
    //                 if (curProj.currentPage !== elem){
    //                     curProj.currentPage = elem;
    //                     if (curProj.currentWidget){
    //                         curProj.currentWidget.state.selected = false;
    //                         curProj.currentWidget = null;
    //                     }
    //                 }
    //                 break;
    //             case EVacProjectElemType.WIDGET:
    //                 if (curProj.currentWidget && curProj.currentWidget !== elem){
    //                     curProj.currentWidget.state.selected = false;
    //                 }
    //                 let page:VacProjectPage = (<VacProjectWidget>elem).getPage();
    //                 if (curProj.currentPage !== page){
    //                     curProj.currentPage.state.selected = false;
    //                     page.state.selected = true;
    //                     curProj.currentPage = page;
    //                 }
    //
    //                 curProj.currentWidget = elem;
    //                 break;
    //         }
    //     }
    //
    //     this.actionService.emitSelectChanged(elem);
    // }
    
    onNodeExpand(data:any){
        let elem = this.projectService.curProject.findElementById(data.id, data.elemType, this.projectService.curProject.root);
        if (elem) {
            elem.state.expanded = data.state.expanded;
        }
    }
}
