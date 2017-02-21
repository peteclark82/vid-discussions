<style>
</style>

<template>
  <div>
    Sections    
    <button v-on:click="addSection">Add Section</button>
  </div>  
</template>

<script>
  import { mapState } from 'vuex';
  import * as atypes from '../store/action-types';  

  export default {
    name: 'sections',
    computed: {
      ...mapState('videos',[
        'currentVideoPlayer'
      ])
    },
    methods: {
      addSection() {
        this.currentVideoPlayer.getCurrentTime().then(time => {
          console.log(time);
        });
      }
    }
  };
</script>
