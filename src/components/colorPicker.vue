<template>
  <div class="pa-1">
    <v-btn-toggle
    class="d-flex d-lg-inline-flex d-md-flex"
    >
          <v-btn
          v-for="item in colorsArray"
          :key="item"
          :ripple="false"
          @click="changeColorPicker(item)"
          :color="item"
          mandatory= true
          max="0"
          >
            <div class="img img-size">
            <img
            v-if="colorPicker === item"
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
      let colorsArray = this.$store.getters.colorsArray
        .map(item => item.color)
        .filter(x =>
        !this.colorsIgnore.includes(x)
        )
      if(this.editItem.color){
        colorsArray.unshift(this.editItem.color)
        this.$store.dispatch('colorPicker', this.editItem.color)
      }else{
        this.$store.dispatch('colorPicker', colorsArray[0])
      }
      return colorsArray.slice (0, 10)
    },
    colorPicker(){
      return this.$store.getters.colorPicker
    }
  },
  methods:{
    changeColorPicker(val){
      this.$store.dispatch('colorPicker', val)
    },
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
