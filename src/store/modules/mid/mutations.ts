import { MidStateType } from "./state";
export default {
  SET_DATA(state: MidStateType, msg: { key: keyof MidStateType; val: any }) {
    state[msg.key] = msg.val;
  },
};
