import { createRouter, createWebHistory } from 'vue-router';
import { useAuthStore } from '../stores/auth.js';
import Login from '../views/Login.vue';
import Songs from '../views/Songs.vue';
import Albums from '../views/Albums.vue';
import About from '../views/About.vue';

const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: '/login',
      component: Login,
      meta: { requiresAuth: false },
    },
    {
      path: '/',
      component: Songs,
      meta: { requiresAuth: true },
    },
    {
      path: '/albums',
      component: Albums,
      meta: { requiresAuth: true },
    },
    {
      path: '/about',
      component: About,
      meta: { requiresAuth: true },
    },
  ],
});

router.beforeEach((to, from, next) => {
  const state = useAuthStore();
  if (to.meta.requiresAuth && !state.authenticated) {
    next('/login');
  } else if (!to.meta.requiresAuth && state.authenticated) {
    next('/');
  } else {
    next();
  }
});

export default router;