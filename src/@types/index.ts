import { LeftStateType } from "@/store/modules/left/state";
import { RightStateType } from "@/store/modules/right/state";
import { MidStateType } from "@/store/modules/mid/state";
import { EditorStateType } from "@/store/modules/editor/state";

// vuex state 的模块的类型
type ModuleType = {
  sideSetTab: EditorStateType,
  //图层展示
  layerShow: EditorStateType,
  //虚拟dom
  Fdom: EditorStateType,
  //画布所有组件
  layoutData: EditorStateType,
  //当前组件
  currentGrid: EditorStateType,
  colNum: any,
  colPx: any,
  domStr:any
};

// 所有的StateType
export type StateType = ModuleType;

/** http请求响应格式  */
export declare interface ApiResponse {
  code: number;
  msg: string;
  data: any;
}
interface roleType {
  name: string;
  role_id: number;
}
interface subjectType {
  name: string;
  subject: number;
}
export interface BasicUserType {}

