<template>
  <div class="pa-1">
    <v-btn-toggle
    class="d-flex d-lg-inline-flex d-md-flex"
    >
          <v-btn
          v-for="item in colorsArray"
          :key="item"
          :ripple="false"
          @click="changeColor(item)"
          :color="item"
          mandatory= true
          max="0"
          >
            <div class="img img-size">
            <img
            v-if="params.colorPicker === item"
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
  computed:{
    colorsArray(){
      let colorsArray = this.params.colorsArray.map(item => item.color).filter(x => !this.colorsIgnore.includes(x))
      if(this.editItem.color){
        colorsArray.unshift(this.editItem.color)
        eventEmitter.$emit('changeColorPicker', this.editItem.color)
      }else{
        eventEmitter.$emit('changeColorPicker', colorsArray[0])
      }
      return colorsArray.slice (0, 10)
    },
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
