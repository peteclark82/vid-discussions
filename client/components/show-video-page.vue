<style scoped>
  .col {
    border:1px solid #BBB;
  }
</style>

<template>
  <div class="container">
    <div class="row">
      <div class="col s8"><show-video :videoId="videoId"></show-video></div>
      <div class="col s4"><sections :videoID="videoId"></sections></div>
      <div class="col s9"><video-detail v-model="currentVideoDetail" :editMode="false"></video-detail></div>
      <div class="col s3"><top10-videos></top10-videos></div>
    </div>             
  </div> 
</template>

<script>
  import { mapState } from 'vuex';
  import * as atypes from '../store/action-types';
  import ShowVideo from './show-video.vue';
  import Top10Videos from './top10-videos.vue';
  import Sections from './sections.vue';
  import VideoDetail from './video-detail.vue';

  let videoPlayer;
  
  export default {
    name: 'show-video-page',
    props: [ 'videoId' ], 
    data: function() {
      return {
        videoDetail: null
      };
    },
    computed: {
      ...mapState('videos', [
        'currentVideo',
        'currentVideoDetail'
      ])
    },
    watch: {
      currentVideo(newValue) {
        this.$store.dispatch(atypes.SET_CURRENT_VIDEO_DETAIL);
      }
    },
    components: { ShowVideo, Top10Videos, Sections, VideoDetail }    
  };
</script>
