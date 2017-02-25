<style>
</style>

<template>
  <div>   
    <top10-videos></top10-videos> 
    Add Video<br/>
    <span v-show="isValidationErrorShowing('videoUrl')">{{ getValidationError('videoUrl') }}<br/></span>
    <input type="text" v-model="videoUrl" placeholder="Paste YouTube URL Here"/>
    <video-detail v-model="videoDetail" :editMode="true"></video-detail>
    <button v-on:click="addVideo">Add Video</button>
  </div>
</template>

<script>
  import router from 'vue-router';  
  import { mapState, mapActions } from 'vuex';
  import * as atypes from '../store/action-types';

  import Top10Videos from './top10-videos.vue';
  import VideoDetail from './video-detail.vue';
  
  export default {
    name: 'add-video-page',
    props: [],
    data: function() {  
      return {    
        validationErrors : [],
        videoUrl : null,
        videoDetail: null
      };
    },
    methods: {
      addVideo() {
        this.$store.dispatch(atypes.ADD_VIDEO, { videoUrl: this.videoUrl, videoDetail: this.videoDetail }).then(({_id}) => {
          this.$router.push( { path : '/video/'+_id });
        }, ({ validationErrors }) => {
          this.validationErrors = validationErrors || [];
        });           
      },
      getValidationError(name) {
        return this.validationErrors[name] != undefined ? this.validationErrors[name].message : null;
      },
      isValidationErrorShowing(name) {
        return this.validationErrors[name] != undefined;
      }
    },
    mounted() {
      this.$store.dispatch(atypes.GET_VIDEO_DETAIL_DEFAULT).then((videoDetail) => {
        this.videoDetail = videoDetail;
      });
    },
    components: { Top10Videos, VideoDetail }
  };
</script>
