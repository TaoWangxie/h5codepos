<template>
  <div class="nav_container">
    <div class="content">
      <div
        id="nav_item"
        class="nav_item"
        v-for="item in btnList"
        :key="item.id"
        @click="btnClick(item)"
      >
        {{ item.name }}
      </div>
      <div class="scaleBox">
        {{ numMulti(scale.value, 100) + " %" }}
      </div>
    </div>
  </div>
  <!-- 代码预览 -->
  <exportCode
    v-model:visible="exportCodeVisible"
    title="代码预览"
    :code="config"
  >
  </exportCode>
  <previewPage
    v-model:visible="previewVisible"
    title="代码预览"
    :config="config"
  >
  </previewPage>
</template>

<script setup lang='ts'>
import { ref, getCurrentInstance } from "vue";
import { numMulti } from "@/utils/index";
import { getCode } from "@/utils/generator";
import exportCode from "@/views/editor/exportCode/index.vue";
import previewPage from "@/views/editor/previewPage/index.vue";
//store管理
import { useState } from "@/hooks/useState";
import { useStore } from "vuex";
const store = useStore();
const { layoutData, currentGrid, scale } = useState("editor", [
  "layoutData",
  "currentGrid",
  "scale",
]);

const { proxy } = getCurrentInstance() as any;
const btnList: any[] = [
  {
    id: "0",
    name: "撤销",
  },
  {
    id: "1",
    name: "重做",
  },
  {
    id: "2",
    name: "预览代码",
  },
  {
    id: "3",
    name: "预览",
  },
  {
    id: "4",
    name: "数据",
  },
];
const btnClick = (data: any) => {
  switch (data.id) {
    case "0":
      store.commit("editor/UNDO");
      break;
    case "1":
      store.commit("editor/REDO");
      break;
    case "2":
      previewCode();
      break;
    case "3":
      preview();
      break;
    case "4":
      handlepptxgen(layoutData.value);
      break;
    default:
      preview();
      break;
  }
};

const handlepptxgen = (data: any) => {
  // console.log(data);
  let arr: any = [];
  data.map((item: any) => {
    let obj: any = {
      type: item.comKey,
      config: item.config?.data,
      style: item.style,
    };
    arr.push(obj);
  });
  console.log(arr);
};

let exportCodeVisible: any = ref(false);
let config: any = ref(null);
const previewCode = () => {
  exportCodeVisible.value = true;
  config.value = getCode();
};

let previewVisible: any = ref(false);
const preview = () => {
  config.value = getCode();
  console.log(config.value.config);
  previewVisible.value = true;
};
</script>

<style lang="scss" scoped>
.nav_container {
  width: 100%;
  height: 100%;
  box-sizing: border-box;
  border-bottom: 1px solid #ebeef5;
}
.content {
  position: relative;
  height: 100%;
  display: flex;
  justify-content: center;
  padding: 0 20px;
  background-color: #fff;
}
.nav_item {
  display: flex;
  align-items: center;
  height: 100%;
  padding: 0 15px;
  font-size: 14px;
  &:hover {
    cursor: pointer;
    color: #409eff;
  }
}
.scaleBox {
  position: absolute;
  top: 50%;
  right: 20px;
  transform: translateY(-50%);
  font-size: 13px;
  color: #606266;
}
</style>
