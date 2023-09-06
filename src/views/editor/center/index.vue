<template>
    <div class="center_container">
        <div class="nav_box">
            <CenterNav></CenterNav>
        </div>
        <div class="wrapper_box">
            <Wrapper></Wrapper>
        </div>
    </div>
</template>

<script setup lang='ts'>
import { ref, getCurrentInstance, onMounted, onBeforeUnmount } from "vue";
import Wrapper from '@/views/editor/wrapper/index2.vue'
import CenterNav from './components/centerNav/index.vue'
import {
    listenGlobalKeyDown,
    cancelListenGlobalKeyDown,
} from "@/utils/shortcutKey";
const { proxy } = getCurrentInstance() as any


onMounted(()=>{
    listenGlobalKeyDown()
})

onBeforeUnmount(()=>{
    cancelListenGlobalKeyDown()
})

</script>

<style lang="scss" scoped>
.center_container{
    flex: 1;
    height: 100vh;
    .nav_box{
        height: 40px;
    }
    .wrapper_box{
        height: calc(100% - 50px);
        border-bottom: 1px solid #EBEEF5;
    }
}
</style>
