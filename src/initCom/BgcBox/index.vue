<template>
    <div class="BgcBox" :style="{background: configInfo.background}">
        
    </div>
</template>

<script setup lang='ts'>
import { reactive, ref, getCurrentInstance, watch } from "vue";
const { proxy } = getCurrentInstance() as any

interface Props {
    config?:any,
}
const props = withDefaults(defineProps<Props>(), {
    config: () => {},
})

let configInfo:any = ref({})

//watch
watch(()=> props.config,(val)=>{
    configInfo.value = val?.data;
},{deep:true,immediate:true})

</script>

<style lang="scss" scoped>
.BgcBox{
    width: 100%;
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    box-sizing: border-box;
}

</style>