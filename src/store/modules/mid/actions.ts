import { Store } from "vuex";
import { MidStateType } from "./state";
const actions = {
  setData(context: Store<MidStateType>, data: any) {
    context.commit("__set", data);
  },
};
export default actions;
