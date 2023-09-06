import { StateType } from "@/@types";
import { Module } from "vuex";

const state: Record<string, any> = {
  canvas: null, //画布对象ref
  scale: {  //缩放
    value: 1,
    maxValue: 2,
    minValue: 0.3
  },
  canvasEPos: null as any, //鼠标相对于编辑器的位置
  canvasW: 390, //画布宽 5   1 = 128px
  canvasH: 844, //画布高 2.8125   1 = 128px
  snapshotData: [], // 编辑器快照数据
  snapshotIndex: -1, // 快照索引
  pageConfig: {
    config: {
      data: {
        // bgcSrc:'',
        background: '#fff',
      },
      fieldList: [
        { label: "背景色", prop: "background", type: "color" },
        // { label: "背景地址", prop: "bgcSrc", type: "img"},
      ]
    },
    dataSource: {
      // data:{
      //     bgcSrc:'',
      // },
      // fieldList: [
      //     { label: "背景地址", prop: "bgcSrc", type: "img"},
      // ]
    }
  },
  layoutData: [] as any,//画布所有组件
  currentGrid: null as any,//当前组件
  currentGridIndex: null, //当前组件下标
  targetGrid: null as any,//目标组件
  targetGridIndex: null as any,//目标组件下标
  isShapeMove: false, // 是否在拖动shap中
  enterTarget: null as any, //鼠标划入目标元素
  config: null as any, //页面配置

  shapPosXList: [], //shap位置信息集合
  shapPosYList: [], //shap位置信息集合

  maskHide: false,
  //menu
  menuShow: false, //右键菜单显隐
  menuTop: 0 as number, //右键菜单位置
  menuLeft: 0 as number, //右键菜单位置
  copyData: null, // 复制粘贴剪切
  isCut: false,

  //markLine
  markLineX: null, //标线left
  markLineY: null, //标线top

  leftML: null, //left距离标线
  topML: null, //top距离标线
  rightML: null, //right距离标线
  bottomML: null, //bottom距离标线

  ctrlShow: false
};
type EditorStateType = typeof state;

const editor: Module<EditorStateType, StateType> = { namespaced: true, ...state };

export { EditorStateType, state };
export default editor;
