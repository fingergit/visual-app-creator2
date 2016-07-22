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
    
    ngOnInit() {
        this.id = 'file-' + this.curElem.id + '-' + this.attr.type + parseInt(Math.random() * 100000000);
        this.$emlement = $(".file-upload");
        this.$emlement.fileinput({
            showCaption: false,
            uploadUrl: Config.UPLOAD_URL
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
        this.$emlement.on('fileclear', this.handleClear);
        this.$emlement.on('filecleared', this.handleCleared);
        this.$emlement.on('fileloaded', this.handleFileLoaded);
        this.$emlement.on('filereset', this.handleFileReset);
        this.$emlement.on('filedeleted', this.handleFileDeleted);
        this.$emlement.on('fileuploaded', this.handleFileUploaded);
        this.$emlement.on('fileuploaderror', this.handleFileUploadError);

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
        console.log('handleCleared');
        console.log($event);
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
        console.log($event);
    }

    handleFileUploaded($event){
        console.log('handleFileUploaded');
        console.log($event);
    }

    handleFileUploadError($event){
        console.log('fileuploaderror');
        console.log($event);
    }
}
