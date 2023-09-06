<template>
  <div class="container">
    <div class="left">
      <QrcodeVue
        :value="qr.logoSrc"
        :size="200"
        level="H"
        :margin="5"
        class="qrCode"
      />
    </div>
  </div>
</template>
  <script setup lang='ts'>
import _ from "lodash";
import QrcodeVue from "qrcode.vue";
import {
  ref,
  getCurrentInstance,
  watch,
  computed,
  VueElement,
  onMounted,
} from "vue";

const qr = ref({
  logoSrc: "https://typescript.bootcss.com/",
  appSrc:
    "http://10.0.0.26:8080/temp.html?channel=jingrui&source=13#/donate/activity-home",
});
</script>
<style lang="scss" scoped>
.container {
  width: 100%;
  height: 100vh;
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  .left {
    height: 100%;
    background-color: #ccc;
    text-align: center;
  }
}
</style>
  