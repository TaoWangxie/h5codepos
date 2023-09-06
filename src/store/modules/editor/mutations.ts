import { EditorStateType } from "./state";
import store from '@/store/index'
import _ from "lodash-es"
import { ElMessage } from 'element-plus'
import { generateID } from '@/utils/generateID'
import { swap } from '@/utils/index'
export default {
  SET_DATA(state: EditorStateType, msg: { key: keyof EditorStateType; properties?:any; nextproperties?:any; val: unknown; }) {
    if(msg.properties && msg.nextproperties){
      state[msg.key][msg.properties][msg.nextproperties] = msg.val;
    }else if(msg.properties){
      state[msg.key][msg.properties] = msg.val;
    } else{
      state[msg.key] = msg.val;
    }
  },
  PUSH_DATA(state: EditorStateType, msg: { key: string; val: any, index:any }) {
    if (msg.index !== undefined) {
      _.get(state,msg.key).splice(msg.index, 0, msg.val)
    } else {
      _.get(state,msg.key).push(msg.val);
    }
  },
  PUSH_CURRENT_CONFIG(state: EditorStateType,payload: any){
    state.currentGrid.config.push(payload)
  },
  LAYOUT_SPLICE(state:EditorStateType,payload:{index:number,howmany:number,rest:any[]}){
    state.layoutData.splice(payload.index,payload.howmany,...payload.rest)
  },
  SET_SHAP_STYLE(state:EditorStateType, payload: { index:any, top:number, left:number, width:number, height:number, rotate?:number }){
    let  { index, top, left, width, height, rotate } = payload
    let grid = index || index == 0 ? state.layoutData[index] : state.currentGrid
    if (top || top == 0) grid.style.top = top
    if (left || left == 0) grid.style.left = left
    if (width) grid.style.width = width
    if (height) grid.style.height = height
    if (rotate) grid.style.rotate = rotate
  },
  //删除组件
  DELETE_GRID(state, index) {
    if (index === undefined) {
        index = state.currentGridIndex
    }
    if (index == state.currentGridIndex) {
        state.currentGridIndex = null
        state.currentGrid = null
    }
    state.layoutData.splice(index, 1)
  },

  //快照
  RECORD_SNAPSHOT(state:EditorStateType) {
    // 添加新的快照
    state.snapshotData[++state.snapshotIndex] = _.cloneDeep(state.layoutData)
    // 在 undo 过程中，添加新的快照时，要将它后面的快照清理掉
    if (state.snapshotIndex < state.snapshotData.length - 1) {
        state.snapshotData = state.snapshotData.slice(0, state.snapshotIndex + 1)
    }
  },
  //撤销
  UNDO(state:EditorStateType) {
    if (state.snapshotIndex >= 0) {
        state.snapshotIndex--
        const layoutData = _.cloneDeep(state.snapshotData[state.snapshotIndex]) || []
        if (state.currentGrid) {
            // 如果当前组件不在 layoutData 中，则置空
            let needClean = !layoutData.find(grid => state.currentGrid.id === grid.id)
            needClean && store.commit('editor/SET_DATA', {key:'currentGrid', val:null})
        }
        store.commit('editor/SET_DATA', {key:'layoutData', val:layoutData})
      }
  },
  //重做
  REDO(state:EditorStateType) {
      if (state.snapshotIndex < state.snapshotData.length - 1) {
          state.snapshotIndex++
          store.commit('editor/SET_DATA', {key:'layoutData', val:_.cloneDeep(state.snapshotData[state.snapshotIndex])})
      }
  },
  //设置shap位置集合
  SET_SHAP_POS(state,arr){
    let posXArr:any = new Set()
    let posYArr:any = new Set()
    arr.map((item)=>{
        let { top, left, height, width } = item.style
        posYArr.add(top)
        posXArr.add(left)
        posYArr.add(top + height)
        posXArr.add(left + width)
    })
    state.shapPosXList = posXArr
    state.shapPosYList = posYArr
  },
  SET_MARKLINE(state, { top, left, height, width  }){
    if([...state.shapPosXList].includes(left)){
      state.markLineX = left
    }else if([...state.shapPosXList].includes(left + width)){
      state.markLineX = left + width
    }else{
      state.markLineX = null
    }
    if([...state.shapPosYList].includes(top)){
      state.markLineY = top
    }else if([...state.shapPosYList].includes(top + height)){
      state.markLineY = top + height
    }else{
      state.markLineY = null
    }
  },
  //=================================右键menu操作=========================================
  //显示menu
  SHOW_CONTEXT_MENU(state, { top, left }) {
    state.menuTop = top
    state.menuLeft = left
    state.menuShow = true
  },
  //隐藏menu
  HIDE_CONTEXT_MENU(state) {
      state.menuShow = false
  },
  //锁定
  lock({ currentGrid }) {
    currentGrid.isLock = true
  },
  //解锁
  unlock({ currentGrid }) {
    currentGrid.isLock = false
  },
  //复制
  copy(state) {
    if(!state.currentGrid) return
    // 如果有剪切的数据，需要先还原
    restorePreCutData(state)
    copyData(state)
    state.isCut = false
  },
  //粘贴
  paste(state, {isMouse,isTop}) {
    if(!state.copyData) return
    const data = state.copyData.data
    if (isMouse) {
        data.style.top = state.canvasEPos.top
        data.style.left = state.canvasEPos.left
    } else {
        data.style.top += 10
        data.style.left += 10
    }
    data.id = generateID()
    data.parentId = null
    data.isLock = false
    data.relativeStyle = {}
    // if(state.isCut) state.copyData = null
    if(isTop && data.children.length) data.children = []
    store.commit('editor/PUSH_DATA', { key:'layoutData', val:_.cloneDeep(data)})
    !isTop && pasteChildData(state,data)
    
  },
  //剪切(无用)
  cut(state) {
    if (!state.currentGrid) return
    // 如果重复剪切，需要恢复上一次剪切的数据
    restorePreCutData(state)
    copyData(state)
    store.commit('editor/DELETE_GRID')
    state.isCut = true
  },
  //删除
  delete(state){
    if(state.currentGrid.parentId){
      let parent = state.layoutData.filter((item)=> item.id == state.currentGrid.parentId)
      parent[0].children.map((item,index)=>{
        if(item.id == state.currentGrid.id){
          parent[0].children.splice(index, 1)
        }
      })
    }
    //递归删除子级
    deleteChild(state,state.currentGrid)
  },
  //解除关联
  relieve({layoutData, currentGrid}){
    let parent = layoutData.filter((item)=> item.id == currentGrid.parentId)
    parent[0].children.map((item,index)=>{
      if(item.id == currentGrid.id){
        parent[0].children.splice(index, 1)
      }
    })
    currentGrid.parentId = null
    currentGrid.relativeStyle = {}
  },
  // 上移图层
  toUp({ layoutData, currentGridIndex }) {
    // 上移图层 index，表示元素在数组中越往后
    if (currentGridIndex < layoutData.length - 1) {
        swap(layoutData, currentGridIndex, currentGridIndex + 1)
    } else {
        ElMessage.warning('已经到顶了')
    }
  },
  // 下移图层
  toDown({ layoutData, currentGridIndex }) {
      // 下移图层 index，表示元素在数组中越往前
      if (currentGridIndex > 0) {
          swap(layoutData, currentGridIndex, currentGridIndex - 1)
      } else {
          ElMessage.warning('已经到底了')
      }
  },
  // 置顶
  toTop({ layoutData, currentGridIndex, currentGrid }) {
    if (currentGridIndex < layoutData.length - 1) {
        layoutData.splice(currentGridIndex, 1)
        layoutData.push(currentGrid)
    } else {
        ElMessage.warning('已经到顶了')
    }
  },
  // 置底
  toBottom({ layoutData, currentGridIndex, currentGrid }) {
      if (currentGridIndex > 0) {
          layoutData.splice(currentGridIndex, 1)
          layoutData.unshift(currentGrid)
      } else {
          ElMessage.warning('已经到底了')
      }
  },
};




//=========================================== utils =============================================
//粘贴子级
function pasteChildData(state,copyParent){
  copyParent.children.length && copyParent.children.map((child:any,index:any)=>{
    let childGrid = state.layoutData.filter((item)=> item.id == child.id)
    let newData = _.cloneDeep(childGrid[0])
    newData.id = generateID()
    state.layoutData[state.layoutData.length-1].children[index].id = newData.id
    newData.parentId = copyParent.id
    newData.style.top = copyParent.style.top + newData.relativeStyle.top
    newData.style.left = copyParent.style.left + newData.relativeStyle.left
    store.commit('editor/PUSH_DATA', { key:'layoutData', val:newData})
    pasteChildData(state,newData)
  })
}
// 恢复上一次剪切的数据
function restorePreCutData(state) {
    if (state.isCut && state.copyData) {
        const data = _.cloneDeep(state.copyData.data)
        const index = state.copyData.index
        data.id = generateID()
        store.commit('editor/PUSH_DATA', { key:'layoutData', val:data, index })
        if (state.currentGridIndex >= index) {
            // 如果当前组件索引大于等于插入索引，需要加一，因为当前组件往后移了一位
            state.currentGridIndex++
        }
    }
}
function copyData(state) {
    state.copyData = {
        data: _.cloneDeep(state.currentGrid),
        index: state.currentGridIndex,
    }
}
//递归删除
function deleteChild(state,grid){
  let curGrid = _.cloneDeep(grid)
  let gridIndex = state.layoutData.findIndex((item)=> item.id == grid.id)
  store.commit('editor/DELETE_GRID', gridIndex)
  curGrid.children.length && curGrid.children.map((child)=>{
    let childGrid = state.layoutData.filter((item)=> item.id == child.id)
    deleteChild(state,childGrid[0])
  })
}


