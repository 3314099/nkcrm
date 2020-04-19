<template>
  <div>
    <RightPanelButtons />

    
      <Calendar 
    v-show="calendar"
      />
    
      <Calculator 
    v-show="calculator"
      />
      

      <Currency 
    v-show="currency"
      />
  </div>
</template>

<script>
import RightPanelButtons from '@/components/RightMenu/RightPanelBattons'
import Calendar from '@/components/Calendar'
import Calculator from '@/components/Calculator'
import Currency from '@/components/Currency'

export default {
  components:{
      RightPanelButtons,
      Calendar, 
      Calculator,
      Currency
    },
    computed: {
    calendar(){
      return this.$store.getters.computedCalendar
    },
    calculator(){
      return this.$store.getters.computedCalculator
    },
    currency(){
      return this.$store.getters.computedCurrency
    }
  },
}
</script>
