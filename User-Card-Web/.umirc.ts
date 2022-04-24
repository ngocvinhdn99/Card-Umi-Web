import { defineConfig } from 'umi';

export default defineConfig({
  nodeModulesTransform: {
    type: 'none',
  },
  routes: [
    { path: '/', component: '@/pages/index' },
    // { path: '/', redirect: '/login', exact: true },
    {
      path: '/login',
      component: '@/pages/login/index',
      exact: true,
    },
    { path: '/register', component: '@/pages/register/index', exact: true },
    { path: '/home', component: '@/pages/home/index', exact: true },
    { path: '/account', component: '@/pages/account/index', exact: true },
  ],
  fastRefresh: {},
});
