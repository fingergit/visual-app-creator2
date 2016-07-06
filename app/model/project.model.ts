import {EVacProjectElemType, VacProjectElem} from "./project-element";
import {VacProjectGroup} from "./project-group";
import {VacProjectPage} from "./project-page";
import {VacProjectWidget} from "./project-widget";
/**
 * Created by laj on 2016/7/4.
 */

export class VacProject{
    root: VacProjectGroup;
    nextId:Array<number> = [];

    currentGroup: VacProjectGroup;
    currentPage: VacProjectPage;
    currentWidget: VacProjectWidget;

    constructor(public name: string){
        // 每种类型下一元素的id值。每添加一个元素，相应类型的元素id加1。
        for (let i = EVacProjectElemType.BEGIN; i < EVacProjectElemType.END; i++){
            this.nextId[i] = 1;
        }

        this.root = new VacProjectGroup('root', 'root');
    }

    // addGroup(name: string){
    //     return this.createElement(name, EVacProjectElemType.GROUP);
    // }
    //
    // addPage(name: string){
    //     return this.createElement(name, EVacProjectElemType.PAGE);
    // }
    //
    // addWidget(name: string, widgetType: string){
    //     return this.createElement(name, EVacProjectElemType.WIDGET, widgetType);
    // }

    addElement(name: string, type: EVacProjectElemType, widgetType?: string):VacProjectElem{
        let elem:VacProjectElem = null;
        let elemId:string = this.nextId[type].toString();
        let parent:VacProjectElem;

        switch (type){
            case EVacProjectElemType.GROUP:
                elem = new VacProjectGroup(name, elemId);
                parent = this.currentGroup ? this.currentGroup : this.root;
                break;
            case EVacProjectElemType.PAGE:
                elem = new VacProjectPage(name, elemId);
                parent = this.currentGroup ? this.currentGroup : this.root;
                break;
            case EVacProjectElemType.WIDGET:
                elem = new VacProjectWidget(name, elemId, widgetType);
                parent = this.currentPage ? this.currentPage : this.root;
                break;
        }

        if (!parent){
            return null;
        }

        if (!parent.addChild(elem, -1)){
            return null;
        }

        if (this.currentGroup){
            this.currentGroup.state.selected = false;
        }
        if (this.currentPage){
            this.currentPage.state.selected = false;
        }
        if (this.currentWidget){
            this.currentWidget.state.selected = false;
        }
        elem.state.selected = true;
        parent.state.expanded = true;
        switch (type){
            case EVacProjectElemType.GROUP:
                this.currentGroup = elem;
                this.currentPage = null;
                this.currentWidget = null;
                break;
            case EVacProjectElemType.PAGE:
                this.currentPage = elem;
                this.currentWidget = null;
                break;
            case EVacProjectElemType.WIDGET:
                this.currentWidget = <VacProjectWidget>elem;
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

        if (this.currentGroup){
            this.currentGroup.state.selected = false;
        }
        if (this.currentPage){
            this.currentPage.state.selected = false;
        }
        if (this.currentWidget){
            this.currentWidget.state.selected = false;
        }
        elem.state.selected = true;
        switch (elem.elemType){
            case EVacProjectElemType.GROUP:
                this.currentGroup = elem;
                this.currentPage = null;
                this.currentWidget = null;
                break;
            case EVacProjectElemType.PAGE:
                this.currentPage = elem;
                this.currentWidget = null;
                break;
            case EVacProjectElemType.WIDGET:
                this.currentWidget = <VacProjectWidget>elem;
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

        if (this.currentGroup){
            this.currentGroup.state.selected = false;
        }
        if (this.currentPage){
            this.currentPage.state.selected = false;
        }
        if (this.currentWidget){
            this.currentWidget.state.selected = false;
        }
        elem.state.selected = true;
        switch (elem.elemType){
            case EVacProjectElemType.GROUP:
                this.currentGroup = null;
                this.currentPage = null;
                this.currentWidget = null;
                break;
            case EVacProjectElemType.PAGE:
                this.currentPage = null;
                this.currentWidget = null;
                break;
            case EVacProjectElemType.WIDGET:
                this.currentWidget = null;
                break;
        }

        return true;
    }

    findElementById(id:string, type: EVacProjectElemType, parent: VacProjectElem):VacProjectElem{
        if (!parent || !parent.children){
            return null;
        }

        for (let i = 0; i < parent.children.length; i++){
            let child:VacProjectElem = parent.children[i];
            if (child.elemType === type && child.id === id){
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