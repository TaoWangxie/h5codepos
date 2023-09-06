import { useStore } from "vuex";
import { computed } from "vue";
export function useMapper(mapper: any, mapFn: any) {
  //mapFn对应想使用的函数
  const storeStateFns: any = mapFn(mapper);
  const store = useStore();
  const storeState: Record<keyof typeof storeStateFns, any> = {};
  Object.keys(storeStateFns).forEach((fnnKey) => {
    const fn = storeStateFns[fnnKey].bind({ $store: store });
    storeState[fnnKey] = computed(fn);
  });
  return storeState;
}
