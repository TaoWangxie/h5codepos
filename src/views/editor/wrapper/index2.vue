<template>
  <div class="dragResizeBox">
    <div class="wrapperPannel">
      <div
        class="wrapper"
        :style="{ width: canvasW + 'px', height: canvasH + 'px' }"
      >
        <Canvas></Canvas>
        <!-- <CanvasResize /> -->
      </div>
    </div>
  </div>
</template>

<script setup lang='ts'>
import { ref, getCurrentInstance, VueElement, nextTick } from "vue";
import { numAdd, numSub } from "@/utils/index";
import Canvas from "../canvas/index.vue";
import CanvasResize from "../canvasResize/index.vue";
import shapMoveControl from "../shapMoveControl/index.vue";
import { dragResize } from "@/utils/dragResizeJs";
import { useState } from "@/hooks/useState";
import { useStore } from "vuex";
const { proxy } = getCurrentInstance() as any;
const store = useStore();
const { scale, canvasW, canvasH } = useState("editor", [
  "scale",
  "canvasW",
  "canvasH",
]);

const DragResize: any = ref(null);

nextTick(() => {
  const wrapperPannel: any = document.querySelector(".wrapperPannel");
  const wrapper: any = document.querySelector(".wrapper");
  DragResize.value = new dragResize({
    wrapperPannel: wrapperPannel,
    wrapper: wrapper,
  });
});
</script>

<style lang="scss" scoped>
.dragResizeBox {
  position: relative;
  width: 100%;
  height: 100%;
  overflow: hidden;
}
.wrapper {
  position: absolute;
  background-color: #fff;
  box-shadow: rgb(0 0 0 / 20%) 2px 0px 30px;
  // overflow: hidden;
}
.wrapperPannel {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: #e6e8eb;
}
</style>
