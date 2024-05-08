<template>
  <el-row>
    <el-col :span="17" :offset="1">
      <div>
        <h2>{{ currentNews.title }}</h2>
        <div class="time">{{ formatTime.getTime(currentNews.editTime) }}</div>
        <el-divider>
          <el-icon><star-filled /></el-icon>
        </el-divider>
        <div v-html="currentNews.content" class="htmlContent"></div>
      </div>
    </el-col>
    <el-col :span="4" :offset="1" :pull="1">
      <el-card style="max-width: 480px">
        <template #header>
          <div class="card-header">
            <span style="font-size: 16px; font-weight: bold">最近新闻</span>
          </div>
        </template>
        <div
          v-for="item in topNewsList"
          :key="item._id"
          style="padding: 14px;"
          @click="handleChange(item._id)"
        >
          <span>{{ item.title }}</span>
          <div class="bottom">
            <time class="tab-time">{{
              formatTime.getTime(item.editTime)
            }}</time>
          </div>
        </div>
      </el-card>
    </el-col>
  </el-row>
</template>

<script setup>
import { ref, onMounted, watchEffect, onBeforeUnmount } from "vue";
import axios from "axios";
import { useRoute, useRouter } from "vue-router";
import { StarFilled } from "@element-plus/icons-vue";
import formatTime from "@/util/formatTime";

const route = useRoute();
const router = useRouter();
const currentNews = ref({});
const topNewsList = ref([]);

watchEffect(async () => {
  if (!route.params.id) return;

  const res1 = await axios.get(`/webapi/news/list/${route.params.id}`);
  const res2 = await axios.get(`/webapi/news/toplist?limit=4`);

  currentNews.value = res1.data.data[0];
  topNewsList.value = res2.data.data;
});

onBeforeUnmount(() => {
  console.log("onBeforeUnmount");
  stop()
})

const handleChange = id => {
  router.push(`/new/${id}`)
}
</script>

<style lang="scss" scoped>
.el-row {
  margin-top: 30px;
}
.time {
  font-size: 13px;
  color: #999;
}
.tab-time {
  font-size: 10px;
  color: #999;
}
</style>
