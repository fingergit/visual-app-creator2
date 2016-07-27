import {Component, OnInit, Input} from '@angular/core';
import {ROUTER_DIRECTIVES} from "@angular/router";
import {VacWidgetAttrValue} from "../../../../../../model/widget-attr/widget-attr-type";
import {ProjectService} from "../../../../../../project/project.service";
import {ActionService} from "../../../../../../action/action.service";
import {Config} from "../../../../../../config/config";
import {VacProject} from "../../../../../../model/element/project.model";
import {VacProjectWidget} from "../../../../../../model/element/project-widget";

@Component({
    moduleId: module.id
    ,selector: 'vac-input-file'
    ,templateUrl: 'input-file.component.html'
    ,styleUrls: ['input-file.component.css']
    ,directives: []
    // ,providers: [HeroService, DialogService]
})
export class InputFileComponent implements OnInit{
    @Input() attr: VacWidgetAttrValue;
    $emlement: JQuery = null;
    curElem:VacProjectWidget = null;
    id: string = null;
    handleEvent:boolean = false;
    
    ngOnInit() {
        this.id = 'file-' + this.curElem.id + '-' + this.attr.type + parseInt((Math.random() * 100000000).toString());
        this.$emlement = $(".file-upload");
        this.$emlement.fileinput({
            showCaption: false,
            uploadUrl: Config.UPLOAD_URL,
            showPreview: false,
            language:'zh'
        });
    }
    constructor(private projectService: ProjectService
                ,private actionService: ActionService
    ){
        this.attr = VacWidgetAttrValue.newInstance();
        this.curElem = this.projectService.curProject.getCurrentWidget();
    }

    handleChange($event){
        console.log($event);
        this.$emlement = $($event.srcElement || $event.target);
        if (!this.handleEvent){
            this.$emlement.on('fileclear', ($event)=>{this.handleClear($event);});
            this.$emlement.on('filecleared', ($event)=>{this.handleCleared($event);});
            this.$emlement.on('fileloaded', ($event)=>{this.handleFileLoaded($event);});
            this.$emlement.on('filereset', ($event)=>{this.handleFileReset($event);});
            this.$emlement.on('filedeleted', ($event)=>{this.handleFileDeleted($event);});
            this.$emlement.on('fileuploaded', ($event, data, previewId, index)=>{this.handleFileUploaded($event, data, previewId, index);});
            this.$emlement.on('fileuploaderror', ($event)=>{this.handleFileUploadError($event);});

            this.handleEvent = true;
        }

        let files:FileList = event.srcElement.files;
        let file:File = files[0];
        this.actionService.changAttr(this.attr, file.name, false);
        console.log(file.name);
    }

    handleClear($event){
        console.log('handleClear');
        console.log($event);
    }

    handleCleared($event){
        this.actionService.changAttr(this.attr, "", false);
    }
    
    handleFileLoaded($event){
        console.log('handleFileLoaded');
        console.log($event);
    }

    handleFileReset($event){
        console.log('handleFileReset');
        console.log($event);
    }

    handleFileDeleted($event){
        console.log('handleFileDeleted');
        this.actionService.changAttr(this.attr, "", false);
    }

    handleFileUploaded($event, data, previewId, index){
        console.log('handleFileUploaded');
        console.log(data);

        var form = data.form, files = data.files, extra = data.extra,
            response = data.response, reader = data.reader;

        this.actionService.changAttr(this.attr, data.response.url, false);
    }

    handleFileUploadError($event){
        console.log('fileuploaderror');
        console.log($event);
    }
}
