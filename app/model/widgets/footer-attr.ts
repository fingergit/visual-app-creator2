import {VacWidgetAttr} from "../widget-attr";
import {VacAttrEnumComboxItem, EVacWidgetAttrType, VacWidgetAttrValue} from "../attr-type";
import {VacMap} from "../../common/map";
import {EVacButtonAttrStyleRange} from "./button-attr";
/**
 * Created by laj on 2016/7/4.
 */

export class EVacTextAlignRange{
    static left = new VacAttrEnumComboxItem('left', 'left');
    static right = new VacAttrEnumComboxItem('right', 'right');
    static center = new VacAttrEnumComboxItem('center', 'center');
}

export class VacFooterAttr extends VacWidgetAttr{
    static STYLE_RANGE: VacMap<EVacButtonAttrStyleRange>;
    static ALIGN_RANGE: VacMap<EVacTextAlignRange>;

    public title: VacWidgetAttrValue;
    public style: VacWidgetAttrValue;
    public alignTitle: VacWidgetAttrValue;

    constructor(){
        super('底部栏');

        if (!VacFooterAttr.STYLE_RANGE){
            VacFooterAttr.STYLE_RANGE = new VacMap<EVacButtonAttrStyleRange>();
            for (let key in EVacButtonAttrStyleRange){
                if (!EVacButtonAttrStyleRange.hasOwnProperty(key)){
                    continue;
                }
                let item = EVacButtonAttrStyleRange[key];
                VacFooterAttr.STYLE_RANGE.set(key, item);
            }

        }

        if (!VacFooterAttr.ALIGN_RANGE){
            VacFooterAttr.ALIGN_RANGE = new VacMap<EVacTextAlignRange>();
            for (let key in EVacTextAlignRange){
                if (!EVacTextAlignRange.hasOwnProperty(key)){
                    continue;
                }
                let item = EVacTextAlignRange[key];
                VacFooterAttr.ALIGN_RANGE.set(key, item);
            }

        }

        this.title = new VacWidgetAttrValue('标题', '标题', EVacWidgetAttrType.text, null);
        this.style = new VacWidgetAttrValue('样式', EVacButtonAttrStyleRange.light, EVacWidgetAttrType.enumCombBox, VacFooterAttr.STYLE_RANGE);
        this.alignTitle = new VacWidgetAttrValue('对齐', EVacTextAlignRange.center, EVacWidgetAttrType.enumCombBox, VacFooterAttr.ALIGN_RANGE)
    }

    newInstance(){
        return new VacFooterAttr();
    }

    copyFrom(src:VacWidgetAttr){
        let src2 = <VacFooterAttr>src;
        this.title = src2.title.clone();
        this.style = src2.style.clone();
        this.alignTitle = src2.alignTitle.clone();
    }
}

