<template>
  <div>
    <v-select
      v-model="selectField.val"
      :outlined="selectField.outlined"
      :class="selectField.class"
      :items="selectField.items"
      :label="selectField.label"
    ></v-select>
  </div>
</template>
<script>
export default {
  props:{
    selectField:{
      type: Object
    }
  },
  created(){
    if(!this.selectField.val){
      this.selectField.val = this.selectField.default
    }
  }
}
</script>
