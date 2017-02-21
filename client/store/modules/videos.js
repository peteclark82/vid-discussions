import axios from 'axios'; 
import * as types from '../mutation-types';
import * as atypes from '../action-types';


const state = {
  currentVideo: null,
  currentVideoPlayer: null,
  currentSection: null,
  top10Videos: [],
  currentVideoSections: [],
  currentVideoTime: 0
};

const getters = {
};


let pollInterval = null;

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
      if (pollInterval !== null) {
        clearInterval(pollInterval);
      }
      pollInterval = setInterval(() => {
        videoPlayer.getCurrentTime().then((time) => {
          if (time !== undefined) {
            commit(types.SET_CURRENT_VIDEO_TIME, { time });            
            let section = getCurrentSection({ time });
            commit(types.SET_CURRENT_SECTION, { section });
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
  }
};

function getCurrentSection({ time }) {
  let section = null;    

  for(var i=0; i<state.currentVideoSections.length; i++) {
    var thisSection = state.currentVideoSections[i];
    var nextSection = state.currentVideoSections[i+1];
    if (nextSection !== undefined) {
      if (thisSection.timestamp <= time && nextSection.timestamp > time) {
        section = thisSection;
        break;
      }
    } else {
      section = thisSection;
    }
  }

  return section;
}

const mutations = {
  [types.SET_CURRENT_VIDEO] (state, { videoPlayer, video }) {    
    state.currentVideoPlayer = videoPlayer;
    state.currentVideo = video;    
    videoPlayer.loadVideoById(video.youTubeVideoId);
  },  
  [types.SET_CURRENT_VIDEO_TIME] (state, { time }) {
    state.currentVideoTime = time;
  },
  [types.SET_CURRENT_SECTION] (state, { section }) {
    state.currentSection = section;
  },
  [types.SET_TOP10_VIDEOS] (state, { videos }) {
    state.top10Videos = videos;
  },
  [types.SET_CURRENT_VIDEO_SECTIONS] (state, { sections }) {
    state.currentVideoSections = sections;
  }
};

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
};