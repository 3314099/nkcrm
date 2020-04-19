<template>
  
<v-card 
        class="card"
      >
        <v-btn-toggle 
        >
          <v-btn
          v-for="(button, i) in buttons"
          :key="i"
          fab 
          :to="button.link"
          @click="leftPanelButtons(button.click)"
          >
            <v-icon>{{button.icon}}</v-icon>
          </v-btn>

          <v-btn
          fab 
          @click="changeVisibility()"
          >
            <v-icon
            v-if="params.visibility"
            >mdi-eye-off
            </v-icon>
            <v-icon
            v-if="!params.visibility"
            >mdi-eye-settings-outline
            </v-icon>
          </v-btn>
        </v-btn-toggle>
    </v-card>
</template>

<script>
import finPlan from '@/store/FinPlan/finPlan.js'
  export default{
    mixins:[finPlan],
    data:()=>({
      buttons:[
        {to:'/accounts', icon: 'mdi-credit-card-multiple-outline', click:'accounts', link:'/accounts'},
        {to:'/operations', icon: 'mdi-currency-rub', click:'operations', link:'/operations'},
        {to:'/properties', icon: 'mdi-brightness-7', click:'properties', link:'/properties'},
        {to:'/statistic', icon: 'mdi-poll', click:'statistic', link:'/statistic'},
      ]

    }),
    props:{
      params:{
        type:Object
      }
    },
  }
</script>
