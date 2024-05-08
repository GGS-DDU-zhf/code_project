<template>
  <div class="container">
    <div
      class="news-header"
      :style="{ backgroundImage: `url(${require('@/assets/2.jpg')})` }"
    ></div>

    <div class="search">
      <el-popover :visible="visible" placement="bottom" width="50%">
        <template #reference>
          <el-input
            type="search"
            v-model="searchText"
            style="width: 240px"
            placeholder="请输入新闻关键字"
            :prefix-icon="Search"
            size="large"
            @input="visible = true"
            @blur="visible = false"
          />
        </template>
        <div v-if="searchNewsList.length">
          <div
            v-for="item in searchNewsList"
            :key="item._id"
            class="searchItem"
            @click='handleChangePage(item._id)'
          >
            {{ item.title }}
          </div>
        </div>
        <div v-else>
          <el-empty description="暂无新闻" :image-size="50" />
        </div>
      </el-popover>
    </div>

    <div class="topNews">
      <el-row :gutter="20">
        <el-col v-for="item in topNewsList" :key="item._id" :span="6" @click='handleChangePage(item._id)'>
          <el-card shadow="hover" :body-style="{ padding: '0px' }">
            <div
              class="images"
              :style="{
                backgroundImage: `url(http://localhost:3000${item.cover})`,
              }"
            />
            <div style="padding: 14px">
              <span>{{ item.title }}</span>
              <div class="bottom">
                <time class="time">{{
                  formatTime.getTime(item.editTime)
                }}</time>
              </div>
            </div>
          </el-card>
        </el-col>
      </el-row>
    </div>

    <el-tabs style="margin: 20px" v-model="whichTab" class="demo-tabs">
      <el-tab-pane
        v-for="item in tabList"
        :key="item.name"
        :label="item.label"
        :name="item.name"
      >
        <el-row :gutter="20">
          <el-col :span="18">
            <div
              style="padding: 10px"
              v-for="data in tabNews[item.name]"
              :key="data._id"
              @click='handleChangePage(data._id)'
            >
              <el-card shadow="hover" :body-style="{ padding: '0px' }">
                <div
                  class="tab-images"
                  :style="{
                    backgroundImage: `url(http://localhost:3000${data.cover})`,
                  }"
                />
                <div style="padding: 14px; float: left">
                  <span>{{ data.title }}</span>
                  <div class="bottom">
                    <time class="tab-time">{{
                      formatTime.getTime(data.editTime)
                    }}</time>
                  </div>
                </div>
              </el-card>
            </div>
          </el-col>
          <el-col :span="6">
            <el-timeline style="max-width: 600px">
              <el-timeline-item
                v-for="data in tabNews[item.name]"
                :key="data._id"
                :timestamp="formatTime.getTime(data.editTime)"
              >
                {{ data.title }}
              </el-timeline-item>
            </el-timeline>
          </el-col>
        </el-row>
      </el-tab-pane>
    </el-tabs>

    <el-backtop :right="100" :bottom="100" />
  </div>
</template>

<script setup>
import axios from "axios";
import { ref, onMounted, computed } from "vue";
import { useRouter } from "vue-router";
import _ from "lodash";
import { Search } from "@element-plus/icons-vue";
import formatTime from "@/util/formatTime";

const router = useRouter();
const searchText = ref("");
const visible = ref(false);
const newsList = ref([]);
const whichTab = ref(1);

const tabList = [
  { label: "最新动态", name: 1 },
  { label: "典型案例", name: 2 },
  { label: "通知公告", name: 3 },
];

onMounted(async () => {
  const res = await axios.get("/webapi/news/list");

  newsList.value = res.data.data;
});

const searchNewsList = computed(() =>
  searchText.value
    ? newsList.value.filter((item) => item.title.includes(searchText.value))
    : []
);

const topNewsList = computed(() => newsList.value.slice(0, 4));

const tabNews = computed(() =>
  _.groupBy(newsList.value, (item) => item.category)
);

const handleChangePage = id => {
  router.push(`/new/${id}`)
}
</script>

<style lang="scss" scoped>
.container {
  position: relative;
}
.news-header {
  width: 100%;
  height: 400px;
  background-size: cover;
}
.search {
  position: absolute;
  top: 300px;
  width: 100%;
  text-align: center;
  .el-input {
    width: 50% !important;
  }
}
.searchItem {
  height: 50px;
  line-height: 50px;
  &:hover {
    color: red;
    background: whitesmoke;
  }
}
.topNews {
  margin: 20px;
  .images {
    width: 100%;
    height: 150px;
    background-size: cover;
  }
  .time {
    font-size: 12px;
    color: #999;
  }
}
.tab-images {
  width: 150px;
  height: 100px;
  background-size: cover;
  float: left;
}
.tab-time {
  font-size: 10px;
  color: #999;
}
</style>
