import {Injectable} from "@angular/core";
import {VacProjectWidget} from "../../element/project-widget";
import {VacMap} from "../../../common/map";
import {VacWidgetType, VacCustomAttrFactory} from "../custom-attr-factory";
import {WidgetCompilerType} from "../compiler/widget-compiler-factory";

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
        this.templates.set(VacWidgetType.button, new VacProjectWidgetTemplate(
            new VacProjectWidget(VacWidgetType.button, '按钮', '0', false,
                `<button id="{{widget.id}}" class="vac-widget button button-{{widget.attrs.custom.style.value.value}}">{{widget.attrs.custom.text.value}}</button>`,
                WidgetCompilerType.common,
                VacCustomAttrFactory.createAttr(VacWidgetType.button)),
            false, 0, 0,
            '', ''));

        this.templates.set(VacWidgetType.header, new VacProjectWidgetTemplate(
            new VacProjectWidget(VacWidgetType.header, '标题栏', '0', false,
                `
<div id="{{widget.id}}" class="vac-widget bar bar-header bar-{{widget.attrs.custom.style.value.value}}">
    <h1 class="title">{{widget.attrs.custom.title.value}}</h1>
</div>`,
                WidgetCompilerType.common,
                VacCustomAttrFactory.createAttr(VacWidgetType.header)),
            false, 0, 0,
            '', ''));

        this.templates.set(VacWidgetType.radio, new VacProjectWidgetTemplate(
            new VacProjectWidget(
                VacWidgetType.radio,
                'radio',
                '0',
                false,
                `<ion-list id="{{widget.id}}">
            <ion-radio ng-model="choice" ng-value="\'A\'">Choose A</ion-radio><ion-radio ng-model="choice" ng-value="\'B\'">Choose B</ion-radio>
        </ion-list>`,
                WidgetCompilerType.common
            ),
            false, 0, 0,
            '', ''
        ));
        this.templates.set(VacWidgetType.range, new VacProjectWidgetTemplate(
            new VacProjectWidget(
                VacWidgetType.range,
                'range',
                '0',
                false,
                `<div>[[test]]</div>`,
                WidgetCompilerType.common
            ),
            false, 0, 0,
            '', ''
        ));
        // this.templates.set('header', new VacProjectWidgetTemplate(
        //     new VacProjectWidget(
        //         'header',
        //         'header',
        //         '0',
        //         true,
        //         `<ion-header-bar id="{{widget.id}}" align-title="{{widget.textAlign}}" class="bar-{{widget.theme}}">{{widget.title}}</ion-header-bar>`
        //     ),
        //     '', ''
        // ));
        this.templates.set(VacWidgetType.content,
            new VacProjectWidgetTemplate(
                new VacProjectWidget(
                    VacWidgetType.content,
                    '内容区',
                    '0',
                    true,
                    `<ion-content id="{{widget.id}}" class="vac-widget has-header" delegate-handle="{{widget.attrs.custom.delegateHandle.value}}" direction="{{widget.attrs.custom.direction.value.value}}" locking="{{widget.attrs.custom.locking.value}}"></ion-content>`,
                    WidgetCompilerType.common,
                    VacCustomAttrFactory.createAttr(VacWidgetType.content)
                ),
                false, 0, 0,
                '', ''
            )
        );
        this.templates.set(VacWidgetType.footer, new VacProjectWidgetTemplate(
            new VacProjectWidget(
                VacWidgetType.footer,
                '底部栏',
                '0',
                true,
                `<ion-footer-bar id="{{widget.id}}" align-title="{{widget.attrs.custom.alignTitle.value.value}}" class="vac-widget bar-{{widget.attrs.custom.style.value.value}}"><h1 class="title">{{widget.attrs.custom.title.value}}</h1></ion-footer-bar>`,
                WidgetCompilerType.common,
                VacCustomAttrFactory.createAttr(VacWidgetType.footer)
            ),
            false, 0, 0,
            '', ''
        ));
        
        this.templates.set(VacWidgetType.refresher, new VacProjectWidgetTemplate(
            new VacProjectWidget(
                VacWidgetType.refresher,
                '刷新',
                '0',
                true,
                `<ion-refresher id="{{widget.id}}"  class="vac-widget" pulling-text="{{widget.attrs.custom.pullingText.value}}" 
on-refresh="{{widget.attrs.custom.onRefresh.value}}"
></ion-refresher>`,
                WidgetCompilerType.common,
                VacCustomAttrFactory.createAttr(VacWidgetType.refresher)
            ),
            false, 0, 0,
            '', ''
        ));

        this.templates.set(VacWidgetType.listView, new VacProjectWidgetTemplate(
            new VacProjectWidget(
                VacWidgetType.listView,
                '列表',
                '0',
                true,
                `<ion-list id="{{widget.id}}"  class="vac-widget" >
    {{{widget.items}}}
</ion-list>`,
                WidgetCompilerType.list,
                VacCustomAttrFactory.createAttr(VacWidgetType.listView)
            ),
            false, 0, 0,
            '', ''
        ));
    }

    get(widgetType: string):VacProjectWidgetTemplate{
        return this.templates.get(widgetType);
    }
}
