<template>
  <div class="container">
    <Left :list="gridTags"></Left>
    <CenterWrapper></CenterWrapper>
    <Right></Right>
  </div>
</template>

<script setup lang='ts'>
import { ref, getCurrentInstance } from "vue";
import Left from "./leftConfig/index.vue";
import Right from "./rightConfig/index.vue";
import CenterWrapper from "@/views/editor/center/index.vue";
import { gridTags } from "@/static/gridTags";
const { proxy } = getCurrentInstance() as any;
</script>

<style lang="scss" scoped>
.container {
  width: 100%;
  height: 100vh;
  display: flex;
  overflow-x: hidden;
}
</style>
