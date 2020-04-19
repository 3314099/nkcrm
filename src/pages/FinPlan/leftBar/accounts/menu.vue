<template>
  <div>
    {{visibility1}}
    <v-card
      class="ma-1"
      outlined
      elevation="5"
      >
      <v-card-title
      v-for="(item, i) in leftMenuitems"
      :style="`background: ${item.background}`"
      :class="item.class"
      :key="i"
      >
      <div class="font-italic caption width">
        {{(item.btnId) | countAccounts(accounts)}}
        </div>  
              <v-btn
              v-show="item.checked"
              @click="toChangeCheckLMB(false,item.btnId)" 
              :disabled= lmBtnDisabled
              small
              icon>
              <v-icon :color="item.color">mdi-check-box-outline</v-icon>
              </v-btn>
              <v-btn
              v-show="!item.checked"
              @click="toChangeCheckLMB(true,item.btnId)"
              small
              :disabled= lmBtnDisabled
              icon
              >
                <v-icon>mdi-checkbox-blank-outline</v-icon>
              </v-btn>
      <v-btn
      :disabled= lmBtnDisabled
      py-0
      
      :color="item.color"
      :text="leftMenuButton === item.btnId ? false :  true"
      :outlined="leftMenuButton === item.btnId ? true : false"
      
      small
      @click="changeLeftMenuButton(item.btnId)"
      >
      {{item.text}}
      </v-btn>
      <v-spacer></v-spacer>
      <v-badge
      v-if="item.count"   
      class="pl-3"
                        inline
                        :color="item.parentBackground"
                        :content="item.badge | visibility(visibility)"
                      >
                      </v-badge>
                      
      </v-card-title>
      </v-card>
  </div>
</template>
<script>
// 
import fp_state from '@/state/fp_state'
// import LeftMenu from '@/store/FinPlan/LeftMenu.js'
export default{
  mixins:[fp_state],
  props:{
    visibility1:{
      type:Boolean,
      default: true
    },
  },
  methods:{
    changeLeftMenuButton(value){
      this.leftMenuButton = value
      
    }
  }
}
</script>
<style scoped>

</style>
