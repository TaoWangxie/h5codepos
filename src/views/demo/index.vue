<template>
  <div class="Table_box">
    <Table :config="config"></Table>
  </div>
</template>
<script setup lang='ts'>
import _ from "lodash";
import { ref, getCurrentInstance, watch, computed, VueElement } from "vue";

const config = ref({
  data: {
    width: "600px",
    rowHeight: "50px",
    fontSize: "12px",
    headerAlign: "center",
    headerBorderColor: "#000",
    headerBackground: "#eeeeee",
    borderColor: "#000",
    columns: [
      {
        label: "车间",
        prop: "code1",
        align: "center",
        headerBackground: "#cccccc",
        background: "#eeeeee",
      },
      {
        label: "产量",
        prop: "code2",
        width: 200,
        align: "center",
      },
      {
        label: "电量",
        prop: "code3",
        align: "center",
      },
      {
        label: "单耗",
        prop: "code4",
        align: "center",
      },
    ],
    data: [
      {
        code1: "11",
        code2: "22",
        code3: "11",
        code4: "11",
      },
    ],
  },
});
</script>
<style lang="scss" scoped>
* {
  margin: 0;
  padding: 0;
}

.container {
  width: 100%;
  height: 100vh;
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
}
</style>
