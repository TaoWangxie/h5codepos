<template>
  <div
    :class="['shap_container', Active, pointerEvents]"
    v-if="layoutData.length"
    @mousedown="handleMouseDownOnShape"
    @mousemove="handleMouseMoveOnShape"
    @mouseleave="handleMouseLeaveOnShape"
    @mouseenter="handleMouseEnterOnShape"
    @dblclick="doubleclick"
  >
    <div
      v-for="(item, index) in pointList"
      :key="index"
      :class="['point', `point${index}`]"
      @mousedown="handleMouseDownOnPoint(item, $event)"
      :style="{ cursor: cursors[item] }"
    ></div>
    <span class="icon-suo" v-show="grid.isLock">
      <el-icon :size="12">
        <Lock />
      </el-icon>
    </span>
    <slot></slot>
    <div
      v-if="currentGrid && grid.id == currentGrid.id"
      :style="{ bottom: `${-35}px`, transform: `scale(${1 / scale.value})` }"
      class="posBox"
    >
      <span>{{ currentGrid?.style.left }}</span>
      <span>{{ currentGrid?.style.top }}</span>
    </div>
    <div v-show="!maskHide" :class="['mask', maskActive]"></div>
  </div>
</template>

<script setup lang='ts'>
import _ from "lodash";
import { ref, getCurrentInstance, watch, computed, onBeforeMount } from "vue";
import { Lock } from "@element-plus/icons-vue";
import { syncChildShapPos, setStartPos } from "@/utils/common";
import { useState } from "@/hooks/useState";
import { useStore } from "vuex";
import calculateComponentPositonAndSize from "@/utils/calculateComponentPositonAndSize";
const store = useStore();
const { proxy } = getCurrentInstance() as any;
const {
  layoutData,
  currentGrid,
  currentGridIndex,
  scale,
  canvas,
  isShapeMove,
  targetGrid,
  maskHide,
} = useState("editor", [
  "layoutData",
  "currentGrid",
  "currentGridIndex",
  "scale",
  "canvas",
  "isShapeMove",
  "targetGrid",
  "maskHide",
]);

interface Props {
  grid: any;
}
const props = withDefaults(defineProps<Props>(), {
  grid: () => {},
});

let curPonits: any = ref(null); //当前组件四个点坐标
let tarPonits: any = ref(null); //鼠标进入组件四个点坐标

//样式
const Active = computed(() => {
  return currentGrid.value?.id == props.grid?.id ? "active" : "";
});
const pointerEvents = computed(() => {
  return isShapeMove.value && currentGrid.value?.id == props.grid?.id
    ? "pointerEvents"
    : "";
});
const maskActive = computed(() => {
  return isShapeMove.value && targetGrid.value?.id == props.grid?.id
    ? "maskActive"
    : "";
});

//双击
const doubleclick = (e: any) => {
  //子级初始位置集合
  let startPos = {};
  setStartPos(currentGrid.value, startPos);
  //同步子级shap
  syncChildShapPos(
    currentGrid.value,
    -_.cloneDeep(currentGrid.value.style.left),
    0,
    startPos
  );
  //初始化位置宽度
  if (currentGrid.value.parentId) {
    let parent = layoutData.value.filter(
      (item) => item.id == currentGrid.value.parentId
    );
    store.commit("editor/SET_SHAP_STYLE", {
      left: parent[0].style.left,
      width: parent[0].style.width,
    });
    let top = currentGrid.value.relativeStyle.top;
    let left = 0;
    store.commit("editor/SET_DATA", {
      key: "currentGrid",
      properties: "relativeStyle",
      val: { top, left },
    });
  } else {
    store.commit("editor/SET_SHAP_STYLE", { left: 0, width: 300 });
  }
};

//shap点击
const handleMouseDownOnShape = (e: any) => {
  e.preventDefault();
  e.stopPropagation();
  let body: any = document.querySelector("body");
  let index = layoutData.value.findIndex((item) => props.grid.id == item.id);
  store.commit("editor/SET_DATA", { key: "currentGrid", val: props.grid });
  store.commit("editor/SET_DATA", { key: "currentGridIndex", val: index });
  store.commit("editor/HIDE_CONTEXT_MENU");

  if (props.grid.isLock) return;
  let arr = _.cloneDeep(layoutData.value);
  arr.splice(index, 1);
  arr.length && store.commit("editor/SET_SHAP_POS", arr);

  const startY = e.clientY;
  const startX = e.clientX;
  let { top, left, width, height } = currentGrid.value.style;
  // 如果直接修改属性，值的类型会变为字符串，所以要转为数值型
  const startTop = Number(top);
  const startLeft = Number(left);
  //子级初始位置集合
  let startPos = {};
  setStartPos(currentGrid.value, startPos);
  // 如果元素没有移动，则不保存快照
  const move = (moveEvent) => {
    // body.style.cursor = 'move'
    body.style.cursor = "grab";
    store.commit("editor/SET_DATA", { key: "isShapeMove", val: true });
    const curX = moveEvent.clientX;
    const curY = moveEvent.clientY;
    top = Math.round((curY - startY) / scale.value.value + startTop);
    left = Math.round((curX - startX) / scale.value.value + startLeft);
    store.commit("editor/SET_SHAP_STYLE", { top, left, width, height });
    store.commit("editor/SET_MARKLINE", { top, left, height, width });

    //移动的差值
    let diffX = Math.round((curX - startX) / scale.value.value);
    let diffY = Math.round((curY - startY) / scale.value.value);
    //同步子级shap
    syncChildShapPos(currentGrid.value, diffX, diffY, startPos);
  };
  const up = () => {
    body.style.cursor = "default";
    if (
      !currentGrid.value.parentId &&
      (window.event as any).ctrlKey &&
      targetGrid.value
    ) {
      let children = _.cloneDeep(targetGrid.value.children);
      children.push({
        id: currentGrid.value.id,
      });
      store.commit("editor/SET_DATA", {
        key: "currentGrid",
        properties: "parentId",
        val: targetGrid.value.id,
      });
      store.commit("editor/SET_DATA", {
        key: "targetGrid",
        properties: "children",
        val: children,
      });
    }
    setChildRelativeStyle(currentGrid.value);
    //快照
    isShapeMove.value && store.commit("editor/RECORD_SNAPSHOT");
    store.commit("editor/SET_DATA", { key: "isShapeMove", val: false });
    store.commit("editor/SET_DATA", { key: "targetGrid", val: null });
    store.commit("editor/SET_DATA", { key: "enterTarget", val: null });
    document.removeEventListener("mousemove", move);
    document.removeEventListener("mouseup", up);
  };
  document.addEventListener("mousemove", move);
  document.addEventListener("mouseup", up);
};

//监听shap的Move
const handleMouseMoveOnShape = (e: any) => {
  //是否点击了ctrl: (window.event as any).ctrlKey
  if (
    (window.event as any).ctrlKey &&
    isShapeMove.value &&
    currentGrid.value.id != props.grid.id
  ) {
    store.commit("editor/SET_DATA", { key: "targetGrid", val: props.grid });
  }
};
//监听shap的Leave
const handleMouseLeaveOnShape = (e: any) => {
  store.commit("editor/SET_DATA", { key: "enterTarget", val: null });
  if ((window.event as any).ctrlKey && isShapeMove.value && currentGrid.value) {
    store.commit("editor/SET_DATA", { key: "targetGrid", val: null });
  }
  store.commit("editor/SET_DATA", { key: "leftML", val: null });
  store.commit("editor/SET_DATA", { key: "topML", val: null });
  store.commit("editor/SET_DATA", { key: "rightML", val: null });
  store.commit("editor/SET_DATA", { key: "bottomML", val: null });
};

//鼠标进入
const handleMouseEnterOnShape = (e: any) => {
  currentGrid.value?.id != props.grid.id &&
    store.commit("editor/SET_DATA", {
      key: "enterTarget",
      val: _.cloneDeep(props.grid),
    });
  setMarkline();
};
const setMarkline = () => {
  if (!currentGrid.value || isShapeMove.value) return;
  let { top, left, width, height } = props.grid.style;
  tarPonits.value = getPoints({
    top: Number(top),
    left: Number(left),
    width,
    height,
  });
  let {
    top: curT,
    left: curL,
    width: curW,
    height: curH,
  } = currentGrid.value?.style;
  curPonits.value = getPoints({
    top: Number(curT),
    left: Number(curL),
    width: curW,
    height: curH,
  });
  tarPonits.value &&
    curPonits.value &&
    createMarkline(_.cloneDeep(curPonits.value), _.cloneDeep(tarPonits.value));
};

//光标位置
let cursors = ref({
  b: "s-resize",
  l: "w-resize",
  lb: "sw-resize",
  lt: "nw-resize",
  r: "e-resize",
  rb: "se-resize",
  rt: "ne-resize",
  t: "n-resize",
});
let pointList = ["lt", "t", "rt", "r", "rb", "b", "lb", "l"];
//point点击
const handleMouseDownOnPoint = (point: any, e: any) => {
  e.preventDefault();
  e.stopPropagation();
  store.commit("editor/SET_DATA", { key: "currentGrid", val: props.grid });

  if (props.grid.isLock) return;

  const style = { ...props.grid.style };
  // 组件宽高比
  const proportion = style.width / style.height;
  // 组件中心点
  const center = {
    x: style.left + style.width / 2,
    y: style.top + style.height / 2,
  };
  //画布位置信息
  const canvasInfo = canvas.value.getBoundingClientRect();
  const pointRect = e.target.getBoundingClientRect();
  // 当前点击圆点相对于画布的中心坐标
  const curPoint = {
    x:
      Math.round(pointRect.left - canvasInfo.left) / scale.value.value +
      e.target.offsetWidth / 2,
    y:
      Math.round(pointRect.top - canvasInfo.top) / scale.value.value +
      e.target.offsetHeight / 2,
  };
  // 获取对称点的坐标
  const symmetricPoint = {
    x: center.x - (curPoint.x - center.x),
    y: center.y - (curPoint.y - center.y),
  };

  // 是否需要保存快照
  let needSave = false;
  let isFirst = true;
  const move = (moveEvent) => {
    if (isFirst) {
      isFirst = false;
      return;
    }
    needSave = true;
    const curPositon = {
      x: (moveEvent.clientX - canvasInfo.left) / scale.value.value,
      y: (moveEvent.clientY - canvasInfo.top) / scale.value.value,
    };
    calculateComponentPositonAndSize(
      point,
      style,
      curPositon,
      proportion,
      false,
      {
        center,
        curPoint,
        symmetricPoint,
      }
    );
    store.commit("editor/SET_SHAP_STYLE", style);
    store.commit("editor/SET_MARKLINE", { ...style });
  };
  const up = () => {
    document.removeEventListener("mousemove", move);
    document.removeEventListener("mouseup", up);
    needSave && store.commit("editor/RECORD_SNAPSHOT");
  };

  document.addEventListener("mousemove", move);
  document.addEventListener("mouseup", up);
};
//设置子级与父级的相对位置
const setChildRelativeStyle = (grid: any) => {
  if (grid.parentId) {
    let parent = layoutData.value.filter((item) => item.id == grid.parentId);
    let val = _.cloneDeep(parent[0]);
    let top = grid.style.top - val.style.top;
    let left = grid.style.left - val.style.left;
    store.commit("editor/SET_DATA", {
      key: "currentGrid",
      properties: "relativeStyle",
      val: { top, left },
    });
  }
};

//=====================================utils=========================================
//获取矩形四个中心点
const getPoints = ({ top, left, width, height }) => {
  const leftPoint = {
    x: left,
    y: top + height / 2,
  };
  const topPoint = {
    x: left + width / 2,
    y: top,
  };
  const rightPoint = {
    x: left + width,
    y: top + height / 2,
  };
  const bottomPoint = {
    x: left + width / 2,
    y: top + height,
  };
  return {
    leftPoint,
    topPoint,
    rightPoint,
    bottomPoint,
  };
};
//计算标线位置
const createMarkline = (cur: any, tar: any) => {
  if (props.grid?.id == currentGrid.value?.id) return;

  let {
    leftPoint: curL,
    topPoint: curT,
    rightPoint: curR,
    bottomPoint: curB,
  } = cur;
  let {
    leftPoint: tarL,
    topPoint: tarT,
    rightPoint: tarR,
    bottomPoint: tarB,
  } = tar;

  let leftx = 0;
  let lefty = 0;
  let rightx = 0;
  let righty = 0;
  let leftw = 0;
  let rightw = 0;

  if (curL.x > tarR.x) {
    leftx = tarR.x;
    lefty = curL.y;
    leftw = Math.abs(curL.x - tarR.x);
    rightw = 0;
  } else if (curR.x < tarL.x) {
    leftx = curR.x;
    lefty = curR.y;
    leftw = Math.abs(tarL.x - curR.x);
    rightw = 0;
  } else {
    (leftx = curL.x > tarL.x ? tarL.x : curL.x),
      (lefty = curL.x > tarL.x ? curL.y : tarL.y);
    leftw = Math.abs(tarL.x - curL.x);

    (rightx = curR.x > tarR.x ? tarR.x : curR.x),
      (righty = curR.x > tarR.x ? tarR.y : curR.y);
    rightw = Math.abs(tarR.x - curR.x);
  }

  let topx = 0;
  let topy = 0;
  let bottomx = 0;
  let bottomy = 0;
  let toph = 0;
  let bottomh = 0;

  if (curB.y < tarT.y) {
    bottomx = curB.x;
    bottomy = curB.y;
    bottomh = Math.abs(curB.y - tarT.y);
    toph = 0;
  } else if (curT.y > tarB.y) {
    topx = tarB.x;
    topy = tarB.y;
    toph = Math.abs(curT.y - tarB.y);
    bottomh = 0;
  } else {
    (topx = curT.y < tarT.y ? tarT.x : curT.x),
      (topy = curT.y < tarT.y ? curT.y : tarT.y),
      (toph = Math.abs(tarT.y - curT.y));

    (bottomx = curB.y < tarB.y ? curB.x : tarB.x),
      (bottomy = curB.y < tarB.y ? curB.y : tarB.y),
      (bottomh = Math.abs(tarB.y - curB.y));
  }
  store.commit("editor/SET_DATA", {
    key: "leftML",
    val: { x: leftx, y: lefty, w: leftw },
  });
  store.commit("editor/SET_DATA", {
    key: "topML",
    val: { x: topx, y: topy, h: toph },
  });
  store.commit("editor/SET_DATA", {
    key: "rightML",
    val: { x: rightx, y: righty, w: rightw },
  });
  store.commit("editor/SET_DATA", {
    key: "bottomML",
    val: { x: bottomx, y: bottomy, h: bottomh },
  });

  store.commit("editor/SET_DATA", {
    key: "leftGL",
    val: { x: leftx, y: lefty, w: leftw },
  });
  store.commit("editor/SET_DATA", {
    key: "topGL",
    val: { x: topx, y: topy, h: toph },
  });
  store.commit("editor/SET_DATA", {
    key: "rightGL",
    val: { x: rightx, y: righty, w: rightw },
  });
  store.commit("editor/SET_DATA", {
    key: "bottomGL",
    val: { x: bottomx, y: bottomy, h: bottomh },
  });
};
</script>

<style lang="scss" scoped>
.shap_container {
  position: absolute;
  transform: translate3d(0, 0, 0);
  .posBox {
    display: inline-flex;
    position: absolute;
    width: 100%;
    justify-content: center;
    // bottom: -25px;
    span {
      display: flex;
      align-items: center;
      height: 25px;
      font-size: 13px;
      padding: 0 4px;
      color: #303133;
      background-color: rgba(#dcdfe6, 0.4);
      border-radius: 2px;
      margin: 0 2px;
    }
  }
}
.pointerEvents {
  pointer-events: none;
}

.icon-suo {
  position: absolute;
  top: -2px;
  right: 2px;
  z-index: 9;
}
.active {
  padding: 2px;
  box-sizing: border-box;
  &::before {
    position: absolute;
    top: -1px;
    left: -1px;
    right: -1px;
    bottom: -1px;
    content: "";
    border: 2px dashed #2196f3;
  }
  .point {
    position: absolute;
    height: 6px;
    width: 6px;
    background-color: #2196f3;
    border-radius: 50%;
  }
  .point0 {
    top: -3px;
    left: -3px;
  }
  .point1 {
    top: -3px;
    left: calc(50% - 3px);
  }
  .point2 {
    top: -3px;
    right: -3px;
  }
  .point3 {
    right: -3px;
    top: calc(50% - 3px);
  }
  .point4 {
    bottom: -3px;
    right: -3px;
  }
  .point5 {
    bottom: -3px;
    left: calc(50% - 3px);
  }
  .point6 {
    bottom: -3px;
    left: -3px;
  }
  .point7 {
    left: -3px;
    top: calc(50% - 3px);
  }
}
.mask {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: 1;
}
.maskActive {
  background-color: rgba(#409eff, 0.4);
}
</style>
