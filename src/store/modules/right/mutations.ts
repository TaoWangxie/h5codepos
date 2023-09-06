import { RightStateType } from "./state";
export default {
  SET_DATA(state: RightStateType, msg: { key: keyof RightStateType; val: any }) {
    state[msg.key] = msg.val;
  },
};
