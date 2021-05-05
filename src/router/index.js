import Vue from 'vue';
import Router from 'vue-router';
import Home from '../views/Home';
import login from '../views/Login';
import register from '../views/Register';
import logout from '../views/Logout';

Vue.use(Router);

export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home,
    },
    {
      path: '/login',
      name: 'login',
      component: login,
      meta: {
        requiresLogged: true,
      },
    },
    {
      path: '/register',
      name: 'register',
      component: register,
      meta: {
        requiresLogged: true,
      },
    },
    {
      path: '/logout',
      name: 'logout',
      component: logout,
      meta: {
        requiresAuth: true,
      },
    },
  ],
});
