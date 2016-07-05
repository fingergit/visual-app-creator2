export class CommandItem{
    constructor(
        public id: string
        ,public name: string
        ,public icon: string
        ,public hotkeyWin: string
        ,public hotkeyMac: string
        ,public enable: boolean
        ,public doCommand: any
    ){
    }
}
