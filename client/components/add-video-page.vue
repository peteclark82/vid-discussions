<style>
</style>

<template>
  <div>   
    <top10-videos></top10-videos> 
    Add Video<br/>
    <span v-show="isValidationErrorShowing('videoUrl')">{{ getValidationError('videoUrl') }}<br/></span>
    <input type="text" v-model="videoUrl" placeholder="Paste YouTube URL Here"/>
    <button v-on:click="addVideo">Add Video</button>
  </div>
</template>

<script>
  import router from 'vue-router';  
  import { mapState } from 'vuex';
  import * as atypes from '../store/action-types';

  import Top10Videos from './top10-videos.vue'
  
  export default {
    name: 'add-video-page',
    props: [
      'videoId'
    ],
    data: () => ({      
      videoUrl : null,
      validationErrors : []
    }),
    methods: {
      addVideo() {
        this.$store.dispatch(atypes.ADD_VIDEO, { videoUrl: this.videoUrl }).then(({_id}) => {
          this.$router.push( { path : '/video/'+_id });
        }, ({ validationErrors }) => {
          this.validationErrors = validationErrors;
        });           
      },
      getValidationError(name) {
        return this.validationErrors[name] != undefined ? this.validationErrors[name].message : null;
      },
      isValidationErrorShowing(name) {
        return this.validationErrors[name] != undefined;
      }
    },
    components: {
      Top10Videos
    }
  };
</script>
