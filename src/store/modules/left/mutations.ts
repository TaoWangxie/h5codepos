import { LeftStateType } from "./state";
export default {
  SET_DATA(state: LeftStateType, msg: { key: keyof LeftStateType; val: any }) {
    state[msg.key] = msg.val;
  },
};
