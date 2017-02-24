<style scoped>
  li.active {
    background-color:#DDDDFF;
  }
</style>

<template>
  <div>
    <h2>Sections</h2>
    Section Name : <input type="text" v-model="sectionName" placeholder="Please enter a section name"/>
    TimeStamp: 
      <a href="javascript:;" @click="navigateVideo(-20)">&lt;&lt;&lt;</a> |
      <a href="javascript:;" @click="navigateVideo(-5)">&lt;&lt;</a> |
      <a href="javascript:;" @click="navigateVideo(-1)">&lt;</a>
      <input type="text" :value="currentVideoTime | timestamp" readonly style="width:60px;"/>
      <a href="javascript:;" @click="navigateVideo(1)">&gt;</a>
      <a href="javascript:;" @click="navigateVideo(5)">&gt;&gt;</a> |
      <a href="javascript:;" @click="navigateVideo(20)">&gt;&gt;&gt;</a> |
      <br/>
    <button @click="addSection">Add Section</button>

    <ul>
      <li v-for="section in currentVideoSections" v-bind:class="{ 'active': currentSection == section }">{{section.currentDetail ? section.currentDetail.name : '???'}} - {{section.currentDetail ? section.currentDetail.timestamp : '???'| timestamp}}</li>
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
        'currentVideoPlayer',
        'currentVideoTime',
        'currentVideoSections'
      ]),
      ...mapGetters('videos', [
        'currentSection'
      ])
    },
    watch: {
      currentVideo(newValue, oldValue) {
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
      },
      navigateVideo(seconds) {
        const newTime = this.currentVideoTime + seconds;
        this.currentVideoPlayer.seekTo(newTime, true);            
      }
    }
  };
</script>
