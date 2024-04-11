// 学习视频地址 https://www.bilibili.com/video/BV1Nw411x77m/?p=3&spm_id_from=pageDriver&vd_source=0cf98087bbb988fb3bb958be12a290fe

import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

createApp(App).use(store).use(router).mount('#app')
