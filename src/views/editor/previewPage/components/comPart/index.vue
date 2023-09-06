<template>
    <div 
        :class="['pos_a']" 
        :style="{
            width:item.wfull ? `100%` : `${item.style.width}px`,
            height:item.style.height + 'px',
            top:item.style.top + 'px',
            left:item.style.left + 'px'
        }" 
        v-for="(item,index) in domConfig" 
        :key="index">
            <component :is="item.type" :config="config[item.code]" :data="data[item.code]">
            </component>
            <comPart v-if="item.children" :domConfig="item.children" :config="config" :data="data"></comPart>
    </div>
</template>

<script setup lang='ts'>
import _ from 'lodash'
import { ref, getCurrentInstance, watch, computed, onMounted } from 'vue'
import comPart from '../comPart/index.vue'
interface Props {
    domConfig: any,
    config: any,
    data: any
}
const props = withDefaults(defineProps<Props>(), {
    domConfig: ()=>[],
    config: ()=>{},
    data: ()=>{},
})

// https://fuss10.elemecdn.com/a/3f/3302e58f9a181d2509f3dc0fa68b0jpeg.jpeg

// https://fuss10.elemecdn.com/9/bb/e27858e973f5d7d3904835f46abbdjpeg.jpeg
</script>
<style lang="scss" scoped>
.pos_a{
    position: absolute;
}
</style>