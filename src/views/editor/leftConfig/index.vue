<template>
  <div class="left_container">
    <div class="left_content">
      <Tab :list="tabList" :tabKey="configTab" @changeTab="changeTab"></Tab>
      <div class="gridTag_box" @dragstart="handleDragStart">
        <div class="gridTag_Item" v-for="(item, index) in list" :key="index">
          <div class="mask" draggable="true" :data-index="index"></div>
          <div class="imgBox">
            <img :src="item.src" alt="" />
          </div>
          <div class="textBox">
            {{ item.label }}
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang='ts'>
import { ref, getCurrentInstance } from "vue";
import { Coin, Setting } from "@element-plus/icons-vue";
// import { gridTags } from "@/static/gridTags";
const { proxy } = getCurrentInstance() as any;

//props
interface Props {
  list: any;
}
const props = withDefaults(defineProps<Props>(), {
  list: [],
});
let configTab = ref("comConfig");

const tabList = [
  {
    key: "comConfig",
    icon: Setting,
  },
  {
    key: "pageConfig",
    icon: Coin,
  },
];

const changeTab = (val: any) => {
  configTab.value = val;
};

const handleDragStart = (e: any) => {
  e.dataTransfer.setData("index", e.target.dataset.index);
  console.log("start", e.target.dataset.index);
};
</script>

<style lang="scss" scoped>
.left_container {
  width: 240px;
  height: 100%;
  z-index: 1;
}
.left_content {
  width: 100%;
  height: 100%;
  overflow-y: auto;
  border-right: 1px solid #e4e7ed;
  .gridTag_box {
    display: flex;
    justify-content: space-between;
    flex-wrap: wrap;
    height: auto;
    padding: 5%;
    background-color: #f2f6fc;
  }
  .gridTag_Item {
    // display: flex;
    position: relative;
    flex: 0 0 30%;
    height: 80px;
    align-items: center;
    justify-content: center;
    background-color: #fff;
    border-radius: 4px;
    margin-right: calc(5%);
    margin-bottom: calc(5%);
    &:nth-child(3n) {
      margin-right: 0;
    }
    &:last-child {
      margin-right: auto;
    }
    .imgBox {
      width: 100%;
      height: 50px;
      background-color: #ebeef5;
      display: flex;
      align-items: center;
      justify-content: center;
      img {
        display: inline-block;
        max-width: 100%;
        max-height: 100%;
      }
    }
    .textBox {
      display: flex;
      align-items: center;
      justify-content: center;
      width: 100%;
      height: 30px;
      font-size: 12px;
    }
    .mask {
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
    }
  }
}
</style>
