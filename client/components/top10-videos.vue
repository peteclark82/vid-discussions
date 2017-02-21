<style>
</style>

<template>
  <div>    
    <ul> Top 10 Videos : {{ top10Videos.length }}
      <li v-for="video in top10Videos">
        <img :src="`https://i.ytimg.com/vi/${video.youTubeVideoId}/hqdefault.jpg?custom=true&w=336&h=188&stc=true&jpg444=true&jpgq=90&sp=68`" style="width:100px; height:60px;"/>
        <router-link :to="{ name: 'showVideo', params: { videoId: video._id }}">{{ video._id }}</router-link>
      </li>
    </ul>
  </div>  
</template>

<script>
  import { mapState } from 'vuex';
  import * as atypes from '../store/action-types';  

  export default {
    name: 'top10-videos',
    computed: {
      ...mapState({
        top10Videos : state => state.videos.top10Videos
      })
    },
    created() {
      this.$store.dispatch(atypes.GET_TOP10_VIDEOS);           
    }
  };
</script>
