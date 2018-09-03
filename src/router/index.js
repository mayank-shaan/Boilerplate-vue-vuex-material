import Vue from 'vue';
import Router from 'vue-router';

// layouts
// import Login from '@/components/layout/Login';

// shell
import Shell from '@/components/layout/Shell';

// views
import Dashboard from '@/components/Dashboard';
import Home from '@/components/Home';
import Favourite from '@/components/Favourite';


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
      path: '/',
      component: Shell,
      meta: { requiresAuth: true },
      children: [
        {
          path: 'home',
          component: Home,
          name: 'Home',
        },
      ],
    },
    {
      path: '/',
      component: Shell,
      meta: { requiresAuth: true },
      children: [
        {
          path: 'favourite',
          component: Favourite,
          name: 'Favourite',
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
          name: 'Dashboard 2',
        },
      ],
    },
  ],
  scrollBehavior(to, from, savedPosition) {
    return savedPosition || { x: 0, y: 0 };
  },
});
