<template>
    <div class="control_mask" v-if="ctrlShow" @click="closeFn">
        <div class="control_box">
          <div class="control_box_silde">
              <div class="control_item" @click.stop="ctrlFn('top')">
                  <el-icon><Top /></el-icon>
              </div>
          </div>
          <div class="control_box_center">
              <div class="control_item" @click.stop="ctrlFn('left')"><el-icon><Back /></el-icon></div>
              <div class="control_item" @click.stop="ctrlFn('right')"><el-icon><Right /></el-icon></div>
          </div>
          <div class="control_box_silde">
              <div class="control_item" @click.stop="ctrlFn('bottom')">
                <el-icon><Bottom /></el-icon>
              </div>
          </div>
        </div>
    </div>
</template>

<script setup lang='ts'>
import { ref, getCurrentInstance } from "vue";
import { Top, Bottom,Back, Right } from '@element-plus/icons-vue'
import { useState } from '@/hooks/useState'
import { useStore } from 'vuex';
const { proxy } = getCurrentInstance() as any
const store = useStore();
const { scale, canvasW, canvasH, ctrlShow } = 
useState("editor", ["scale",'canvasW','canvasH', 'ctrlShow'])


const ctrlFn = (type:string)=>{
  console.log('6666666888'); 
  closeFn()
}

const closeFn = ()=>{
  store.commit('editor/SET_DATA',{key:'ctrlShow', val:false})
}


</script>

<style lang="scss" scoped>


.control_mask{
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0,0,0,0.4);
  .control_box{
    width: 90px;
    height: 90px;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%,-50%);
    .control_box_silde{
      display: flex;
      justify-content: center;
    }
    .control_box_center{
      display: flex;
      justify-content: space-between;
    }
    .control_item{
      display: flex;
      align-items: center;
      justify-content: center;
      width: 30px;
      height: 30px;
      font-size: 16px;
      background-color: #fff;
    }
  }
}
</style>
