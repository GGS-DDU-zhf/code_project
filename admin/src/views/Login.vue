<template>
  <div class="container">
    <vue-particles
      id="tsparticles"
      :particlesInit="particlesInit"
      :particlesLoaded="particlesLoaded"
      :options="options"
    />
    <div class="form">
      <h3>企业门户网站管理系统</h3>
      <el-form
        ref="loginFormRef"
        style="max-width: 600px"
        :model="loginForm"
        status-icon
        :rules="rules"
        label-width="auto"
        class="demo-ruleForm"
      >
        <el-form-item label="用户名" prop="username">
          <el-input
            v-model="loginForm.username"
            type="text"
            autocomplete="off"
          />
        </el-form-item>
        <el-form-item label="密码" prop="password">
          <el-input
            v-model="loginForm.password"
            type="password"
            autocomplete="off"
          />
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="submitForm(loginFormRef)"
            >登录</el-button
          >
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script setup>
import { reactive, ref } from "vue";
import { loadSlim } from "tsparticles-slim"; // if you are going to use `loadSlim`, install the "tsparticles-slim" package too.
import { useRouter } from 'vue-router';
import axios from 'axios';
import { ElMessage } from 'element-plus'
import { useStore } from 'vuex'

const options = {
  background: {
    color: {
      value: "#2d3a4b",
    },
  },
  fpsLimit: 120,
  interactivity: {
    events: {
      onClick: {
        enable: true,
        mode: "push",
      },
      onHover: {
        enable: true,
        mode: "repulse",
      },
      resize: true,
    },
    modes: {
      bubble: {
        distance: 400,
        duration: 2,
        opacity: 0.8,
        size: 40,
      },
      push: {
        quantity: 4,
      },
      repulse: {
        distance: 200,
        duration: 0.4,
      },
    },
  },
  particles: {
    color: {
      value: "#ffffff",
    },
    links: {
      color: "#ffffff",
      distance: 150,
      enable: true,
      opacity: 0.5,
      width: 1,
    },
    collisions: {
      enable: true,
    },
    move: {
      direction: "none",
      enable: true,
      outModes: {
        default: "bounce",
      },
      random: false,
      speed: 1,
      straight: false,
    },
    number: {
      density: {
        enable: true,
        area: 800,
      },
      value: 80,
    },
    opacity: {
      value: 0.5,
    },
    shape: {
      type: "circle",
    },
    size: {
      value: { min: 1, max: 5 },
    },
  },
  detectRetina: true,
};

const particlesInit = async (engine) => {
  await loadSlim(engine);
};

const particlesLoaded = async (container) => {};

const loginFormRef = ref();
const router = useRouter();
const store = useStore();

const validatePass = (rule, value, callback) => {
  if (value === "") {
    callback(new Error("请输入用户名"));
  } else {
    callback();
  }
};
const validatePass2 = (rule, value, callback) => {
  if (value === "") {
    callback(new Error("请输入密码"));
  } else {
    callback();
  }
};

const loginForm = reactive({
  username: "",
  password: ""
});

const rules = reactive({
  username: [{ required: true, validator: validatePass, trigger: "blur" }],
  password: [{ required: true, validator: validatePass2, trigger: "blur" }]
});

const submitForm = (formEl) => {
  if (!formEl) return;
  formEl.validate((valid) => {
    if (valid) {
      axios.post('/adminapi/user/login', loginForm).then(res => {
        if (res.data.ActionType === 'OK') {
          ElMessage({
            message: '登录成功！',
            type: 'success',
          })
          store.commit('changeUserInfo', res.data.data)
          /**
           * store.commit('isGetterRouter', false) 
           * 将标记改为路由还未动态设置，防止在admin的权限退出登录并且没有刷新页面的情况下，
           * 再次登录进入非admin账号，导致非admin账号可以直接通过地址栏访问admin的权限页面
           * */ 
          store.commit('changeGetterRouter', false) 
          router.push('/')
        } else {
          ElMessage.error('用户名和密码不匹配')
        }
      })
    } else {
      console.log("error submit!");
      return false;
    }
  });
};
</script>

<style lang='scss' scoped>
.container {
    display: flex;
    justify-content: center;
    align-items: center;
  .form {
    position: fixed;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    width: 500px;
    height: 300px;
    padding: 20px;
    border-radius: 20px;
    background: rgba($color: #000000, $alpha: 0.5);
    h3 {
      color: #ffffff;
      font-size: 30px;
      text-align: center;
      margin-bottom: 20px;
    }
    .el-form {
        height: 100%;
    }
  }
}
:v-deep(.el-form-item__label) {
  color: #ffffff;
}
</style>
