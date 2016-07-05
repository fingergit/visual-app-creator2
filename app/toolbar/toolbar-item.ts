import {CommandItem} from "../common/command-item";
// export class ToolbarItem{
//     constructor(
//         public name: string
//         ,public icon: string
//         ,public itemId: string
//         ,public onClick: any
//         ,public enable: boolean
//     ){
//     }
// }
//
export class ToolbarItemGroup{
    constructor(
        public name: string
        ,public items: Array<CommandItem>
    ){
    }
}