<style>
</style>

<template>
  <div>
    Sections
    Section Name : <input type="text" v-model="sectionName" placeholder="Please enter a section name"/>    
    <button v-on:click="addSection">Add Section</button>
  </div>  
</template>

<script>
  import { mapState, mapActions } from 'vuex';
  import * as atypes from '../store/action-types';  

  export default {
    name: 'sections',
    data: function() {
      return {
        sectionName: null
      };
    },  
    computed: {
      ...mapState('videos', [
        'currentVideo',
        'currentVideoPlayer'
      ])
    },
    methods: {
      addSection() {
        this.currentVideoPlayer.getCurrentTime().then(timestamp => {
          this[atypes.ADD_SECTION]({
            videoId: this.currentVideo._id,
            sectionName: this.sectionName,
            timestamp: timestamp
          }).then((section) => {
            console.log("success section");
            console.log(section);
          }, (error) => {
            console.log(error);
          });
        });
      },
      ...mapActions([
        atypes.ADD_SECTION
      ])
    }
  };
</script>
