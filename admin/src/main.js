// 学习视频地址 https://www.bilibili.com/video/BV1Nw411x77m/?p=3&spm_id_from=pageDriver&vd_source=0cf98087bbb988fb3bb958be12a290fe

import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import ElementPlus from "element-plus";
import "element-plus/dist/index.css";
import Particles from "particles.vue3";
import '@/util/axios.config'

createApp(App)
  .use(Particles)
  .use(ElementPlus)
  .use(store)
  .use(router)
  .mount("#app");
