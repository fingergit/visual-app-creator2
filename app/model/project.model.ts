import {EVacProjectElemType, VacProjectElem} from "./project-element";
import {VacProjectGroup} from "./project-group";
import {VacProjectPage} from "./project-page";
import {VacProjectWidget} from "./project-widget";
import {Json} from "@angular/core/esm/src/facade/lang";
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
    }

    static fromJson(jsonText: string):VacProject{
        let obj:Object = Json.parse(jsonText);
        let project: VacProject;

        do{
            // 检查是否有相关的属性，来确是否可以序列化为VacProject实例。
            let name:string = obj.name;
            if (!obj || !name || !obj.hasOwnProperty('root') || !obj.hasOwnProperty('nextId')){
                break;
            }

            project = new VacProject(name);

            for (let key in obj){
                if (!obj.hasOwnProperty(key)){
                    continue;
                }

                let item = obj[key];
                if (key === 'root'){
                    project.root = project.root.fromJsonObj(item);
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

    getRoot():VacProjectGroup{
        return this.root;
    }

    getCurrentGroup():VacProjectGroup{
        return this._getCurElem(EVacProjectElemType.GROUP);
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
        return this._getCurElem(EVacProjectElemType.WIDGET);
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
        let elemId:string = this.nextId[type].toString();
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
            case EVacProjectElemType.WIDGET:
                elem = new VacProjectWidget(name, elemId, widgetType);
                parent = this.curElem[EVacProjectElemType.PAGE] ? this.curElem[EVacProjectElemType.PAGE] : this.root;
                break;
        }

        if (!parent){
            return null;
        }

        if (!parent.addChild(elem, -1)){
            return null;
        }

        if (this.curElem[EVacProjectElemType.GROUP]){
            this.curElem[EVacProjectElemType.GROUP].state.selected = false;
        }
        if (this.curElem[EVacProjectElemType.PAGE]){
            this.curElem[EVacProjectElemType.PAGE].state.selected = false;
        }
        if (this.curElem[EVacProjectElemType.WIDGET]){
            this.curElem[EVacProjectElemType.WIDGET].state.selected = false;
        }
        elem.state.selected = true;
        parent.state.expanded = true;
        switch (type){
            case EVacProjectElemType.GROUP:
                this.curElem[EVacProjectElemType.GROUP] = elem;
                this.curElem[EVacProjectElemType.PAGE] = null;
                this.curElem[EVacProjectElemType.WIDGET] = null;
                break;
            case EVacProjectElemType.PAGE:
                this.curElem[EVacProjectElemType.PAGE] = elem;
                this.curElem[EVacProjectElemType.WIDGET] = null;
                break;
            case EVacProjectElemType.WIDGET:
                this.curElem[EVacProjectElemType.WIDGET] = <VacProjectWidget>elem;
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

        if (this.curElem[EVacProjectElemType.GROUP]){
            this.curElem[EVacProjectElemType.GROUP].state.selected = false;
        }
        if (this.curElem[EVacProjectElemType.PAGE]){
            this.curElem[EVacProjectElemType.PAGE].state.selected = false;
        }
        if (this.curElem[EVacProjectElemType.WIDGET]){
            this.curElem[EVacProjectElemType.WIDGET].state.selected = false;
        }
        elem.state.selected = true;
        switch (elem.elemType){
            case EVacProjectElemType.GROUP:
                this.curElem[EVacProjectElemType.GROUP] = elem;
                this.curElem[EVacProjectElemType.PAGE] = null;
                this.curElem[EVacProjectElemType.WIDGET] = null;
                break;
            case EVacProjectElemType.PAGE:
                this.curElem[EVacProjectElemType.PAGE] = elem;
                this.curElem[EVacProjectElemType.WIDGET] = null;
                break;
            case EVacProjectElemType.WIDGET:
                this.curElem[EVacProjectElemType.WIDGET] = <VacProjectWidget>elem;
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

        if (this.curElem[EVacProjectElemType.GROUP]){
            this.curElem[EVacProjectElemType.GROUP].state.selected = false;
        }
        if (this.curElem[EVacProjectElemType.PAGE]){
            this.curElem[EVacProjectElemType.PAGE].state.selected = false;
        }
        if (this.curElem[EVacProjectElemType.WIDGET]){
            this.curElem[EVacProjectElemType.WIDGET].state.selected = false;
        }
        elem.state.selected = true;
        switch (elem.elemType){
            case EVacProjectElemType.GROUP:
                this.curElem[EVacProjectElemType.GROUP] = null;
                this.curElem[EVacProjectElemType.PAGE] = null;
                this.curElem[EVacProjectElemType.WIDGET] = null;
                break;
            case EVacProjectElemType.PAGE:
                this.curElem[EVacProjectElemType.PAGE] = null;
                this.curElem[EVacProjectElemType.WIDGET] = null;
                break;
            case EVacProjectElemType.WIDGET:
                this.curElem[EVacProjectElemType.WIDGET] = null;
                break;
        }

        return true;
    }

    addWidget(widget: VacProjectElem, parent: VacProjectElem, changeId: boolean) : boolean{
        if (!parent || parent.elemType == EVacProjectElemType.GROUP || !parent.isContainer){
            console.log("Invalid parent");
            return false;
        }
        if (changeId){
            widget.id = this.nextId[widget.elemType].toString();
            this.nextId[widget.elemType] ++;
        }

        parent.addChild(widget, -1);
        this.curElem[EVacProjectElemType.WIDGET] = widget;
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