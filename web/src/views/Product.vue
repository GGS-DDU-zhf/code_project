<template>
  <div>
    <el-carousel
      v-if="loopList.length"
      height="calc(100vh - 59px)"
      direction="vertical"
      :autoplay="false"
    >
      <el-carousel-item v-for="item in loopList" :key="item._id">
        <div
          class="item"
          :style="{
            backgroundImage: `url(http://localhost:3000${item.cover})`,
          }"
        >
          <el-card style="max-width: 480px">
            <template #header>
              <div class="card-header">
                <span>{{ item.title }}</span>
              </div>
            </template>
            <div>{{ item.introduction }}</div>
            <div class='detail'>{{ item.detail }}</div>
            <div class="more">
                更多信息请访问
                <br>
                http://localhost:3000
            </div>
          </el-card>
        </div>
      </el-carousel-item>
    </el-carousel>
    <el-empty v-else description="暂无产品" />
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";
import axios from "axios";

const loopList = ref([]);

onMounted(async () => {
  const res = await axios.get("/webapi/product/list");

  loopList.value = res.data.data;
});
</script>

<style lang="scss" scoped>
.item {
  width: 100%;
  height: 100%;
  background-size: cover;
}
.el-card {
    width: 50%;
    height: 100%;
    background-color: rgba(255, 255, 255, 0.7);
}
.detail, .more {
    margin-top: 20px;
}
</style>
