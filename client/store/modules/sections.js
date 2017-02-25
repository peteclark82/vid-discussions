import axios from 'axios'; 
import * as types from '../mutation-types';
import * as atypes from '../action-types';


const state = {  
};

const getters = {
};


const actions = {
  [atypes.StripNamespace(atypes.ADD_SECTION)] ({ commit }, { videoId, detail }) {
    return new Promise((resolve, reject) => {
      axios.post(`/api/video/${videoId}/section`, { detail }).then(({ data:{ section } }) => {
        resolve(section);
      }, ({ data }) => {
        reject(data);
      }); 
    });    
  },
  [atypes.StripNamespace(atypes.GET_SECTION_DETAIL_DEFAULT)] ({ commit }) {
    return new Promise((resolve, reject) => {
      axios.get(`/api/video/section-default-values`).then(({ data: { detail }}) => {
        resolve(detail);
      }, ({ data }) => {
        reject(data);
      });
    });    
  },
  [atypes.StripNamespace(atypes.GET_SECTION_DETAIL_FORM)] ({ commit }) {
    return new Promise((resolve, reject) => {
      axios.get(`/api/video/section-form`).then(({ data: { template }}) => {
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