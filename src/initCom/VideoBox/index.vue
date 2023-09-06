<template>
  <div class="videoBox">
    <video
      class="video-background"
      preload="auto"
      loop
      playsinline
      autoplay
      :src="src"
      tabindex="-1"
      muted="muted"
    ></video>
  </div>
</template>

<script setup lang='ts'>
import { ref, getCurrentInstance, watch, computed } from "vue";
const { proxy } = getCurrentInstance() as any;

interface Props {
  config?: any;
  data?: any;
}
const props = withDefaults(defineProps<Props>(), {
  config: () => {},
  data: () => {},
});

let configInfo: any = ref({});
let dataInfo: any = ref({});

const src = computed(() => {
  return dataInfo.value?.src ? dataInfo.value?.src : configInfo.value?.src;
});

//watch
watch(
  () => props.config,
  (val) => {
    configInfo.value = val?.data;
  },
  { deep: true, immediate: true }
);
watch(
  () => props.data,
  (val) => {
    dataInfo.value = val?.data;
  },
  { deep: true, immediate: true }
);
</script>

<style lang="scss" scoped>
.videoBox {
  position: relative;
  /*进行视频裁剪*/
  overflow: hidden;

  display: inline-block;
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  box-sizing: border-box;
}
.videoBox .video-background {
  position: absolute;
  left: 50%;
  top: 50%;
  /*保证视频内容始终居中*/
  transform: translate(-50%, -50%);
  width: 100%;
  height: 100%;
  /*保证视频充满屏幕*/
  object-fit: cover;
  min-height: 800px;
}
</style>