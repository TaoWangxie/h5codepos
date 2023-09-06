<template>
    <div :class="['swiper_container', isspeed ? 'swiper_free_linear' : '']">
        <swiper
            ref="mySwiper"
            :key="swiperKey"
            v-bind="configInfo"
            :autoplay="isautoplay ? configInfo.autoplay : false"
            :modules="modules"
            class="swiper_box"
            @swiper="setControlledSwiper"
        >
            <swiper-slide v-for="(item,index) in dataInfo.slide" :key="index">
                <a :href="item.link">
                    <img :src="item.src" alt="">
                </a>
            </swiper-slide>
        </swiper>
    </div>
</template>
<script setup lang='ts'>
import _ from 'lodash'
import { ref, getCurrentInstance, watch, nextTick, onMounted, computed, watchEffect } from 'vue'
import { Swiper, SwiperSlide } from "swiper/vue";
import "swiper/swiper-bundle.css";

import { Autoplay, FreeMode, EffectCube, EffectCards } from "swiper";

const modules = ref([Autoplay,FreeMode, EffectCube, EffectCards])

//props
interface Props {
    data?: any,
    config:any,
    
}
const props = withDefaults(defineProps<Props>(), {
    data:()=>[],
    config:()=>{},
})

let configInfo:any = ref({})
let dataInfo:any = ref({})


let controlledSwiper:any = ref(null)
let mySwiper:any = ref(null)

const setControlledSwiper =(swiper)=>{
    controlledSwiper.value = swiper
}

const swiperKey = ref(false)
//watch
watch(()=> props.config,(val)=>{
    configInfo.value = val?.data;
    
},{deep:true,immediate:true})
watch(()=> props.data,(val)=>{
    dataInfo.value = val?.data;
    swiperKey.value = !swiperKey.value
},{deep:true,immediate:true})


watchEffect(() => {
    const x1 = configInfo.value?.loop;
    const x2 = configInfo.value?.autoplay?.isautoplay
    const x3 = configInfo.value?.autoplay?.delay
    const x4 = configInfo.value?.autoplay?.disableOnInteraction
    const x5 = configInfo.value?.freeMode
    nextTick(()=>{
        swiperKey.value = !swiperKey.value
    })
});

//computed
const isautoplay = computed(() => {
    if(!configInfo.value?.autoplay) return false
    return configInfo.value?.autoplay && configInfo.value?.autoplay?.isautoplay === false ? false : true
})
const isspeed = computed(() => {
  return configInfo.value?.speed
})
</script>
<style lang="scss" scoped>
.swiper_container{
    position: relative;
    width: 100%;
    height: 100%;
}
.swiper_box{
    position: relative;
    width: 100%;
    height: 100%;
}
//=======================
.swiper {
  width: 100%;
}
.swiper-slide img {
  display: block;
  width: 100%;
  height: 100%;
}
</style>
<style>
.swiper_free_linear > .swiper-free-mode > .swiper-wrapper{
    -webkit-transition-timing-function: linear; /*之前是ease-out*/
    -moz-transition-timing-function: linear;
    -ms-transition-timing-function: linear;
    -o-transition-timing-function: linear;
    transition-timing-function: linear;
    margin: 0 auto;
}
</style>