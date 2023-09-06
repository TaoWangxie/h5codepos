<template>
    <div class="baseAttr">
        <div class="attr_line flex">
            <div class="attr_item">
                <span class="attr_label_inline">宽：</span>
                <el-input-number
                    v-model="currentGrid.style.width"
                    :min="0"
                    :step="1" 
                    step-strictly
                    :disabled="currentGrid.isLock"
                    controls-position="right"
                    @change="(currentValue, oldValue,)=>{handleChange(currentValue, oldValue, 'width')}"
                />
            </div>
            <div class="attr_item">
                <span class="attr_label_inline">高：</span>
                <el-input-number
                    v-model="currentGrid.style.height"
                    :min="0"
                    :step="1" 
                    step-strictly
                    :disabled="currentGrid.isLock"
                    controls-position="right"
                    @change="(currentValue, oldValue,)=>{handleChange(currentValue, oldValue, 'height')}"
                />
            </div>  
        </div>
        <div class="attr_line flex">
            <div class="attr_item">
                <span class="attr_label_inline">X：</span>
                <el-input-number
                    v-model="currentGrid.style.left"
                    :step="1" 
                    step-strictly
                    :disabled="currentGrid.isLock"
                    controls-position="right"
                    @change="(currentValue, oldValue,)=>{handleChange(currentValue, oldValue, 'left')}"
                />
            </div>  
            <div class="attr_item">
                <span class="attr_label_inline">Y：</span>
                <el-input-number
                    v-model="currentGrid.style.top"
                    :step="1" 
                    step-strictly
                    :disabled="currentGrid.isLock"
                    controls-position="right"
                    @change="(currentValue, oldValue,)=>{handleChange(currentValue, oldValue, 'top')}"
                />
            </div>
        </div>
        <!-- <div class="attr_line flex">
            <div class="attr_item">
                <span class="attr_label">相对定位 Top：</span>
                <el-input-number
                    v-model="data.relativeTop"
                    :min="1"
                    :step="1" 
                    step-strictly
                    @change="handleChange"
                />
            </div>
        </div>
        <div class="attr_line flex">
            <div class="attr_item">
                <div class="attr_label">相对定位 Left：</div>
                <el-input-number
                    v-model="data.relativeLeft"
                    :min="1"
                    :step="1" 
                    step-strictly
                    @change="handleChange"
                />
            </div>
        </div> -->
        <!-- <div class="attr_line flex">
            <div class="attr_item">
                <div class="attr_label">背景颜色：</div>
                <el-color-picker v-model="data.backgroundColor" />
            </div>
        </div> -->
        <!-- <div class="attr_line_title">内边距：</div>
        <div class="attr_line flex">
            <div class="attr_item" v-for="(item,index) in data.padding.length" :key="index">
                <el-input-number
                    v-model="data.padding[index]"
                    :min="1"
                    :step="1" 
                    step-strictly
                    controls-position="right"
                    @change="handleChange"
                />
            </div>
        </div> -->
    </div>
</template>

<script setup lang='ts'>
import _ from 'lodash'
import { Expand, Fold, Coin, CollectionTag, Loading, RefreshRight } from '@element-plus/icons-vue'
import { ref, getCurrentInstance, watch } from "vue";
import { syncChildShapPos, setStartPos } from '@/utils/common'
//store管理
import { useState } from '@/hooks/useState'
import { useStore } from 'vuex';
const store = useStore();
const { layoutData, currentGrid, scale} = 
useState("editor", ["layoutData",'currentGrid','scale'])

const { proxy } = getCurrentInstance() as any

interface Props {
  tabKey: string,
  list:any[]
}
const props = withDefaults(defineProps<Props>(), {
  tabKey:'',
  list:()=>[]
})

const handleChange = (currentValue:any,oldValue:any,type?:string)=>{
    let startPos = {}
    //设置子级初始位置
    setStartPos(currentGrid.value,startPos)
    //移动的差值
    let diff = Math.round((currentValue - oldValue)/ scale.value.value)
    //同步子级shap
    switch (type) {
        case 'left':
            syncChildShapPos(currentGrid.value,diff,0,startPos)
        break;
        case 'top':
            syncChildShapPos(currentGrid.value,0,diff,startPos)
        break;
        default:
        break;
    }
    store.commit('editor/RECORD_SNAPSHOT')
    
}

</script>
<style lang="scss" scoped>
.baseAttr{
    width: 100%;
    padding: 15px;
    box-sizing: border-box;
    background-color: #FAFCFF;
    .flex{
    display: flex;
}
.attr_line_title{
    padding-bottom: 10px;
    font-size: 13px;
}
.attr_line{
    margin-bottom: 15px;
    box-sizing: border-box;
    &:last-child{
        margin-bottom: 0;
    }
    .attr_item{
        display: flex;
        align-items: center;
        box-sizing: border-box;
        flex: 1;
        margin-right: 6%;
        font-size: 13px;
        .attr_label{
            display: inline-block;
            width: 120px;
        }
        .attr_label_inline{
            display: inline-block;
            width: 50px;
        }
        &:last-child{
            margin-right: 0;
        }
    }
}
}


</style>
<style  lang="scss">
.baseAttr{
    .el-input-number{
        width: auto;
        flex: 1;
    } 
    .el-input-number.is-controls-right .el-input__wrapper{
        padding-left: 4px !important;
        padding-right: 25px !important;
    }
    .el-input-number.is-controls-right .el-input-number__decrease{
        width: 20px;
    }
    .el-input-number.is-controls-right .el-input-number__increase{
        width: 20px;
    }
}
</style>