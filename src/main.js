// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue';
import IdleVue from 'idle-vue';
import { BootstrapVue, IconsPlugin } from 'bootstrap-vue';
// eslint-disable-next-line
import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap-vue/dist/bootstrap-vue.css';
import App from './App';
import router from './router';
import store from './store';

Vue.use(BootstrapVue);
Vue.use(IconsPlugin);

const eventsHub = new Vue();

Vue.use(BootstrapVue);

Vue.use(IdleVue, {
  eventEmitter: eventsHub,
  idleTime: 720000,
}); // sets up the idle time,i.e. time left to logout the user on no activity
Vue.config.productionTip = false;

router.beforeEach((to, from, next) => {
  // if any of the routes in ./router.js has a meta named 'requiresAuth: true'
  // then check if the user is logged in before routing to this path:
  if (to.matched.some(record => record.meta.requiresAuth)) {
    if (!store.getters.loggedIn) {
      next({ name: 'login' });
    } else {
      next();
    }
  } else if (to.matched.some(record => record.meta.requiresLogged)) {
    // else if any of the routes in ./router.js has a meta named 'requiresLogged: true'
    // then check if the user is logged in;
    // if true continue to home page else continue routing to the destination path
    // this comes to play if the user is logged in and tries to access the login/register page
    if (store.getters.loggedIn) {
      next({ name: 'home' });
    } else {
      next();
    }
  } else {
    next();
  }
});

/* eslint-disable no-new */
new Vue({
  router,
  store,
  render: h => h(App),
}).$mount('#app');
