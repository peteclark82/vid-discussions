import axios from 'axios'; 
import * as types from '../mutation-types';
import * as atypes from '../action-types';


const state = {
};

const getters = {
};

let pollInterval = null;

const actions = {
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
};

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
};