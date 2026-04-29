import { createRouter, createWebHistory } from 'vue-router';

import { authClient } from '@/hooks/auth';

const HOME_PATH = '/';
const LOGIN_PATH = '/login';

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: () => import('@/pages/index.vue')
    },
    {
      path: '/login',
      name: 'login',
      component: () => import('@/pages/login.vue')
    }
  ]
});

router.beforeEach(async (to) => {
  const { data, error } = await authClient.getSession();
  const isAuthenticated = Boolean(data?.session && !error);

  if (isAuthenticated && to.path === LOGIN_PATH) {
    return HOME_PATH;
  }

  if (!isAuthenticated && to.path !== LOGIN_PATH) {
    return { path: LOGIN_PATH, query: { redirect: to.fullPath } };
  }
});

export default router;
