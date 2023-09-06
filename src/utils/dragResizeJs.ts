import { numAdd, numSub, isInview, mouseMoveDirection, add, sub, mul, div } from '@/utils/index'
import _ from 'lodash'
import store from '@/store';
let { editor: $editor } = store.state as any

// 全局变量
let wrapperWH,
  x,
  y,
  scale = 1,
  minScale = $editor.scale.minValue,
  maxScale = $editor.scale.maxValue,
  isPointerdown = false, // 按下标识
  point = { x: 0, y: 0 }, // 第一个点坐标
  diff = { x: 0, y: 0 }, // 相对于上一次pointermove移动差值
  lastPointermove = { x: 0, y: 0 }, // 用于计算diff
  clientRect: any = '',
  viewHeight: any = '',
  viewWidth: any = '',
  wrapperPannelRect: any = null; //wrapperPannel的可视区域数据

export class dragResize {
  wrapperPannel: any;
  wrapper: any;
  isSelf: any = true; //是否可以点击自身拖拽
  constructor(params: { wrapperPannel: any, wrapper: any, image?: any, isSelf?: boolean }) {
    let { wrapperPannel, wrapper, image, isSelf } = params
    this.wrapperPannel = wrapperPannel
    this.wrapper = wrapper
    this.isSelf = isSelf
    viewWidth = this.wrapperPannel.offsetWidth
    viewHeight = this.wrapperPannel.offsetHeight
    wrapperPannelRect = this.wrapperPannel.getBoundingClientRect()
    this.initStyle()
    image ? image.addEventListener('load', () => { this.init() }) : this.init()

  }
  //初始化
  init() {
    this.wrapperPannel.style.display = 'block'
    this.wrapper.style.display = 'inline-block'
    wrapperWH = {
      width: this.wrapper.offsetWidth,
      height: this.wrapper.offsetHeight
    }
    console.log(wrapperWH);
    x = (viewWidth - wrapperWH.width) * 0.5;
    y = (viewHeight - wrapperWH.height) * 0.5;
    scale = $editor.scale.value
    this.changeStyle()
    // 拖拽查看
    this.drag();
    // 滚轮缩放
    this.wheelZoom();
  }

  // 拖拽
  drag() {
    // 绑定 pointerdown
    this.wrapperPannel.addEventListener('pointerdown', (e) => {
      if (e.target == this.wrapperPannel || this.isSelf) {
        store.commit('editor/SET_DATA',{key:'currentGrid', val: null})
        isPointerdown = true;
        this.wrapperPannel?.setPointerCapture(e.pointerId);
        point = { x: e.clientX, y: e.clientY };
        lastPointermove = { x: e.clientX, y: e.clientY };
        if (this.wrapperPannel) {
          this.wrapperPannel.style.cursor = 'grab';
        }
      }
    });
    // 绑定 pointermove
    this.wrapperPannel.addEventListener('pointermove', (e) => {
      let direction: any = ['中', '中']
      if (isPointerdown) {
        //鼠标拖拽方向
        direction = mouseMoveDirection(e)
        //是否在可视区域
        clientRect = getWrapperBoundingClientRect(this.wrapper)
        let isView = isInview(clientRect, viewHeight, viewWidth)
        if (isView) {
          if (clientRect.bottom < 0 && direction[1] == '下' ||
            clientRect.top > viewHeight && direction[1] == '上' ||
            clientRect.right < 0 && direction[0] == '右' ||
            clientRect.left > viewWidth && direction[0] == '左') {
            this.move(e)
          }
        } else {
          this.move(e)
        }
      }
      e.preventDefault();
    });
    // 绑定 pointerup
    this.wrapperPannel.addEventListener('pointerup', (e) => {
      if (isPointerdown) {
        isPointerdown = false;
        this.wrapperPannel.style.cursor = 'default';
      }
    });
    // 绑定 pointercancel
    this.wrapperPannel.addEventListener('pointercancel', (e) => {
      if (isPointerdown) {
        isPointerdown = false;
      }
    });
  }
  //移动
  move(e) {
    const current1 = { x: e.clientX, y: e.clientY };
    diff.x = numSub(current1.x, lastPointermove.x);
    diff.y = numSub(current1.y, lastPointermove.y);
    lastPointermove = { x: current1.x, y: current1.y };
    x = numAdd(x, diff.x);
    y = numAdd(y, diff.y);
    this.changeStyle()
  }
  // 滚轮缩放
  wheelZoom() {
    this.wrapperPannel.addEventListener('wheel', (e) => {
      let ratio = 1.3;
      // 缩小
      if (e.deltaY > 0) {
        ratio = div(1,ratio) 
      }
      // 限制缩放倍数
      const _scale = mul(scale, ratio);
      if (_scale > maxScale) {
        ratio = div(maxScale,scale)
        scale = maxScale;
      } else if (_scale < minScale) {
        ratio = div(minScale,scale)
        scale = minScale;
      } else {
        scale = _scale;
      }
      store.commit('editor/SET_DATA',{key:'scale', properties:'value', val: scale})
      // 目标元素是img说明鼠标在img上，以鼠标位置为缩放中心，否则默认以图片中心点为缩放中心
      const origin = {
        x: mul((ratio - 1), mul(wrapperWH.width, 0.5)),
        y: mul((ratio - 1), mul(wrapperWH.height, 0.5))
      };
      // 计算偏移量
      x -= mul((ratio - 1), (e.clientX - wrapperPannelRect.left - x)) - origin.x;
      y -= mul((ratio - 1), (e.clientY - wrapperPannelRect.top - y)) - origin.y;
      this.changeStyle()
      e.preventDefault();
    });
  }
  //更新样式
  changeStyle() {
    this.wrapper.style.transform = 'translate3d(' + x + 'px, ' + y + 'px, 0) scale(' + scale + ')';
  }
  //初始化样式
  initStyle() {
    this.wrapperPannel.style.display = 'flex'
    this.wrapperPannel.style.alignItems = 'center'
    this.wrapperPannel.style.justifyContent = 'center'
    this.wrapperPannel.style.overflow = 'hidden'
    this.wrapper.style.userSelect = 'none'
  }
}
//获取wrapper相对可视区域ClientRect
function getWrapperBoundingClientRect(wrapper) {
  let wrapperRect = wrapper.getBoundingClientRect()
  return {
    left: numSub(wrapperRect.left, wrapperPannelRect.left),
    right: numSub(wrapperRect.right, wrapperPannelRect.left),
    top: numSub(wrapperRect.top, wrapperPannelRect.top),
    bottom: numSub(wrapperRect.bottom, wrapperPannelRect.top),
  }
}

