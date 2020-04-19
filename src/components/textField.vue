<template>
  <div>
    <v-textarea
      v-model="textField.val"
      :class="textField.class"
      :rows="textField.rows"
      :outlined="textField.outlined"
      :name="textField.name"
      :label="textField.label"
      :type="textField.type"
      :hide-details="textField.hidedetails"
      @input="updateValue(childValue)"
      >
    </v-textarea>
  </div>
</template>
<script>
export default {
  data(){
    return {
      childValue: this.textField.value
    }
  },
  props:{
    textField:{
      type: Object
    }
  },
  methods:{
    updateValue(value){
      this.$emit('updateValue', value)
    }
  }
}
</script>
