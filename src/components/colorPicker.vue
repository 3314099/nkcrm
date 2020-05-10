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
  data: ()=>({
      items: [
        {color: '#37474F', childColor: '#90A4AE'},
        {color: '#B71C1C', childColor: '#EF5350'},
        {color: '#880E4F', childColor: '#EC407A'},
        {color: '#4A148C', childColor: '#AB47BC'},
        {color: '#673AB7', childColor: '#7E57C2'},
        {color: '#1A237E', childColor: '#5C6BC0'},
        {color: '#0D47A1', childColor: '#42A5F5'},
        {color: '#01579B', childColor: '#29B6F6'},
        {color: '#006064', childColor: '#26C6DA'},
        {color: '#004D40', childColor: '#26A69A'},
        {color: '#1B5E20', childColor: '#66BB6A'},
        {color: '#33691E', childColor: '#9CCC65'},
        {color: '#827717', childColor: '#D4E157'},
        {color: '#F57F17', childColor: '#FFEE58'},
        {color: '#FF6F00', childColor: '#FFCA28'},
        {color: '#E65100', childColor: '#FFA726'},
        {color: '#BF360C', childColor: '#FF7043'},
        {color: '#4E342E', childColor: '#BCAAA4'},
      ]
  }),
  computed:{
    colorsArray(){
      let colorsArray = this.items.map(item => item.color).filter(x => !this.colorsIgnore.includes(x))
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
