<template>
  <v-card
    outlined
  >
  Charts
    <v-list-item three-line>
      <v-list-item-content>
        <div class="overline mb-4"></div>
        <v-list-item-title class="headline mb-1">Charts(статистика)</v-list-item-title>
        <v-list-item-subtitle>Greyhound divisely hello coldly fonwderfully</v-list-item-subtitle>
      </v-list-item-content>

      <v-list-item-avatar
        tile
        size="80"
        color="grey"
      ></v-list-item-avatar>
    </v-list-item>

    <v-card-actions>
      <v-btn text>Button</v-btn>
      <v-btn text>Button</v-btn>
    </v-card-actions>
  </v-card>
</template>
<script>
import Account from '@/store/FinPlan/Account.js'
// import textField from '@/components/textField'

export default {
  mixins:[Account],
  components:{
    // textField
  },
  data(){
    return {
      // title: '',
      // textarea: '111'
    }
  },
  props:{
    checkedAccountArray:{
      type:Array
    },
    params:{
    type:Object
    },
  }
}
</script>
