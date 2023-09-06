import { mapState, createNamespacedHelpers } from "vuex";
import { useMapper } from "./useMapper.js";
// useState['user',['userName','......']]
export function useState(moduleName: string, mapper: string|string[]) {
  let mapperFn = mapState; //默认等于mapState
  if (typeof moduleName === "string" && moduleName.length > 0) {
    mapperFn = createNamespacedHelpers(moduleName).mapState;
  } else {
    //useState('user',['userName','count'])
    //useState(['userName','count'])
    //没有传moduleNam时，但是真正传过来的数组却是给了第一个参数moduleName。
    mapper = moduleName;
  }
  return useMapper(mapper, mapperFn);
}
