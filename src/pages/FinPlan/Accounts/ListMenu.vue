<template>
<div>
  <v-card
  :color="params.loading ? '': leftMenuBtnName.parentColor"
  :loading="params.loading"
  class=" mr-0 mt-1 mb-0 pa-0 pl-0"
  outlined
  >
    <v-card-actions class="pa-0">
            <v-col cols="12" md="4">
          <v-btn
          v-if="this.chackedArray"
          @click="toChangeCheckShowAccounts(false,showAccounts)" 
          small
          :disabled= params.btnDisabled
          icon>
          <v-icon 
          :color="this.params.leftMenuButton === 0 ? 'black' : 'white'"
          >
          mdi-check-box-outline
          </v-icon>
          </v-btn>
          <v-btn
          v-if="!this.chackedArray"
          @click="toChangeCheckShowAccounts(true,showAccounts)"
          :disabled= params.btnDisabled
          small
          icon
          >
            <v-icon 
            :color="this.params.leftMenuButton === 0 ? 'black' : 'white'"
            >mdi-checkbox-blank-outline</v-icon>
          </v-btn>
            <span 
            :style="this.params.leftMenuButton === 0 ? 'color: black' : 'color: white'" 
            class="mx-2 font-weight-black headline text-transform: uppercase" 
            >
            счета</span>
            </v-col>
            <v-col cols="12" md="4" class="pad0">
              
            <span 
            class="mx-2 font-weight-black headline "
            >
            <v-chip
            v-if="leftMenuBtnName.parentText"
            pa-0
                class="ma-1"
                color="black"
                label
                outlined
                :text-color="this.params.leftMenuButton === 0 ? 'black' : 'white'"
              >
                {{leftMenuBtnName.parentText}}
              </v-chip>
              <v-chip
              pa-0
                class="ma-1"
                color="black"
                label
                outlined
                :text-color="this.params.leftMenuButton === 0 ? 'black' : 'white'"
              >
                {{leftMenuBtnName.btnName}}
              </v-chip>
            </span>
            </v-col>
            <span
            :style="this.params.leftMenuButton === 0 ? 'color: black' : 'color: white'" 
            class="mx-2"
            >Приход/Расход.Балланс</span>
          <v-spacer />
          <div 
          >
          <v-btn
          :disabled= params.btnDisabled
          v-if="params.leftMenuButton % 100 !== 0"
          class="mx-2"
                @click="openBanner('toCreateAccountBanner',{})" 
                >
                <v-icon>mdi-plus</v-icon>
                </v-btn>
          </div>
        </v-card-actions>
  </v-card>
</div>
</template>
<script>
import {eventEmitter} from '@/main'
import Account from '@/store/FinPlan/Account.js'
export default{
  mixins:[Account],
  data: () => ({
      absolute: true,
      opacity: 0.4,
      button:true,

  }),
  props:{
    params:{
      type:Object
    },
    showAccounts:{
      type:Array
    }
  },
  created(){
    // this.loading = this.params.loading
    eventEmitter.$on('showButtons', (button) =>{
      this.button = button
    })
  },
  computed: {
    leftMenuBtnName(){
      return this.ACCOUNTJSleftMenuBtnName(this.params.leftMenuButton,this.params.leftMenuitems)
    },
    chackedArray(){
      let val = false
      for (var i = this.showAccounts.length - 1; i >= 0; --i) {
        if (this.showAccounts[i].checked) {
            val = true
            break;
        }else{
          val = false
        }
      }
      return val
    },
    updateArray(){
      let arr = []
         Object.keys(this.showAccounts).forEach(key => {
          arr.push(this.showAccounts[key].id)
        })
        // console.log(arr)
        return arr
    }
  }
}
</script>
<style lang="stylus">

</style>
