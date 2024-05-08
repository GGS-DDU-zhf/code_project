<template>
  <div class="container">
    <el-carousel height="calc(100vh - 59px)">
      <el-carousel-item :key="1">
        <div :style="{ backgroundImage: `url(${require('@/assets/1.jpeg')})` }" />
      </el-carousel-item>
      <el-carousel-item :key="2">
        <div :style="{ backgroundImage: `url(${require('@/assets/2.jpg')})` }" />
      </el-carousel-item>
      <el-carousel-item :key="3">
        <div :style="{ backgroundImage: `url(${require('@/assets/3.jpeg')})` }" />
      </el-carousel-item>
    </el-carousel>

    <div class="center">互联网+时代</div>
  </div>
</template>

<script setup></script>

<style lang="scss" scoped>
.el-carousel div {
    width: 100%;
    height: 100%;
    background-size: cover;
}
.constainer {
    position: relative;
}
.center {
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
    height: 100px;
    line-height: 100px;
    font-size: 60px;
    color: #fff;
    text-align: center;
}
</style>
