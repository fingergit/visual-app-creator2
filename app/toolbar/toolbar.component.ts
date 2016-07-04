import {Component} from '@angular/core';
import {ROUTER_DIRECTIVES} from "@angular/router";
import {ToolbarItem,ToolbarItemGroup} from "./toolbar-item";
import {ProjectService} from "../project/project.service";
import {ActionService} from "../action/action.service";
import {LogService} from "../common/log.service";

@Component({
    selector: 'vac-toolbar'
    ,templateUrl: 'app/toolbar/toolbar.component.html'
    // ,directives: [ROUTER_DIRECTIVES]
    // ,providers: [HeroService, DialogService]
})
export class ToolbarComponent {
    constructor(private projectService: ProjectService
                ,private actionService: ActionService
                ,private logger: LogService
    ){
        actionService.actionChanged.subscribe(() => {
            this.logger.d('generatorOrNext');
            this.undoItem.enable = this.projectService.canUndo();
            this.redoItem.enable = this.projectService.canRedo();
        }, ()=>{
            this.logger.d('error');
        }, ()=>{
            this.logger.d('subscribe');
        });
    }

    undoItem: ToolbarItem = new ToolbarItem('Undo', 'fa-mail-reply', 'undo', () => {this.projectService.undo();}, this.projectService.canUndo());
    redoItem: ToolbarItem = new ToolbarItem('Redo', 'fa-mail-forward', 'redo', () => {this.projectService.redo();}, this.projectService.canRedo());

    toolItems : ToolbarItemGroup[] = [
        new ToolbarItemGroup('file', [
            new ToolbarItem('新建项目', 'fa-file', 'newProject', () => {this.projectService.newProject();}, true)
            ,new ToolbarItem('打开项目', 'fa-folder-open', 'openProject', () => {this.projectService.openProject();}, true)
            ,new ToolbarItem('保存项目', 'fa-save', 'saveProject', () => {this.projectService.saveProject();}, true)
        ])
        ,new ToolbarItemGroup('action', [
            this.undoItem
            ,this.redoItem
        ])
        ,new ToolbarItemGroup('edit', [
            new ToolbarItem('复制', 'fa-copy', 'copy', () => {this.projectService.copy();}, true)
            ,new ToolbarItem('剪切', 'fa-cut', 'cut', () => {this.projectService.cut();}, true)
            ,new ToolbarItem('粘贴', 'fa-paste', 'paste', () => {this.projectService.paste();}, true)
            ,new ToolbarItem('删除', 'fa-remove', 'remove', () => {this.projectService.remove();}, true)
        ])

        // ,[{name: 'Undo', icon: 'fa-mail-reply', itemId: 'undo', onClick: $rootScope.undo, enable: $rootScope.canUndo}
        //     ,{name: 'Redo', icon: 'fa-mail-forward', itemId: 'redo', onClick: $rootScope.redo, enable: $rootScope.canRedo}
        // ]
        // ,[{name: '复制', icon: 'fa-copy', itemId: 'copy', enable: $rootScope.defaultEnable}
        //     ,{name: '剪切', icon: 'fa-cut', itemId: 'cut', enable: $rootScope.defaultEnable}
        //     ,{name: '粘贴', icon: 'fa-paste', itemId: 'paste', enable: $rootScope.defaultEnable}
        //     ,{name: '删除', icon: 'fa-remove', itemId: 'delete', enable: $rootScope.defaultEnable}
        // ]
    ];
}
