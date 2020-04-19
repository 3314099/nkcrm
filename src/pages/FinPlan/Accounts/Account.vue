<template>
  <v-card
  class="py-2 pr-0"
  :color="account.color"
  >
      <v-card-actions class="pad0" >
            <v-col cols="12" md="4" class="pad0" >
              <v-expand-transition>
                <v-btn
                :disabled="params.btnDisabled"
                v-if="account.checked"
                @click="toChangeCheckAccount(false,account.id)" 
                icon>
                <v-icon>mdi-check-box-outline</v-icon>
                </v-btn>
                <v-btn
                :disabled="params.btnDisabled"
                v-if="!account.checked"
                @click="toChangeCheckAccount(true,account.id)"
                icon
                >
                  <v-icon>mdi-checkbox-blank-outline</v-icon>
                </v-btn>
              </v-expand-transition>
            <span class="mx-2 font-weight-black headline text-transform: uppercase" 
            >
            {{account.title}}</span>
            </v-col>
            <v-col cols="12" md="4" class="pad0">
              
            <span 
            class="mx-2 font-weight-black headline "
            >
            <v-chip
            v-if="leftMenuBtnName.parentText"
            pa-0
            small
                class="ma-1"
                :color="leftMenuBtnName.parentColor"
                label
                text-color="white"
              >
                {{leftMenuBtnName.parentText}}
              </v-chip>
              <v-chip
              pa-0
              small
                class="ma-1"
                color="black"
                label
                outlined
                text-color="black"
              >
                {{leftMenuBtnName.btnName}}
              </v-chip>
            </span>
            </v-col>
            <span 
            class="mx-2"
            >{{ account.bill}}</span>
            <span 
            class="mx-2"
            >{{ account.currancy}}</span>
          <v-spacer />
          <div 
          >
            <v-btn-toggle
            v-if="this.redAccount === false"
            >
              
            <v-tooltip close-delay="3" max-width="300" nudge-bottom v-model="show" left>
          <template v-slot:activator="{ }">
            <v-btn
            :disabled="!account.comments || params.btnDisabled? true : false" 
            @click="show = !show">
                <v-icon>mdi-alpha-i-circle-outline</v-icon>
              </v-btn>
          </template>
          <span>{{account.comments}}</span>
        </v-tooltip>
          <v-btn 
          :disabled="params.btnDisabled"
          @click="openBanner('toAddOperation', account)">
            <v-icon>mdi-database-plus</v-icon>
          </v-btn>
          <v-btn
          retain-focus-on-click 
          :disabled="params.btnDisabled"
          @click="openBanner('toEditAccountBanner', account)">
            <v-icon>mdi-lead-pencil</v-icon>
          </v-btn>
        </v-btn-toggle>
        
          </div>
        </v-card-actions>
        <removeAccount
        v-if="params.banner === 'toRemoveAccountBanner' && (redAccount)"
        :id= account.id
        />
        


    </v-card>
</template>
<script>
import Account from '@/store/FinPlan/Account.js'
import removeAccount from '@/pages/FinPlan/Accounts/removeAccount'
// import addAccount from '@/pages/FinPlan/Accounts/addAccount'

export default{
  mixins: [Account],
  components:{
    removeAccount,
    // addAccount
  },
  data () {
    return {
      show: false,
      maxwidth: '100 px',
    }
  },
  props:{
    account:{
      type:Object
    },
    params:{
      type:Object
    },
    redAccount:{
      type:Boolean
    }
  },
  computed: {
    leftMenuBtnName(){
      return this.ACCOUNTJSleftMenuBtnName(this.account.categoryTypeAccount,this.params.leftMenuitems)
    }
  }
}
</script>
<style >
</style>
