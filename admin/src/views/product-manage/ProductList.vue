<template>
  <div>
    <el-card>
      <el-page-header content="产品列表" icon="" title="产品管理" />

      <el-table :data="tableData" style="width: 100%">
        <el-table-column prop="title" label="产品名称" />

        <el-table-column prop="introduction" label="产品描述">
            <template #default="scope">
                <div class="introduction">{{ scope.row.introduction }}</div>
            </template>
        </el-table-column>

        <el-table-column prop="editTime" label="更新时间">
          <template #default="scope">
            {{ formatTime.getTime(scope.row.editTime) }}
          </template>
        </el-table-column>

        <el-table-column label="操作">
          <template #default="scope">
            <el-button circle :icon="Edit" size="small" @click="handleEdit(scope.row)" />
            <el-popconfirm
                title="你确定要删除吗？"
                confirm-button-text="确定"
                cancel-button-text="再想想"
                @confirm="handleDelete(scope.row)"
            >
                <template #reference>
                <el-button circle :icon="Delete" type="danger" size="small" />
                </template>
            </el-popconfirm>
            
          </template>
        </el-table-column>

      </el-table>
    </el-card>
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";
import axios from "axios";
import { useRouter } from "vue-router";
import { ElMessage } from "element-plus";
import { Edit, Delete } from '@element-plus/icons-vue'
import formatTime from "@/util/formatTime";

const categoryArr = ["", "最新动态", "典型案例", "通知公告"];
const router = useRouter();
const tableData = ref([]);

onMounted(() => {
  getTableData();
});

const getTableData = async () => {
  const res = await axios.get("/adminapi/product/list");

  tableData.value = res.data.data;
};

const handleEdit = data => {
  router.push(`/product-manage/edit/${data._id}`)
}

const handleDelete = async ({ _id }) => {
  await axios.delete(`/adminapi/product/delete/${_id}`);

  ElMessage({
    message: "删除成功！",
    type: "success",
  });
  getTableData();
};
</script>

<style scoped>
:deep(.htmlContent img) {
    width: 100%;
}
.el-table {
  margin-top: 50px;
}
.introduction {
    max-width: 300px;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
}
</style>
