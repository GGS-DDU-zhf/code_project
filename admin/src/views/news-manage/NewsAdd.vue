<template>
    <div>
        <el-page-header content="创建新闻" icon="" title="新闻管理" />

        <el-form
            ref="newsFormRef"
            :model="newsForm"
            :rules="newsFormRules"
            label-width="80px"
            class="demo-ruleForm"
            status-icon
          >
            <el-form-item label="标题" prop="title">
              <el-input v-model="newsForm.title" />
            </el-form-item>
            
            <el-form-item label="内容" prop="content">
              <editor @event='handleRichEditorChange' />
            </el-form-item>

            <el-form-item label="类别" prop="category">
              <el-select
                v-model="newsForm.category"
                placeholder="请选择分类"
                style="width: 100%"
              >
                <el-option
                  v-for="item in options"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value"
                />
              </el-select>
            </el-form-item>
            
            <el-form-item label="封面" prop="cover">
              <Upload :avatar="newsForm.cover" @avatarChange='handleCoverChange' />
            </el-form-item>
            
            <el-form-item>
              <el-button type="primary" @click="submitForm()">添加新闻</el-button>
            </el-form-item>
        </el-form>
    </div>
</template>

<script setup>
import { ref, reactive } from 'vue'
import axios from 'axios';
import { useRouter } from 'vue-router';
import { ElMessage } from "element-plus";
import editor from '@/components/editor/Editor'
import upload from "@/util/upload";
import Upload from '@/components/upload/Upload';

const router = useRouter();
const newsFormRef = ref()
const newsForm = reactive({
    title: '',
    content: '',
    category: 1, // 1 最新动态 2 典型案例 3 通知公告
    cover: '',
    file: null,
    isPublish: 0, // 0 未发布 1 已发布
})

const options = [
  { label: "最新动态", value: 1 },
  { label: "典型案例", value: 2 },
  { label: "通知公告", value: 3 },
];

const newsFormRules = reactive({
    title: [{ required: true, message: '请输入标题', trigger: 'blur' }],
    content: [{ required: true, message: '请输入内容', trigger: 'blur' }],
    category: [{ required: true, message: '请选择分类', trigger: 'blur' }],
    cover: [{ required: true, message: '请上传封面', trigger: 'blur' }],
})

// 每次editor内内容改变时触发
const handleRichEditorChange = val => {
    newsForm.content = val
}

const handleCoverChange = (file) => {
  newsForm.cover = URL.createObjectURL(file); // 前端本地页面展示用
  newsForm.file = file; // 提交给后端用
};

const submitForm = () => {
    newsFormRef.value.validate(async valid => {
        if (valid) {
            const res = await upload('/adminapi/news/add', newsForm)

            if (res.ActionType === "OK") {
                ElMessage({
                message: "添加成功！",
                type: "success",
                });
                router.push('/news-manage/list')
            }
        }
    })
}

</script>

<style scoped>
.el-form {
    margin-top: 50px;
}
</style>