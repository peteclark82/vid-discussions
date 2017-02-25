<style scoped>
  .field-readonly {
    display:inline-block;
  }
</style>

<template>
  <div>   
    <div v-if="editMode && sectionDetail !== null">  
      <h2>Editing Section</h2>
      Section Name : 
      <input type="text" v-model="sectionDetail.name" placeholder="Please enter a section name"/>
      <br/>
      TimeStamp:   
      <a href="javascript:;" @click="navigateVideo(currentVideoTime-20)">&lt;&lt;&lt;</a> |
      <a href="javascript:;" @click="navigateVideo(currentVideoTime-5)">&lt;&lt;</a> |
      <a href="javascript:;" @click="navigateVideo(currentVideoTime-1)">&lt;</a>
      <input type="text" :value="currentVideoTime | timestamp" readonly style="width:60px;"/>
      <a href="javascript:;" @click="navigateVideo(currentVideoTime+1)">&gt;</a>
      <a href="javascript:;" @click="navigateVideo(currentVideoTime+5)">&gt;&gt;</a> |
      <a href="javascript:;" @click="navigateVideo(currentVideoTime+20)">&gt;&gt;&gt;</a> |
    </div>
    
    <div v-if="!editMode && sectionDetail">
      [<span v-if="!editMode && sectionDetail">{{sectionDetail.timestamp | timestamp}}</span>] <span v-if="!editMode && sectionDetail">{{sectionDetail.name}}</span>
      - 
      <a href="javascript:;" @click="navigateVideo(sectionDetail.timestamp)">Jump To</a><br/>
    </div>    

    <ul v-if="sectionDetail !== null">
      <li v-for="field,name in template">
        <label>{{ name }}</label>
        <div :id="'field-'+ name" :is="field.type" :editMode="editMode" v-model="sectionDetail.fields[name]" @input="fieldUpdated" :class="{ 'field-readonly': !editMode }"></div>
      </li>
    </ul>
  </div> 
</template>

<script>
  import { mapState } from 'vuex';
  import * as atypes from '../store/action-types';
  import * as fields from './fields';
  
  export default {
    name: 'section-detail',
    props: { 
      editMode: { type: Boolean },
      value: Object
    },
    data: function() {
      return {
        template: null,
        sectionDetail: this.value 
      };
    },
    computed: {
      ...mapState('videos', [
        'currentVideoTime',
        'currentVideoPlayer'
      ]),
    },
    watch: {
      value(newValue) {
        this.sectionDetail = newValue;
      }
    },
    methods: {
      fieldUpdated() {
        this.$emit('input', this.sectionDetail);
      },
      navigateVideo(newTime) {
        this.currentVideoPlayer.seekTo(newTime, true);            
      }
    },
    mounted() {      
      this.$store.dispatch(atypes.GET_SECTION_DETAIL_FORM).then((template) => {
        this.template = template;
      });            
    },
    components: { ...fields }    
  };
</script>
