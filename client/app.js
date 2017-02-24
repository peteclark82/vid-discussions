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

Vue.filter('timestamp', (value) => {
  var sec_num = parseInt(value, 10);
  var hours   = Math.floor(sec_num / 3600);
  var minutes = Math.floor((sec_num % 3600) / 60); 
  var seconds = Math.floor(sec_num % 60);
  if (hours   < 10) {hours   = "0"+hours;}
  if (minutes < 10) {minutes = "0"+minutes;}
  if (seconds < 10) {seconds = "0"+seconds;}
  return hours+':'+minutes+':'+seconds;
});

var app = new Vue({
  router,
  store 
}).$mount('#app-container');