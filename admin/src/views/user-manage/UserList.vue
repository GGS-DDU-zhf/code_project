<template>
  <div>
    <el-page-header content="用户列表" icon="" title="用户管理" />

    <el-table :data="tableData" style="width: 100%">
      <el-table-column prop="username" label="用户名" />

      <el-table-column label="头像">
        <template #default="scope">
          <div v-if="scope.row.avatar">
            <el-avatar
              :size="50"
              :src="'http://localhost:3000' + scope.row.avatar"
            />
          </div>
          <div v-else>
            <el-avatar
              :size="50"
              src="https://cube.elemecdn.com/3/7c/3ea6beec64369c2642b92c6726f1epng.png"
            />
          </div>
        </template>
      </el-table-column>

      <el-table-column prop="role" label="角色">
        <template #default="scope">
          <el-tag v-if="scope.row.role === 1" type="danger">管理员</el-tag>
          <el-tag v-else type="success">编辑</el-tag>
        </template>
      </el-table-column>

      <el-table-column label="操作">
        <template #default="scope">
          <el-button size="small" @click="handleEdit(scope.row)">
            编辑
          </el-button>
          <el-popconfirm
            title="你确定要删除吗？"
            confirm-button-text="确定"
            cancel-button-text="再想想"
            @confirm="handleDelete(scope.row)"
          >
            <template #reference>
              <el-button size="small" type="danger"> 删除 </el-button>
            </template>
          </el-popconfirm>
        </template>
      </el-table-column>
    </el-table>

    <el-dialog v-model="dialogVisible" title="编辑用户" width="500px">
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
          <el-input :rows="2" type="textarea" v-model="userForm.introduction" />
        </el-form-item>
      </el-form>

      <template #footer>
        <div class="dialog-footer">
          <el-button @click="dialogVisible = false">取消</el-button>
          <el-button type="primary" @click="handleEditConfirm()">
            确认
          </el-button>
        </div>
      </template>
    </el-dialog>
  </div>
</template>

<script setup>
import { ref, reactive, onMounted } from "vue";
import axios from "axios";
import { ElMessage } from "element-plus";

const tableData = ref([]);
const dialogVisible = ref(false);
const userFormRef = ref();
let userForm = reactive({
  username: "",
  password: "",
  role: 2, // 1 管理员 2 编辑
  introduction: "",
});

const options = [
  { label: "管理员", value: 1 },
  { label: "编辑", value: 2 },
];

const userFormRules = reactive({
  username: [{ required: true, message: "请输入名字", trigger: "blur" }],
  password: [{ required: true, message: "请输入密码", trigger: "blur" }],
  role: [{ required: true, message: "请选择权限", trigger: "blur" }],
  introduction: [{ required: true, message: "请输入简介", trigger: "blur" }],
});

onMounted(() => {
  getTableData();
});

const getTableData = async () => {
  const res = await axios.get("/adminapi/user/list");

  tableData.value = res.data.data;
};

const handleEdit = async (data) => {
  const res = await axios.get(`/adminapi/user/list/${data._id}`);

/**
 * 使用reactive初始化的响应式数据，如果想要实现响应式更新，要使用Object.assign。
 *  直接赋值的话，只是用一个普通数据将响应式对象给覆盖了。
 * 使用ref初始化的响应式数据，如果想要实现响应式更新，要赋值给 ref后的 .value
 * */ 
  Object.assign(userForm, res.data.data[0])
  dialogVisible.value = true;
};

const handleDelete = async ({ _id }) => {
  await axios.delete(`/adminapi/user/delete/${_id}`);
  ElMessage({
    message: "删除成功！",
    type: "success",
  });
  getTableData();
};

const handleEditConfirm = () => {
    userFormRef.value.validate(async valid => {
        if (valid) {
            await axios.put(`/adminapi/user/list/${userForm._id}`, userForm);
            
            ElMessage({
                message: "更新成功！",
                type: "success",
            });
            dialogVisible.value = false;
            getTableData();
        }
    })
}
</script>

<style scoped>
.el-table {
  margin-top: 50px;
}
</style>
