<template>
  <table
    v-if="configInfo"
    :border="configInfo.border ? 1 : 0"
    :style="{
      // width: configInfo.width,
      fontSize: configInfo.fontSize + 'px',
    }"
  >
    <thead>
      <tr v-if="configInfo.columns">
        <th
          v-for="(column, index) in configInfo.columns"
          :key="index"
          :align="configInfo.headerAlign"
          :height="configInfo.rowHeight"
          :style="{
            width: column.width ? column.width + 'px' : '',
            color: column.headerColor || configInfo.headerColor,
            background: column.headerBackground || configInfo.headerBackground,
            borderColor: configInfo.headerBorderColor,
          }"
        >
          {{ column.label }}
        </th>
      </tr>
    </thead>
    <tr v-for="(item, index) in configInfo.data" :key="index">
      <td
        v-for="(column, ind) in configInfo.columns"
        :key="ind"
        :align="column.align"
        :height="configInfo.rowHeight + 'px'"
        :style="{
          color: column.color || configInfo.color,
          borderColor: configInfo.borderColor,
          background: column.background || configInfo.background,
        }"
      >
        {{ item[column.prop] }}
      </td>
    </tr>
  </table>
</template>

<script setup lang='ts'>
import { reactive, ref, getCurrentInstance, watch } from "vue";
const { proxy } = getCurrentInstance() as any;

interface Props {
  config?: any;
}
const props = withDefaults(defineProps<Props>(), {
  config: () => {},
});

let configInfo: any = ref({});

//watch
watch(
  () => props.config,
  (val) => {
    configInfo.value = val?.data;
  },
  { deep: true, immediate: true }
);

// let tableOptions: any = ref({
//   width: "600px",
//   rowHeight: "50px",
//   fontSize: "12px",
//   headerAlign: "center",
//   headerBorderColor: "#000",
//   headerBackground: "#eeeeee",
//   borderColor: "#000",
// });

// let columns: any = ref([
//   {
//     label: "车间",
//     prop: "code1",
//     align: "center",
//     headerBackground: "#cccccc",
//     background: "#eeeeee",
//   },
//   {
//     label: "产量",
//     prop: "code2",
//     width: 200,
//     align: "center",
//   },
//   {
//     label: "电量",
//     prop: "code3",
//     align: "center",
//   },
//   {
//     label: "单耗",
//     prop: "code4",
//     align: "center",
//   },
// ]);

// let data = ref([
//   {
//     code1: "11",
//     code2: "22",
//     code3: "11",
//     code4: "11",
//   },
// ]);
</script>

<style lang="scss" scoped>
table {
  width: 100%;
  border-collapse: collapse;
}
</style>