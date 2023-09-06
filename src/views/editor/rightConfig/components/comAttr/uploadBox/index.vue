<template>
    <div class="upload_box">
        <div class="upload" @click="handleUpload">
            <el-icon :size="20">
                <Plus/>
            </el-icon>
        </div>
        <input ref="selectImg" class="file-input" style="display: none" type="file" @change="setImg($event)" />
        <div class="img_box" :style="{height:src ? '120px' : '30px'}">
            <img v-if="src" :src="src" alt=""/>
            <span v-else>暂无数据</span>
        </div>
        <div v-if="src" class="close">
            <el-icon :size="18">
                <Delete/>
            </el-icon>
        </div>
    </div>
</template>

<script setup lang='ts'>
import { reactive, ref, getCurrentInstance, watch } from "vue";
import { Plus, Delete } from '@element-plus/icons-vue'
const { proxy } = getCurrentInstance() as any

let src =ref(null)

interface Props {
    url:any,
}
const props = withDefaults(defineProps<Props>(), {
    url:'',
})

//watch
watch(()=> props.url,(val)=>{
    src.value = val
},{deep:true,immediate:true})

//上传
let selectImg:any = ref(null)
const handleUpload =()=>{
    selectImg.value.click()
}

// 选取文件
const getFile = (event:any)=> {
    let file = event.target.files[0];
    let URL = window.URL || window.webkitURL;
    let downloadUrl:any = URL.createObjectURL(file);
    return downloadUrl
    // downloadUrl && URL.revokeObjectURL(downloadUrl);
}

const setImg =(event:any)=>{
    let url = getFile(event)
    src.value = url
    proxy.$emit('getSrc',url)
}

</script>

<style lang="scss" scoped>

.upload_box{
    display: flex;
    align-items: center;
    width: 100%;
    .upload{
        display: flex;
        width: 30px;
        height: 100%;
        margin-right: 10px;
        &:hover{
            cursor: pointer;
            color: #409EFF;
        }
    }
    .img_box{
        display: flex;
        align-items: center;
        justify-content: center;
        width: 100%;
        border: 1px dashed #D4D7DE;
        font-size: 13px;
        color: #909399;
        img{
            display: block;
            max-width: 100%;
            max-height: 100%;
        }
    }
    .close{
        width: 20px;
        margin-left: 10px;
        color: #F56C6C;
        &:hover{
            cursor: pointer;
            color: #409EFF;
        }
    }
}

</style>
