import { StateType } from "@/@types";
import { Module } from "vuex";

const state = {
  left: true,

};
type LeftStateType = typeof state;

const left: Module<LeftStateType, StateType> = { namespaced: true, ...state };

export { LeftStateType, state };
export default left;
