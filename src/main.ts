import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store' // 状态管理
import Draggable from 'vuedraggable'
import element from "element-plus";
import mitt from 'mitt'
import 'element-plus/dist/index.css'
import { setupGlobalCom } from '@/initCom/index'
import vue3ResizeDrag from 'vue3-resize-drag'

import _ from 'lodash'
import VueGridLayout from '../v3-grid-layout.es'
import '../style.css'

// import * as VueResponsiveGridLayout from 'vue-responsive-grid-layout'

let app: any;

function mount() {
  app = createApp(App)
  app.use(router)
  app.use(element)
  app.use(store)
  app.use(VueGridLayout)
  app.use(vue3ResizeDrag)
  app.component('draggable', Draggable)
  setupGlobalCom(app)
  //事件总线
  app.config.globalProperties.mittBus = mitt()
  app.config.globalProperties.$vm = app;
  // app.use(VueResponsiveGridLayout)
  app.mount('#nuwa')
}



// 将卸载操作放入 unmount 函数
function unmount() {
  app?.unmount()
  // 卸载所有数据监听函数
  app = null
}

if ((window as any).__MICRO_APP_BASE_APPLICATION__) {
  // @ts-ignore
  window['micro-app-nuwa'] = { mount, unmount }
} else {
  // 非微前端环境直接渲染
  mount()
}

export default app