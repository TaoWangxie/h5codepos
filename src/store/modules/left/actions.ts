import { Store } from "vuex";
import { LeftStateType } from "./state";
const actions = {
  setData(context: Store<LeftStateType>, data: any) {
    context.commit("__set", data);
  },
};
export default actions;
