
import { defaultStyles } from "@/config/defaultStyles";
import { hasOwn } from "@/utils/index";
import store from '@/store';
let { editor: $editor } = store.state as any

//dom类名操作
export class domStyleObj {
    styleLists: any;
    constructor(styleLists:any) {
        //样式集合
        this.styleLists = styleLists
    }
    //添加页面所有类名
    addClassName(Rdom:any,className:any){
        let classNameArr = Array.isArray(className) ? className : [className]
        classNameArr.map((item)=>{
            Rdom.classList.add(item);
            if(hasOwn(defaultStyles,item) && !hasOwn(this.styleLists,item)){
                this.styleLists[item] = defaultStyles[item]
            }
        })
    }
    //添加flex高度方法
    createStyle(className:any, payload: { top:number, left:number, width:number, height:number},wfull:boolean){
        let  { top, left, width, height } = payload
        let style = `.${className}{
            top: ${top}px;
            left: ${left}px;
            width: ${ wfull ? '100%' : width + 'px'};
            height: ${height}px;
        }`
        this.addStyleFn(className,style)
    }
    addStyleFn(className:any,style:any){
        if(!this.styleLists[className]){
            this.styleLists[className] = style
        }
    }
}

//设置dom样式
export function setDomStyle(Rdom:any, payload: { top:number, left:number, width:number, height:number}) {
    let  { top, left, width, height, } = payload
    if (top || top == 0) Rdom.style.top = top
    if (left || left == 0) Rdom.style.left = left
    if (width) Rdom.style.width = width
    if (height) Rdom.style.height = height
}


//获取真实dom盒子
export function getRdomFn() {
    let dom = document.createElement('div')
     return dom;
}

/**
 * 获取格式化html代码
 * @param {*} Rdom 真实dom
 * @param callBack 回调函数，处理html代码
 * @returns 
 */
 export function getHtmlStrFn(Rdom:any,callBack?:Function){
    let dom:any = document.createElement('div')
    dom.appendChild(Rdom)
    let html = dom.innerHTML
    dom = Rdom = null
    return html
}

//获取鼠标相对于编辑器的位置
export function getEventInCanvasPos(e:any){
    // 计算菜单相对于编辑器的位移
    let target = e.target
    let ECtop = e.offsetY
    let ECleft = e.offsetX
    while (target instanceof SVGElement) {
        target = target.parentNode
    }
    while (!target.className.includes('canvas')) {
        ECleft += target.offsetLeft
        ECtop += target.offsetTop
        target = target.parentNode
    }
    return {
        top:ECtop,
        left:ECleft
    }
}

//同步子级位置
export const syncChildShapPos =(curGrid:any,diffX:any,diffY:any,startPos:any)=>{
    curGrid.children.length && curGrid.children.map((child:any)=>{
        let top = Math.round(diffY + startPos[child.id].startTop)
        let left = Math.round(diffX + startPos[child.id].startLeft)
        let childGridIndex = $editor.layoutData.findIndex((item)=> item.id == child.id)
        store.commit('editor/SET_SHAP_STYLE', {index:childGridIndex, top, left})
        //递归处理子级
        $editor.layoutData[childGridIndex].children.length && syncChildShapPos($editor.layoutData[childGridIndex],diffX,diffY,startPos)
    })
}
//设置子级初始位置
export const setStartPos = (curGrid:any,startPos:any) => {
    curGrid.children.length && curGrid.children.map((child:any)=>{
        let childGridIndex = $editor.layoutData.findIndex((item)=> item.id == child.id)
        let { top, left } = $editor.layoutData[childGridIndex].style
        startPos[child.id] = {
            startTop: Number(top),
            startLeft: Number(left)
        }
        //递归处理子级
        $editor.layoutData[childGridIndex].children.length && setStartPos($editor.layoutData[childGridIndex],startPos)
    })
}