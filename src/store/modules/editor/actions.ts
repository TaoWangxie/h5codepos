import { Store } from "vuex";
import { EditorStateType } from "./state";
const actions = {
  //赋值
  setData(context: Store<EditorStateType>, data: any) {
    context.commit("SET_DATA", data);
  },
};
export default actions;
