<template>
    <div>
        <el-page-header content="添加用户" icon="" title="用户管理" />

        <el-form
            ref="userFormRef"
            :model="userForm"
            :rules="userFormRules"
            label-width="80px"
            class="demo-ruleForm"
            status-icon
          >
            <el-form-item label="用户名" prop="username">
              <el-input v-model="userForm.username" />
            </el-form-item>
            <el-form-item label="密码" prop="password">
              <el-input v-model="userForm.password" type="password" />
            </el-form-item>
            <el-form-item label="角色" prop="role">
              <el-select
                v-model="userForm.role"
                placeholder="请选择权限"
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
            <el-form-item label="个人简介" prop="introduction">
              <el-input
                :rows="2"
                type="textarea"
                v-model="userForm.introduction"
              />
            </el-form-item>
            <el-form-item label="头像" prop="avatar">
              <Upload :avatar="userForm.avatar" @avatarChange='handleChange' />
            </el-form-item>
            <el-form-item>
              <el-button type="primary" @click="submitForm()">添加用户</el-button>
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
const userFormRef = ref()
const userForm = reactive({
    username: '',
    password: '',
    role: 2, // 1 管理员 2 编辑
    introduction: '',
    avatar: '',
    file: null,
    gender: 0
})

const options = [
  { label: "管理员", value: 1 },
  { label: "编辑", value: 2 },
];

const userFormRules = reactive({
  username: [{ required: true, message: "请输入名字", trigger: "blur" }],
  password: [{ required: true, message: "请输入密码", trigger: "blur" }],
  role: [{ required: true, message: "请选择权限", trigger: "blur" }],
  introduction: [{ required: true, message: "请输入简介", trigger: "blur" }],
  avatar: [{ required: true, message: "请上传头像", trigger: "blur" }],
})

const handleChange = (file) => {
  userForm.avatar = URL.createObjectURL(file); // 前端本地页面展示用
  userForm.file = file; // 提交给后端用
};

const submitForm = () => {
  userFormRef.value.validate(async (valid) => {
    if (valid) {
      const res = await upload("/adminapi/user/add", userForm);

      if (res.ActionType === "OK") {
        ElMessage({
          message: "添加成功！",
          type: "success",
        });
        router.push('/user-manage/list')
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