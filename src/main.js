import { createApp } from 'vue'
import App from './App.vue'
import router from './router'

// 导入 Bootstrap 和 BootstrapVue 的 CSS 文件
import BootstrapVue3 from 'bootstrap-vue-3'
import 'bootstrap-vue-3/dist/bootstrap-vue-3.css'
import 'bootstrap/dist/css/bootstrap.css'


createApp(App).use(router).use(BootstrapVue3).mount('#app')
