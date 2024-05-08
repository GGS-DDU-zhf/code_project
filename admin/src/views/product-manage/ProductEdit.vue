<template>
  <div>
    <el-page-header content="编辑产品" @back="handleBack" title="产品管理" />

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
        <el-input :rows="2" type="textarea" v-model="productForm.detail" />
      </el-form-item>
      <el-form-item label="产品图片" prop="cover">
        <Upload :avatar="productForm.cover" @avatarChange="handleCoverChange" />
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="submitForm()">编辑产品</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script setup>
import { ref, reactive, onMounted } from "vue";
import axios from "axios";
import { useRouter, useRoute } from "vue-router";
import { ElMessage } from "element-plus";
import editor from "@/components/editor/Editor";
import upload from "@/util/upload";
import Upload from "@/components/upload/Upload";

const router = useRouter(); // 整个路由信息
const route = useRoute(); // 当前路由信息
const productFormRef = ref();
const productForm = reactive({
  title: "",
  content: "",
  category: 1, // 1 最新动态 2 典型案例 3 通知公告
  cover: "",
  file: null,
  isPublish: 0, // 0 未发布 1 已发布
});

const options = [
  { label: "最新动态", value: 1 },
  { label: "典型案例", value: 2 },
  { label: "通知公告", value: 3 },
];

const productFormRules = reactive({
  title: [{ required: true, message: "请输入标题", trigger: "blur" }],
  content: [{ required: true, message: "请输入内容", trigger: "blur" }],
  category: [{ required: true, message: "请选择分类", trigger: "blur" }],
  cover: [{ required: true, message: "请上传封面", trigger: "blur" }],
});

onMounted(async () => {
  const id = route.params.id;
  const res = await axios.get(`/adminapi/product/list/${id}`);

  Object.assign(productForm, res.data.data[0]);
});

const handleCoverChange = (file) => {
  productForm.cover = URL.createObjectURL(file); // 前端本地页面展示用
  productForm.file = file; // 提交给后端用
};

const submitForm = () => {
  productFormRef.value.validate(async (valid) => {
    if (valid) {
      const res = await upload("/adminapi/product/list", productForm);

      if (res.ActionType === "OK") {
        ElMessage({
          message: "添加成功！",
          type: "success",
        });
        router.back();
      }
    }
  });
};

const handleBack = () => {
  router.back();
};
</script>

<style scoped>
.el-form {
  margin-top: 50px;
}
</style>
