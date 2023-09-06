import { createStore, useStore as baseUseStore, Store } from 'vuex'
import modules from "./modules/index";
import { StateType } from "@/@types/index";
import { App, InjectionKey } from "vue";

export const key: InjectionKey<Store<StateType>> = Symbol();

const store: Store<StateType> = createStore({
    strict: false,
    actions: {},
    modules: { 
        ...modules,
    },
});

export default store;
