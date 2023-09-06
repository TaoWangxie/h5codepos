<template>
  <div class="container pos_r" :style="{ width: canvasW, height: canvasH }">
    <ComPart
      :domConfig="pageDoms"
      :config="pageConfig"
      :data="pageData"
    ></ComPart>
  </div>
</template>
<script setup lang='ts'>
import _ from "lodash";
import { ref, onMounted } from "vue";
import ComPart from "@/views/editor/previewPage/components/comPart/index.vue";
import { getSessionStorage } from "@/utils/index";
import { useState } from "@/hooks/useState";
import { useStore } from "vuex";
const { scale, canvasW, canvasH } = useState("editor", [
  "scale",
  "canvasW",
  "canvasH",
]);
const store = useStore();

let pageDoms = ref([]);
let pageConfig = ref({});
let pageData = ref({});

onMounted(() => {
  let config = getSessionStorage("pageConfig");
  pageDoms.value = config?.pageDoms;
  pageConfig.value = config?.pageConfig;
  pageData.value = config?.pageData;
});

// let domConfig:any = ref([
//         {
//             "code": "3hwwqplopc8000",
//             "type": "Rectangle",
//             "style": {
//                 "width": 300,
//                 "height": 200,
//                 "top": 0,
//                 "left": 0,
//                 "rotate": 0
//             },
//             "children": [
//                 {
//                     "code": "51efbnersz8000",
//                     "type": "ImgBox",
//                     "style": {
//                         "width": 101,
//                         "height": 98,
//                         "top": 50,
//                         "left": 142,
//                         "rotate": 0
//                     }
//                 }
//             ]
//         },
//         {
//             "code": "3tq0q8bdkw0000",
//             "type": "Rectangle",
//             "style": {
//                 "width": 300,
//                 "height": 205,
//                 "top": 200,
//                 "left": 0,
//                 "rotate": 0
//             }
//         }
//     ])

// let config = ref({
//     "3hwwqplopc8000": {
//         "data": {
//             "bgcSrc": "",
//             "background": "",
//             "opacity": 1,
//             "borderWidth": 0,
//             "borderStyle": "solid",
//             "borderRadius": 0,
//             "borderColor": "#000000",
//             "backgroundRepeat": "no-repeat",
//             "backgroundSize": "100% 100%",
//             "backgroundPositionX": "left",
//             "backgroundPositionY": "top"
//         }
//     },
//     "3tq0q8bdkw0000": {
//         "data": {
//             "bgcSrc": "",
//             "background": "",
//             "opacity": 1,
//             "borderWidth": 0,
//             "borderStyle": "solid",
//             "borderRadius": 0,
//             "borderColor": "#000000",
//             "backgroundRepeat": "no-repeat",
//             "backgroundSize": "100% 100%",
//             "backgroundPositionX": "left",
//             "backgroundPositionY": "top"
//         }
//     },
//     "51efbnersz8000": {
//         "data": {
//             "src": "https://element-plus.gitee.io/images/figure-1.png"
//         }
//     }
// })

// let data = ref({
//     "3hwwqplopc8000": {
//         "data": {
//             "bgcSrc": "https://fuss10.elemecdn.com/a/3f/3302e58f9a181d2509f3dc0fa68b0jpeg.jpeg"
//         }
//     },
//     "3tq0q8bdkw0000": {
//         "data": {
//             "bgcSrc": "https://fuss10.elemecdn.com/9/bb/e27858e973f5d7d3904835f46abbdjpeg.jpeg"
//         }
//     },
//     "51efbnersz8000": {
//         "data": {
//             "src": ""
//         }
//     }
// })
</script>
<style lang="scss" scoped>
.pos_r {
  position: relative;
}
.pos_a {
  position: absolute;
}
</style>
<style>
</style>