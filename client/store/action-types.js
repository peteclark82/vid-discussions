/* For some reason VUEX actions have to be 'dispatched' using the namespace, where as mutations are commited WITHOUT the namespace */

export const ADD_VIDEO = "videos/ADD_VIDEO";
export const SET_CURRENT_VIDEO = "videos/SET_CURRENT_VIDEO";
export const GET_TOP10_VIDEOS = "videos/GET_TOP10_VIDEOS";
export const ADD_SECTION = "sections/ADD_SECTION";

export const StripNamespace = function(name) {
  var parts = name.split('/');
  return parts.pop();
};