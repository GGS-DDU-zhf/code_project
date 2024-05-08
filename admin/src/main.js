// 学习视频地址 https://www.bilibili.com/video/BV1Nw411x77m/?p=3&spm_id_from=pageDriver&vd_source=0cf98087bbb988fb3bb958be12a290fe

import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import ElementPlus from "element-plus";
import "element-plus/dist/index.css";
import Particles from "particles.vue3";
import '@/util/axios.config'

const debounce = (fn, delay) => {
  let timer = null;
  return function () {
    let context = this;
    let args = arguments;
    clearTimeout(timer);
    timer = setTimeout(function () {
      fn.apply(context, args);
    }, delay);
  }
}

const _ResizeObserver = window.ResizeObserver;
window.ResizeObserver = class ResizeObserver extends _ResizeObserver{
  constructor(callback) {
    callback = debounce(callback, 16);
    super(callback);
  }
}

createApp(App)
  .use(Particles)
  .use(ElementPlus)
  .use(store)
  .use(router)
  .mount("#app");
