import { defineConfig } from 'umi';

export default defineConfig({
  nodeModulesTransform: {
    type: 'none',
  },
  routes: [
    // { path: '/', component: '@/pages/index' },
    { path: '/', redirect: '/home', exact: true },
    { path: '/home', component: '@/pages/home/index', exact: true },
    { path: '/login', component: '@/pages/login/index', exact: true },
  ],
  fastRefresh: {},
});
