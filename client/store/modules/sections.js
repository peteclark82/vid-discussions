import axios from 'axios'; 
import * as types from '../mutation-types';
import * as atypes from '../action-types';


const state = {  
};

const getters = {
};


const actions = {
  [atypes.StripNamespace(atypes.ADD_SECTION)] ({ commit }, { videoId, sectionName, timestamp }) {
    return new Promise((resolve, reject) => {
      axios.post(`/api/video/${videoId}/section`, { sectionName, timestamp }).then(({ data:{ section } }) => {
        resolve(section);
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