import {Injectable} from "@angular/core";
import {CommandItem} from "./command-item";
import {ProjectService} from "../project/project.service";
import {ActionService} from "../action/action.service";

/**
 * Created by laj on 2016/7/4.
 */
@Injectable()
export class CommandService {
    commands: Array<CommandItem> = [];
    constructor(private projectService: ProjectService
                ,private actionService: ActionService
    ){
    }

    newProject: CommandItem = new CommandItem('newProject', '新建项目', 'fa-file-o', 'Ctrl+N', '⌘+N', true, () => {this.actionService.newProject();});
    openProject: CommandItem = new CommandItem('openProject', '打开项目', 'fa-folder-open-o', 'Ctrl+O', '⌘+O', true, () => {this.actionService.openProject();});
    saveProject: CommandItem = new CommandItem('openProject', '保存项目', 'fa-save', 'Ctrl+S', '⌘+S', true, () => {this.projectService.saveProject();});
    undo: CommandItem = new CommandItem('undo', '撤销', 'fa-mail-reply', 'Ctrl+Z', '⌘+Z', true, () => {this.actionService.undo();});
    redo: CommandItem = new CommandItem('redo', '重做', 'fa-mail-forward', 'Ctrl+Y', '⌘+Shift+Z', true, () => {this.actionService.redo();});
    copy: CommandItem = new CommandItem('copy', '复制', 'fa-copy', 'Ctrl+C', '⌘+C', true, () => {this.projectService.copy();});
    cut: CommandItem = new CommandItem('cut', '剪切', 'fa-cut', 'Ctrl+X', '⌘+X', true, () => {this.projectService.cut();});
    paste: CommandItem = new CommandItem('paste', '粘贴', 'fa-paste', 'Ctrl+X', '⌘+X', true, () => {this.projectService.paste();});
    remove: CommandItem = new CommandItem('remove', '删除', 'fa-remove', 'Delete', 'Backspace', true, () => {this.projectService.remove();});
}
