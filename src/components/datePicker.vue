<template>
  <div>
      <v-menu
        ref="menu"
        v-model="menu"
        :close-on-content-click="false"
        transition="scale-transition"
        offset-y
        min-width="290px"
      >
        <template v-slot:activator="{ on }">
          <v-text-field
            class="pa-2"
            outlined
            v-model="dateFormat"
            label="Дата создания"
            readonly
            v-on="on"
          ></v-text-field>
        </template>
        <v-date-picker locale="ru" v-model="dateField.val" no-title scrollable @input="menu = false"></v-date-picker>
      </v-menu>
  </div>
</template>

<script>
  export default {
    data(){
      return {
        menu: false,
        modal: false,
        menu2: false,
      }
    },
    props:{
      dateField:{
        type: Object
      }
    },
    computed:{
      dateFormat(){
        return this.formatDate()
        } 
    },
    // created(){
    //     this.dateField.val = this.dateField.default
    // },
    methods:{
      updateValue(value){
        this.$emit('updateValue', value)
      },
      formatDate () {
        if (!this.dateField.val) this.dateField.val = new Date().toISOString().substr(0, 10)
        const [year, month, day] = this.dateField.val.split('-')
        return `${day}.${month}.${year}`
      },
    }
  }
</script>

