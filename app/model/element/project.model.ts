import {EVacProjectElemType, VacProjectElem} from "./project-element";
import {VacProjectGroup} from "./project-group";
import {VacProjectPage} from "./project-page";
import {VacProjectWidget} from "./project-widget";
import {Json} from "@angular/core/esm/src/facade/lang";
import {VacProjectElemFactory} from "./project-element-factory";
import {LogService} from "../../common/log.service";
/**
 * Created by laj on 2016/7/4.
 */

export class VacProject{
    private root: VacProjectGroup;
    private nextId:Array<number> = [];
    private curId: Array<string> = [];

    // 不需序列化
    private curElem:Array<VacProjectElem> = [];

    constructor(private name: string){
        // 每种类型下一元素的id值。每添加一个元素，相应类型的元素id加1。
        for (let i = EVacProjectElemType.BEGIN; i < EVacProjectElemType.END; i++){
            this.nextId[i] = 1;
            this.curId[i] = null;
            this.curElem[i] = null;
        }

        this.root = new VacProjectGroup('root', 'root');
        this.root.state.expanded = true;
        let page:VacProjectPage = new VacProjectPage('default', this.nextId[EVacProjectElemType.PAGE].toString());
        this.nextId[EVacProjectElemType.PAGE] ++;
        this.root.addChild(page, -1);
        this.setCurrentPage(page);
    }

    static fromJson(jsonText: string):VacProject{
        let obj:Object = Json.parse(jsonText);
        let project: VacProject;

        do{
            // 检查是否有相关的属性，来确是否可以序列化为VacProject实例。
            if (!obj || !obj.hasOwnProperty('name') || !obj.hasOwnProperty('root') || !obj.hasOwnProperty('nextId')){
                break;
            }

            let name:string = obj['name'];
            project = new VacProject(name);

            for (let key in obj){
                if (!obj.hasOwnProperty(key)){
                    continue;
                }

                let item = obj[key];
                if (key === 'root'){
                    VacProjectElemFactory.fromJsonObj(project.root, item);
                }
                else if (key === 'nextId'){
                    project.nextId = item;
                }
                else if (key == 'curId'){
                    project.curId = item;
                }
            }

            for (let i = EVacProjectElemType.BEGIN; i < EVacProjectElemType.END; i++){
                if (!project.curId[i]){
                    continue;
                }

                project.curElem[i] = project.root.getChild(project.root.children, i, project.curId[i]);
            }
        }while(false);

        return project;
    }

    toJsonText():string{
        this.root.unlinkParents(null);
        let curElem = this.curElem;
        this.curElem = null;

        let jsonText:string = Json.stringify(this);

        this.curElem = curElem;
        this.root.relinkParents(null, null);

        return jsonText;
    }

    getName():string{
        return this.name;
    }

    setName(name: string){
        this.name = name;
    }

    getRoot():VacProjectGroup{
        return this.root;
    }

    getCurrentGroup():VacProjectGroup{
        return <VacProjectGroup>(this._getCurElem(EVacProjectElemType.GROUP));
    }
    
    setCurrentGroup(group: VacProjectGroup){
        this._setCurElem(group, EVacProjectElemType.GROUP);
    }
    
    getCurrentPage():VacProjectPage{
        return this._getCurElem(EVacProjectElemType.PAGE);
    }

    setCurrentPage(page: VacProjectPage){
        this._setCurElem(page, EVacProjectElemType.PAGE);
    }

    getCurrentWidget():VacProjectWidget{
        return <VacProjectWidget>(this._getCurElem(EVacProjectElemType.WIDGET));
    }

    setCurrentWidget(widget: VacProjectWidget){
        this._setCurElem(widget, EVacProjectElemType.WIDGET);
    }

    private _getCurElem(type: EVacProjectElemType) : VacProjectElem{
        return this.curElem[type];
    }

    private _setCurElem(elem: VacProjectElem, type: EVacProjectElemType){
        if (this.curElem[type]){
            this.curElem[type].state.selected = false;
        }
        this.curElem[type] = elem;
        this.curId[type] = elem ? elem.id : null;
        if (elem){
            this.curElem[type].state.selected = true;
        }
    }

    addElement(name: string, type: EVacProjectElemType, widgetType?: string):VacProjectElem{
        let elem:VacProjectElem = null;
        let elemId:string = EVacProjectElemType[type] + '-' + this.nextId[type].toString();
        let parent:VacProjectElem;

        switch (type){
            case EVacProjectElemType.GROUP:
                elem = new VacProjectGroup(name, elemId);
                parent = this.curElem[EVacProjectElemType.GROUP] ? this.curElem[EVacProjectElemType.GROUP] : this.root;
                break;
            case EVacProjectElemType.PAGE:
                elem = new VacProjectPage(name, elemId);
                parent = this.curElem[EVacProjectElemType.GROUP] ? this.curElem[EVacProjectElemType.GROUP] : this.root;
                break;
            default:
                LogService.d("invalid element type");
                break;
        }

        if (!parent){
            return null;
        }

        if (!parent.addChild(elem, -1)){
            return null;
        }

        parent.state.expanded = true;
        switch (type){
            case EVacProjectElemType.GROUP:
                this.setCurrentGroup(elem);
                this.setCurrentPage(null);
                this.setCurrentWidget(null);
                break;
            case EVacProjectElemType.PAGE:
                this.setCurrentPage(elem);
                this.setCurrentWidget(null);
                break;
            case EVacProjectElemType.WIDGET:
                this.setCurrentWidget(<VacProjectWidget>elem);
                break;
        }

        this.nextId[type] ++;

        return elem;
    }

    reAddElement(elem: VacProjectElem, parent: VacProjectElem):boolean{
        let success = parent.addChild(elem, parent.getIndex(elem));
        if (!success){
            return false;
        }

        parent.state.expanded = true;
        switch (elem.elemType){
            case EVacProjectElemType.GROUP:
                this.setCurrentGroup(elem);
                this.setCurrentPage(null);
                this.setCurrentWidget(null);
                break;
            case EVacProjectElemType.PAGE:
                this.setCurrentPage(elem);
                this.setCurrentWidget(null);
                break;
            case EVacProjectElemType.WIDGET:
                this.setCurrentWidget(<VacProjectWidget>elem);
                break;
        }

        return success;
    }

    removeElement(elem: VacProjectElem):boolean{
        if (!elem){
            return false;
        }

        if (!elem.parent){
            return false;
        }

        let success = elem.parent.removeChild(elem);
        if (!success){
            return success;
        }

        switch (elem.elemType){
            case EVacProjectElemType.GROUP:
                this.setCurrentGroup(null);
                this.setCurrentPage(null);
                this.setCurrentWidget(null);
                break;
            case EVacProjectElemType.PAGE:
                this.setCurrentPage(null);
                this.setCurrentWidget(null);
                break;
            case EVacProjectElemType.WIDGET:
                this.setCurrentWidget(null);
                break;
        }

        return true;
    }

    addWidget(widget: VacProjectWidget, parent: VacProjectElem, changeId: boolean) : boolean{
        if (!parent || parent.elemType == EVacProjectElemType.GROUP || !parent.isContainer){
            console.log("Invalid parent");
            return false;
        }
        if (changeId){
            widget.id = EVacProjectElemType[widget.elemType] + '-' + widget.widgetType + '-' + this.nextId[widget.elemType].toString();
            this.nextId[widget.elemType] ++;
        }

        parent.addChild(widget, -1);
        this.setCurrentWidget(widget);
        return true;
    }

    findElementById(id:string, type: EVacProjectElemType, parent: VacProjectElem):VacProjectElem{
        if (!parent || !parent.children){
            return null;
        }

        for (let i = 0; i < parent.children.length; i++){
            let child:VacProjectElem = parent.children[i];
            if (child.elemType == type && child.id == id){
                return child;
            }

            child = this.findElementById(id, type, child);
            if (child){
                return child;
            }
        }

        return null;
    }
}