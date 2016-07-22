import {Component, OnInit} from '@angular/core';
import {ROUTER_DIRECTIVES} from "@angular/router";
import {ProjectService} from "../../../../project/project.service";
import {ActionService} from "../../../../action/action.service";
import {VacAction} from "../../../../action/action";
import {VacProjectElem} from "../../../../model/element/project-element";
import {ProjectElemUtils} from "../../../../utils/project-elem-utils";

declare var $;

@Component({
    moduleId: module.id
    ,selector: 'vac-project-tree'
    ,templateUrl: 'project-tree.component.html'
    ,styleUrls: ['project-tree.component.css']
    // ,directives: [ROUTER_DIRECTIVES]
    // ,providers: [HeroService, DialogService]
})
export class ProjectTreeComponent implements OnInit{
    treeCtrl:any = null;

    constructor(private projectService: ProjectService
                ,private actionService: ActionService
    ){}

    ngOnInit(){
        this._updateView();

        this.actionService.actionChanged.subscribe((action:VacAction) => {
            if (action.updateView.updateProjectTree){
                this._updateView();
            }
        });

        this.actionService.selectChanged.subscribe((elem: VacProjectElem) => {
            // $.each(treeCtrl.treeview('getEnabled', ['true', 'g', 'state.selected']), $.proxy(function (index, node) {
            //     console.debug(node);
            // }, treeCtrl));

            // treeCtrl.treeview('selectNode', [ nodeId, { silent: true } ]);
        }, ()=>{}, ()=>{});

        this.actionService.projectChanged.subscribe(()=>{
            this._updateView();
        });
    }

    private _updateView(){
        let treeProj:VacProjectElem = this.projectService.curProject.getRoot().clone();
        this._projectToTreeObj(treeProj);

        let treeCtrl = $('#tree');
        treeCtrl.treeview({data: [treeProj], nodeName: 'name'});

        treeCtrl.on('nodeSelected', (event, data) => {
            this.actionService.selectElem(data.id, data.elemType, data.state.selected);
        });
        treeCtrl.on('nodeUnselected', (event, data) => {
            this.actionService.selectElem(data.id, data.elemType, data.state.selected);
        });
        treeCtrl.on('nodeCollapsed', (event, data) => {
            this._onNodeExpand(data);
        });
        treeCtrl.on('nodeExpanded', (event, data) => {
            this._onNodeExpand(data);
        });
    }

    private _projectToTreeObj(parent: VacProjectElem){
        if (!parent.children){
            return;
        }
        for (let i = 0; i < parent.children.length; i++){
            let elem = parent.children[i];
            elem.parent = null;
            elem.icon = ProjectElemUtils.getTreeViewIcon(elem.elemType);
            this._projectToTreeObj(elem);
        }
    }

    private _onNodeExpand(data:any){
        let elem = this.projectService.curProject.findElementById(data.id, data.elemType, this.projectService.curProject.getRoot());
        if (elem) {
            elem.state.expanded = data.state.expanded;
        }
    }
}
