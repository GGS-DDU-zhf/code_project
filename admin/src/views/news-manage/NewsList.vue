<template>
  <div>
    <el-card>
      <el-page-header content="新闻列表" icon="" title="新闻管理" />

      <el-table :data="tableData" style="width: 100%">
        <el-table-column prop="title" label="标题" />

        <el-table-column prop="category" label="分类">
          <template #default="scope">
            {{ categoryArr[scope.row.category] }}
          </template>
        </el-table-column>

        <el-table-column prop="editTime" label="更新时间">
          <template #default="scope">
            {{ formatTime.getTime(scope.row.editTime) }}
          </template>
        </el-table-column>

        <el-table-column prop="isPublish" label="是否发布">
          <template #default="scope">
            <el-switch
              v-model="scope.row.isPublish"
              :active-value="1"
              :inactive-value="0"
              @change='handleSwitchChange(scope.row)'
            />
          </template>
        </el-table-column>

        <el-table-column label="操作">
          <template #default="scope">
            <el-button circle :icon="View" type="success" size="small" @click="handlePreview(scope.row)" />
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

    <el-dialog v-model="dialogVisible" title="预览新闻" width="500px">
        <div>
            <h2>{{ previewData.title }}</h2>
            <div style='font-size: 12px; color: gray;'>{{ formatTime.getTime(previewData.editTime) }}</div>
            <el-divider>
                <el-icon><StarFilled /></el-icon>
            </el-divider>
        </div>
        <div v-html="previewData.content" class="htmlContent"></div>
    </el-dialog>
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";
import axios from "axios";
import { useRouter } from "vue-router";
import { ElMessage } from "element-plus";
import { View, Edit, Delete, StarFilled } from '@element-plus/icons-vue'
import formatTime from "@/util/formatTime";

const categoryArr = ["", "最新动态", "典型案例", "通知公告"];
const publish = { 1: 0, 0: 1 }
const router = useRouter();
const tableData = ref([]);
const previewData = ref({});
const dialogVisible = ref(false);

onMounted(() => {
  getTableData();
});

const getTableData = async () => {
  const res = await axios.get("/adminapi/news/list");

  tableData.value = res.data.data;
};

const handleSwitchChange = async item => {
    await axios.put("/adminapi/news/publish", {
        _id: item._id,
        isPublish: item.isPublish
    }).then(() => {
        getTableData();
    })
}

const handlePreview = data => {
    previewData.value = data;
    dialogVisible.value = true;
}

const handleEdit = data => {
  // 跳转到 /news-manage/edit/:id
  router.push(`/news-manage/edit/${data._id}`)
}

const handleDelete = async ({ _id }) => {
  await axios.delete(`/adminapi/news/delete/${_id}`);
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
</style>
