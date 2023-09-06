<template>
    <div class="markLine_container">
        <div v-show="currentGrid && (markLineX || markLineX == 0)" :style="{left: markLineX +'px'}" class="line xline"></div>
        <div v-show="currentGrid && (markLineY || markLineY == 0)" :style="{top: markLineY +'px'}" class="line yline"></div>
          
        <template v-for="(item,index) in list" :key="index">
          <div
            v-show="currentGrid && obj[item] && (obj[item][index > 1 ? 'h' : 'w'] != 0)" 
            :style="{
              top: obj[item]?.y + 'px',
              left: obj[item]?.x + 'px',
              height: index > 1 ? obj[item]?.h + 'px' : '1px',
              width: index < 2 ? obj[item]?.w + 'px' : '1px'
            }" 
            class="mlline">
              <span  :style="{transform: `scale(${1/scale.value})`, marginBottom:`${index < 2 ? 34/scale.value : 0}px`, marginRight:`${index < 2 ? 0 : 50/scale.value }px`}" v-if="obj[item]" :class="['val']">
                {{obj[item][index > 1 ? 'h' : 'w'] + 'px'}}
              </span>
              <span :class="[ index < 2 ? 'leftp' : 'topp' ]" class="linePoint"></span>
              <span :class="[ index < 2 ? 'rightp' : 'bottomp' ]" class="linePoint"></span>
          </div>
        </template>
    </div>
</template>

<script setup lang='ts'>
import { ref, getCurrentInstance } from "vue";
import { useState } from '@/hooks/useState'
import { useStore } from 'vuex';
const { proxy } = getCurrentInstance() as any
const store = useStore();
const { markLineX, markLineY, currentGrid, leftML, topML, rightML, bottomML, scale } = 
useState("editor", ['markLineX','markLineY','currentGrid','leftML','topML','rightML','bottomML','scale'])

let list = ['left', 'right', 'top', 'bottom']
let obj:any = ref({
  left: leftML,
  right: rightML,
  top: topML,
  bottom: bottomML,
})


</script>

<style lang="scss" scoped>
.markLine_container {
  height: 100%;
}
.line {
  background: #59c7f9;
  position: absolute;
  opacity: 0.8;
  z-index: 1000;
}
.xline {
  width: 1px;
  height: 9999px;
  top: -1000px;
}
.yline {
  width: 9999px;
  height: 1px;
  left: -1000px;
}

.mlline{
  display: inline-flex;
  background: #F56C6C;
  position: absolute;
  z-index: 1001;
  align-items: center;
  justify-content: center;
  .val{
    position: absolute;
    display: inline-block;
    padding: 2px 4px;
    font-size: 14px;
    border-radius: 4px;
    color: #fff;
    background-color: #F56C6C;
    z-index: 10;
  }
  .top{
    // bottom: calc(100% + 5px);
    // left: 50%;
    // transform: translateX(-50%);
    // margin-bottom: 20px;
  }
  .right{
    // margin-right: 30px;
    // left: calc(100% + 5px);
    // top: 50%;
    // transform: translateY(-50%);
  }
}
.leftline{
  height: 1px;
}
.linePoint{
  position: absolute;
  background-color: #F56C6C;
}
.leftp{
  position: absolute;
  left: 0;
  top: 50%;
  transform: translateY(-50%);
  width: 3px;
  height: 6px;
}
.rightp{
  position: absolute;
  right: 0;
  top: 50%;
  transform: translateY(-50%);
  width: 3px;
  height: 6px;
}
.topp{
  position: absolute;
  top: 0;
  left: 50%;
  transform: translateX(-50%);
  width: 6px;
  height: 3px;
}
.bottomp{
  position: absolute;
  bottom: 0;
  left: 50%;
  transform: translateX(-50%);
  width: 6px;
  height: 3px;
}
</style>
