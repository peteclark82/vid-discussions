<style>
</style>

<template>
  <div>   
    <h2>Video Detail</h2>
    <ul v-if="videoDetail !== null">
      <li v-for="field,name in template">
        <label>{{ name }}</label>
        {{field.type}}
        <div :id="'field-'+ name" :is="field.type" :editMode="editMode" v-model="videoDetail[name]" @input="fieldUpdated"></div>
      </li>
    </ul>
  </div> 
</template>

<script>
  import { mapState } from 'vuex';
  import * as atypes from '../store/action-types';
  import * as fields from './fields';
  
  export default {
    name: 'video-detail',
    props: { 
      editMode: { type: Boolean },
      value: Object
    },
    data: function() {
      return {
        template: null,
        videoDetail: this.value 
      };
    },
    watch: {
      value(newValue) {
        this.videoDetail = newValue;
      }
    },
    methods: {
      fieldUpdated() {
        this.$emit('input', this.videoDetail);
      }
    },
    mounted() {      
      this.$store.dispatch(atypes.GET_VIDEO_DETAIL_FORM).then((template) => {
        this.template = template;
      });             
    },
    components: { ...fields }    
  };
</script>
