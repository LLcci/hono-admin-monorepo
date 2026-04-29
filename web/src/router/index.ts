import { createRouter, createWebHistory } from 'vue-router';

import { useAuthStore } from '@/stores/auth';

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
  const authStore = useAuthStore();

  authStore.setNavigating(true);

  const isAuthenticated = await authStore.initializeSession();

  if (isAuthenticated && to.path === LOGIN_PATH) {
    return HOME_PATH;
  }

  if (!isAuthenticated && to.path !== LOGIN_PATH) {
    return { path: LOGIN_PATH, query: { redirect: to.fullPath } };
  }
});

router.afterEach(() => {
  const authStore = useAuthStore();

  authStore.setNavigating(false);
});

router.onError(() => {
  const authStore = useAuthStore();

  authStore.setNavigating(false);
});

export default router;
