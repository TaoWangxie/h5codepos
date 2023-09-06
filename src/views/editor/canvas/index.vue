<template>
  <div
    ref="canvas"
    class="canvas_container canvas"
    @drop="handleDrop"
    @dragover="handleDragOver"
    @contextmenu="handleContextMenu"
    @mousedown="mousedown"
    :style="{
      background: background,
    }"
  >
    <Shap
      v-for="item in layoutData"
      :style="getShapeStyle(item.style)"
      :key="item.id"
      :grid="item"
    >
      <component
        class="component"
        :is="item.comKey"
        :config="item.config"
        :data="item.data"
      ></component>
    </Shap>

    <!-- 标线 -->
    <MarkLine />
    <!-- menu 传送到body 避免缩放影响 -->
    <Teleport to="body">
      <contextMenu></contextMenu>
    </Teleport>
  </div>
</template>

<script setup lang='ts'>
import _ from "lodash";
import { ref, getCurrentInstance, VueElement, onMounted, computed } from "vue";
import Shap from "../shap/index.vue";
import contextMenu from "../contextMenu/index.vue";
import MarkLine from "../markLine/index.vue";
import { generateID } from "@/utils/generateID";
import { getEventInCanvasPos } from "@/utils/common";
import { gridTags } from "@/static/gridTags";
import { useState } from "@/hooks/useState";
import { useStore } from "vuex";
const store = useStore();
const { layoutData, currentGrid, scale, shapPosList, enterTarget, pageConfig } =
  useState("editor", [
    "layoutData",
    "currentGrid",
    "scale",
    "shapPosList",
    "enterTarget",
    "pageConfig",
  ]);
const { proxy } = getCurrentInstance() as any;

//refs
let canvas: any | VueElement = ref();

onMounted(() => {
  store.commit("editor/SET_DATA", { key: "canvas", val: canvas });
});

const background = computed(() => {
  return pageConfig.value.dataSource.data?.bgcSrc
    ? "url(" + pageConfig.value.dataSource.data?.bgcSrc + ")"
    : pageConfig.value.config.data?.bgcSrc
    ? "url(" + pageConfig.value.config.data?.bgcSrc + ")"
    : pageConfig.value.config.data?.background;
});

const getShapeStyle = (style) => {
  if (!style) return;
  const result = {};
  let arr = ["width", "height", "top", "left", "rotate"];
  arr.forEach((attr) => {
    if (attr != "rotate") {
      result[attr] = style[attr] + "px";
    } else {
      (result as any).transform = "rotate(" + style[attr] + "deg)";
    }
  });
  return result;
};

const handleDrop = (e) => {
  e.preventDefault();
  e.stopPropagation();
  const index = e.dataTransfer.getData("index");
  let gridData: any = gridTags[index];
  //画布位置信息
  const canvasInfo = canvas.value.getBoundingClientRect();
  let { width, height } = gridData.style;
  let top = Math.round(
    (e.clientY - canvasInfo.y) / scale.value.value - height / 2
  );
  let left = Math.round(
    (e.clientX - canvasInfo.x) / scale.value.value - width / 2
  );
  let grid = {
    id: generateID(),
    comKey: gridData.comKey,
    isLock: false, //是否已锁定
    children: [], //子集id集合
    parentId: null, //父级id
    style: {
      width,
      height,
      top,
      left,
      rotate: 0,
    },
    relativeStyle: {}, //与父级组件相对定位 top,left
    config: _.cloneDeep(gridData.config), //页面配置
    data: _.cloneDeep(gridData.dataSource), //数据来源
  };
  store.commit("editor/PUSH_DATA", { key: "layoutData", val: grid });
  console.log(layoutData.value);
};
const handleDragOver = (e: any) => {
  e.preventDefault();
};

//menu菜单点击
const handleContextMenu = (e: any) => {
  e.stopPropagation();
  e.preventDefault();

  let pos = getEventInCanvasPos(e);
  store.commit("editor/SET_DATA", { key: "canvasEPos", val: pos });

  let top = e.clientY;
  let left = e.clientX;
  store.commit("editor/SHOW_CONTEXT_MENU", { top, left });
};

const mousedown = (e: any) => {
  store.commit("editor/HIDE_CONTEXT_MENU");
};
</script>

<style lang="scss" scoped>
.canvas_container {
  width: 100%;
  height: 100%;
}
</style>
