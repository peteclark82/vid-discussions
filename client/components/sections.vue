<style scoped>
  li.active-section {
    background-color:#DDDDFF;
  }
</style>

<template>
  <div>
    Sections
    Section Name : <input type="text" v-model="sectionName" placeholder="Please enter a section name"/>    
    <button v-on:click="addSection">Add Section</button>
    <ul>
      <li v-for="section in currentVideoSections" v-bind:class="{ 'active-section': currentSection == section }">{{section.name}} - {{section.timestamp}}</li>
    </ul>
    Current Section : {{ currentSection ? currentSection : "NOTHING!" }}
  </div>  
</template>

<script>
  import { mapState, mapActions, mapGetters } from 'vuex';
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
        'currentVideoTime',
        'currentVideoSections'
      ]),
      ...mapGetters('videos', [
        'currentSection'
      ])
    },
    watch: {
      'currentVideo': function(newValue, oldValue) {
        this.$store.dispatch(atypes.SET_CURRENT_VIDEO_SECTIONS);
      }
    },
    methods: {
      addSection() {        
        this.$store.dispatch(atypes.ADD_SECTION, {
          videoId: this.currentVideo._id,
          sectionName: this.sectionName,
          timestamp: this.currentVideoTime
        }).then((section) => {
          this.$store.dispatch(atypes.SET_CURRENT_VIDEO_SECTIONS);
        }, (error) => {
          alert(error);
        });
      }
    }
  };
</script>
