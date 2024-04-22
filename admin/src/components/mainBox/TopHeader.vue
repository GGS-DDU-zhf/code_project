<template>
  <div class="container">
    <el-header>
      <div class="left">
        <el-icon @click="hanleCollapsed"><Menu /></el-icon>
        <span>企业门户网站管理系统</span>
      </div>
      <div class="right">
        <span>欢迎 {{ $store.state.userInfo.username }} 回来！</span>
        <el-dropdown>
          <span class="el-dropdown-link">
            <el-icon :size="24"><User /></el-icon>
          </span>
          <template #dropdown>
            <el-dropdown-menu>
              <el-dropdown-item @click="handleCenter">个人中心</el-dropdown-item>
              <el-dropdown-item @click="handleLogout">退出</el-dropdown-item>
            </el-dropdown-menu>
          </template>
        </el-dropdown>
      </div>
    </el-header>
  </div>
</template>

<script setup>
import { Menu, User } from "@element-plus/icons-vue";
import { useStore } from "vuex";
import { useRouter } from 'vue-router';

const store = useStore();
const router = useRouter()

const hanleCollapsed = () => {
  const currentCollapsed = store.state.isCollapsed;
  store.commit("changeCollapsed");
};

const handleCenter = () => {
    router.push('/center')
}

const handleLogout = () => {
    localStorage.removeItem("token")
    store.commit("clearUserInfo");
    router.push('/login')
}
</script>

<style scoped>
.container {
  .el-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    width: 100%;
    height: 60px;
    color: white;
    background-color: #2d3a4b;
    .left,
    .right {
      display: flex;
      align-items: center;
      span {
        margin-left: 10px;
      }
    }
    i {
        cursor: pointer;
    }
  }
}
</style>
