<template>
    <div class="swiper_box swiper_free_linear">
        <swiper
            :key="config.loop"
            ref="mySwiper"
            v-bind="config"
            :modules="modules"
            class="mySwiper"
            @swiper="setControlledSwiper"
        >
            <swiper-slide v-for="(item,index) in data" :key="index">
                <img :src="item.src" alt="">
            </swiper-slide>
        </swiper>
    </div>
</template>
<script setup lang='ts'>
import _ from 'lodash'
import { ref, getCurrentInstance, watch, nextTick, onMounted } from 'vue'
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

let controlledSwiper:any = ref(null)
let mySwiper:any = ref(null)

const setControlledSwiper =(swiper)=>{
    controlledSwiper.value = swiper
}

onMounted(()=>{
    console.log(controlledSwiper.value);
})

//watch
watch(()=> props.config,(val)=>{
    console.log(val);
    nextTick(()=>{
        // controlledSwiper.value.init()
    })
},{deep:true,immediate:true})


</script>
<style lang="scss" scoped>
.swiper_box{
    position: relative;
    width: 100%;
    height: 100%;
}
.mySwiper{
    width: 100%;
    height: 100%;
}
.slide_box{
    width: 100%;
    height: 100%;
    img{
        display: inline-block;
        width: 100%;
        height: 100%;
    }
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