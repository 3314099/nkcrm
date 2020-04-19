<template>
<div>
  <v-card
  :loading="loading"
  class="ml-3 mr-5 mt-1 mb-0 pa-0"
  outlined
  >
  
    <v-card-actions class="pa-0">
            <v-col cols="12" md="4" class="pad0">
            <v-btn-toggle
            v-if="button === true"
            >
          <v-btn
          @click="toChangeCheck(true,'all')" 
          small
          icon>
          <v-icon>mdi-check-box-outline</v-icon>
          </v-btn>
          <v-btn
          @click="toChangeCheck(false,'all')"
          small
          icon
          >
            <v-icon>mdi-checkbox-blank-off-outline</v-icon>
          </v-btn>
        </v-btn-toggle>
            <span class="mx-2 font-weight-black headline text-transform: uppercase" 
            >
            наименование счета</span>
            </v-col>
            <v-col cols="12" md="4" my="0">
            <span 
            class="mx-2"
            >Тип счета</span>
            </v-col>
            <span 
            class="mx-2"
            >Приход/Расход.Балланс</span>
          <v-spacer />
          <div 
          >
          <v-btn
          v-if="button === true"
          class="mx-2"
                @click="openBanner('toCreateAccountBanner', false)" 
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
      button:true,
  }),
  props:{
    loading:{
      type: Boolean
    }

  },
  created(){
    eventEmitter.$on('showButtons', (button) =>{
      this.button = button
    })
  },
}
</script>
