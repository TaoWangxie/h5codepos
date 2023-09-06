<template>
    <Teleport to="body">
        <Transition>
            <div class="preview_container" v-if="visible" @click="close">
                <div class="innerBox">
                    <div class="page" 
                    :style="{
                        width:canvasW + 'px',
                        height:canvasH+ 'px', 
                        background: pageCofigData.background
                    }"
                    >
                        <ComPart :domConfig="configInfo.pageDoms" :config="configInfo.pageConfig" :data="configInfo.pageData"></ComPart>
                    </div>
                </div>
            </div>
        </Transition>
    </Teleport>
</template>

<script setup lang='ts'>
import { reactive, ref, getCurrentInstance, watch, computed } from "vue";
import { Close } from '@element-plus/icons-vue'
import ComPart from './components/comPart/index.vue'
//store管理
import { useState } from '@/hooks/useState'
import { useStore } from 'vuex';
const { scale,canvasW,canvasH, pageConfig } = 
useState("editor", ["scale",'canvasW','canvasH','pageConfig'])
const store = useStore();
const { proxy } = getCurrentInstance() as any
const { Fdom } = useState("editor", ["Fdom"])

//props
interface Props {
    visible:boolean,
    title?: string,
    config?: any
}
const props = withDefaults(defineProps<Props>(), {
    visible:false,
    title: '页面预览',
    config:()=>{
        return {}
    }
})

let pageCofigData = computed(()=>{
    return pageConfig.value.config.data
})

const emits = defineEmits(["update:visible"]);

let configInfo:any = ref(null)
//watch
watch(()=> props.visible, (val:boolean) => {
    if(val){
        console.log(val);
        configInfo.value = props.config.config
    }
})



//关闭弹窗
const close = () => {
  emits("update:visible", false);
};


</script>

<style lang="scss" scoped>

.preview_container{
    position: fixed;
    top: 0;
    left: 0;
    width: 100vw;
    height: 100vh;
    z-index: 9;
    overflow: auto;
    background-color: rgba(0,0,0,.4);
}
.innerBox{
    position: relative;
    top:0;
    left:0;
    width: 100%;
    height: 100%;
    z-index: 1;
}
.page{
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%,-50%);
}

//动画
.v-enter-active,
.v-leave-active {
  transition: opacity 0.3s ease;
}

.v-enter-from,
.v-leave-to {
  opacity: 0;
}
</style>
