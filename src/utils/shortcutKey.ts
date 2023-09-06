// import { ref, getCurrentInstance } from "vue";
import store from '@/store';
let { editor: $editor } = store.state as any
import context from '@/main'

const ctrlKey = 17,
    shiftKey = 16,
    vKey = 86, // 粘贴
    cKey = 67, // 复制
    xKey = 88, // 剪切

    yKey = 89, // 重做
    zKey = 90, // 撤销

    lKey = 76, // 锁定
    uKey = 85, // 解锁

    sKey = 83, // 保存
    pKey = 80, // 预览
    dKey = 68, // 删除
    deleteKey = 46, // 删除
    eKey = 69, // 清空画布
    
    wKey = 87, 
    aKey = 65,

    spKey = 32

export const keycodes = [32, 46, 65, 67, 68, 69, 76, 80, 83, 85, 86, 87, 88, 89, 90]

// 与组件状态无关的操作
const basemap = {
    // [vKey]: paste,
    [yKey]: redo,
    [zKey]: undo,
    [sKey]: save,
    [pKey]: preview,
    [eKey]: clearCanvas,
}

// 组件锁定状态下可以执行的操作
const lockMap = {
    ...basemap,
    [uKey]: unlock,
}

// 组件未锁定状态下可以执行的操作
const unlockMap = {
    ...basemap,
    [cKey]: copy,
    [xKey]: cut,
    [dKey]: deleteFn,
    [deleteKey]: deleteFn,
    [lKey]: lock,
}

const noCtrlKeyMap ={
    [wKey]: toTop,
    [aKey]: toLeft,
    [sKey]: toBottom,
    [dKey]: toRight,
    [spKey]: spaceKey,
}

let isCtrlDown = false
// 全局监听按键操作并执行相应命令
export function listenGlobalKeyDown() {
    window.onkeydown = (e) => {
        if (e.keyCode == ctrlKey) {
            isCtrlDown = true
        }else if (e.keyCode == shiftKey) {
            store.commit('editor/SET_DATA', {key:'maskHide', val:true})
        }else if (e.keyCode == deleteKey && $editor.currentGrid) {
            deleteFn()
        } else if (isCtrlDown) {
            if (!$editor.currentGrid || !$editor.currentGrid.isLock) {
                e.preventDefault()
                unlockMap[e.keyCode] && unlockMap[e.keyCode]()
            } else if ($editor.currentGrid && $editor.currentGrid.isLock) {
                e.preventDefault()
                lockMap[e.keyCode] && lockMap[e.keyCode]()
            }
        }else{
            if ($editor.currentGrid && !$editor.currentGrid.isLock) {
                // e.preventDefault()
                noCtrlKeyMap[e.keyCode] && noCtrlKeyMap[e.keyCode]()
            }
        }
    }
    window.onkeyup = (e) => {
        if (e.keyCode == ctrlKey) {
            isCtrlDown = false
        }
        if (e.keyCode == shiftKey) {
            store.commit('editor/SET_DATA', {key:'maskHide', val:false})
        }
        
    }
}
// 取消全局监听按键操作并执行相应命令
export function cancelListenGlobalKeyDown() {
    (window.onkeydown as any) = "";
    (window.onkeyup as any) = ''
}
function toTop() {
    let val = $editor.currentGrid.style.top-=1
    if($editor.enterTarget){
        let { left,top,width, height } = $editor.enterTarget.style
        val = top + height
    } 
    store.commit('editor/SET_SHAP_STYLE', {top: val })
    store.commit('editor/RECORD_SNAPSHOT')
}
function toLeft() {
    let val = $editor.currentGrid.style.left-=1
    if($editor.enterTarget){
        let { left, top, width, height } = $editor.enterTarget.style
        val = left
    }
    store.commit('editor/SET_SHAP_STYLE', {left: val })
    store.commit('editor/RECORD_SNAPSHOT')
}
function toBottom() {
    if($editor.enterTarget){
        context.config.globalProperties.mittBus.emit('handleGridToBottom')
    }else{
        store.commit('editor/SET_SHAP_STYLE', {bottom:$editor.currentGrid.style.top+=1})
        store.commit('editor/RECORD_SNAPSHOT')
    }
}
function toRight() {
    let val = $editor.currentGrid.style.left+=1
    if($editor.enterTarget){
        let { left, top, width, height } = $editor.enterTarget.style
        val = left + width - $editor.currentGrid.style.width
    }
    store.commit('editor/SET_SHAP_STYLE', {left: val })
    store.commit('editor/RECORD_SNAPSHOT')
}

function spaceKey(){
    store.commit('editor/SET_DATA', {key:'ctrlShow', val:true})
}

function copy() {
    // store.commit('copy')
    // store.commit('editor/SET_SHAP_STYLE', {left:0,width:300})
    console.log('copy');
}

function paste() {
    // store.commit('paste')
    // store.commit('recordSnapshot')
    console.log('paste');
}

function cut() {
    // store.commit('cut')
    console.log('cut');
}

function redo() {
    // store.commit('redo')
    console.log('redo');
}

function undo() {
    // store.commit('undo')
    console.log('undo');
}


function save() {
    // proxy.mittBus.emit('save')
    console.log('save');
}

function preview() {
    // proxy.mittBus.emit('preview')
    console.log('preview');
}

function deleteFn() {
    if ($editor.currentGrid) {
        store.commit('editor/delete')
        store.commit('editor/RECORD_SNAPSHOT')
        console.log('delete');
    }
}

function clearCanvas() {
    // proxy.mittBus.emit('clearCanvas')
    console.log('clearCanvas');
}

function lock() {
    // store.commit('lock')
    console.log('lock');
}

function unlock() {
    // store.commit('unlock')
    console.log('unlock');
}
