import { LeftStateType } from "./state";
const getters = {
  getLeft(state: LeftStateType) {
    return state.left;
  },
};
export default getters;
