<style>
</style>

<template>
  <div>    
    <h2>Show Video : {{currentVideo == null ? "null" : currentVideo._id}}</h2>
    <div id="video-player"></div>
  </div>
</template>

<script>
  import { mapState } from 'vuex';
  import * as atypes from '../store/action-types';
  import YouTubePlayer from 'youtube-player';
  
  let videoPlayer;

  export default {
    name: 'show-video',
    props: [
      'videoId'
    ],
    computed: {
      ...mapState('videos',[
        'currentVideo',
        'currentVideoPlayer'
      ])
    },
    watch: {
      videoId(newValue, oldValue) {
        this.$store.dispatch(atypes.SET_CURRENT_VIDEO, { videoPlayer, videoId : newValue });            
      }
    },
    mounted() {
      videoPlayer = YouTubePlayer('video-player');
      this.$store.dispatch(atypes.SET_CURRENT_VIDEO, { videoPlayer, videoId : this.videoId });      
    }
  };
</script>
