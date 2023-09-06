<template>
   <div :class="['darg', !posLeft ? 'border-l' : 'border-r']">
        <div v-if="!posLeft" class="darg_btn" @click="changeShow">
            <el-icon 
                class="darg_btn_icon"
            >
                <CaretRight v-if="boxShow"/>
                <CaretLeft v-else/>
            </el-icon>
        </div>
        <div
            class="darg_box"
            :style="{ width: boxShow ? `${dragW}px` : '0px'}"
        >
            <div class="darg_content" :style="{width: `${dragW}px`}">
                <slot></slot>
            </div>
         </div>
         <div v-if="posLeft" class="darg_btn" @click="changeShow">
            <el-icon 
                class="darg_btn_icon"
            >
                <CaretLeft v-if="boxShow"/>
                <CaretRight v-else/>
            </el-icon>
         </div>
    </div>
</template>

<script setup lang='ts'>
import _ from 'lodash'
import { ref, getCurrentInstance, watch } from 'vue'
const { proxy } = getCurrentInstance() as any
import { CaretLeft, CaretRight } from '@element-plus/icons-vue'
//props
interface Props  {
    dragW: number,    //宽度
    posLeft: boolean
}
const props = withDefaults(defineProps<Props>(), {
    dragW: 245,
    posLeft: true
})

let boxShow = ref(true)

const changeShow = ()=>{
    boxShow.value = !boxShow.value
}

</script>

<style lang="scss" scoped>
.darg {
    display: flex;
    position: relative;
    height: 100%;
    background-color: #fff;
    box-sizing: border-box;
    .darg_box{
        position: relative;
        width: 245px;
        height: 100%;
        transition: all 0.4s;
        overflow: hidden;
        .darg_content{
            position: absolute;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            // padding: 10px 0;
            box-sizing: border-box;
        }
    }
    .darg_btn{
        position: relative;
        width: 15px;
        height: 100%;
        background-color: #fff;
        transition: all 0.3s;
        cursor: pointer;
        &:hover{
            background-color: #FAFAFA;
        }
        .darg_btn_icon{
            position: absolute;
            top: 50%;
            left: 50%;
            transform: translateX(-50%) translateY(-50%);
            display: inline-block;
        }
    }
}
.border-l{
    border-left: 1px solid #EBEEF5;
}
.border-r{
    border-right: 1px solid #EBEEF5;
}

</style>