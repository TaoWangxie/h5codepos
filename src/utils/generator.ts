
import _ from 'lodash'
import { getRdomFn, domStyleObj, getHtmlStrFn} from '@/utils/common'
import { HTMLFormat } from "@/utils/HTMLFormat";
import { formatCss } from "@/utils/CSSFormat";
import { setSessionStorage, getSessionStorage } from "@/utils/index";
import store from '@/store';
let { editor: $editor } = store.state as any

let wfullList = {}
export function getCode(){

    //css合集
    let styleLists = {}
    //样式生成类初始化
    let DomStyleObj = new domStyleObj(styleLists);
    //最外层盒子
    let box = getRdomFn()
    DomStyleObj.addClassName(box,[`container`,'pos_r'])
    //获取js数据配置
    wfullList = {}
    let config = getConfig()
    //获取真实dom
    getRdom($editor.layoutData,box,DomStyleObj)
    //获取页面html
    let html = getHtmlStrFn(box)
    setSessionStorage('pageConfig',config)
    return {
        config:config,
        html:HTMLFormat(html),
        js:JSON.stringify(config,null,4),
        css:handleCss(DomStyleObj.styleLists),
    }
}

const getRdom =(arr:any,box:any, DomStyleObj:any)=>{
    arr.map((item)=>{
        //拿到真实数据
        let grid = $editor.layoutData.filter((grid)=>item.id == grid.id)
        let {relativeStyle, style} = grid[0]
        if(!item.parentId){ //这里用item判断
            let newBox = getRdomFn()
            //处理html
            newBox.innerHTML = `
            <component
                :is="'${grid[0].comKey}'"
                :config="config['${grid[0].id}']"
                :data="data['${grid[0].id}']"
            ></component>`
            //基础样式数据
            let boxStyle = {
                top: relativeStyle.top || style.top,
                left: relativeStyle.left || style.left,
                width: style.width,
                height: style.height,
            }
            let className = `css_${grid[0].id}`
            DomStyleObj.createStyle(className,boxStyle,wfullList[grid[0].id])
            DomStyleObj.addClassName(newBox,[`pos_a`,className])
            box.appendChild(newBox)
            if(grid[0].children && grid[0].children.length){
                getRdom(grid[0].children,newBox,DomStyleObj)
            }
        }
    })
}

const getConfig =()=>{
    let pageConfig = {}
    let pageData = {}
    let pageDoms = []
    $editor.layoutData.map((item)=>{
        pageConfig[item.id] = {
            data:item.config.data
        }
        pageData[item.id] = {
            data:item.data.data
        }
        if(!item.parentId) handleDoms(pageDoms,item)
    })
    return {
        pageConfig:pageConfig,
        pageData:pageData,
        pageDoms:pageDoms
    }

}

const handleDoms = (dom:any,grid:any)=>{
    let obj = {}
    obj['wfull'] = false
    obj['code'] = grid.id
    obj['type'] = grid.comKey
    obj['style'] = _.cloneDeep(grid.style)
    if(grid.parentId){
        let parentGrid = $editor.layoutData.find(it=>it.id == grid.parentId)
        if(parentGrid.style.width == obj['style'].width){
            obj['wfull'] = true
            wfullList[grid.id] = true
        }
        obj['style'].top = grid.relativeStyle.top
        obj['style'].left = grid.relativeStyle.left
    }else{
        if(obj['style'].width == $editor.canvasW){
            obj['wfull'] = true
            wfullList[grid.id] = true
        }
    }
    dom.push(obj)
    if(grid.children.length){
        obj['children'] = []
        grid.children.map((item:any)=>{
            let newGrid = $editor.layoutData.find(it=>it.id == item.id)
            handleDoms(obj['children'],newGrid)
        })
    }
}

const handleCss=(data)=>{
    let css = `${Object.values(data).join("\n")}`
    return formatCss(css)
}