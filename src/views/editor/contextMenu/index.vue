<template>
    <div
        class="contextmenu"
        id="contextmenu"
        v-show="menuShow"
        :style="{ top: menuTop + 'px', left: menuLeft + 'px' }"
    >
        <ul @mouseup="handleMouseUp">
            <template v-if="currentGrid">
                <template v-if="!currentGrid.isLock">
                  <template v-for="(item, index) in menuList" :key="index">
                    <li
                        :hidden="item.key == 'relieve' && !currentGrid.parentId"
                        @click="menuClick(item.key)"
                    >
                      <el-button :type="item.type" link>{{ item.label }}</el-button>
                    </li>
                  </template>
                </template>
                <li
                    v-else
                    @click="menuClick('unlock')"
                >
                    解锁
                </li>
            </template>
            <template v-else>
              <li @click="menuClick('paste')">
                  粘贴
              </li>
              <li @click="menuClick('pasteTop')">
                  仅粘贴顶级
              </li>
            </template>
        </ul>
    </div>
</template>

<script lang='ts' setup>
import { ref, reactive, computed, onMounted } from 'vue'
import { monitorSelfClick } from '@/utils/index';
import { useState } from '@/hooks/useState'
import { useStore } from 'vuex';
const store = useStore();
const { layoutData, currentGrid, menuShow, menuTop, menuLeft } = 
useState("editor", ["layoutData",'currentGrid','menuShow','menuTop','menuLeft'])

//menu配置列表
const menuList = ref([
  {
    key: 'lock',
    label: '锁定',
    icon: 'lock',
    type:''
  },
  {
    key: 'delete',
    label: '删除',
    icon: 'delete',
    type:'danger'
  },
  {
    key: 'copy',
    label: '复制',
    icon: 'copy',
    type:''
  },
  {
    key: 'paste',
    label: '粘贴',
    icon: 'paste',
    type:''
  },
  {
    key: 'pasteTop',
    label: '仅粘贴顶级',
    icon: 'pasteTop',
    type:''
  },
  {
    key: 'relieve',
    label: '解除关联',
    icon: 'relieve',
    type:'success'
  },

  {
    key: 'toTop',
    label: '置顶',
    icon: 'toTop',
    type:''
  },
  {
    key: 'toBottom',
    label: '置底',
    icon: 'toBottom',
    type:''
  },
  {
    key: 'toUp',
    label: '上移',
    icon: 'toUp',
    type:''
  },
  {
    key: 'toDown',
    label: '下移',
    icon: 'toDown',
    type:''
  }
])


monitorSelfClick('contextmenu',async ()=>{
    store.commit('editor/HIDE_CONTEXT_MENU')
})

//菜单点击menu
const menuClick = (val) => {
  let arr = ['lock', 'unlock', 'cut', 'copy']
  switch (val) {
    case 'paste':
      store.commit(`editor/${val}`, {isMouse:true})
      break;
    case 'pasteTop':
      store.commit(`editor/paste`, {isMouse:true, isTop:true})
      break;
    default:
      store.commit(`editor/${val}`)
      break;
  }
  !arr.includes(val) && store.commit('editor/RECORD_SNAPSHOT')
}
//鼠标抬起 冒泡
const handleMouseUp = () => {
    store.commit('editor/HIDE_CONTEXT_MENU')
}
</script>

<style lang="scss" scoped>
.contextmenu {
  position: absolute;
  z-index: 1000;

  ul {
    border: 1px solid #e4e7ed;
    border-radius: 4px;
    background-color: #fff;
    box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
    box-sizing: border-box;
    margin: 5px 0;
    padding: 6px 0;

    li {
      font-size: 14px;
      padding: 0 20px;
      position: relative;
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
      color: #606266;
      height: 34px;
      line-height: 34px;
      box-sizing: border-box;
      cursor: pointer;

      &:hover {
        background-color: #f5f7fa;
      }
      .iconsvg {
        margin-right: 10px;
      }
    }
  }
}
</style>