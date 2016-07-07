import {VacProjectWidget} from "../model/project-widget";
import {Injectable} from "@angular/core";
import {VacMap} from "../common/map";
/**
 * Created by laj on 2016/7/4.
 */
export class VacProjectWidgetTemplate{
    constructor(public widget: VacProjectWidget
                , public hover: boolean
                , public iconHoverPos: number
                , public iconNormalPos: number
                , public icon: string
                , public iconSel: string){

    }
}

@Injectable()
export class VacProjectWidgetTemplateService{
    templates:VacMap<VacProjectWidgetTemplate> = new VacMap<VacProjectWidgetTemplate>();

    constructor(){
        this.templates.set('button', new VacProjectWidgetTemplate(
            new VacProjectWidget('button', 'button', '0', false, `<button id="{{widget.id}}" class="button button-positive">{{widget.name}}</button>`),
            '', ''));
        this.templates.set('radio', new VacProjectWidgetTemplate(
            new VacProjectWidget(
                'radio',
                'radio',
                '0',
                false,
                `<ion-list id="{{widget.id}}">
            <ion-radio ng-model="choice" ng-value="\'A\'">Choose A</ion-radio><ion-radio ng-model="choice" ng-value="\'B\'">Choose B</ion-radio>
        </ion-list>`
            ),
            '', ''
        ));
        this.templates.set('range', new VacProjectWidgetTemplate(
            new VacProjectWidget(
                'range',
                'range',
                '0',
                false,
                `haha`
            ),
            '', ''
        ));
        this.templates.set('header', new VacProjectWidgetTemplate(
            new VacProjectWidget(
                'header',
                'header',
                '0',
                true,
                `<ion-header-bar id="{{widget.id}}" align-title="{{widget.textAlign}}" class="bar-{{widget.theme}}">{{widget.title}}</ion-header-bar>`
            ),
            '', ''
        ));
        this.templates.set('content', new VacProjectWidgetTemplate(
            new VacProjectWidget(
                'content',
                'content',
                '0',
                true,
                `<ion-content id="{{widget.id}}" class="has-header">{{{widgets.html}}</ion-content>`
            ),
            '', ''
        ));
        this.templates.set('footer', new VacProjectWidgetTemplate(
            new VacProjectWidget(
                'footer',
                'footer',
                '0',
                true,
                `<ion-footer-bar id="{{widget.id}}" align-title="left" class="bar-positive">{{{widgets.html}}}</ion-footer-bar>`
            ),
            '', ''
        ));
    }
}
