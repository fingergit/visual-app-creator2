/**
 * Created by laj on 2016/7/4.
 */

export enum EVacProjectElemType{
    BEGIN = 0,
    GROUP = BEGIN,
    PAGE,
    WIDGET,
    END
}

export class VacProjectElemStatus{
    // checked: boolean = false;
    // disabled: boolean = false;
    expanded: boolean = false;
    selected: boolean = false;

    clone():VacProjectElemStatus{
        let status = new VacProjectElemStatus();
        // status.checked = this.checked;
        // status.disabled = this.disabled;
        status.expanded = this.expanded;
        status.selected = this.selected;

        return status;
    }
}

export class VacProjectElem{
    children: Array<VacProjectElem> = null;
    parent: VacProjectElem = null;
    state: VacProjectElemStatus = new VacProjectElemStatus(); // 用于树状态表中选中。

    constructor(public name: string
                ,public elemType: EVacProjectElemType
                ,public id: string
                ,public isContainer
    ){
    }

    addChild(child:VacProjectElem, idx: number):boolean{
        let success:boolean;
        do{
            if (!child){
                break;
            }

            let childType = child.elemType;
            let canAdd = false;
            switch (this.elemType){
                case EVacProjectElemType.GROUP:
                    if (childType !== EVacProjectElemType.GROUP && childType !== EVacProjectElemType.PAGE){
                        break;
                    }
                    canAdd = true;
                    break;
                case EVacProjectElemType.PAGE:
                    canAdd = (childType === EVacProjectElemType.WIDGET);
                    break;
                case EVacProjectElemType.WIDGET:
                    canAdd = (childType === EVacProjectElemType.WIDGET && this.isContainer);
                    break;
            }
            if (!canAdd){
                break;
            }

            if (!this.children){
                this.children = [child];
            }
            else{
                if (idx == -1 || idx >= this.children.length){
                    this.children.push(child);
                }
                else{
                    this.children.splice(idx, 0, child);
                }
            }
            child.parent = this;

            success = true;
        }while(false);
        return success;
    }

    removeChild(child: VacProjectElem):boolean{
        let idx:number = this.getIndex(child);
        if (idx === -1){
            return false;
        }
        this.children.splice(idx, 1);
        child.parent = null;

        return true;
    }

    /**
     * 从父对象中将此对象移除。
     * @returns {boolean}
     */
    remove():boolean{
        if (!this.parent){
            return false;
        }
        this.removeChild(this);
    }

    getIndex(child: VacProjectElem):number{
        var retIdx = -1;
        for (let i = 0; i < this.children.length; i++){
            let theChild = this.children[i];
            if (theChild === child){
                retIdx = i;
                break;
            }
        }

        return retIdx;
    }

    clone():VacProjectElem{
        let newElem: VacProjectElem = new VacProjectElem(this.name, this.elemType, this.isContainer);
        newElem.parent = null; // 新克隆的没有父对象。
        newElem.id = this.id;

        newElem.state = this.state.clone();

        if (this.children){
            for (let i = 0; i < this.children.length; i++){
                let child : VacProjectElem = this.children[i];
                let newChild = child.clone();
                if (!newElem.children){
                    newElem.children = [];
                }
                newElem.children.push(newChild);
                newChild.parent = newElem;
            }
        }

        return newElem;
    }
}