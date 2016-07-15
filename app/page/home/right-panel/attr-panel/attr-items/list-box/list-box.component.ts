import {Component, OnInit, Input} from '@angular/core';
import {VacWidgetAttrValue} from "../../../../../../model/widget-attr/widget-attr-type";
import {ActionService} from "../../../../../../action/action.service";
import {LogService} from "../../../../../../common/log.service";
import {DialogService} from "../../../../../../common/dialog.service";

@Component({
    selector: 'vac-list-box'
    ,templateUrl: 'app/page/home/right-panel/attr-panel/attr-items/list-box/list-box.component.html'
    ,styleUrls: ['app/page/home/right-panel/attr-panel/attr-items/list-box/list-box.component.css']
    ,directives: []
})
export class ListBoxComponent implements OnInit{
    @Input() attr: VacWidgetAttrValue;

    constructor(private actionService: ActionService
    ){
        this.attr = VacWidgetAttrValue.newInstance();
    }

    ngOnInit() {
        var el = $('.list-attr')[0];
        var sortable = Sortable.create(el, {
            onEnd: (evt:any)=> {
                if (evt.oldIndex == evt.newIndex){
                    return;
                }

                let textAry = this._copyArray();
                let item = textAry[evt.oldIndex];
                if (evt.oldIndex > textAry.length){
                    LogService.d('Invalid index');
                    return;
                }

                if (evt.oldIndex < evt.newIndex){
                    // 向下移动。
                    textAry.splice(evt.oldIndex, 1);
                    textAry.splice(evt.newIndex, 0, item);
                }
                else{
                    // 向上移动
                    textAry.splice(evt.oldIndex, 1);
                    textAry.splice(evt.newIndex, 0, item);
                }
                this.actionService.changAttr(this.attr, textAry, true);
            }
        });
    }

    showOper(event: MouseEvent, show:boolean){
        let $target = $(event.srcElement||event.target);
        let $operDiv = $target.find(".item-oper");
        if (show){
            $operDiv.show({duration: 200});
        }
        else{
            $operDiv.hide({duration: 200});
        }
    }

    onEdit(idx:number, item:string){
        let textAry = this._copyArray();
        if (idx > textAry.length || textAry[idx] !== item){
            LogService.d('Invalid index');
            return;
        }

        DialogService.input('编辑', item, '', (text)=>{
            textAry[idx] = text;
            this.actionService.changAttr(this.attr, textAry, true);
        });
    }

    onInsert(idx:number, item:string){
        let textAry = this._copyArray();
        if (idx > textAry.length || textAry[idx] !== item){
            LogService.d('Invalid index');
            return;
        }

        DialogService.input('插入', item, '', (text)=>{
            textAry.splice(idx+1, 0, text);
            this.actionService.changAttr(this.attr, textAry, true);
        });
    }

    onDelete(idx:number, item:string){
        let textAry = this._copyArray();
        if (idx > textAry.length || textAry[idx] !== item){
            LogService.d('Invalid index');
            return;
        }

        DialogService.confirm('删除', '确实要删除吗?', ()=>{
            textAry.splice(idx, 1);
            this.actionService.changAttr(this.attr, textAry, true);
        });
    }

    protected _copyArray(){
        let textAry = [];
        for (let idx2 in this.attr.value){
            if (!this.attr.value.hasOwnProperty(idx2)){
                continue;
            }
            let itemText = this.attr.value[idx2];
            textAry.push(itemText);
        }

        return textAry;
    }
}
