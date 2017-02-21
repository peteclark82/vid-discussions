import Vue from 'vue'
import Vuex from 'vuex'
import videos from './modules/videos'
import createLogger from './logger'

Vue.use(Vuex)

const debug = process.env.NODE_ENV !== 'production'

export default new Vuex.Store({  
  modules: {
    videos
  },
  strict: debug
});