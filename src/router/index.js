import Vue from 'vue';
import Router from 'vue-router';

// layouts
// import Login from '@/components/layout/Login';

// shell
import Shell from '@/components/layout/Shell';

// views
import Dashboard from '@/components/Dashboard';


Vue.use(Router);

export default new Router({
  routes: [
    {
      path: '/',
      component: Shell,
      meta: { requiresAuth: true },
      children: [
        {
          path: 'dashboard',
          component: Dashboard,
          name: 'Dashboard',
        },
      ],
    },
    {
      path: '*',
      component: Shell,
      meta: { requiresAuth: true },
      children: [
        {
          path: 'dashboard',
          component: Dashboard,
          name: 'Dashboard',
        },
      ],
    },
  ],
  scrollBehavior(to, from, savedPosition) {
    return savedPosition || { x: 0, y: 0 };
  },
});
