import Vue from 'vue';
import VueRouter from 'vue-router';
Vue.use(VueRouter)

import store from './store'

import AddVideoPage from './components/add-video-page.vue';
import ShowVideoPage from './components/show-video-page.vue';

const routes = [
  { name: 'addVideo', path: '/', props: false, component: AddVideoPage },
  { name: 'showVideo', path: '/video/:videoId', props: true, component: ShowVideoPage },
];

const router = new VueRouter({ mode: 'history', routes });

new Vue({
  router,
  store 
}).$mount('#app-container');