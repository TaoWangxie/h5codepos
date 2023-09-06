<template>
    <div 
        class="BaseGrid"
        :style="{
            background: background,
            opacity: configInfo?.opacity,
            borderWidth: configInfo?.borderWidth + 'px',
            borderStyle: configInfo?.borderStyle,
            borderRadius: configInfo?.borderRadius + 'px',
            borderColor: configInfo?.borderColor,
            backgroundRepeat: configInfo?.backgroundRepeat,
            backgroundSize: configInfo?.backgroundSize,
            backgroundPositionX: configInfo?.backgroundPositionX,
            backgroundPositionY: configInfo?.backgroundPositionY,
        }" 
    >
 
    </div>
</template>

<script setup lang='ts'>
import { reactive, ref, getCurrentInstance, watch, computed } from "vue";
const { proxy } = getCurrentInstance() as any

interface Props {
    config?:any,
    data?:any
}
const props = withDefaults(defineProps<Props>(), {
    config: () => {},
    data:()=>{}
})

let configInfo:any = ref({})
let dataInfo:any = ref({})


const background = computed(() => {
    return dataInfo.value?.bgcSrc ? 
    'url(' + dataInfo.value?.bgcSrc + ')' : configInfo.value?.bgcSrc ? 
    'url(' + configInfo.value?.bgcSrc + ')' : configInfo.value?.background;
});

//watch
watch(()=> props.config,(val)=>{
    configInfo.value = val?.data;
},{deep:true,immediate:true})
watch(()=> props.data,(val)=>{
    dataInfo.value = val?.data;
},{deep:true,immediate:true})

</script>

<style lang="scss" scoped>
.BaseGrid{
    width: 100%;
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    // border: 1px solid #000;
    box-sizing: border-box;
}

</style>