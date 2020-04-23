<template>
  <div class="pa-1">
    <v-btn-toggle
    class="d-flex d-lg-inline-flex d-md-flex"
    >

          <v-btn
          v-for="item in items"
          :key="item.color"
          @click="changeColor(item.color)"
          :color="item.color"
          >
            <div class="img img-size">
            <img
            v-if="color === item.color"
            src="approval64.png"
            alt="approval"
            >
          </div>
          </v-btn>
          
        </v-btn-toggle>
  </div>
</template>
<script>
import Account from '@/store/FinPlan/Account.js'

export default{
  mixins:[Account],
  props:{
    color:{
      type: String
    }
  },
  data: ()=>({
      items: [
      {color:'#F44336'},
      {color:'#E91E63'},
      {color:'#9C27B0'},
      {color:'#673AB7'},
      {color:'#3F51B5'},
      {color:'#2196F3'},
      {color:'#03A9F4'},
      {color:'#00BCD4'},
      {color:'#009688'},
      {color:'#CDDC39'},
      ]
  }),
  methods:{
    changeColor(color){
      console.log(111)
      this.$emit('changeColor', color)
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
