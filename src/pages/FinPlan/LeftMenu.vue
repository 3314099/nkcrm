<template>
	<div>
  <v-card
  class="ma-1"
  outlined
  >
  <v-divider inset></v-divider>
  <v-card-title
  v-for="(item, i) in params.leftMenuitems"
  :style="`background: ${item.background}`"
  :class="item.class"
  :key="i"
  >
  <div class="font-italic caption width">
    {{(item.btnId) | countAccounts(params.accounts)}}
    </div>  
          <v-btn
          v-show="item.checked"
          @click="toChangeCheckLMB(false,item.btnId)" 
          :disabled= params.btnDisabled
          small
          icon>
          <v-icon :color="item.color">mdi-check-box-outline</v-icon>
          </v-btn>
          <v-btn
          v-show="!item.checked"
          @click="toChangeCheckLMB(true,item.btnId)"
          small
          :disabled= params.btnDisabled
          icon
          >
            <v-icon>mdi-checkbox-blank-outline</v-icon>
          </v-btn>
  <v-btn
  :disabled= params.btnDisabled
  py-0
  
  :color="item.color"
  :text="params.leftMenuButton === item.btnId ? false :  true"
  :outlined="params.leftMenuButton === item.btnId ? true : false"
  
  small
  @click="leftMenuButton(item.btnId)"
  >
   {{item.text}}
  </v-btn>
  <v-spacer></v-spacer>
  <v-badge
  v-if="item.count"   
  class="pl-3"
                    inline
                    :color="item.parentBackground"
                    :content="item.badge | visibility(params.visibility)"
                  >
                  </v-badge>
                  
  </v-card-title>
  <v-divider inset></v-divider>
  </v-card>

    </div>
    
    
</template>

<script>
import LeftMenu from '@/store/FinPlan/LeftMenu.js'
  export default {
    mixins: [LeftMenu],
    data: () => ({
      btnDisabled: false,
      
      panel: 0,
      inset: true,
       checkbox: true,
    }),
    props:{
      params:{
        type:Object
      }
    },
  }
</script>
<style>
.pointer:hover {
  color:red;
  cursor: pointer;
}
.width {
  /* max-width: 40px; */
  min-width: 35px;
  /* float: text-center */
}





</style>

