import {Injectable} from "@angular/core";
import {CommandService} from "../common/command.service";
import {LogService} from "../common/log.service";
import {CommandItem} from "../common/command-item";

declare var key;

/**
 * Created by laj on 2016/7/4.
 */
@Injectable()
export class HotkeyService{
    constructor(private commandService: CommandService
        ){
        for (let idx in commandService){
            if (!(commandService[idx] instanceof CommandItem)){
                continue;
            }
            let commandItem:CommandItem = <CommandItem>commandService[idx];
            if (!commandItem.hotkeyMac && !commandItem.hotkeyWin){
                continue;
            }
            let keyString = "";
            if (commandItem.hotkeyWin){
                keyString = commandItem.hotkeyWin;
            }
            if (commandItem.hotkeyMac){
                if (keyString){
                    keyString += ', ' + commandItem.hotkeyMac;
                }
                else{
                    keyString = commandItem.hotkeyMac;
                }
            }
            keyString = keyString.toLocaleLowerCase();

            key(keyString, function (e) {
               commandItem.doCommand();
            });
        }
    }
}
