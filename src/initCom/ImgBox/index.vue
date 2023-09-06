<template>
    <img class="ImgBox" :src="src"/>
</template>

<script setup lang='ts'>
import { ref, getCurrentInstance, watch, computed } from "vue";
const { proxy } = getCurrentInstance() as any

interface Props {
    config?:any,
    data?:any
}
const props = withDefaults(defineProps<Props>(), {
    config: () => {},
    data: () => {},
})

let configInfo:any = ref({})
let dataInfo:any = ref({})

const src = computed(() => {
    return dataInfo.value.src ? dataInfo.value.src : configInfo.value.src;
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
.ImgBox{
    display: inline-block;
    width: 100%;
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    box-sizing: border-box;
}

</style>