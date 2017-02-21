import axios from 'axios'; 
import * as types from '../mutation-types';
import * as atypes from '../action-types';


const state = {
  currentVideo : null,
  currentVideoPlayer : null,
  top10Videos : []
};

const getters = {
};

const actions = {
  [atypes.StripNamespace(atypes.ADD_VIDEO)] ({ commit }, { videoUrl }) {
    return new Promise((resolve, reject) => {
      axios.post('/api/video', { videoUrl }).then(({ data:{ video } }) => {
        resolve(video);
      }, ({ data }) => {
        reject(data);
      }); 
    });    
  },
  [atypes.StripNamespace(atypes.SET_CURRENT_VIDEO)] ({ commit }, { videoPlayer, videoId }) {      
    axios.get('/api/video/' + videoId).then(({ data: { video }}) => {
      commit(types.SET_CURRENT_VIDEO, { videoPlayer, video });
    });
  },
  [atypes.StripNamespace(atypes.GET_TOP10_VIDEOS)] ({ commit }) {
    axios.get('/api/video/top10').then(({ data: { videos }}) => {
      commit(types.SET_TOP10_VIDEOS, { videos });
    });
  }
};

const mutations = {
  [types.SET_CURRENT_VIDEO] (state, { videoPlayer, video }) {    
    state.currentVideoPlayer = videoPlayer;
    state.currentVideo = video;    
    videoPlayer.loadVideoById(video.youTubeVideoId);
  },  
  [types.SET_TOP10_VIDEOS] (state, { videos }) {
    state.top10Videos = videos;
  }
};

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
};