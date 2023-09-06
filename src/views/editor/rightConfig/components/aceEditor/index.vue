<template>
    <div class="ace_container">
        <div class="action_box">
            <el-button type="danger" size="small" :icon="Delete" circle @click="clear" />
            <el-button type="success" size="small" :icon="Check" circle @click="save" />
        </div>
        <div class="editor_box">
            <v-ace-editor
                v-model:value="pageCode"
                style="height: 100%"
                :lang="aceConfig.lang"
                :theme="aceConfig.theme"
                :options="aceConfig.options"
                :readonly="aceConfig.readOnly"
            />
        </div>
    </div>
</template>

<script setup lang='ts'>
import _ from 'lodash'
import { Check, Delete, Coin, CollectionTag, Loading, RefreshRight } from '@element-plus/icons-vue'
import { ref, getCurrentInstance, watch } from "vue";
import useClipboard from 'vue-clipboard3';
import { VAceEditor } from "vue3-ace-editor";
import 'ace-builds/src-noconflict/mode-json';
import 'ace-builds/src-noconflict/theme-chrome';
import ace from 'ace-builds';
//store管理
import { useState } from '@/hooks/useState'
import { useStore } from 'vuex';
const store = useStore();
const { layoutData, currentGrid, scale} = 
useState("editor", ["layoutData",'currentGrid','scale'])


//AceEditor
ace.config.set('basePath', 'https://ks3-cn-beijing.ksyun.com/vform2021/ace-mini');
const aceConfig = ref({
    lang: 'json', //解析json
    theme: 'monokai', //主题
    readOnly: false, //是否只读
    options: {
        enableBasicAutocompletion: true,
        enableSnippets: true,
        enableLiveAutocompletion: true,
        tabSize: 2,
        showPrintMargin: false,
        fontSize: 16
    }
});

interface Props {
    visible:boolean,
    code: string,
}
const props = withDefaults(defineProps<Props>(), {
    visible:false,
    code:'',
})

let pageCode = ref<string>('')
watch(()=> props.visible,(val)=>{
    pageCode.value = props.code;
},{deep:true,immediate:true})


const emits = defineEmits(["updateCode"]);
//保存
const save =()=>{
    emits('updateCode',pageCode.value)
}
//清空
const clear =()=>{
    pageCode.value = ''
}


</script>
<style lang="scss" scoped>
.ace_container{
    height: 100%;
}
.editor_box{
    height: calc(100% - 40px);
    border: 1px solid #EBEEF5;
}
.action_box{
    display: flex;
    align-items: center;
    justify-content: flex-end;
    width: 100%;
    height: 40px;
    padding: 0 10px;
    box-sizing: border-box;
    background-color: #fff;
}
</style>