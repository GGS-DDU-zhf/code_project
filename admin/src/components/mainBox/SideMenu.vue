<template>
  <div>
    <el-aside :width="$store.state.isCollapsed ? '64px' : '200px'">
      <el-menu
        class="el-menu-vertical-demo"
        :collapse-transition='false'
        :collapse="$store.state.isCollapsed"
        :router="true"
        :default-active="router.fullPath"
        @open="handleOpen"
        @close="handleClose"
      >
        <el-menu-item index="/index">
          <el-icon><HomeFilled /></el-icon>
          <span>首页</span>
        </el-menu-item>

        <el-menu-item index="/center">
          <el-icon><Avatar /></el-icon>
          <span>个人中心</span>
        </el-menu-item>

        <el-sub-menu index="/user-manage">
          <template #title>
            <el-icon><UserFilled /></el-icon>
            <span>用户管理</span>
          </template>
          <el-menu-item-group>
            <el-menu-item index="/user-manage/add">添加用户</el-menu-item>
            <el-menu-item index="/user-manage/list">用户列表</el-menu-item>
          </el-menu-item-group>
        </el-sub-menu>

        <el-sub-menu index="/news-manage">
          <template #title>
            <el-icon><MessageBox /></el-icon>
            <span>新闻管理</span>
          </template>
          <el-menu-item-group>
            <el-menu-item index="/news-manage/add">添加新闻</el-menu-item>
            <el-menu-item index="/news-manage/list">新闻列表</el-menu-item>
          </el-menu-item-group>
        </el-sub-menu>

        <el-sub-menu index="/product-manage">
          <template #title>
            <el-icon><Reading /></el-icon>
            <span>产品管理</span>
          </template>
          <el-menu-item-group>
            <el-menu-item index="/product-manage/add">添加产品</el-menu-item>
            <el-menu-item index="/product-manage/list">产品列表</el-menu-item>
          </el-menu-item-group>
        </el-sub-menu>

      </el-menu>
    </el-aside>
  </div>
</template>

<script setup>
import {
  HomeFilled,
  Avatar,
  UserFilled,
  MessageBox,
  Reading,
  Pointer
} from "@element-plus/icons-vue";
import { useRoute } from 'vue-router'

const router = useRoute()

const handleOpen = (key, keyPath) => {
  console.log(key, keyPath);
};
const handleClose = (key, keyPath) => {
  console.log(key, keyPath);
};
</script>

<style scoped>
.el-aside {
  height: 100vh;
  transition: width 0.3s;
  .el-menu {
    height: 100vh;
  }
}
</style>
