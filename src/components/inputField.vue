<template>
  <div>
    <v-text-field
      v-model="inputField.val"
      :outlined="inputField.outlined"
      :class="inputField.class"
      @input="$v.childValue.$touch()"
      :hide-details="inputField.hidedetails"
      :error-messages="childValueErrors"
      @blur="$v.childValue.$touch()"
      :requared="inputField.requared"
      :label="inputField.label"
    >
    </v-text-field>

  </div>
</template>
<script>
import { validationMixin } from 'vuelidate'
import {required} from 'vuelidate/lib/validators'

export default {
  mixins: [validationMixin],
  validations: {
    childValue: {required},
  },
  props:{
    inputField:{
      type: Object
    }
  },
  computed: {
    childValueErrors(){
        const errors = []
      if(this.inputField.required){
        if (!this.$v.childValue.$dirty) return errors
        !this.$v.childValue.required && errors.push('Обязательное поле')
        return errors
      }
      return errors
    },
    childValue() {
      return this.inputField.val
    }
  },
  methods:{
    updateValue(value){
      this.$emit('updateValue', value)
    }
  }
}
</script>
