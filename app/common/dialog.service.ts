import {Injectable} from "@angular/core";
declare var $;

/**
 * Created by laj on 2016/7/4.
 */
@Injectable()
export class DialogService {
    static confirmButtonText: string = '确定';
    static cancelButtonText: string = '取消';
    static defConfig = {
        title: false,
        confirmButton: DialogService.confirmButtonText,
        cancelButton: DialogService.cancelButtonText,
        animation: 'zoom',
        closeAnimation: 'scale',
        keyboardEnabled: true,
        theme: 'bootstrap',
        confirmKeys: [13], // ENTER key
        cancelKeys: [27], // ESC key
    };

    static confirm(title: string, content: string, confirmCallback?:()=>void, cancelCallback?:()=>void){
        DialogService._confirm('fa fa-question-circle', title, content, confirmCallback, cancelCallback);
    }

    static warn(title: string, content: string, confirmCallback?:()=>void, cancelCallback?:()=>void){
        DialogService._confirm('fa fa-warning', title, content, confirmCallback, cancelCallback);
    }

    static error(content: string, confirmCallback?:()=>void){
        DialogService._alert('fa fa-error', false, content, confirmCallback);
    }

    private static _confirm(icon:string|boolean, title:string|boolean, content: string, confirmCallback?:()=>void, cancelCallback?:()=>void){
        $.confirm(Object.assign(DialogService.defConfig, {
            icon: icon,
            title: title,
            content: content,
            confirm: confirmCallback,
            cancel: cancelCallback,
            onOpen: function(){
                var that = this;
                this.$confirmButton.focus();
            },
        }));
    }

    static alert(content: string){
        DialogService._alert('fa fa-info-circle', false, content);
    }

    static _alert(icon:string|boolean, title:string|boolean, content: string, confirmCallback?:()=>void){
        $.alert(Object.assign(DialogService.defConfig, {
            icon: icon,
            title: title,
            content: content,
            confirm: confirmCallback,
            onOpen: function(){
                var that = this;
                this.$confirmButton.focus();
            },
        }));
    }

    static dialog(title: string, content: string){
        $.dialog({
            title: title,
            content: content,
        });
    }
    //
    // static dialog(content: string){
    //     $.dialog(content);
    // }

    static input(content:string, defaultValue: string, placeholder:string, confirmCallback?:(text:string)=>void, cancelCallback?:()=>void){
        $.confirm(Object.assign(DialogService.defConfig, {
            content: content +
                '<br><input class="form-control" type="text" id="dialog-input" value="' +
                (defaultValue?defaultValue:'') +
                '" placeholder="' + placeholder + '" autofocus="autofocus"/>',
            // onOpen: function(){
            //     var that = this;
            //     this.$content.find('#dialog-input').on('keypress', (event) => {
            //         if (event.keyCode==13){
            //             event.preventDefault();
            //             that.$confirmButton.click();
            //             return false;
            //         }
            //     });
            // },
            cancel: cancelCallback,
            confirm: function () {
                let text = $('#dialog-input').val();
                if (!text){
                    DialogService.alert("输入内容不能为空。");
                    return false;
                }
                confirmCallback(text);
            }
        }));
    }
}
