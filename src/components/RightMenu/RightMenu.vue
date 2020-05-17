<template>
  <div>
    <RightPanelButtons />

    
      <Calendar 
    v-if="calendar"
      />
    
      <Calculator 
    v-if="calculator"
      />
      

      <Currency 
    v-if="currency"
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

// 3239 msScripting
// 527 msRendering
// 82 msPainting
// 326 msSystem
// 3650 msIdle
// 7824 msTotal
</script>
