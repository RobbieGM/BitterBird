import Vue from 'vue';
import Router from 'vue-router';
import Jumbotron from './views/Jumbotron.vue';

Vue.use(Router);

export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      name: 'jumbotron',
      component: Jumbotron,
    },
    {
      path: '/profile/:handle',
      name: 'profile',
      // route level code-splitting
      // this generates a separate chunk (about.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import(/* webpackChunkName: "profile" */ './views/Profile.vue'),
    },
  ],
});
