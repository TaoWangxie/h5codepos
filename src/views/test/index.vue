<template>
  <div class="container">
    <iframe
      width="400"
      height="400"
      src="http://10.30.64.36:3002/nuwa/demo"
      frameborder="0"
    ></iframe>
  </div>
</template>
<script setup lang='ts'>
import _ from "lodash";
import { ref } from "vue";
</script>
  <style lang="scss" scoped>
.container {
  width: 100%;
  height: 100vh;
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
}
</style>
    