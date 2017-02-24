<style>
</style>

<template>
  <div>
    <div v-if="editMode">   
      <input type="text" ref="input" :value="value" @input="updateValue($event.target.value)" />
    </div>
    <div v-if="!editMode">   
      {{value}}
    </div>
  </div> 
</template>

<script>
  import { mapState } from 'vuex';
  
  export default {
    name: 'PublicFigure',
    props: { 
      editMode: { type: Boolean },
      value: String
    },    
    methods: {
      updateValue(value) {      
        this.$emit('input', value)
      }
    } 
  };
</script>
