<style>
</style>

<template>
  <div>   
    <top10-videos></top10-videos>  
    The VIDEO ({{ videoId }})
    <show-video :videoId="videoId"></show-video>
    <sections :videoID="videoId"></sections>
  </div> 
</template>

<script>
  import { mapState } from 'vuex';
  import ShowVideo from './show-video.vue';
  import Top10Videos from './top10-videos.vue';
  import Sections from './sections.vue';

  let videoPlayer;
  
  export default {
    name: 'show-video-page',
    props: [
      'videoId'
    ], 
    components: { ShowVideo, Top10Videos, Sections }    
  };
</script>
