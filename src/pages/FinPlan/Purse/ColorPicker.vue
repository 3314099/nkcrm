<template>
  <div >
    <v-btn-toggle
    class="d-flex d-lg-inline-flex d-md-flex"
    >

          <v-btn
          @click="changeColor('blue lighten-5')"
          color="blue lighten-5"
          >
            <div class="img img-size">
            <img
            v-if="color === 'blue lighten-5'"
            src="approval64.png"
            alt="approval"
            >
          </div>
          </v-btn>
          <v-btn 
          @click="changeColor('teal lighten-3')"
          color="teal lighten-3"
          >
          <div class="img img-size">
            <img
            v-if="color === 'teal lighten-3'"
            src="approval64.png"
            alt="approval"
            >
          </div>
          </v-btn>
          <v-btn 
          @click="changeColor('blue lighten-3')"
          color="blue lighten-3"
          >
          <div class="img img-size">
            <img
            v-if="color === 'blue lighten-3'"
            src="approval64.png"
            alt="approval"
            >
          </div>
          </v-btn>
          <v-btn
          @click="changeColor('deep-orange lighten-3')"
          color="deep-orange lighten-3"
          >
          <div class="img img-size">
            <img
            v-if="color === 'deep-orange lighten-3'"
            src="approval64.png"
            alt="approval"
            >
          </div>
          </v-btn>
          <v-btn
          @click="changeColor('amber lighten-1')"
          color="amber lighten-1"
          >
          <div class="img img-size">
            <img
            v-if="color === 'amber lighten-1'"
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
      type:String,
      default: 'blue lighten-5'
    }
  },
  methods:{
    changeColor(color){
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
