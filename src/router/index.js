import { createRouter, createWebHistory } from 'vue-router';

const routes = [
  {
    path: '/',
    name: 'home',
    component: () => import('../views/HomeView.vue'),
  },
  {
    path: '/projects',
    name: 'projects',
    component: () => import('../views/ProjectsView.vue'),
  },
  {
    path: '/skills',
    name: 'skills',
    component: () => import('../views/SkillsView.vue'),
  },
  {
    path: '/experience',
    name: 'experience',
    component: () => import('../views/ExperienceView.vue'),
  },
  {
    path: '/contact',
    name: 'contact',
    component: () => import('../views/ContactView.vue'),
  },
  {
    path: '/error/:code',
    name: 'error',
    component: () => import('../views/ErrorView.vue'),
    props: true,
  },
  {
    path: '/:pathMatch(.*)*',
    redirect: { name: 'error', params: { code: 404 } },
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes: routes,
});

export default router;