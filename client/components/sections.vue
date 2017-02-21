<style>
</style>

<template>
  <div>
    Sections
    Section Name : <input type="text" v-model="sectionName" placeholder="Please enter a section name"/>    
    <button v-on:click="addSection">Add Section</button>
    <ul>
      <li v-for="section in currentVideoSections">{{section.name}} - {{section.timestamp}}</li>
    </ul>
  </div>  
</template>

<script>
  import { mapState, mapActions } from 'vuex';
  import * as atypes from '../store/action-types';  

  export default {
    name: 'sections',
    props: [
      'videoId'
    ],
    data: function() {
      return {
        sectionName: null
      };
    },  
    computed: {
      ...mapState('videos', [
        'currentVideo',
        'currentVideoPlayer',
        'currentVideoSections'
      ])
    },
    watch: {
      'currentVideo': function(newValue, oldValue) {
        this.$store.dispatch(atypes.SET_CURRENT_VIDEO_SECTIONS);
      }
    },
    methods: {
      addSection() {
        this.currentVideoPlayer.getCurrentTime().then(timestamp => {
          this.$store.dispatch(atypes.ADD_SECTION, {
            videoId: this.currentVideo._id,
            sectionName: this.sectionName,
            timestamp: timestamp
          }).then((section) => {
            this.$store.dispatch(atypes.SET_CURRENT_VIDEO_SECTIONS);
          }, (error) => {
            alert(error);
          });
        });
      }
    }
  };
</script>
