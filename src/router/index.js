import Vue from 'vue';
import Router from 'vue-router';

// layouts
// import Login from '@/components/layout/Login';

// shell
import Shell from '@/components/layout/Shell';

// views
import Login from '@/components/layout/Login';
import PageNotFound from '@/components/layout/PageNotFound';
import Dashboard from '@/components/Dashboard';
import Home from '@/components/Home';
import Favourite from '@/components/Favourite';


Vue.use(Router);

export default new Router({
  routes: [
    {
      path: '/',
      name: 'login',
      component: Login,
      children: [
        {
          path: 'login',
          component: Login,
          name: 'Login',
        },
      ],
    },
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
        {
          path: 'home',
          component: Home,
          name: 'Home',
        },
        {
          path: 'favourite',
          component: Favourite,
          name: 'Favourite',
        },
      ],
    },
    {
      path: '*',
      name: 'PageNotFound',
      component: PageNotFound,
    },
  ],
  scrollBehavior(to, from, savedPosition) {
    return savedPosition || { x: 0, y: 0 };
  },
});
