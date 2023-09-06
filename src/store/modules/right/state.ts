import { StateType } from "@/@types/index";
import { Module } from "vuex";

const state = {
  right: true,
  showAttrEditor: false
};
type RightStateType = typeof state;

const right: Module<RightStateType, StateType> = {
  namespaced: true,
  ...state,
};

export { RightStateType, state };
export default right;
