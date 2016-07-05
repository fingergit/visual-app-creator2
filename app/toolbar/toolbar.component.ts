import {Component, OnInit} from '@angular/core';
import {ROUTER_DIRECTIVES} from "@angular/router";
import {ToolbarItemGroup} from "./toolbar-item";
import {ProjectService} from "../project/project.service";
import {ActionService} from "../action/action.service";
import {LogService} from "../common/log.service";
import {CommandService} from "../common/command.service";
import {PlatformService, PlatformType} from "../common/platform.service";

@Component({
    selector: 'vac-toolbar'
    ,templateUrl: 'app/toolbar/toolbar.component.html'
    ,styleUrls: ['app//toolbar/toolbar.component.css']
    // ,directives: [ROUTER_DIRECTIVES]
    // ,providers: [HeroService, DialogService]
})
export class ToolbarComponent implements OnInit{
    isMac:boolean = false;
    
    constructor(private projectService: ProjectService
                ,private actionService: ActionService
                ,private logger: LogService
                ,private commandService: CommandService
                ,private platformService: PlatformService
    ){
    }

    ngOnInit(){
        this.isMac = this.platformService.detectOS() === PlatformType.Mac;
        this.actionService.actionChanged.subscribe(() => {
            this.logger.d('generatorOrNext');
            this.commandService.undo.enable = this.actionService.canUndo();
            this.commandService.redo.enable = this.actionService.canRedo();
        }, ()=>{
            this.logger.d('error');
        }, ()=>{
            this.logger.d('subscribe');
        });
    }

    toolItems : ToolbarItemGroup[] = [
        new ToolbarItemGroup('file', [
            this.commandService.newProject
            ,this.commandService.openProject
            ,this.commandService.saveProject
        ])
        ,new ToolbarItemGroup('action', [
            this.commandService.undo
            ,this.commandService.redo
        ])
        ,new ToolbarItemGroup('edit', [
            this.commandService.copy
            ,this.commandService.cut
            ,this.commandService.paste
            ,this.commandService.remove
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
