import { mapGetters, createNamespacedHelpers } from "vuex";
import { useMapper } from "./useMapper.js";
export function useGetters(moduleName: string, mapper: string) {
  let mapperFn = mapGetters; //默认等于mapGetters
  if (typeof moduleName === "string" && moduleName.length > 0) {
    mapperFn = createNamespacedHelpers(moduleName).mapGetters;
  } else {
    mapper = moduleName;
  }
  return useMapper(mapper, mapperFn);
}
