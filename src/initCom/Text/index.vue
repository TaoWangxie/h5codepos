<template>
  <div
    class="Text"
    :style="{
      display: configInfo?.display,
      fontSize: configInfo.fontSize + 'px',
      color: configInfo.color,
      background: background,
      lineHeight: configInfo.lineHeight + 'px',
      letterSpacing: configInfo.letterSpacing + 'px',
      opacity: configInfo.opacity,
      borderWidth: configInfo.borderWidth + 'px',
      borderStyle: configInfo.borderStyle,
      borderRadius: configInfo.borderRadius + 'px',
      borderColor: configInfo.borderColor,
      fontWeight: configInfo.fontWeight,
      textAlign: configInfo.textAlign,
      alignItems: configInfo.alignItems,
      justifyContent: configInfo.justifyContent,
      backgroundRepeat: configInfo?.backgroundRepeat,
      backgroundSize: configInfo?.backgroundSize,
      backgroundPositionX: configInfo?.backgroundPositionX,
      backgroundPositionY: configInfo?.backgroundPositionY,
      paddingTop: configInfo?.paddingTop + 'px',
      paddingRight: configInfo?.paddingRight + 'px',
      paddingBottom: configInfo?.paddingBottom + 'px',
      paddingLeft: configInfo?.paddingLeft + 'px',
      marginTop: configInfo?.marginTop + 'px',
      marginRight: configInfo?.marginRight + 'px',
      marginBottom: configInfo?.marginBottom + 'px',
      marginLeft: configInfo?.marginLeft + 'px',
    }"
  >
    {{ text }}
  </div>
</template>

<script setup lang='ts'>
import { reactive, ref, getCurrentInstance, watch, computed } from "vue";
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

const background = computed(() => {
  return dataInfo.value?.bgcSrc
    ? "url(" + dataInfo.value?.bgcSrc + ")"
    : configInfo.value?.bgcSrc
    ? "url(" + configInfo.value?.bgcSrc + ")"
    : configInfo.value?.background;
});

const text = computed(() => {
  return dataInfo.value.text ? dataInfo.value.text : configInfo.value.text;
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
.Text {
  display: flex;
  width: 100%;
  height: 100%;
  box-sizing: border-box;
}
</style>
