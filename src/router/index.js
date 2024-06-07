import { createRouter, createWebHistory } from 'vue-router';

import Admin from '../components/Admin.vue';
import Analytics from '../components/Analytics.vue';
import Login from '../components/Login.vue';
import Show from '../components/Show.vue';

const routes = [
  { path: '/', component: Login },
  { path: '/show', component: Show },
  { path: '/admin', component: Admin },
  { path: '/analytics', component: Analytics }

]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router