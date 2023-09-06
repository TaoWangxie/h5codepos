<template>
    <div class="configAttr">
        <Drawer :posLeft="false" :dragW="400">
            <div class="configAttr_box">
                <Tab :list="tabList" :tabKey="configTab" @changeTab="changeTab"></Tab>
                <div class="configAttr_content">
                    <template v-if="currentGrid">
                        <div class="title">基础属性</div>
                        <BaseAttr></BaseAttr>
                        <div v-if="currentGrid.data" class="title">数据配置</div>
                        <ComAttr :configInfo="currentGrid.data"></ComAttr>
                        <div class="title">
                            页面配置
                            <div v-if="currentGrid.config.aceCode || currentGrid.config.aceCode === ''" class="icon_box" >
                                <el-icon :size="16">
                                    <Operation/>
                                </el-icon>
                                <el-switch
                                    v-model="isAce"
                                    class="mt-2"
                                    style="margin-left: 8px"
                                    inline-prompt
                                    :active-icon="Check"
                                    :inactive-icon="Close"
                                    @change="switchChange"
                                />
                            </div>
                        </div>
                        <div v-if="isAce" class="ace_box">
                            <AceEditor :visible="isAce" :code="currentGrid.config.aceCode" @updateCode="updateCode"></AceEditor>
                        </div>
                        <ComAttr v-else :configInfo="currentGrid.config"></ComAttr>
                    </template>
                    <template v-else>
                        <div class="title">数据配置</div>
                        <ComAttr :configInfo="pageConfig.dataSource"></ComAttr>
                        <div class="title">页面配置</div>
                        <ComAttr :configInfo="pageConfig.config"></ComAttr>
                    </template>
                </div>
            </div>
        </Drawer>
    </div>
</template>

<script setup lang='ts'>
import _ from 'lodash'
import { ref, getCurrentInstance, watch, computed } from 'vue'
import { Coin, Setting, Check, Close,Edit, Operation } from '@element-plus/icons-vue'
import Drawer from '@/components/Drawer/index.vue'
import Tab from '@/components/Tab/index.vue'
import BaseAttr from './components/baseAttr/index.vue'
import ComAttr from './components/comAttr/index.vue'
import AceEditor from './components/aceEditor/index.vue'
//store管理
import { useStore } from 'vuex';
import { useState } from '@/hooks/useState'

const { proxy } = getCurrentInstance() as any
const store = useStore();
const { layoutData, currentGrid, pageConfig, currentGridIndex} = 
useState("editor", ["layoutData",'currentGrid', 'pageConfig', 'currentGridIndex'])

let configTab = ref('comConfig')

const tabList = [
    {
        key:'comConfig',
        icon: Setting
    },
    {
        key:'pageConfig',
        icon: Coin
    }
]

const changeTab = (val:any)=>{
    configTab.value = val
}

//是否有ace代码配置
let isAce = ref(false)
let oldConfigData = ref(null)
const updateCode =(code:any)=>{
    try {
        let obj = eval("(" + code + ")")
        if(typeof(obj) =='function'){
            obj = obj()
        }
        store.commit('editor/SET_DATA',{key:'currentGrid',properties:'config',nextproperties:'aceCode', val:code})
        oldConfigData.value = _.cloneDeep(currentGrid.value.config.data)
        store.commit('editor/SET_DATA',{key:'currentGrid',properties:'config',nextproperties:'data', val:obj})
    } catch (error) {
        proxy.$message({
            message: '代码配置格式不符合，请确保代码符合对象结构',
            type: 'error'
        });
    }
}

//切换到配置 还原数据
const switchChange =(val)=>{
    if(!val && oldConfigData.value)
    store.commit('editor/SET_DATA',{key:'currentGrid',properties:'config',nextproperties:'data', val:oldConfigData.value})
}
//初始化data
watch(()=> currentGridIndex.value,(val)=>{
    oldConfigData.value = _.cloneDeep(currentGrid.value?.config?.data)
    isAce.value = false
},{deep:true})

</script>

<style lang="scss" scoped>
.configAttr{
    display: flex;
    position: relative;
    height: 100%;
}
.configAttr_box{
    width: 100%;
    height: 100%;
    border-left: 1px solid #EBEEF5;
    box-sizing: border-box;
}
.configAttr_content{
    overflow-y: auto;
    height: calc(100% - 50px);
    border-bottom: 1px solid #EBEEF5;
    &::-webkit-scrollbar {
        width: 8px;
        height: 8px;
    }
    &::-webkit-scrollbar-thumb {
        background-color: #D4D7DE;
        border-radius: 3px;
    }
}
.title{
    position: relative;
    padding: 10px;
    font-size: 14px;
    border-top: 1px solid #EBEEF5;
    border-bottom: 1px solid #EBEEF5;
    &:first-child{
        border-top:0;
    }
    .icon_box{
        display: flex;
        align-items: center;
        height: 20px;
        position: absolute;
        top: 50%;
        right: 10px;
        transform: translateY(-50%);
        color: #606266;
    }
}
.noData{
    padding: 40px;
    text-align: center;
    font-size: 14px;
    color:#909399;
}
.ace_box{
    width: 100%;
    height: 500px;
    padding: 15px;
    box-sizing: border-box;
    background-color: #FAFCFF;
}
</style>