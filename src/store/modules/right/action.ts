import { setStoreState } from "../../utils";
import { Store } from "vuex";
import { RightStateType } from "./state";
const rightActions = {
  // 刷新令牌
  refreshToken() {},
  // 获取用户信息
  getUserDetail() {},
  setData(context: Store<RightStateType>, data: any) {
    context.commit("__set", data);
  },
};

type RightActionsType = typeof rightActions;

export { RightActionsType };
export default rightActions;