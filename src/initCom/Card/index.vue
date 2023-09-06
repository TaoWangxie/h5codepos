<template>
    <div class="Card">
        <div class="title">
            {{configInfo.title}}
        </div>
        <div class="cotent">

        </div>
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
.Card{
    width: 100%;
    height: 100%;
    background-color: #fff;
    border-radius: 3px;
    box-shadow: 0 2px 10px #CDD0D6;
}
.title{
    height: 40px;
    line-height: 40px;
    border-bottom: 1px solid #ccc;
    box-sizing: border-box;
    padding: 0 15px;
    font-size: 16px;
}
.cotent{
    height: calc(100% - 40px);
}

</style>
