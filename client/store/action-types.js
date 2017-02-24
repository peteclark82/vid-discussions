/* For some reason VUEX actions have to be 'dispatched' using the namespace, where as mutations are commited WITHOUT the namespace */

export const ADD_VIDEO = "videos/ADD_VIDEO";
export const SET_CURRENT_VIDEO = "videos/SET_CURRENT_VIDEO";
export const SET_TOP10_VIDEOS = "videos/SET_TOP10_VIDEOS";
export const SET_CURRENT_VIDEO_SECTIONS = "videos/SET_CURRENT_VIDEO_SECTIONS";
export const SET_CURRENT_VIDEO_DETAIL = "videos/SET_CURRENT_VIDEO_DETAIL";
export const GET_VIDEO_DETAIL = "videos/GET_VIDEO_DETAIL";
export const GET_VIDEO_DETAIL_DEFAULT = "videos/GET_VIDEO_DETAIL_DEFAULT";
export const GET_VIDEO_DETAIL_FORM = "videos/GET_VIDEO_DETAIL_FORM";

export const ADD_SECTION = "sections/ADD_SECTION";


export const StripNamespace = function(name) {
  var parts = name.split('/');
  return parts.pop();
};