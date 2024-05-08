<template>
    <div>
        <el-page-header content="添加产品" icon="" title="产品管理" />

        <el-form
            ref="productFormRef"
            :model="productForm"
            :rules="productFormRules"
            label-width="110px"
            class="demo-ruleForm"
            status-icon
          >
            <el-form-item label="产品名称" prop="title">
              <el-input v-model="productForm.title" />
            </el-form-item>
            <el-form-item label="产品简要描述" prop="introduction">
              <el-input
                :rows="2"
                type="textarea"
                v-model="productForm.introduction"
              />
            </el-form-item>
            <el-form-item label="产品详细描述" prop="detail">
              <el-input
                :rows="2"
                type="textarea"
                v-model="productForm.detail"
              />
            </el-form-item>
            <el-form-item label="产品图片" prop="cover">
              <Upload :avatar="productForm.cover" @avatarChange='handleChange' />
            </el-form-item>
            <el-form-item>
              <el-button type="primary" @click="submitForm()">添加产品</el-button>
            </el-form-item>
        </el-form>
    </div>
</template>

<script setup>
import axios from "axios";
import { ref, reactive } from 'vue'
import { useRouter } from 'vue-router'
import { ElMessage } from "element-plus";
import upload from "@/util/upload";
import Upload from '@/components/upload/Upload';

const router = useRouter()
const productFormRef = ref()
const productForm = reactive({
    title: '',
    introduction: '',
    detail: '',
    cover: '',
    file: null
})
const productFormRules = reactive({
  title: [{ required: true, message: "请输入产品名称", trigger: "blur" }],
  introduction: [{ required: true, message: "请输入产品简要描述", trigger: "blur" }],
  detail: [{ required: true, message: "请输入产品详细描述", trigger: "blur" }],
  cover: [{ required: true, message: "请上传产品图片", trigger: "blur" }],
})

const handleChange = (file) => {
  productForm.cover = URL.createObjectURL(file); // 前端本地页面展示用
  productForm.file = file; // 提交给后端用
};

const submitForm = () => {
  productFormRef.value.validate(async (valid) => {
    if (valid) {
      const res = await upload("/adminapi/product/add", productForm);

      if (res.ActionType === "OK") {
        ElMessage({
          message: "添加成功！",
          type: "success",
        });
        router.push('/product-manage/list')
      }
    }
  });
};
</script>

<style scoped>
.demo-ruleForm {
    margin-top: 50px;
}
</style>