<template>
  <div class="pa-1">
    <v-btn-toggle
    class="d-flex d-lg-inline-flex d-md-flex"
    >

          <v-btn
          v-for="item in colorsArray"
          :key="item"
          @click="changeColor(item)"
          :color="item"
          mandatory= true
          max="0"
          >
            <div class="img img-size">
            <img
            v-if="color === item"
            src="approval64.png"
            alt="approval"
            >
          </div>
          </v-btn>
          
        </v-btn-toggle>
  </div>
</template>
<script>
import {eventEmitter} from '@/main'
import Account from '@/store/FinPlan/Account.js'

export default{
  mixins:[Account],
  props:{
    params:{
        type: Object
      },
    editItem:{
      type: Object
    },
    colorsIgnore:{
      type: Array
    }
  },
  data: ()=>({
      items: [
      '#F44336',
      '#E91E63',
      '#9C27B0',
      '#673AB7',
      '#3F51B5',
      '#2196F3',
      '#03A9F4',
      '#00BCD4',
      '#009688',
      '#CDDC39',
      ]
  }),
  created(){
    eventEmitter.$emit('changeColorPicker', this.color)
  },
  computed:{
    colorsArray(){
      const items = this.items
      const colorsIgnore = this.colorsIgnore;
      // ES5 syntax
      const filteredArray = items.filter(function(x) { 
        return colorsIgnore.indexOf(x) < 0;
      })
      if(this.editItem.color){
        filteredArray.unshift(this.editItem.color)
      }
      return filteredArray
    },
    color(){
      if(this.params.colorPicker){
        return this.params.colorPicker
      }else{
        return this.colorsArray[0]
      }
    }
  },
  methods:{
    changeColor(color){
      eventEmitter.$emit('changeColorPicker', color)
    }
  },

}


</script>
<style>
.colorItem {
  flex:1 1 auto; /*растягивает и сжимает флекс-элемент относительно его собственной ширины*/
  border:1px solid #ddd;
  /* border-radius:7px; */
background-color: #f1f1f1;
}
</style>
