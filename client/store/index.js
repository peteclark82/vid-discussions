import Vue from 'vue';
import Vuex from 'vuex';
import videos from './modules/videos';
import sections from './modules/sections';
import videoDetails from './modules/video-details';
import createLogger from './logger';

Vue.use(Vuex)

const debug = process.env.NODE_ENV !== 'production'

export default new Vuex.Store({  
  modules: {
    videos,
    sections,
    'video-details': videoDetails
  },
  strict: debug
});