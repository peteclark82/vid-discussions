import axios from 'axios'; 
import * as types from '../mutation-types';
import * as atypes from '../action-types';


const state = {
  currentVideo: null,
  currentVideoPlayer: null,
  top10Videos: [],
  currentVideoSections: [],
  currentVideoDetail: null,
  currentVideoTime: 0
};

const getters = {
  currentSection: (state, getters) => {
    let section = null;    
    for(let i=0; i<state.currentVideoSections.length; i++) {
      let thisSection = state.currentVideoSections[i], nextSection = state.currentVideoSections[i+1];
      if (state.currentVideoTime >= thisSection.timestamp) {
        if (nextSection === undefined) {
          section = thisSection; break;
        } else {
          if (state.currentVideoTime < nextSection.timestamp) {
            section = thisSection; break;
          }
        }
      }      
    }
    return section;
  }
};

let pollInterval = null;

const actions = {
  [atypes.StripNamespace(atypes.ADD_VIDEO)] ({ commit }, { videoUrl, videoDetail }) {
    return new Promise((resolve, reject) => {
      axios.post('/api/video', { videoUrl }).then(({ data:{ video } }) => {
        axios.post(`/api/video/${video._id}/detail`, { detail: videoDetail }).then(({ data:{ detail } }) => {
          resolve(video);
        }, ({ data }) => { reject(data); });        
      }, ({ data }) => { reject(data); }); 
    });    
  },
  [atypes.StripNamespace(atypes.SET_CURRENT_VIDEO)] ({ commit }, { videoPlayer, videoId }) {      
    axios.get('/api/video/' + videoId).then(({ data: { video }}) => {
      commit(types.SET_CURRENT_VIDEO, { videoPlayer, video });
      if (pollInterval !== null) {
        clearInterval(pollInterval);
      }
      pollInterval = setInterval(() => {
        videoPlayer.getCurrentTime().then((time) => {
          if (time !== undefined) {
            commit(types.SET_CURRENT_VIDEO_TIME, { time });            
          }        
        });
      }, 500);      
    });
  },
  [atypes.StripNamespace(atypes.SET_TOP10_VIDEOS)] ({ commit }) {
    axios.get('/api/video/top10').then(({ data: { videos }}) => {
      commit(types.SET_TOP10_VIDEOS, { videos });
    });
  },
  [atypes.StripNamespace(atypes.SET_CURRENT_VIDEO_SECTIONS)] ({ commit }) {
    const videoId = state.currentVideo._id;    
    axios.get(`/api/video/${videoId}/sections`).then(({ data: { sections }}) => {
      commit(types.SET_CURRENT_VIDEO_SECTIONS, { sections });
    });
  },
  [atypes.StripNamespace(atypes.SET_CURRENT_VIDEO_DETAIL)] ({ commit }) {
    const videoId = state.currentVideo._id;    
    axios.get(`/api/video/${videoId}/detail`).then(({ data: { detail }}) => {
      commit(types.SET_CURRENT_VIDEO_DETAIL, { detail });
    });
  },
  [atypes.StripNamespace(atypes.GET_VIDEO_DETAIL)] ({ commit }, { videoId }) {
    return new Promise((resolve, reject) => {
      axios.get(`/api/video/${videoId}/detail`).then(({ data: { detail }}) => {
        resolve(detail);
      }, ({ data }) => {
        reject(data);
      });
    });    
  },
  [atypes.StripNamespace(atypes.GET_VIDEO_DETAIL_DEFAULT)] ({ commit }) {
    return new Promise((resolve, reject) => {
      axios.get(`/api/video/detail-default-values`).then(({ data: { data }}) => {
        resolve(data);
      }, ({ data }) => {
        reject(data);
      });
    });  
  },
  [atypes.StripNamespace(atypes.GET_VIDEO_DETAIL_FORM)] ({ commit }) {
    return new Promise((resolve, reject) => {
      axios.get(`/api/video/detail-form`).then(({ data: { template }}) => {
        resolve(template);
      }, ({ data }) => {
        reject(data);
      });
    });    
  }
};

const mutations = {
  [types.SET_CURRENT_VIDEO] (state, { videoPlayer, video }) {    
    state.currentVideoPlayer = videoPlayer;
    state.currentVideo = video;    
    videoPlayer.loadVideoById(video.youTubeVideoId);
  },  
  [types.SET_CURRENT_VIDEO_TIME] (state, { time }) {
    state.currentVideoTime = time;
  },
  [types.SET_TOP10_VIDEOS] (state, { videos }) {
    state.top10Videos = videos;
  },
  [types.SET_CURRENT_VIDEO_SECTIONS] (state, { sections }) {
    state.currentVideoSections = sections;
  },
  [types.SET_CURRENT_VIDEO_DETAIL] (state, { detail }) {
    state.currentVideoDetail = detail;
  }
};

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
};