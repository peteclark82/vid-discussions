<style scoped>
  li.active {
    background-color:#DDDDFF;
  }
</style>

<template>
  <div>
    <h2>Sections</h2>
    <section-detail v-model="sectionDetail" :editMode="true"></section-detail>
    
    <button @click="addSection">Add Section</button>

    <ul>
      <li v-for="section in currentVideoSections" v-bind:class="{ 'active': currentSection == section }">
        <section-detail v-model="section.detail"></section-detail>        
      </li>
    </ul>
  </div>  
</template>

<script>
  import { mapState, mapActions, mapGetters } from 'vuex';
  import * as atypes from '../store/action-types';  

  import SectionDetail from './section-detail.vue';

  export default {
    name: 'sections',
    props: [
      'videoId'
    ],
    data: function() {
      return {
        sectionName: null,
        sectionDetail: null
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
      currentVideo(newValue, oldValue) {
        this.$store.dispatch(atypes.SET_CURRENT_VIDEO_SECTIONS);
      }
    },
    methods: {
      addSection() {     
        this.sectionDetail.timestamp = this.currentVideoTime;

        this.$store.dispatch(atypes.ADD_SECTION, {
          videoId: this.currentVideo._id,
          detail: this.sectionDetail
        }).then((section) => {
          this.$store.dispatch(atypes.SET_CURRENT_VIDEO_SECTIONS);
        });
      }      
    },
    mounted() {
      this.$store.dispatch(atypes.GET_SECTION_DETAIL_DEFAULT).then((detail) => {
        this.sectionDetail = detail;
      });
    },
    components: { SectionDetail }
  };
</script>
