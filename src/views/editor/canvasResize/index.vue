<template>
    <div class="canvasResize" :style="{transform: `scale(${1/scale.value})`}">
        <span @mousedown="onMouseDown">
            <el-icon :size="18">
                <DCaret/>
            </el-icon>
        </span>
    </div>
</template>

<script setup lang='ts'>
import { ref, getCurrentInstance } from "vue";
import { DCaret } from '@element-plus/icons-vue'
import { useState } from '@/hooks/useState'
import { useStore } from 'vuex';
const { proxy } = getCurrentInstance() as any
const store = useStore();
const { scale, canvasW, canvasH } = 
useState("editor", ["scale",'canvasW','canvasH'])


//改变画布高度大小
const onMouseDown =(e:any)=>{
    let startY = e.clientY;
    let h = canvasH.value
    const move = (e:any) =>{
        const diffY = e.clientY - startY;
        let height = h +( diffY / scale.value.value )*2
        if(height > 50){
            store.commit('editor/SET_DATA',{key:'canvasH', val: height})
        }
    }
    const up = (e:any) => {
        document.removeEventListener('mousemove', move)
        document.removeEventListener('mouseup', up)
    }
    document.addEventListener('mousemove', move)
    document.addEventListener('mouseup', up)
}


</script>

<style lang="scss" scoped>
.canvasResize{
    position: absolute;
    width: 100%;
    height: 0;
    left: 0;
    bottom: -25px;
    display: flex;
    align-items: center;
    justify-content: center;
    span{
        width: 30px;
        height: 30px;
        display: flex;
        align-items: center;
        justify-content: center;
        &:hover{
            cursor:n-resize
        }
    }

}
</style>
