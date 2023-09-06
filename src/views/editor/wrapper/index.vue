<template>
    <div ref="wrapperPannel" class="wrapper_container" @mousedown="onMouseDown" @mousewheel="mousewheel">
        <div ref="wrapper" class="wrapper" :style="{width:canvasW+'px', height:canvasH+'px'}">
            <Canvas></Canvas>
            <CanvasResize/>
        </div>
        <shapMoveControl/>
    </div>
</template>

<script setup lang='ts'>
import { ref, getCurrentInstance, VueElement } from "vue";
import { numAdd, numSub } from '@/utils/index'
import Canvas from '../canvas/index.vue'
import CanvasResize from '../canvasResize/index.vue'
import shapMoveControl from '../shapMoveControl/index.vue'
import { useState } from '@/hooks/useState'
import { useStore } from 'vuex';
const { proxy } = getCurrentInstance() as any
const store = useStore();
const { scale,canvasW,canvasH } = 
useState("editor", ["scale",'canvasW','canvasH'])

let wrapperPannel: any | VueElement = ref(null)
let wrapper: any | VueElement = ref(null)

let wrapperMoveState: any = ref({
	isDrag: false,
	startX: 0,
	startY: 0,
	needX: 0,
	needY: 0,
});

//鼠标点击
const onMouseDown = (e:any) =>{
    store.commit('editor/SET_DATA',{key:'currentGrid', val: null})
    if (e.target != wrapperPannel.value) {
		
    } else {
        wrapperMoveState.value.isDrag = true;
        wrapperMoveState.value.startX = e.clientX;
        wrapperMoveState.value.startY = e.clientY;
        if(wrapperPannel.value){
            wrapperPannel.value.style.cursor = 'grab';
        } 

        const move = (e:any) =>{
            if (wrapperMoveState.value.isDrag) {
                const diffX = e.clientX - wrapperMoveState.value.startX;
                const diffY = e.clientY - wrapperMoveState.value.startY;
                wrapperMoveState.value.needX = wrapperMoveState.value.needX + diffX / scale.value.value;
                wrapperMoveState.value.needY = wrapperMoveState.value.needY + diffY / scale.value.value;
                wrapperMoveState.value.startX = e.clientX;
                wrapperMoveState.value.startY = e.clientY;
                changeStyle()
            }
        }
        const up = (e:any) => {
            document.removeEventListener('mousemove', move)
            document.removeEventListener('mouseup', up)
            wrapperPannel.value.style.cursor = 'default';
            wrapperMoveState.value.isDrag = false;
        }
        document.addEventListener('mousemove', move)
        document.addEventListener('mouseup', up)
    }
}
//鼠标滑轮缩放
const mousewheel =(e:any)=>{
    if (e.deltaY > 0) {
        //往下滚缩小
        if (scale.value.value > scale.value.minValue) {
            scale.value.value = numSub(scale.value.value,0.1);
        }
    } else {
        //往上滚放大
        if (scale.value.value < scale.value.maxValue) {
            scale.value.value = numAdd(scale.value.value,0.1);
        }
    }
    changeStyle()
}
//修改画布样式
const changeStyle = ()=>{
    wrapper.value.style.transform = 
    `scale(${scale.value.value}) translate(${wrapperMoveState.value.needX}px,${wrapperMoveState.value.needY}px)`;
}

</script>

<style lang="scss" scoped>
.wrapper_container{
    position: relative;
    display: flex;
    justify-content: center;
    align-items: center;
    flex: 1;
    height: 100%;
    overflow: hidden;
    user-select: none;
    background-color: #f0f0f0;
}
.wrapper{
    position: absolute;
    background-color: #fff;
    box-shadow: rgb(0 0 0 / 20%) 2px 0px 10px;
    // overflow: hidden;
}
</style>
